
export enum FileType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  PDF = 'PDF',
  DOC = 'DOC',
  FOLDER = 'FOLDER',
  OTHER = 'OTHER'
}

export enum UserRole {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  storageUsed: number; // in bytes
  storageLimit: number; // in bytes
}

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  isStarred: boolean;
  sharedWith: SharePermission[];
}

export interface SharePermission {
  userId: string;
  role: UserRole;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
  details: string;
}

export interface StorageStat {
  name: string;
  used: number;
}