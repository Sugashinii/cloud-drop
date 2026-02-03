
import React from 'react';
import { 
  FiFile, 
  FiImage, 
  FiVideo, 
  FiFileText, 
  FiFolder, 
  FiMoreHorizontal,
  FiStar,
  FiShare2,
  FiDownload,
  FiTrash2,
  FiClock,
  FiSettings,
  FiUsers,
  FiLayout,
  FiShield,
  FiPieChart,
  FiActivity
} from 'react-icons/fi';
import { FileType, UserRole } from './types';

export const COLORS = {
  primary: '#818cf8',
  secondary: '#c084fc',
  accent: '#2dd4bf',
  danger: '#f43f5e',
  warning: '#f59e0b',
  bg: '#0f172a',
  glass: 'rgba(255, 255, 255, 0.05)',
};

export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <FiLayout />, path: '/' },
  { id: 'all-files', label: 'All Files', icon: <FiFile />, path: '/files' },
  { id: 'shared', label: 'Shared with Me', icon: <FiShare2 />, path: '/shared' },
  { id: 'starred', label: 'Starred', icon: <FiStar />, path: '/starred' },
  { id: 'recent', label: 'Recent', icon: <FiClock />, path: '/recent' },
  { id: 'trash', label: 'Trash', icon: <FiTrash2 />, path: '/trash' },
];

export const ADMIN_NAVIGATION = [
  { id: 'admin-overview', label: 'Overview', icon: <FiPieChart />, path: '/admin' },
  { id: 'admin-users', label: 'Users', icon: <FiUsers />, path: '/admin/users' },
  { id: 'admin-security', label: 'Security', icon: <FiShield />, path: '/admin/security' },
  { id: 'admin-logs', label: 'Audit Logs', icon: <FiActivity />, path: '/admin/logs' },
];

export const MOCK_USER = {
  id: 'u-1',
  name: 'Pratyush Manivansh',
  email: 'pratyushmanivansh711@gmail.com',
  avatar: 'https://picsum.photos/seed/alex/200',
  role: UserRole.OWNER,
  storageUsed: 12.4 * 1024 * 1024 * 1024, // 12.4 GB
  storageLimit: 50 * 1024 * 1024 * 1024, // 50 GB
};

export const MOCK_FILES = [
  {
    id: 'f-1',
    name: 'Project_Assets_2024.zip',
    type: FileType.OTHER,
    size: 450 * 1024 * 1024,
    ownerId: 'u-1',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    parentId: null,
    isStarred: true,
    sharedWith: []
  },
  {
    id: 'f-2',
    name: 'Marketing_Presentation.pdf',
    type: FileType.PDF,
    size: 15 * 1024 * 1024,
    ownerId: 'u-1',
    createdAt: '2024-03-18T14:30:00Z',
    updatedAt: '2024-03-18T14:30:00Z',
    parentId: null,
    isStarred: false,
    sharedWith: [{ userId: 'u-2', role: UserRole.VIEWER }]
  },
  {
    id: 'f-3',
    name: 'Vacation_Photos',
    type: FileType.FOLDER,
    size: 0,
    ownerId: 'u-1',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-03-15T11:00:00Z',
    parentId: null,
    isStarred: false,
    sharedWith: []
  },
  {
    id: 'f-4',
    name: 'Hero_Animation.mp4',
    type: FileType.VIDEO,
    size: 120 * 1024 * 1024,
    ownerId: 'u-1',
    createdAt: '2024-03-15T16:45:00Z',
    updatedAt: '2024-03-15T16:45:00Z',
    parentId: 'f-3',
    isStarred: true,
    sharedWith: []
  },
  {
    id: 'f-5',
    name: 'Branding_Guidelines.png',
    type: FileType.IMAGE,
    size: 4.2 * 1024 * 1024,
    ownerId: 'u-1',
    createdAt: '2024-03-12T10:00:00Z',
    updatedAt: '2024-03-12T10:00:00Z',
    parentId: null,
    isStarred: false,
    sharedWith: []
  }
];

export const MOCK_AUDIT_LOGS = [
  { id: 'l-1', action: 'Upload', userId: 'u-1', userName: 'Alex Rivera', timestamp: '2 minutes ago', details: 'Uploaded Project_Assets_2024.zip' },
  { id: 'l-2', action: 'Share', userId: 'u-1', userName: 'Alex Rivera', timestamp: '1 hour ago', details: 'Shared Marketing_Presentation.pdf with team' },
  { id: 'l-3', action: 'Login', userId: 'u-2', userName: 'Sarah Jenkins', timestamp: '3 hours ago', details: 'Successful login from San Francisco' },
  { id: 'l-4', action: 'Download', userId: 'u-3', userName: 'Guest', timestamp: '5 hours ago', details: 'Public download of branding_v1.zip' },
];