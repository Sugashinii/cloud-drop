import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { FileItem, UserRole } from '../types';
import * as api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  storageUsed: number;
  storageLimit: number;
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  toggleStar: (fileId: string) => Promise<void>;
  setPreviewFile: (file: FileItem | null) => void;
  previewFile: FileItem | null;
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
  removeNotification: (id: string) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // On mount - restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUserState(JSON.parse(savedUser));
    }
  }, []);

  // Load files when user logs in
  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      const fetchedFiles = await api.getFiles();
      setFiles(fetchedFiles);
    } catch (err) {
      addNotification('Failed to load files', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const updateUser = (data: Partial<User>) => {
    setUserState(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setFiles([]);
    addNotification('Logged out successfully');
  };

  const uploadFile = async (file: File) => {
    try {
      addNotification(`Uploading ${file.name}...`);
      const newFile = await api.uploadFile(file);
      setFiles(prev => [newFile, ...prev]);
      addNotification(`${file.name} uploaded successfully! ✅`);
    } catch (err: any) {
      addNotification(err.message || 'Upload failed', 'error');
    }
  };

  const deleteFile = async (fileId: string) => {
    try {
      await api.deleteFile(fileId);
      setFiles(prev => prev.filter(f => f.id !== fileId));
      addNotification('File deleted successfully');
    } catch (err: any) {
      addNotification(err.message || 'Delete failed', 'error');
    }
  };

  const toggleStar = async (fileId: string) => {
    try {
      const result = await api.toggleStarFile(fileId);
      setFiles(prev =>
        prev.map(f => f.id === fileId ? { ...f, isStarred: result.isStarred } : f)
      );
    } catch (err: any) {
      addNotification(err.message || 'Failed to star file', 'error');
    }
  };

  const addNotification = (message: string, type: Notification['type'] = 'success') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user, setUser, updateUser, logout,
      files, setFiles, uploadFile, deleteFile, toggleStar,
      previewFile, setPreviewFile,
      notifications, addNotification, removeNotification,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};