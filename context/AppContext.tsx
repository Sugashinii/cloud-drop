import React, { createContext, useContext, useState, useEffect } from 'react';
import { FileItem, User, AuditLog, FileType } from '../types';
import { MOCK_USER, MOCK_FILES } from '../constants';
import { mockBackend } from '../services/mockBackend';

interface AppContextType {
  user: User;
  files: FileItem[];
  notifications: string[];
  isUploading: boolean;
  uploadProgress: number;
  previewFile: FileItem | null;
  addNotification: (msg: string) => void;
  uploadFile: (file: File) => Promise<void>;
  deleteFile: (id: string) => void;
  toggleStar: (id: string) => void;
  setPreviewFile: (file: FileItem | null) => void;
  updateUser: (updatedData: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [files, setFiles] = useState<FileItem[]>(MOCK_FILES);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const addNotification = (msg: string) => {
    setNotifications(prev => [...prev, msg]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 4000);
  };

  const updateUser = (updatedData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    addNotification("Profile synchronized successfully");
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    const newFile = await mockBackend.uploadFile(user.id, {
      name: file.name,
      size: file.size,
      type: file.type.includes('image') ? FileType.IMAGE : file.type.includes('video') ? FileType.VIDEO : file.type.includes('pdf') ? FileType.PDF : FileType.OTHER
    });

    clearInterval(interval);
    setUploadProgress(100);
    
    setTimeout(() => {
      setFiles(prev => [newFile, ...prev]);
      setIsUploading(false);
      addNotification(`Successfully uploaded ${file.name}`);
    }, 500);
  };

  const deleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    addNotification('File moved to trash');
  };

  const toggleStar = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, isStarred: !f.isStarred } : f));
  };

  return (
    <AppContext.Provider value={{
      user, files, notifications, isUploading, uploadProgress, previewFile,
      addNotification, uploadFile, deleteFile, toggleStar, setPreviewFile, updateUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};