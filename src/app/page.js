"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Only capture scroll on desktop screens for performance optimization
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      title: "Music",
      description: "Guitar work and orchestration spanning melodic power metal, symphonic epic metal, and dark melodeath. Crafting razor-sharp riffs and rich atmospheric layers.",
      href: "/music",
      accent: "purple",
      tag: "VIBRANT & VISCERAL",
    },
    {
      title: "Visual Art",
      description: "From traditional high-contrast graphite realism and raw tattoo work to hybrid human-neural AI synthesis and intricate 3D miniature painting.",
      href: "/art",
      accent: "orange",
      tag: "DARK & MYSTICAL",
    },
    {
      title: "AI Projects",
      description: "Exploring the boundary where neural architectures meet creative tooling. Synthesizing models, texturing workflows, and generative pipelines.",
      href: "/projects",
      accent: "cyan",
      tag: "DIGITAL & FRONTIER",
    },
    {
      title: "Process Improvement",
      description: "Applying DMAIC, lean mechanics, and systematic optimization to creative and organizational workflows. Continuous improvement as a philosophy.",
      href: "/projects",
      accent: "purple",
      tag: "STRUCTURED & SHARP",
    }
  ];

  return (
    <>
      {/* Full-Page Cinematic Background with Parallax */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
            willChange: 'transform'
          }}
        >
          <img 
            src="/hero-banner.png" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover object-center scale-105"
          />
        </div>
        {/* Cinematic gradient overlays & vignette to blend and guarantee text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/65 via-obsidian-950/85 to-obsidian-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,#050506_90%)] opacity-95" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-20 relative z-10">
        
        {/* Unboxed Hero Section floating organically over the parallax background */}
        <section className="flex flex-col items-center text-center justify-center min-h-[50vh] gap-8 max-w-4xl mx-auto relative py-12 md:py-20">
          {/* Subtle backing purple glow to lift the text off the dark stone texture */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-accent-purple/5 blur-[90px] rounded-full pointer-events-none -z-10" />

          {/* Subtle decorative crest/emblem placeholder */}
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mb-2" />
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 uppercase drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)]">
            Patrik von Porat
          </h1>
          
          <p className="text-sm md:text-lg font-gothic tracking-widest uppercase text-accent-purple flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span>Guitarist</span> 
            <span className="text-zinc-600">&middot;</span> 
            <span>Artist</span> 
            <span className="text-zinc-600">&middot;</span> 
            <span>Creator</span> 
            <span className="text-zinc-600">&middot;</span> 
            <span className="text-accent-cyan">Process Improvement Nerd</span>
          </p>
          
          <p className="text-base md:text-lg leading-8 text-zinc-400 font-light max-w-2xl mt-4">
            A creative hub where raw gothic-metal aesthetics meet precise systems thinking. 
            Exploring the synergy between guitar orchestration, dark traditional art, 
            generative AI frontiers, and continuous workflow optimization.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
            <Link 
              href="/projects" 
              className="px-8 py-4 rounded-md bg-white text-black font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:bg-transparent hover:text-white border border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] text-center"
            >
              Explore Projects
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-md bg-transparent text-white font-semibold uppercase tracking-wider text-sm border border-zinc-700 transition-all duration-300 hover:border-accent-purple hover:text-accent-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] text-center"
            >
              Contact
            </Link>
          </div>
          
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-8" />
        </section>

        {/* Feature Cards Grid */}
        <section className="flex flex-col gap-12 relative z-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <h2 className="text-3xl font-bold uppercase tracking-wider text-white">Creative Columns</h2>
            <div className="w-16 h-[2px] bg-accent-orange" />
            <p className="text-sm text-zinc-500 max-w-md mt-2">Click below to venture deeper into each specialized medium.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <Link key={idx} href={cat.href} className="group block h-full">
                <GlassCard accent={cat.accent} className="h-full flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] font-bold text-zinc-500 uppercase block mb-3 font-mono">
                      {cat.tag}
                    </span>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300 mb-4">
                      {cat.title}
                    </h3>
                    <p className="text-sm leading-6 text-zinc-400 font-light">
                      {cat.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-8 text-xs font-semibold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-300">
                    <span>Enter Segment</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
        
      </div>
    </>
  );
}
