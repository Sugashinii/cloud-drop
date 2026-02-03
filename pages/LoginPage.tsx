
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';

const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 relative">
      {/* Page-specific background accents */}
      <div className="absolute top-[20%] right-[15%] w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full -z-10"></div>
      
      <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/5">
        <FiArrowLeft /> Back to home
      </Link>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-600/40">
            <FiLock className="text-2xl text-white" />
          </div>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Enterprise Access</h1>
          <p className="text-slate-400 font-medium">Securely sign in to your cloud workspace.</p>
        </div>

        <div className="glass-surface p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Work Email</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Secure Password</label>
                <a href="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Recovery?</a>
              </div>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
            </div>

            <button className="w-full py-4.5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 border border-indigo-400/20">
              Authorize Workspace
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New to the platform? <Link to="/register" className="text-indigo-400 font-bold hover:underline decoration-2 underline-offset-4">Provision account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;