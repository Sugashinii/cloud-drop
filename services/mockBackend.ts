
import { MOCK_FILES, MOCK_AUDIT_LOGS, MOCK_USER } from '../constants';
import { FileItem, AuditLog, User } from '../types';

/**
 * MOCK BACKEND SERVICE
 * This mimics the Node.js/Express service logic, providing an abstraction layer
 * for the data stored in simulated MongoDB and MySQL databases.
 */

class MockBackendService {
  // Simulated MongoDB - Files & Metadata
  private files: FileItem[] = [...MOCK_FILES];
  
  // Simulated MySQL - Audit Logs
  private auditLogs: AuditLog[] = [...MOCK_AUDIT_LOGS];

  async getFiles(userId: string): Promise<FileItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.files.filter(f => f.ownerId === userId));
      }, 300);
    });
  }

  async uploadFile(userId: string, fileData: Partial<FileItem>): Promise<FileItem> {
    const newFile: FileItem = {
      id: `f-${Date.now()}`,
      name: fileData.name || 'Untitled',
      type: fileData.type || 5 as any, // OTHER
      size: fileData.size || 0,
      ownerId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: fileData.parentId || null,
      isStarred: false,
      sharedWith: []
    };
    
    this.files.push(newFile);
    this.addAuditLog(userId, 'UPLOAD', `Uploaded ${newFile.name}`);
    
    return newFile;
  }

  async addAuditLog(userId: string, action: string, details: string): Promise<void> {
    const log: AuditLog = {
      id: `l-${Date.now()}`,
      userId,
      userName: MOCK_USER.name,
      action,
      details,
      timestamp: 'Just now'
    };
    this.auditLogs.unshift(log);
  }

  async getStorageStats(userId: string): Promise<{ used: number; total: number }> {
    const used = this.files
      .filter(f => f.ownerId === userId)
      .reduce((acc, f) => acc + f.size, 0);
    
    return {
      used,
      total: MOCK_USER.storageLimit
    };
  }
}

export const mockBackend = new MockBackendService();