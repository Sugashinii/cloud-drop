import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('sugar@clouddrop.app');
  const [password, setPassword] = useState('sugar123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, addNotification } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setUser({
        id: 'u-1', name: 'Sugar', email: 'sugar@clouddrop.app',
        avatar: '/default-avatar.svg', role: 'OWNER'
      });
      addNotification('Welcome back, Sugar! 🚀');
      navigate('/dashboard'); 
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white flex items-center justify-center p-6">
      <GlassCard className="w-full max-w-md p-12 rounded-[3rem] border-white/10 shadow-2xl">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 absolute left-6 top-6">
          <span className=""><FiArrowLeft /></span> Back
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-400">Sign in to CloudDrop</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-xs font-black uppercase text-slate-500 mb-2 flex items-center gap-2">
              <span className=""><FiMail /></span>Email
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-900/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="sugar@clouddrop.app"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-500 mb-2 flex items-center gap-2">
              <span className=""><FiLock /></span>Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 pr-12 bg-slate-900/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 text-white"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading ? 'Signing In...' : 'Enter CloudDrop'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          No account? <Link to="/register" className="text-indigo-400 font-bold">Register</Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default LoginPage;
