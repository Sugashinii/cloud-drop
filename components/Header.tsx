import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiSearch, FiCommand, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { addNotification } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-20 px-10 flex items-center justify-between border-b border-white/5 relative z-50 bg-[#020617]/40 backdrop-blur-md">
      <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-900/50 border border-white/5 rounded-xl w-96 text-slate-500">
        <FiSearch />
        <input 
          type="text" 
          placeholder="Quick search anything..." 
          className="bg-transparent border-none outline-none text-xs font-medium flex-1 text-slate-300 placeholder:text-slate-500"
        />
        <div className="flex items-center gap-1 opacity-50">
          <FiCommand size={10} />
          <span className="text-[10px] font-bold">K</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => addNotification("No new notifications")}
          className="relative p-2 text-slate-400 hover:text-white transition-colors"
        >
          <FiBell size={20} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-indigo-500 rounded-full border-2 border-slate-950"></span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{user.name}</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Pro Account</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-slate-900 shadow-xl overflow-hidden ring-2 ring-transparent group-hover:ring-indigo-500/50 transition-all">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-3 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl py-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-5 py-3 border-b border-white/5 mb-2">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <button 
                onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FiUser size={16} />
                Profile Settings
              </button>
              <button 
                onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FiSettings size={16} />
                Preferences
              </button>
              <div className="h-px bg-white/5 my-2"></div>
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-colors"
              >
                <FiLogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;