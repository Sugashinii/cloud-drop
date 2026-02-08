import React, { useState } from 'react';
import { FiUser, FiMail, FiShield, FiBell, FiCamera, FiLock, FiCheckCircle, FiSave, FiAlertTriangle, FiZap } from 'react-icons/fi';
import GlassCard from '../components/GlassCard';


const SUGAR_USER = {
  name: 'Sugar',
  email: 'sugar@clouddrop.app',
  avatar: '/default-avatar.svg'
};

const ProfileSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    name: SUGAR_USER.name,
    email: SUGAR_USER.email,
    bio: "Principal Cloud Engineer at CloudDrop.",
  });

  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotifications: true,
    activityAlerts: false,
    darkMode: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Profile synced! Welcome back Sugar! 😍');
  };

  const toggleSetting = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    const keyStr = key as string;
    const displayKey = keyStr.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    alert(`✅ ${displayKey} updated!`);
  };

  return (
    <div className="min-h-screen bg-transparent p-6 max-w-5xl mx-auto pt-24">
    
      <style jsx>{`
        nav, header, [class*="navbar"], [class*="header"] { display: none !important; }
      `}</style>
      
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-2 text-white">
              Sugar's Account
            </h1>
            <p className="text-slate-400 font-medium">sugar@clouddrop.app</p>
          </div>
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
          >
            <span className=""><FiSave /></span>
            Sync Profile
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
     
          <div className="lg:col-span-2 space-y-10">
            <GlassCard className="p-10">
              <h2 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <span className="text-indigo-400"><FiUser /></span>
                Identity Information
              </h2>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/20 shadow-2xl relative bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-4xl text-white">S</span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer rounded-full">
                      <span className="text-white text-2xl"><FiCamera /></span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full border-4 border-slate-950 flex items-center justify-center">
                      <span className="text-white text-xs"><FiCheckCircle /></span>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500">Avatar Operations</p>
                    <p className="text-slate-400 text-sm">PNG, JPG or GIF. Max size 2MB. Distributed globally.</p>
                    <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest">Update Photo</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Legal Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-white font-medium"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      className="w-full px-5 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-white font-medium"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Bio</label>
                  <textarea 
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-900 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all text-white font-medium resize-none"
                  />
                </div>
              </form>
            </GlassCard>
          </div>

   
          <div className="space-y-10">
            <GlassCard className="p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                <span className="text-amber-400"><FiBell /></span>
                Communications
              </h3>
       
            </GlassCard>

            <GlassCard className="p-8 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-4xl opacity-10">
                <FiZap />
              </div>
              <h3 className="text-lg font-bold mb-2">Storage</h3>
              <p className="text-2xl font-black font-heading text-white mb-4">12.4 GB <span className="text-slate-500">/ 50 GB</span></p>
              <div className="w-full h-2 bg-slate-900 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-indigo-500 w-[28%]"></div>
              </div>
              <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm hover:bg-slate-100 transition-all">Upgrade</button>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
