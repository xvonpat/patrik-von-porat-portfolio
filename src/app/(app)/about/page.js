import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "About | Patrik von Porat",
  description: "Creative work, structured thinking, and the process connecting them — guitarist, visual artist and systems-minded creator based in Sweden.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About Patrik von Porat",
    description: "Creative work, structured thinking, and the process connecting them — guitarist, visual artist and systems-minded creator based in Sweden.",
    url: 'https://vonporat.com/about',
  }
};

export default function About() {
  const processSteps = [
    {
      num: "01",
      title: "OBSERVE",
      desc: "Find the pattern, tension or possibility.",
      accent: "purple"
    },
    {
      num: "02",
      title: "STRUCTURE",
      desc: "Give the idea constraints, hierarchy and direction.",
      accent: "purple"
    },
    {
      num: "03",
      title: "CREATE",
      desc: "Turn the concept into sound, image or system.",
      accent: "cyan"
    },
    {
      num: "04",
      title: "REFINE",
      desc: "Remove noise and strengthen what remains.",
      accent: "cyan"
    }
  ];

  const capabilityAreas = [
    {
      title: "Music & Audio",
      accent: "purple",
      desc: "Composition, guitar, bass, orchestration, recording and production.",
      skills: ["Guitar", "Bass", "Songwriting", "Orchestration", "Pro Tools", "Recording"]
    },
    {
      title: "Visual Art",
      accent: "purple",
      desc: "Graphite drawing, tattoo practice, miniatures and visual development.",
      skills: ["Graphite", "Tattoo Design", "Miniatures", "Photoshop", "Visual Concepts"]
    },
    {
      title: "Systems & Improvement",
      accent: "cyan",
      desc: "Process design, continuous improvement and clearer decisions through data.",
      skills: ["Lean Six Sigma", "DMAIC", "Process Design", "Power BI", "Excel"]
    },
    {
      title: "Web & AI",
      accent: "cyan",
      desc: "Creative web direction, structured content and AI-assisted visual workflows.",
      skills: ["Next.js", "Payload CMS", "Supabase", "Vercel", "AI Workflows"]
    }
  ];

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-14 md:gap-20 relative z-10">
      
      {/* 1. Page Introduction */}
      <div className="flex flex-col items-center text-center gap-2.5 max-w-2xl mx-auto">
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-medium">
          Behind the Work
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic">
          About Patrik
        </h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1 mb-1" />
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed md:leading-8 max-w-lg">
          Creative work, structured thinking, and the process connecting them.
        </p>
      </div>

      {/* 2. Portrait and Biography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
        
        {/* Left Column: Portrait and Unboxed Fact List */}
        <div className="lg:col-span-5 flex flex-col gap-6 max-w-[360px] sm:max-w-[400px] lg:max-w-none mx-auto lg:mx-0 w-full">
          {/* Substantial, Balanced Portrait */}
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl relative group hover:border-accent-purple/40 transition-premium">
            <Image 
              src="/images/patrik_portrait.webp" 
              alt="Patrik von Porat Portrait" 
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Simple Unboxed Fact List */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 pt-3 border-t border-white/5 font-mono">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Based in
              </span>
              <span className="text-sm md:text-[15px] text-zinc-200 font-medium">
                Sweden
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Playing Guitar
              </span>
              <span className="text-sm md:text-[15px] text-zinc-200 font-medium">
                35+ years
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Process
              </span>
              <span className="text-xs sm:text-sm md:text-[15px] text-zinc-200 font-medium leading-snug">
                Lean Six Sigma Green Belt
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                Current Projects
              </span>
              <span className="text-xs sm:text-sm md:text-[15px] text-zinc-200 font-medium leading-snug">
                Realmforged &amp; Ashwrithe
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Biography */}
        <div className="lg:col-span-7 flex flex-col gap-5 justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white font-gothic tracking-tight leading-snug">
            Different disciplines. One underlying process.
          </h2>
          
          <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed md:leading-8 text-zinc-300 font-light">
            <p>
              I’m a guitarist, visual artist and systems-minded creator based in Sweden. My work moves between heavy music, dark visual art and practical systems—fields that may appear separate, but all begin with something unformed that needs direction.
            </p>

            <p>
              Music has been the constant for more than three decades. I write, record and shape the worlds around projects such as Realmforged and Ashwrithe, from guitars and orchestration to visual identity and release structure.
            </p>

            <p>
              Away from music, I work with graphite, tattoo practice, miniatures and AI-assisted visual experimentation. Professionally, I use Lean Six Sigma, data and process improvement to make complex work clearer, more reliable and easier to navigate.
            </p>

            <p>
              Whether I am building a song, an image, a website or a workflow, the process is much the same: observe what is there, find the structure, create with intent and refine until it holds together.
            </p>
          </div>
        </div>

      </section>

      {/* 3. Process Section */}
      <section className="flex flex-col gap-7 pt-10 border-t border-white/5 relative z-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            How I Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic">
            From ambiguity to intention.
          </h2>
          <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">
            &ldquo;I move between creative instinct and structured thinking rather than treating them as opposites.&rdquo;
          </p>
        </div>

        {/* 4 Connected Stages: Horizontal on desktop, cleanly stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {processSteps.map((step, idx) => {
            const isPurple = step.accent === 'purple';
            return (
              <div 
                key={idx}
                className="p-5 md:p-6 rounded-xl bg-obsidian-950/60 border border-white/[0.08] flex flex-col gap-3 group hover:border-white/20 transition-premium relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tracking-widest ${isPurple ? 'text-accent-purple' : 'text-accent-cyan'}`}>
                    {step.num}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-accent-purple' : 'bg-accent-cyan'}`} />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-white font-gothic tracking-wide">
                  {step.title}
                </h3>
                
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Creative Operating System */}
      <section className="flex flex-col gap-7 pt-10 border-t border-white/5 relative z-10">
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-cyan uppercase font-semibold">
            Capabilities in Context
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic">
            Creative Operating System
          </h2>
          <p className="text-base text-zinc-300 font-light leading-relaxed">
            Four connected areas of practice, supported by a practical and evolving toolset.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilityAreas.map((group, idx) => {
            const isPurple = group.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple font-semibold' : 'text-accent-cyan font-semibold';
            const hoverBorderClass = isPurple ? 'hover:border-accent-purple/40' : 'hover:border-accent-cyan/40';
            
            return (
              <GlassCard key={idx} accent={group.accent} className="p-5 md:p-6 flex flex-col justify-between gap-4 h-full">
                <div className="flex flex-col gap-2.5">
                  <span className={`text-sm md:text-base font-mono uppercase tracking-wider ${accentClass}`}>
                    {group.title}
                  </span>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {group.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
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
      </section>

      {/* 5. Closing Navigation */}
      <section className="flex flex-col items-center text-center gap-5 pt-8 pb-4 border-t border-white/5 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white font-gothic tracking-tight">
          Continue exploring.
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-purple/50 backdrop-blur-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-premium flex items-center gap-2"
          >
            <span>Explore Selected Work</span>
            <span className="text-accent-purple">&rarr;</span>
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/10 hover:border-white/30 transition-premium flex items-center gap-2"
          >
            <span>Read the Journal</span>
            <span className="text-zinc-400">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
