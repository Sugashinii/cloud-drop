import React from 'react';
import { FiFile, FiUsers, FiHardDrive, FiActivity, FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, files = [], addNotification } = useApp(); 
  const navigate = useNavigate();

  const handleExport = () => {
    addNotification("Exporting activity logs...");
    setTimeout(() => addNotification("Logs exported successfully!"), 1500);
  };

  const handleInvite = () => {
    addNotification("Opening invitation manager...");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto px-8 py-12">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-heading font-extrabold tracking-tight mb-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Workspace Overview
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Welcome back, <span className="font-bold text-white">{user?.name || 'Sugar'}</span>! 
            Here's what's new in your CloudDrop.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <span style={{ fontSize: '16px' }}>
              <FiArrowUpRight />
            </span>
            Export Logs
          </button>
          <button 
            onClick={handleInvite}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-sm hover:from-indigo-700 hover:to-purple-700 shadow-xl flex items-center gap-2"
          >
            <span style={{ fontSize: '16px' }}>
              <FiUsers />
            </span>
            Invite Team
          </button>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Files', value: files.length, trend: '+12%', color: 'text-blue-400', icon: FiFile },
          { label: 'Storage Used', value: '14.2 GB', trend: '28%', color: 'text-indigo-400', icon: FiHardDrive },
          { label: 'Shared Objects', value: '42', trend: '+5', color: 'text-purple-400', icon: FiUsers },
          { label: 'System Health', value: 'Optimal', trend: '100%', color: 'text-emerald-400', icon: FiActivity }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-surface p-8 rounded-3xl hover-lift">
              <div className="flex items-center justify-between mb-6">
                <span className={`text-3xl ${stat.color}`} style={{ fontSize: '32px' }}>
                  <Icon />
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white/5 px-3 py-1.5 rounded-xl">{stat.trend}</span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          );
        })}
      </div>

  
      <div className="glass-surface p-8 rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Storage Overview</h3>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">14.2 GB / 50 GB</span>
        </div>
        <div className="w-full bg-slate-900/50 rounded-3xl h-4 border border-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl" style={{width: '28%'}}></div>
        </div>
      </div>


      <div className="glass-surface p-8 rounded-[2.5rem]">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: "Sugar", action: "Uploaded", file: "Assets.png", time: "3h ago" },
            { user: "Alex", action: "Deleted", file: "project_v1.zip", time: "2h ago" },
            { user: "Sarah", action: "Shared", file: "Landing.fig", time: "15m ago" }
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <span className="font-bold text-indigo-400">{activity.user[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{activity.user} {activity.action} <span className="font-mono">"{activity.file}"</span></p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
