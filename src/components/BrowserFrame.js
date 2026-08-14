import React from 'react';
import Image from 'next/image';

/**
 * Reusable BrowserFrame component for project proof cards.
 * 
 * Features:
 * - Restrained dark visual identity (Obsidian Noir).
 * - Graphite-black browser toolbar.
 * - Three small, low-saturation window dots.
 * - Subtle address field displaying the project domain.
 * - 12px border radius, thin low-contrast border, soft shadow.
 * - Aspect ratio 16:10 with object-fit: cover for the viewport image.
 * - Fully responsive and lightweight.
 */
export default function BrowserFrame({
  src,
  alt = 'vonporat.com website interface preview',
  url = 'vonporat.com',
  className = '',
  imageClassName = '',
  priority = false,
}) {
  return (
    <div 
      className={`w-full overflow-hidden rounded-[12px] border border-white/[0.08] bg-obsidian-950 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-premium ${className}`}
    >
      {/* Graphite-black browser toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-obsidian-900/90 border-b border-white/[0.06] select-none">
        {/* Three small muted window dots with very low saturation */}
        <div className="flex items-center gap-1.5 w-14" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/40 border border-white/[0.04]" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/40 border border-white/[0.04]" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/40 border border-white/[0.04]" />
        </div>

        {/* Subtle address field displaying the domain */}
        <div className="flex-1 max-w-[200px] sm:max-w-xs mx-2">
          <div className="flex items-center justify-center gap-1.5 px-3 py-0.5 rounded bg-obsidian-950/60 border border-white/[0.04] text-[10px] sm:text-[11px] font-mono text-zinc-400 tracking-wider text-center truncate">
            <svg 
              className="w-2.5 h-2.5 text-zinc-500 shrink-0" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
        </div>

        {/* Balance spacer */}
        <div className="w-14 hidden sm:block" aria-hidden="true" />
      </div>

      {/* Viewport area with 16:10 aspect ratio and object-fit: cover */}
      <div className="relative w-full aspect-[16/10] bg-obsidian-950 overflow-hidden">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            quality={90}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 896px"
            className={`object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01] ${imageClassName}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-obsidian-900/30 to-obsidian-950">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
              {url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
