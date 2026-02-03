import React from 'react';
import { useApp } from '../context/AppContext';
import { FiInfo } from 'react-icons/fi';

const ToastContainer: React.FC = () => {
  const { notifications } = useApp();

  return (
    <div className="fixed top-24 right-6 z-[110] flex flex-col gap-3 pointer-events-none">
      {notifications.map((note, idx) => (
        <div 
          key={idx} 
          className="glass-dark border-indigo-500/20 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FiInfo size={16} />
          </div>
          <span className="text-sm font-medium text-white">{note}</span>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;