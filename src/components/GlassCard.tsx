import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`
        backdrop-blur-xl bg-glass-white border border-glass-border rounded-xl
        shadow-lg shadow-accent-primary/5
        ${hover ? 'hover:bg-glass-white/12 hover:shadow-accent-primary/10 hover:scale-[1.02] hover:border-glass-border/30' : ''}
        transition-all duration-500 ease-out
        relative overflow-hidden
        ${className}
      `}
    >
      {/* Subtle gradient overlay for enhanced depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border glow on hover */}
      {hover && (
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-tertiary/20 blur-sm" />
        </div>
      )}
    </div>
  );
};

export default GlassCard;