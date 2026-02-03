
import React from 'react';
import { FiFile, FiUsers, FiHardDrive, FiActivity, FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const STORAGE_STATS = [
  { name: 'Jan', size: 400 },
  { name: 'Feb', size: 300 },
  { name: 'Mar', size: 600 },
  { name: 'Apr', size: 800 },
  { name: 'May', size: 1200 },
  { name: 'Jun', size: 1500 },
];

const Dashboard: React.FC = () => {
  const { user, files, addNotification } = useApp();
  const navigate = useNavigate();

  const handleExport = () => {
    addNotification("Exporting activity logs...");
    setTimeout(() => addNotification("Logs exported successfully!"), 1500);
  };

  const handleInvite = () => {
    addNotification("Opening invitation manager...");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-2">Workspace Overview</h1>
          <p className="text-slate-400 font-medium">Welcome back, {user.name}. Here's what changed since yesterday.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all active:scale-95"
          >
            Export Logs
          </button>
          <button 
            onClick={handleInvite}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Invite Team
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Files', value: files.length, icon: <FiFile />, trend: '+12%', color: 'text-blue-400' },
          { label: 'Storage Used', value: '14.2 GB', icon: <FiHardDrive />, trend: '28%', color: 'text-indigo-400' },
          { label: 'Shared Objects', value: '42', icon: <FiUsers />, trend: '+5', color: 'text-purple-400' },
          { label: 'System Health', value: 'Optimal', icon: <FiActivity />, trend: '100%', color: 'text-emerald-400' }
        ].map((stat, i) => (
          <div key={i} className="glass-surface p-8 rounded-3xl hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div className={`text-2xl ${stat.color}`}>{stat.icon}</div>
              <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-lg">{stat.trend}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold font-heading">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-surface p-10 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-bold font-heading">Growth Statistics</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Ingest (MB)</span>
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STORAGE_STATS}>
                <defs>
                  <linearGradient id="colorSize" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                  itemStyle={{ color: '#818cf8', fontWeight: 700 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="size" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorSize)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-surface p-10 rounded-[2.5rem]">
          <h2 className="text-xl font-bold font-heading mb-8">System Audit</h2>
          <div className="space-y-6">
            {[
              { user: "Alex", action: "Deleted", item: "project_v1.zip", time: "2m ago" },
              { user: "Sarah", action: "Shared", item: "Landing.fig", time: "15m ago" },
              { user: "System", action: "Backup", item: "Cloud Storage", time: "1h ago" },
              { user: "Alex", action: "Uploaded", item: "Assets.png", time: "3h ago" },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/recent')}>
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:border-indigo-500/50 group-hover:text-white transition-all">
                  {log.user[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">
                    <span className="text-indigo-400">{log.user}</span> {log.action} {log.item}
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/recent')}
            className="w-full mt-10 py-3 text-sm font-bold text-slate-500 hover:text-indigo-400 transition-colors border-t border-white/5 pt-6"
          >
            View full audit trail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;