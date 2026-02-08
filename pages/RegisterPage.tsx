import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCheckCircle, FiShield } from 'react-icons/fi';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 relative">

      <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full -z-10"></div>

      <Link to="/" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm uppercase bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/5">
  
        <span className="">
          <FiArrowLeft />
        </span>
        Back to home
      </Link>

      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
   
            <span className="text-2xl text-indigo-400">
              <FiShield />
            </span>
          </div>
          <h1 className="text-4xl font-heading font-extrabold tracking-tight mb-3">Initialize Workspace</h1>
          <p className="text-slate-400 font-medium">Join the next generation of cloud collaboration.</p>
        </div>

        <div className="glass-surface p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Legal Name</label>
              <div className="relative group">
      
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FiUser />
                </span>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Corporate Email</label>
              <div className="relative group">
     
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <FiMail />
                </span>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-white placeholder:text-slate-600 font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Password</label>
                <div className="relative group">
             
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FiLock />
                  </span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-white font-medium"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 ml-1"></label>
                <div className="relative group">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FiLock />
                  </span>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4.5 bg-slate-900/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none transition-all text-white font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 py-2 px-1">
              <input
                type="checkbox"
                id="terms"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-white/10 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 transition-all cursor-pointer"
                required
              />
              <label htmlFor="terms" className="text-slate-400 text-xs font-medium cursor-pointer leading-relaxed">
                I authorize the processing of my data in accordance with the <a href="#" className="text-indigo-400 font-bold hover:underline">Provisioning Protocol</a> and <a href="#" className="text-indigo-400 font-bold hover:underline">Privacy Policy</a>.
              </label>
            </div>
            
            <button 
              type="submit"
              className="w-full py-4.5 bg-white text-black font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            >
              Commit Configuration 
           
              <span className="">
                <FiCheckCircle />
              </span>
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have infrastructure? <Link to="/login" className="text-indigo-400 font-bold hover:underline decoration-2 underline-offset-4">Authenticate now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
