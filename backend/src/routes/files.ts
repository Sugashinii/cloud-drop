import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pool from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Helper to get file type
const getFileType = (mimetype: string): string => {
  if (mimetype.startsWith('image/')) return 'IMAGE';
  if (mimetype.startsWith('video/')) return 'VIDEO';
  if (mimetype === 'application/pdf') return 'PDF';
  if (mimetype.includes('word') || mimetype.includes('document')) return 'DOC';
  return 'OTHER';
};

// GET /api/files - get all files for logged in user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM files WHERE owner_id = $1 ORDER BY created_at DESC`,
      [req.userId]
    );

    const files = result.rows.map(f => ({
      id: `f-${f.id}`,
      name: f.name,
      type: f.type,
      size: Number(f.size),
      ownerId: `u-${f.owner_id}`,
      parentId: f.parent_id ? `f-${f.parent_id}` : null,
      isStarred: f.is_starred,
      createdAt: f.created_at,
      updatedAt: f.updated_at,
      sharedWith: [],
      path: f.path
    }));

    res.json({ files });
  } catch (err) {
    console.error('Get files error:', err);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// POST /api/files/upload - upload a file
router.post('/upload', authMiddleware, upload.single('file'), async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const { originalname, size, mimetype, filename } = req.file;
    const fileType = getFileType(mimetype);
    const filePath = `/uploads/${filename}`;

    const result = await pool.query(
      `INSERT INTO files (name, type, size, path, owner_id, is_starred)
       VALUES ($1, $2, $3, $4, $5, false)
       RETURNING *`,
      [originalname, fileType, size, filePath, req.userId]
    );

    const file = result.rows[0];

    // Update user storage
    await pool.query(
      'UPDATE users SET storage_used = storage_used + $1 WHERE id = $2',
      [size, req.userId]
    );

    // Log upload
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)',
      [req.userId, 'UPLOAD', `Uploaded ${originalname}`]
    );

    res.status(201).json({
      message: 'File uploaded successfully!',
      file: {
        id: `f-${file.id}`,
        name: file.name,
        type: file.type,
        size: Number(file.size),
        ownerId: `u-${file.owner_id}`,
        parentId: null,
        isStarred: file.is_starred,
        createdAt: file.created_at,
        updatedAt: file.updated_at,
        sharedWith: [],
        path: file.path
      }
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// DELETE /api/files/:id - delete a file
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
const fileId = String(req.params.id).replace('f-', '');

  try {
    const fileResult = await pool.query(
      'SELECT * FROM files WHERE id = $1 AND owner_id = $2',
      [fileId, req.userId]
    );

    if (fileResult.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const file = fileResult.rows[0];

    // Delete physical file
    if (file.path) {
      const fullPath = path.join(__dirname, '../../', file.path);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // Delete from DB
    await pool.query('DELETE FROM files WHERE id = $1', [fileId]);

    // Update user storage
    await pool.query(
      'UPDATE users SET storage_used = GREATEST(0, storage_used - $1) WHERE id = $2',
      [file.size, req.userId]
    );

    // Log deletion
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)',
      [req.userId, 'DELETE', `Deleted ${file.name}`]
    );

    res.json({ message: 'File deleted successfully' });

  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// PATCH /api/files/:id/star - toggle star
router.patch('/:id/star', authMiddleware, async (req: AuthRequest, res: Response) => {
const fileId = String(req.params.id).replace('f-', '');

  try {
    const result = await pool.query(
      `UPDATE files SET is_starred = NOT is_starred 
       WHERE id = $1 AND owner_id = $2 
       RETURNING is_starred`,
      [fileId, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.json({ isStarred: result.rows[0].is_starred });
  } catch (err) {
    console.error('Star error:', err);
    res.status(500).json({ error: 'Failed to update star' });
  }
});

// GET /api/files/:id/download - download a file
router.get('/:id/download', authMiddleware, async (req: AuthRequest, res: Response) => {
const fileId = String(req.params.id).replace('f-', '');
  try {
    const result = await pool.query(
      'SELECT * FROM files WHERE id = $1 AND owner_id = $2',
      [fileId, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const file = result.rows[0];
    const fullPath = path.join(__dirname, '../../', file.path);

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }

    res.download(fullPath, file.name);

  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: 'Failed to download file' });
  }
});

// GET /api/files/stats - storage stats
router.get('/stats/storage', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT storage_used, storage_limit FROM users WHERE id = $1',
      [req.userId]
    );

    const user = result.rows[0];
    res.json({
      used: Number(user.storage_used),
      total: Number(user.storage_limit)
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;