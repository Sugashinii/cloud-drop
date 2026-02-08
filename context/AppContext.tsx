import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MOCK_USER } from '../constants';

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
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_USER); // ✅ SUGAR!
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const updateUser = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
  };

  const logout = () => {
    setUser(null);
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
      user,
      setUser,
      updateUser,
      logout,
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};
