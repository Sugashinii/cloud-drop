
import React, { useState } from 'react';
// Added FiZap to imports
import { FiUser, FiMail, FiShield, FiBell, FiCamera, FiLock, FiCheckCircle, FiSave, FiAlertTriangle, FiZap } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';

const ProfileSettings: React.FC = () => {
  const { user, updateUser, addNotification } = useApp();
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: "Principal Cloud Engineer at Global Tech.",
  });

  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotifications: true,
    activityAlerts: false,
    darkMode: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    addNotification("Infrastructure changes committed.");
  };

  const toggleSetting = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    addNotification(`${key.replace(/([A-Z])/g, ' $1')} protocol updated.`);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-2">Account Configuration</h1>
          <p className="text-slate-400 font-medium">Manage your cryptographic identity and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          <FiSave /> Sync Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <GlassCard className="p-10">
            <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
              <FiUser className="text-indigo-400" /> Identity Information
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/20 shadow-2xl relative">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                      <FiCamera className="text-white text-2xl" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-slate-950 flex items-center justify-center">
                    <FiCheckCircle className="text-white text-xs" />
                  </div>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500">Avatar Operations</p>
                  <p className="text-slate-400 text-sm">PNG, JPG or GIF. Max size 2MB. Your avatar will be distributed across our global edge nodes.</p>
                  <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Update Cryptographic Photo</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Legal Entity Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-white font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Primary Endpoint (Email)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Professional Bio</label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-white font-medium resize-none"
                />
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-10">
            <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
              <FiShield className="text-rose-400" /> Security Protocol
            </h2>
            <div className="space-y-6">
              {[
                { key: 'twoFactor', label: 'Multi-Factor Authentication', desc: 'Adds an additional layer of verification during the sign-in handshake.', icon: <FiLock /> },
                { key: 'activityAlerts', label: 'Suspicious Activity Logs', desc: 'Receive real-time alerts if access is requested from unrecognized geo-locations.', icon: <FiAlertTriangle /> }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-indigo-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.label}</h4>
                      <p className="text-xs text-slate-500 max-w-md">{item.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSetting(item.key as any)}
                    className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${toggles[item.key as keyof typeof toggles] ? 'bg-indigo-600' : 'bg-slate-800'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${toggles[item.key as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
              
              <div className="pt-6 border-t border-white/5 flex gap-4">
                 <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">Change Encryption Keys</button>
                 <button className="px-6 py-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/20 transition-all">Revoke All Sessions</button>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-10">
          <GlassCard className="p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
              <FiBell className="text-amber-400" /> Communications
            </h3>
            <div className="space-y-4">
               {[
                 { key: 'emailNotifications', label: 'Email Reports' },
                 { key: 'darkMode', label: 'High-Contrast Mode' }
               ].map(item => (
                 <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-400">{item.label}</span>
                    <button 
                      onClick={() => toggleSetting(item.key as any)}
                      className={`w-10 h-5 rounded-full p-0.5 transition-all ${toggles[item.key as keyof typeof toggles] ? 'bg-indigo-600' : 'bg-slate-800'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggles[item.key as keyof typeof toggles] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                 </div>
               ))}
            </div>
          </GlassCard>

          <GlassCard className="p-8 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-4xl opacity-10">
              <FiZap />
            </div>
            <h3 className="text-lg font-bold mb-2">Storage Statistics</h3>
            <p className="text-2xl font-black font-heading text-white mb-4">12.4 GB <span className="text-slate-500 text-sm font-medium">/ 50 GB</span></p>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-6">
               <div className="h-full bg-indigo-500 w-[28%]" />
            </div>
            <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-slate-100 transition-all active:scale-95 shadow-xl">Upgrade Infrastructure</button>
          </GlassCard>

          <div className="p-8 rounded-[2rem] bg-rose-500/5 border border-rose-500/10">
             <h3 className="text-rose-400 font-bold mb-2">Delete Workspace</h3>
             <p className="text-slate-500 text-xs mb-6 font-medium leading-relaxed">Permanently purge your account and all encrypted assets from our global nodes. This action is atomic and irreversible.</p>
             <button className="text-xs font-black uppercase tracking-widest text-rose-500 hover:text-rose-400 underline underline-offset-4">Initialize Purge Sequence</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;