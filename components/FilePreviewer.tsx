import React from 'react';
import { FiX, FiDownload, FiShare2, FiMaximize2, FiExternalLink } from 'react-icons/fi';
import { FileItem, FileType } from '../types';
import { useApp } from '../context/AppContext';
import GlassCard from './GlassCard';

const FilePreviewer: React.FC = () => {
  const { previewFile, setPreviewFile } = useApp();

  if (!previewFile) return null;

  const renderPreview = () => {
    switch (previewFile.type) {
      case FileType.IMAGE:
        return <img src={`https://picsum.photos/seed/${previewFile.id}/1200/800`} alt={previewFile.name} className="max-h-[70vh] w-auto rounded-lg shadow-2xl" />;
      case FileType.VIDEO:
        return (
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
             <p className="text-slate-400">Video Player Component (Mock: {previewFile.name})</p>
          </div>
        );
      case FileType.PDF:
        return (
          <div className="w-full h-[70vh] bg-slate-800 rounded-lg flex flex-col items-center justify-center gap-4 border border-white/10">
            <p className="text-xl font-bold">PDF Document</p>
            <p className="text-slate-400">{previewFile.name}</p>
            <button className="px-6 py-2 bg-indigo-500 rounded-xl font-semibold">Open in Viewer</button>
          </div>
        );
      default:
        return (
          <div className="p-20 text-center">
            <FiExternalLink size={48} className="mx-auto mb-4 text-slate-500" />
            <p className="text-lg">Preview not available for this file type.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setPreviewFile(null)}></div>
      
      <GlassCard className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-white truncate max-w-xs">{previewFile.name}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-400 uppercase tracking-widest">{(previewFile.size / (1024 * 1024)).toFixed(1)} MB</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
              <FiDownload />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
              <FiShare2 />
            </button>
            <div className="w-[1px] h-6 bg-white/5 mx-1"></div>
            <button 
              onClick={() => setPreviewFile(null)}
              className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all"
            >
              <FiX />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-black/20">
          {renderPreview()}
        </div>

        <div className="p-4 border-t border-white/5 flex justify-between items-center text-xs text-slate-500">
          <p>Created: {new Date(previewFile.createdAt).toLocaleString()}</p>
          <p>Location: /Personal/ProjectX</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default FilePreviewer;