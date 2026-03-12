import React, { useState, useRef } from 'react';
import { 
  FiGrid, FiList, FiMoreVertical, FiFolder, FiFile, FiDownload, FiShare2, FiStar, FiTrash2, FiSearch, FiFilter, FiUpload
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { FileType } from '../types';

interface FileExplorerProps { title: string; }

const FileExplorer: React.FC<FileExplorerProps> = ({ title }) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const { files, setPreviewFile, toggleStar, deleteFile, uploadFile, addNotification } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));


  const getIcon = (type: FileType) => {
    switch (type) {
      case FileType.FOLDER: 
        return (
          <span className="text-amber-400">
            <FiFolder />
          </span>
        );
      case FileType.IMAGE: 
        return (
          <span className="text-indigo-400">
            <FiFile />
          </span>
        );
      case FileType.VIDEO: 
        return (
          <span className="text-emerald-400">
            <FiFile />
          </span>
        );
      case FileType.PDF: 
        return (
          <span className="text-rose-400">
            <FiFile />
          </span>
        );
      default: 
        return (
          <span className="text-slate-400">
            <FiFile />
          </span>
        );
    }
  };

  const handleDownload = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    addNotification(`Downloading ${fileName}...`);
  };

  const handleShare = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    addNotification(`Generating share link for ${fileName}...`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-4xl font-heading font-extrabold tracking-tight">{title}</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
     
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" style={{ fontSize: '16px' }}>
              <FiSearch />
            </span>
            <input 
              type="text" 
              placeholder="Filter items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none text-sm transition-all text-white"
            />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <span className="" style={{ fontSize: '16px' }}>
              <FiUpload />
            </span>
            Upload
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => {
              if (e.target.files?.[0]) {
                uploadFile(e.target.files[0]);
                e.target.value = '';
              }
            }} 
            className="hidden" 
          />
        </div>
      </div>

      <div className="flex items-center justify-between glass-surface p-2 rounded-2xl border border-white/5">
        <div className="flex gap-1">
          <button 
            onClick={() => setView('grid')} 
            className={`p-2.5 rounded-xl transition-all ${view === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white/5'}`}
          >
            <span className="" style={{ fontSize: '18px' }}>
              <FiGrid />
            </span>
          </button>
          <button 
            onClick={() => setView('list')} 
            className={`p-2.5 rounded-xl transition-all ${view === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-white/5'}`}
          >
            <span className="" style={{ fontSize: '18px' }}>
              <FiList />
            </span>
          </button>
        </div>
        <div className="flex items-center gap-6 px-4">

          <button 
            onClick={() => addNotification("Filter features coming in next update!")}
            className="text-slate-500 hover:text-white transition-colors p-1"
          >
            <span className="" style={{ fontSize: '16px' }}>
              <FiFilter />
            </span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Cloud Ready
          </div>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{filteredFiles.length} Objects</span>
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-24 glass-surface rounded-[2.5rem] border border-dashed border-white/10">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">

            <span className="text-slate-500 text-2xl">
              <FiSearch />
            </span>
          </div>
          <h3 className="text-lg font-bold mb-1">No matching files</h3>
          <p className="text-slate-500 font-medium">Try adjusting your search or filters.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredFiles.map((file) => (
            <div 
              key={file.id} 
              onClick={() => setPreviewFile(file)}
              className="glass-surface p-6 rounded-[2rem] hover-lift cursor-pointer group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-4xl group-hover:scale-110 transition-transform">{getIcon(file.type)}</div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200" onClick={e => e.stopPropagation()}>
                  <button 
                    onClick={() => toggleStar(file.id)} 
                    className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${file.isStarred ? 'text-amber-400' : 'text-slate-400'}`}
                    title="Star"
                  >
                    <span className="" style={{ fontSize: '14px' }}>
                      <FiStar />
                    </span>
                  </button>
                  <button 
                    onClick={(e) => handleDownload(e, file.name)} 
                    className="p-2 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 rounded-lg transition-colors"
                    title="Download"
                  >
                    <span className="" style={{ fontSize: '14px' }}>
                      <FiDownload />
                    </span>
                  </button>
                  <button 
                    onClick={() => deleteFile(file.id)} 
                    className="p-2 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <span className="" style={{ fontSize: '14px' }}>
                      <FiTrash2 />
                    </span>
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-bold text-white truncate mb-1">{file.name}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {(file.size / (1024*1024)).toFixed(1)} MB • {file.type.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-surface rounded-[2.5rem] overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-5">Object Name</th>
                <th className="px-8 py-5">Size</th>
                <th className="px-8 py-5">Last Modified</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFiles.map((file) => (
                <tr key={file.id} onClick={() => setPreviewFile(file)} className="hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="text-xl group-hover:scale-110 transition-transform">{getIcon(file.type)}</div>
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-400">{(file.size / (1024*1024)).toFixed(1)} MB</td>
                  <td className="px-8 py-4 text-sm text-slate-500">{new Date(file.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toggleStar(file.id)} className={`p-2 rounded-lg transition-colors ${file.isStarred ? 'text-amber-400' : 'text-slate-500 hover:text-white'}`}>
                        <span className="" style={{ fontSize: '16px' }}>
                          <FiStar />
                        </span>
                      </button>
                      <button onClick={(e) => handleShare(e, file.name)} className="p-2 text-slate-500 hover:text-indigo-400 rounded-lg transition-colors">
                        <span className="" style={{ fontSize: '16px' }}>
                          <FiShare2 />
                        </span>
                      </button>
                      <button onClick={(e) => handleDownload(e, file.name)} className="p-2 text-slate-500 hover:text-indigo-400 rounded-lg transition-colors">
                        <span className="" style={{ fontSize: '16px' }}>
                          <FiDownload />
                        </span>
                      </button>
                      <button onClick={() => deleteFile(file.id)} className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition-colors">
                        <span className="" style={{ fontSize: '16px' }}>
                          <FiTrash2 />
                        </span>
                      </button>
                    </div>
                    <div className="group-hover:hidden">
             
                      <span className="ml-auto text-slate-600" style={{ fontSize: '16px' }}>
                        <FiMoreVertical />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
