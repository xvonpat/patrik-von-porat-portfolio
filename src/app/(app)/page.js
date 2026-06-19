import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-20 relative z-10">
      
      {/* Unboxed Hero Section floating organically over the background */}
      <section className="flex flex-col items-center text-center justify-center min-h-[50vh] gap-8 max-w-4xl mx-auto relative py-12 md:py-20">
        {/* Subtle backing purple glow to lift the text off the dark background */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-accent-purple/5 blur-[90px] rounded-full pointer-events-none -z-10" />
 
        {/* Tagline */}
        <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-500">
          Creative Work &amp; Structured Thinking
        </p>
        
        <h1 className="sr-only">Patrik von Porat</h1>
        <Image 
          src="/images/pvp_signature.png" 
          alt="Patrik von Porat Signature" 
          width={400}
          height={144}
          priority
          className="h-24 md:h-36 w-auto object-contain select-none pointer-events-none drop-shadow-[0_8px_24px_rgba(255,255,255,0.1)]"
        />
        
        <p className="text-sm md:text-lg font-gothic tracking-widest uppercase text-accent-purple text-center">
          Guitarist, visual artist and systems-minded creator
        </p>
        
        <p className="text-base md:text-lg leading-8 text-zinc-400 font-light max-w-2xl mt-4">
          I build music, visual art, websites and structured workflows &mdash; connecting heavy metal, dark aesthetics, AI-assisted creation and process improvement.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-sm border border-white/20 hover:border-white/35 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Explore Work
          </Link>
          <Link 
            href="/blog" 
            className="px-8 py-4 rounded-full bg-zinc-950/45 hover:bg-zinc-900/50 text-white font-semibold uppercase tracking-wider text-sm border border-zinc-800 hover:border-accent-purple/35 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Read Blog
          </Link>
        </div>
        
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-8" />
      </section>

    </div>
  );
}
