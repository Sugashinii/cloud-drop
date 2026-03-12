import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`glass-surface rounded-[2.5rem] p-8 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;