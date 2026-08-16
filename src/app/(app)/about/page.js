import React from 'react';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "About | Patrik von Porat",
  description: "The systems, philosophies, and dual-world creative life of Patrik von Porat — combining heavy metal orchestration, dark traditional art, and Six Sigma workflow systems.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About Patrik von Porat",
    description: "The systems, philosophies, and dual-world creative life of Patrik von Porat — combining heavy metal orchestration, dark traditional art, and Six Sigma workflow systems.",
    url: 'https://vonporat.com/about',
  }
};

export default function About() {
  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-10 md:gap-14 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-2.5 max-w-2xl mx-auto">
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-medium">The Human Element</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic">About Patrik</h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
      </div>

      {/* Main Biography Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-2 relative z-10">
        
        {/* Short details / Quotes (4 columns) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Cinematic Guitar Portrait */}
          <div className="w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl relative group hover:border-accent-purple/40 transition-premium">
            <Image 
              src="/images/patrik_portrait.webp" 
              alt="Patrik von Porat Portrait" 
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          <GlassCard accent="purple" className="p-5 md:p-6 flex flex-col gap-3.5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-semibold">CORE DUALITY</span>
            <p className="font-gothic text-2xl italic text-white leading-9">
              &ldquo;Structure gives chaos room to breathe; art gives discipline a soul.&rdquo;
            </p>
            <div className="h-[1px] w-full bg-white/5 my-1" />
            <div className="flex flex-col gap-2 text-xs md:text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-400 uppercase font-medium">Origins</span>
                <span className="text-zinc-200">Sweden</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 uppercase font-medium">Primary Guitars</span>
                <span className="text-zinc-200">Caparison Guitars</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 uppercase font-medium">Optimization</span>
                <span className="text-zinc-200">Lean Six Sigma / DMAIC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 uppercase font-medium">Visual Medium</span>
                <span className="text-zinc-200">Graphite &amp; Digital Neural</span>
              </div>
            </div>
          </GlassCard>

          {/* Quick list of traits */}
          <div className="flex flex-col gap-2.5 bg-zinc-950/60 border border-white/[0.08] rounded-xl p-5 md:p-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan font-semibold">Philosophy of Process</h3>
            <p className="text-xs md:text-sm leading-relaxed text-zinc-300 font-light">
              We often treat art as pure inspiration and logic as cold mechanics. But true mastery is systematic: setting up clean pipelines for asset organization or practicing alternate picking with metronome intervals at 0.5% increments. Continuous improvement is simply art in a structured container.
            </p>
          </div>
        </div>

        {/* Extended Biography (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-6 leading-relaxed md:leading-9 text-zinc-300 font-light text-base md:text-lg">
          <div className="flex flex-col gap-5">
            <p className="first-letter:text-6xl first-letter:font-extrabold first-letter:text-accent-purple first-letter:mr-3 first-letter:float-left first-letter:font-gothic leading-relaxed md:leading-9">
              I am a guitarist, visual artist, and systems-minded creator. My work moves between heavy metal, dark visual art, AI-assisted experimentation, and a deep interest in structure, workflows, and continuous improvement.
            </p>

            <p>
              By day, I work with processes and practical improvement. I am a certified Lean Six Sigma Green Belt, and I am genuinely interested in how data, structure, and clear workflows can make complex work easier to understand. I like turning scattered ideas, unclear routines, or inefficient processes into something more visual, organized, and useful.
            </p>

            <p>
              By night, that same mindset carries into my creative work. I write music, record guitars, build concepts for projects like <span className="text-white font-medium">Realmforged</span> and <span className="text-white font-medium">Ashwrithe</span>, draw in graphite, explore tattoo design, paint miniatures, and experiment with AI-generated visuals. The tools may change, but the core motivation stays the same: to create, refine, and keep improving.
            </p>

            <p>
              For me, creativity and structure belong together. A song, a drawing, a website, a release plan, or a process map all start as something messy. The challenge &mdash; and the fun &mdash; is shaping it into something that feels intentional.
            </p>
          </div>

          {/* Duality grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="border-l-2 border-accent-purple pl-4 flex flex-col gap-1.5">
              <span className="text-xs md:text-sm font-mono uppercase text-accent-purple tracking-widest font-semibold">The Creative Half</span>
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                Driven by dark, gothic atmospheres, epic power metal speed, heavy blackwork linework, and classical mythological compositions.
              </p>
            </div>
            
            <div className="border-l-2 border-accent-cyan pl-4 flex flex-col gap-1.5">
              <span className="text-xs md:text-sm font-mono uppercase text-accent-cyan tracking-widest font-semibold">The Analytical Half</span>
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                Driven by structural mapping, databases, performance statistics, workflow optimization, and clean utility automation.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Creative Operating System Section */}
      <div className="flex flex-col gap-6 mt-6 pt-8 border-t border-white/5 relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase font-semibold">Capabilities in Context</span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic">Creative Operating System</h2>
          <p className="text-base text-zinc-300 font-light leading-relaxed max-w-xl">
            A curated stack of tools and methods I use to turn creative chaos into music, visuals, websites and structured systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Music & Audio",
              accent: "purple",
              skills: ["Guitar", "Pro Tools", "Kemper", "Songwriting", "Recording", "MIDI Programming"]
            },
            {
              title: "Visual Art",
              accent: "purple",
              skills: ["Graphite Drawing", "Tattoo Design", "Photoshop", "AI Image Workflows", "Miniature Painting", "3D Printing"]
            },
            {
              title: "Systems & Data",
              accent: "cyan",
              skills: ["Power BI", "Excel", "Lean Six Sigma Green Belt", "DMAIC", "Process Mapping", "Workflow Optimization"]
            },
            {
              title: "Web & AI",
              accent: "cyan",
              skills: ["Payload CMS", "Supabase", "Vercel", "Next.js", "ComfyUI", "AI-Assisted Coding"]
            }
          ].map((group, idx) => {
            const isPurple = group.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple font-semibold' : 'text-accent-cyan font-semibold';
            const hoverBorderClass = isPurple ? 'hover:border-accent-purple/40' : 'hover:border-accent-cyan/40';
            return (
              <GlassCard key={idx} accent={group.accent} className="p-5 md:p-6 flex flex-col gap-3">
                <span className={`text-sm md:text-base font-mono uppercase tracking-wider ${accentClass}`}>
                  {group.title}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className={`text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 uppercase tracking-wider transition-all duration-300 ${hoverBorderClass} hover:text-white`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

    </div>
  );
}
