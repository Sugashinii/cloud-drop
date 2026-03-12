
import React from 'react';
import { 
  FiUsers, FiShield, FiAlertCircle, FiHardDrive, FiActivity, FiGlobe, FiDownload, FiRefreshCw 
} from 'react-icons/fi';
import GlassCard from '../components/GlassCard';
import { MOCK_AUDIT_LOGS } from '../constants';
import { useApp } from '../context/AppContext';

const AdminDashboard: React.FC = () => {
  const { addNotification } = useApp();

  const handleExport = () => {
    addNotification("Generating comprehensive audit report...");
    setTimeout(() => addNotification("Audit log exported as CSV"), 2000);
  };

  const handleRefresh = () => {
    addNotification("Refreshing server metrics...");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight text-white mb-2">System Administration</h1>
          <p className="text-slate-400 font-medium">Real-time infrastructure and user governance dashboard.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all text-white"
        >
          <FiRefreshCw className="text-indigo-400" /> Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', value: '12,543', trend: '+12%', icon: <FiUsers />, color: 'text-indigo-400' },
          { label: 'Active Sessions', value: '1,204', trend: '+5%', icon: <FiActivity />, color: 'text-emerald-400' },
          { label: 'Total Storage', value: '14.2 TB', trend: '+1.4 TB', icon: <FiHardDrive />, color: 'text-purple-400' },
          { label: 'Abuse Reports', value: '2', trend: '-80%', icon: <FiAlertCircle />, color: 'text-rose-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-surface p-8 rounded-[2rem] relative overflow-hidden group hover-lift border border-white/5">
            <div className={`absolute top-0 right-0 p-6 text-5xl opacity-5 group-hover:scale-125 transition-transform duration-500 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
              <span className="bg-white/5 px-1.5 py-0.5 rounded-lg">{stat.trend}</span>
              <span className="text-slate-500 text-[10px] font-medium">Growth</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-3">
              <FiShield className="text-indigo-400" /> Security Audit
            </h2>
            <button 
              onClick={handleExport}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <FiDownload /> Export CSV
            </button>
          </div>
          <div className="space-y-4">
            {MOCK_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.03] transition-colors cursor-pointer group border border-transparent hover:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <FiActivity size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{log.userName}</p>
                    <p className="text-xs text-slate-500 truncate">{log.action}: {log.details}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => addNotification("Loading historical logs...")}
            className="w-full mt-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-all border-t border-white/5"
          >
            Load Full History
          </button>
        </GlassCard>

        <GlassCard className="p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-3">
              <FiGlobe className="text-emerald-400" /> Global Health
            </h2>
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full ring-1 ring-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
          <div className="space-y-8">
            {[
              { label: 'API Gateway (Edge)', status: 'Healthy', load: '12%', color: 'bg-emerald-500', icon: '⚡' },
              { label: 'Database Cluster (Primary)', status: 'Healthy', load: '45%', color: 'bg-emerald-500', icon: '💾' },
              { label: 'Object Storage (Global)', status: 'Healthy', load: '89%', color: 'bg-amber-500', icon: '📦' },
              { label: 'Auth Service (JWT)', status: 'Healthy', load: '5%', color: 'bg-emerald-500', icon: '🔐' },
            ].map((node, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{node.icon}</span>
                    <span className="text-sm font-bold text-white">{node.label}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${node.color.replace('bg-', 'text-')}`}>
                    {node.status}
                  </span>
                </div>
                <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ${node.color}`} 
                    style={{ width: node.load }}
                  ></div>
                </div>
                <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest">
                   <span>Usage</span>
                   <span>{node.load} Capacity</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;