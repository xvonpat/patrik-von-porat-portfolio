import React from 'react';

export default function GlassCard({ 
  children, 
  className = "", 
  accent = "purple", // "purple", "cyan"
  onClick 
}) {
  const accentClasses = {
    purple: "hover:border-accent-purple/40 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]",
    cyan: "hover:border-accent-cyan/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]",
  };

  const selectedAccentClass = accentClasses[accent] || accentClasses.purple;

  return (
    <div 
      onClick={onClick}
      className={`relative glass-panel rounded-lg p-6 md:p-8 transition-all duration-500 ease-out transform hover:-translate-y-1 ${selectedAccentClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Decorative inner gothic notch or line */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {children}
    </div>
  );
}
