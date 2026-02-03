
import React, { useState } from 'react';
import { FiBook, FiCheckCircle, FiShield, FiUsers, FiCloud, FiArrowLeft, FiCode, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const tabs = [
    { id: 'getting-started', label: 'Getting Started', icon: <FiZap /> },
    { id: 'file-management', label: 'File Management', icon: <FiCloud /> },
    { id: 'collaboration', label: 'Collaboration', icon: <FiUsers /> },
    { id: 'security', label: 'Security & Privacy', icon: <FiShield /> },
    { id: 'developer-api', label: 'Developer API', icon: <FiCode /> },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white pt-32 pb-20 px-6 relative">
      <Link to="/" className="fixed top-8 left-8 z-50 flex items-center gap-2 text-slate-500 hover:text-white transition-all font-bold text-sm uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl backdrop-blur-md border border-white/5">
        <FiArrowLeft /> Return Home
      </Link>

      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <h1 className="text-5xl font-heading font-extrabold tracking-tight mb-4">Documentation</h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium">
            Everything you need to know about setting up, managing, and securing your data on FileShare Hub.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-10 items-start">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2 sticky top-32">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group border ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={`text-xl ${activeTab === tab.id ? 'text-white' : 'text-indigo-400'}`}>
                  {tab.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="glass-surface p-10 md:p-16 rounded-[3rem] border-white/10 min-h-[600px] animate-in fade-in slide-in-from-right-10 duration-500">
              
              {activeTab === 'getting-started' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                    <FiZap className="text-indigo-400" /> Getting Started
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    FileShare Hub is designed to be intuitive for individual developers and robust enough for large enterprise teams. Follow this quick guide to initialize your workspace.
                  </p>
                  
                  <div className="grid gap-6">
                    {[
                      { step: "01", title: "Provision Account", desc: "Create your secure identity using our enterprise-grade authentication protocol." },
                      { step: "02", title: "Setup Workspace", desc: "Define your team hierarchies and initial folder structures for optimal organization." },
                      { step: "03", title: "Configure Security", desc: "Set up Two-Factor Authentication (2FA) and review your quantum-resistant encryption keys." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5">
                        <span className="text-4xl font-black text-indigo-500/20 font-heading">{item.step}</span>
                        <div>
                          <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                          <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'file-management' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                    <FiCloud className="text-indigo-400" /> File Management
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Manage your assets with precision using our advanced object management tools.
                  </p>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-xl font-bold mb-4">Object Ingestion (Upload)</h3>
                      <p className="text-slate-400 text-sm mb-4">You can ingest files via the web interface by dragging and dropping them anywhere on the explorer view. Supported file types include Images, Videos, PDFs, and generic binaries.</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-indigo-300 uppercase tracking-widest">
                        <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5"><FiCheckCircle /> Bulk Uploading</li>
                        <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5"><FiCheckCircle /> Recursive Folders</li>
                        <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5"><FiCheckCircle /> Version Conflict Resolution</li>
                        <li className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5"><FiCheckCircle /> Immediate Encryption</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold mb-4">Starring & Favorites</h3>
                      <p className="text-slate-400 text-sm">Star high-frequency assets to keep them at the top of your dashboard for immediate access.</p>
                    </section>
                  </div>
                </div>
              )}

              {activeTab === 'collaboration' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                    <FiUsers className="text-indigo-400" /> Collaboration
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Share resources securely across your organization or with external developers.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20">
                      <h4 className="text-lg font-bold mb-4 text-white">Viewer Role</h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">Permits users to read metadata and download the object. Cannot modify content or permissions.</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-purple-600/10 border border-purple-500/20">
                      <h4 className="text-lg font-bold mb-4 text-white">Editor Role</h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">Permits full modification of content, re-naming, and versioning. Cannot delete primary objects.</p>
                    </div>
                  </div>

                  <section className="p-8 rounded-[2rem] bg-white/5 border border-white/5">
                    <h4 className="text-lg font-bold mb-4">Sharing Links</h4>
                    <p className="text-slate-400 text-sm mb-4 font-medium">Generate encrypted sharing links with expiration dates. These links bypass normal auth protocols but respect role-based access controls defined during creation.</p>
                  </section>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                    <FiShield className="text-indigo-400" /> Security & Privacy
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Our platform is built on a zero-trust architecture. Your privacy is protected by multiple layers of modern cryptography.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900 border border-white/5">
                      <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                        <FiShield size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">AES-256 GCM Encryption</h4>
                        <p className="text-slate-500 text-sm">Data is encrypted at rest using industry-standard Galois/Counter Mode for authenticated encryption.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900 border border-white/5">
                      <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                        <FiZap size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Quantum-Resistant Keys</h4>
                        <p className="text-slate-500 text-sm">Future-proofing your data against quantum computing decryption threats with post-quantum algorithms.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'developer-api' && (
                <div className="space-y-10">
                  <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                    <FiCode className="text-indigo-400" /> Developer API
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Integrate FileShare Hub directly into your CI/CD pipelines and custom applications.
                  </p>

                  <div className="p-6 rounded-3xl bg-[#010409] border border-white/5 font-mono text-sm overflow-x-auto">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                       <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                       <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                       <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                       <span className="ml-2 text-slate-500 text-xs">Bash — Upload file</span>
                    </div>
                    <code className="text-indigo-300">
                      curl -X POST "https://api.fileshare.io/v1/objects" \<br />
                      &nbsp;&nbsp;-H "Authorization: Bearer $HUB_TOKEN" \<br />
                      &nbsp;&nbsp;-F "file=@/path/to/asset.zip" \<br />
                      &nbsp;&nbsp;-F "parent_id=folder_123"
                    </code>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <h5 className="text-xs font-black uppercase text-slate-500 mb-2">Endpoint</h5>
                      <p className="text-sm font-bold">/v1/objects</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <h5 className="text-xs font-black uppercase text-slate-500 mb-2">Auth</h5>
                      <p className="text-sm font-bold">JWT / API Key</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;