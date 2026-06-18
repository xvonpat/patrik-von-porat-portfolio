import React from 'react';

export default function GlowEffect() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle tactile grain overlay */}
      <div className="grain-overlay hidden md:block" />

      {/* Top Left Muted Purple Ambient Smoke */}
      <div 
        className="absolute top-[-15%] left-[-15%] w-[60vw] h-[60vw] min-w-[400px] min-h-[400px] rounded-full bg-accent-purple/10 blur-[50px] md:blur-[130px] animate-drift"
      />
      
      {/* Middle Right Ember Orange Ambient Smoke */}
      <div 
        className="absolute top-[30%] right-[-15%] w-[55vw] h-[55vw] min-w-[350px] min-h-[350px] rounded-full bg-accent-orange/8 blur-[50px] md:blur-[140px] animate-drift-delayed"
      />
      
      {/* Bottom Left Soft Cyan Ambient Smoke */}
      <div 
        className="absolute bottom-[-15%] left-[0%] w-[50vw] h-[50vw] min-w-[320px] min-h-[320px] rounded-full bg-accent-cyan/8 blur-[50px] md:blur-[120px] animate-drift-slow"
      />
      
      {/* Deep cinematic vignette and atmospheric overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,#050506_90%)] opacity-95" />
    </div>
  );
}
