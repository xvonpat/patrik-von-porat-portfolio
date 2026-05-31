import React from 'react';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "About | Patrik von Porat",
  description: "The systems, philosophies, and dual-world creative life of Patrik von Porat — combining heavy metal orchestration, dark traditional art, and Six Sigma workflow systems.",
  openGraph: {
    title: "About Patrik von Porat",
    description: "The systems, philosophies, and dual-world creative life of Patrik von Porat — combining heavy metal orchestration, dark traditional art, and Six Sigma workflow systems.",
    url: 'https://vonporat.com/about',
  }
};

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-12 relative">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase">The Human Element</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">About Patrik</h1>
        <div className="w-16 h-[2px] bg-accent-purple mt-2" />
      </div>

      {/* Main Biography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 relative z-10">
        
        {/* Short details / Quotes (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Cinematic Guitar Portrait */}
          <div className="w-full aspect-[2/3] rounded-lg overflow-hidden border border-white/5 shadow-2xl relative group hover:border-accent-purple/30 transition-premium">
            <img 
              src="/images/avatar/IMG_1360-2.jpg" 
              alt="Patrik von Porat" 
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          <GlassCard accent="purple" className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CORE DUALITY</span>
            <p className="font-gothic text-xl italic text-white leading-8">
              "Structure gives chaos room to breathe; art gives discipline a soul."
            </p>
            <div className="h-[1px] w-full bg-white/5 my-2" />
            <div className="flex flex-col gap-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Origins</span>
                <span className="text-zinc-300">Sweden</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Primary Guitars</span>
                <span className="text-zinc-300">7 & 8-String Custom</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Optimization Framework</span>
                <span className="text-zinc-300">Lean Six Sigma / DMAIC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500 uppercase">Visual Medium</span>
                <span className="text-zinc-300">Graphite & Digital Neural</span>
              </div>
            </div>
          </GlassCard>

          {/* Quick list of traits */}
          <div className="flex flex-col gap-4 bg-zinc-950/40 border border-white/5 rounded-lg p-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-orange">Philosophy of Process</h3>
            <p className="text-xs leading-5 text-zinc-400 font-light">
              We often treat art as pure inspiration and logic as cold mechanics. But true mastery is systematic: setting up clean pipelines for asset organization or practicing alternate picking with metronome intervals at 0.5% increments. Continuous improvement is simply art in a structured container.
            </p>
          </div>
        </div>

        {/* Extended Biography (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-8 leading-7 text-zinc-300 font-light text-sm md:text-base">
          <div className="flex flex-col gap-6">
            <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-accent-purple first-letter:mr-3 first-letter:float-left first-letter:font-gothic">
              I am a guitarist, visual artist, and systems-minded creator. My work moves between heavy metal, dark visual art, AI-assisted experimentation, and a deep interest in structure, workflows, and continuous improvement.
            </p>

            <p>
              By day, I work with processes and practical improvement. I am a certified Lean Six Sigma Green Belt, and I am genuinely interested in how data, structure, and clear workflows can make complex work easier to understand. I like turning scattered ideas, unclear routines, or inefficient processes into something more visual, organized, and useful.
            </p>

            <p>
              By night, that same mindset carries into my creative work. I write music, record guitars, build concepts for projects like <span className="text-white font-normal">Realmforged</span> and <span className="text-white font-normal">Ashwrithe</span>, draw in graphite, explore tattoo design, paint miniatures, and experiment with AI-generated visuals. The tools may change, but the core motivation stays the same: to create, refine, and keep improving.
            </p>

            <p>
              For me, creativity and structure belong together. A song, a drawing, a website, a release plan, or a process map all start as something messy. The challenge — and the fun — is shaping it into something that feels intentional.
            </p>
          </div>

          {/* Duality grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="border-l-2 border-accent-purple pl-4 flex flex-col gap-1">
              <span className="text-xs font-mono uppercase text-accent-purple tracking-widest">The Creative Half</span>
              <p className="text-sm text-zinc-400">
                Driven by dark, gothic atmospheres, epic power metal speed, heavy blackwork linework, and classical mythological compositions.
              </p>
            </div>
            
            <div className="border-l-2 border-accent-cyan pl-4 flex flex-col gap-1">
              <span className="text-xs font-mono uppercase text-accent-cyan tracking-widest">The Analytical Half</span>
              <p className="text-sm text-zinc-400">
                Driven by structural mapping, databases, performance statistics, workflow optimization, and clean utility automation.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
