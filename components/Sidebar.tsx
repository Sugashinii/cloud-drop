import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiLayout, FiFolder, FiShare2, FiStar, FiActivity, FiLogOut, FiSettings } from 'react-icons/fi';
import { User } from '../types';

interface SidebarProps {
  user: User;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { label: 'Overview', icon: <FiLayout />, path: '/dashboard' },
    { label: 'My Vault', icon: <FiFolder />, path: '/files' },
    { label: 'Shared', icon: <FiShare2 />, path: '/shared' },
    { label: 'Favorites', icon: <FiStar />, path: '/starred' },
    { label: 'Security', icon: <FiActivity />, path: '/recent' },
  ];

  return (
    <aside className="w-20 lg:w-72 bg-slate-950/50 border-r border-white/5 flex flex-col h-full transition-all">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-10">
         <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
             <FiFolder className="text-white" />
           </div>
           <span className="hidden lg:block font-heading font-extrabold text-xl tracking-tight">Hub</span>
         </div>
      </div>

      <nav className="flex-1 py-8 px-4 lg:px-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
              ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}
            `}
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <span className="hidden lg:block text-sm font-bold tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <div className="hidden lg:block p-5 bg-white/5 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-3">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Storage</span>
             <span className="text-[10px] font-black text-indigo-400">Upgrade</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 w-[28%]"></div>
          </div>
        </div>
        
        <button onClick={onLogout} className="flex items-center justify-center lg:justify-start gap-4 px-4 py-3 w-full text-slate-500 hover:text-rose-400 transition-colors group">
          <FiLogOut className="text-xl group-hover:translate-x-1 transition-transform" />
          <span className="hidden lg:block text-sm font-bold uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;