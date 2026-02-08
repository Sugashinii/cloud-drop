import React from 'react';
import { FiCloud, FiArrowRight, FiShield, FiZap, FiLayers, FiLock, FiCpu, FiGlobe } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent text-white">
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-600/30">
         
              <span className="text-xl">
                <FiCloud />
              </span>
            </div>
            <span className="text-xl font-bold font-heading tracking-tight">Cloud<span className="text-indigo-500">Drop</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <Link to="/docs" className="hover:text-white transition-colors">Documentation</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold hover:text-indigo-400 transition-colors">Sign in</Link>
            <Link to="/register" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/20 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-10 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"></span>
            Version 4.0: Neural Sync Enabled
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-8 leading-[1.05]">
            Secure vaulting for the <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">autonomous cloud.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
            Deploy your enterprise assets to a zero-knowledge, quantum-resistant environment with milliseconds of global latency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/register" className="w-full sm:w-auto px-10 py-5 bg-white text-black hover:bg-slate-200 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-2xl shadow-white/10 active:scale-95 group">
              Build Workspace 
   
              <span className="group-hover:translate-x-1 transition-transform">
                <FiArrowRight />
              </span>
            </Link>
            <Link to="/docs" className="w-full sm:w-auto px-10 py-5 glass-surface hover:bg-white/10 rounded-2xl font-bold text-lg flex items-center justify-center transition-all active:scale-95 border border-white/10">
              Read Documentation
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </section>

      <section id="features" className="py-40 container mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-heading font-extrabold mb-4">Elite Infrastructure</h2>
          <p className="text-slate-500 font-medium">Engineered for absolute performance and reliability.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
        {[
          { icon: <FiCpu />, title: "Neural Indexing", desc: "Automated AI metadata tagging that makes searching through millions of files instant." },
          { icon: <FiZap />, title: "Edge Acceleration", desc: "Proprietary protocol that delivers heavy assets up to 40% faster than standard S3." },
          { icon: <FiLayers />, title: "Atomic Versioning", desc: "Every save is an immutable record. Restore any file state with zero data loss." }
        ].map((item, i) => (
          <div key={i} className="glass-surface p-12 rounded-[2.5rem] hover-lift group">
            <div className="w-16 h-16 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-3xl text-indigo-400 mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold font-heading mb-5">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
        </div>
      </section>

      <section id="security" className="py-40 bg-slate-950/20 backdrop-blur-sm border-y border-white/5 overflow-hidden">
        <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <span className="text-indigo-400 font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Defense Protocol</span>
              <h2 className="text-5xl font-heading font-extrabold mb-8 leading-tight">Fortified by <span className="text-indigo-500">Zero-Knowledge</span> Architecture.</h2>
              <div className="space-y-8">
                 {[
                   { icon: <FiLock />, title: "End-to-End PGP", desc: "Even we can't see your files. Encryption keys never leave your device." },
                   { icon: <FiShield />, title: "Quantum Resilience", desc: "Hardened against future compute threats with Post-Quantum Cryptography." },
                   { icon: <FiGlobe />, title: "Distributed Sovereignty", desc: "Choose your data jurisdiction. Comply with GDPR, CCPA, and more instantly." }
                 ].map((sec, i) => (
                   <div key={i} className="flex gap-6">
                      <div className="shrink-0 w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400 border border-white/10">
                  
                        {sec.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{sec.title}</h4>
                        <p className="text-slate-500 text-sm font-medium">{sec.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           <div className="relative">
              <div className="aspect-square glass-surface rounded-[3rem] p-10 flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-indigo-600/5 animate-pulse"></div>
           
                 <span className="text-[12rem] text-indigo-500/20 group-hover:scale-110 transition-transform duration-700">
                   <FiLock />
                 </span>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
                    <div className="px-6 py-3 bg-indigo-600 rounded-2xl shadow-2xl font-bold animate-bounce">SECURE NODE ACTIVE</div>
                    <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Verifying integrity...</div>
                 </div>
              </div>
           </div>
        </div>
        </div>
      </section>

      <footer className="py-24 border-t border-white/5 bg-slate-950/40 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">

            <span className="text-white">
              <FiCloud />
            </span>
          </div>
          <span className="font-bold text-xl tracking-tight">CLOUD-DROP</span>
        </div>
        <div className="flex gap-10 text-sm text-slate-500 font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">Status</a>
        </div>
        <p className="text-xs text-slate-600 font-bold">© 2025 CLOUD-DROP.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
