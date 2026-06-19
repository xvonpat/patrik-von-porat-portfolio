import React from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-24 md:gap-32 relative z-10">
      
      {/* Unboxed Hero Section floating organically over the background */}
      <section className="flex flex-col items-center text-center justify-center min-h-[50vh] gap-8 max-w-4xl mx-auto relative py-12 md:py-20">
        {/* Subtle backing purple glow to lift the text off the dark background */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-accent-purple/5 blur-[90px] rounded-full pointer-events-none -z-10" />
 
        {/* Tagline / Eyebrow */}
        <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-500">
          Creative Work &amp; Structured Thinking
        </p>
        
        {/* Typography Heading instead of signature image */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white font-gothic drop-shadow-sm select-none">
          Patrik von Porat
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-gothic tracking-widest uppercase text-accent-purple max-w-2xl text-center">
          Guitarist, visual artist and systems-minded creator
        </p>
        
        {/* Intro */}
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

      {/* Creative Pillars Section */}
      <section className="flex flex-col gap-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">Core Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic">Creative Pillars</h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Music */}
          <GlassCard accent="purple" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 01</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Music</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                Explore symphonic power metal orchestration, twin lead guitar work, and release tracking for active metal projects.
              </p>
            </div>
            <Link 
              href="/music" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-purple group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Explore Music &rarr;
            </Link>
          </GlassCard>

          {/* Card 2: Visual Art */}
          <GlassCard accent="orange" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 02</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Visual Art</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                A gallery of traditional graphite drawings, custom synthetic skin tattoo flashes, and digital neural syntheses.
              </p>
            </div>
            <Link 
              href="/art" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-orange group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Explore Art &rarr;
            </Link>
          </GlassCard>

          {/* Card 3: Projects */}
          <GlassCard accent="cyan" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 03</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Projects</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                Production-grade websites, custom CMS schemas, backup scripts, and continuous improvement systems.
              </p>
            </div>
            <Link 
              href="/projects" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Explore Projects &rarr;
            </Link>
          </GlassCard>

          {/* Card 4: Blog */}
          <GlassCard accent="purple" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 04</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Blog</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                Chronicles and build logs detailing workflow optimization, AI scripting logs, and creative insights.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-purple group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Read Blog &rarr;
            </Link>
          </GlassCard>
        </div>
      </section>

    </div>
  );
}
