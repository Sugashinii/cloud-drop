import React from 'react';
import { FiX, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import GlassCard from './GlassCard';

const UploadOverlay: React.FC = () => {
  const { isUploading, uploadProgress } = useApp();

  if (!isUploading && uploadProgress !== 100) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-80 animate-in slide-in-from-right-10 duration-500">
      <GlassCard className="border-indigo-500/30 shadow-2xl shadow-indigo-500/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {uploadProgress < 100 ? (
              <FiLoader className="text-indigo-400 animate-spin" />
            ) : (
              <FiCheckCircle className="text-emerald-400" />
            )}
            <h4 className="font-bold text-white text-sm">
              {uploadProgress < 100 ? 'Uploading files...' : 'Upload complete'}
            </h4>
          </div>
          {uploadProgress === 100 && (
            <button className="text-slate-500 hover:text-white">
              <FiX />
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>Progress</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${uploadProgress < 100 ? 'bg-indigo-500' : 'bg-emerald-500'}`}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default UploadOverlay;