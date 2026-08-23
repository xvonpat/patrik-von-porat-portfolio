import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "About | Patrik von Porat",
  description: "Guitarist, visual artist and systems-minded creator based in Sweden. The motivation, process and way of thinking behind the work.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About | Patrik von Porat",
    description: "Guitarist, visual artist and systems-minded creator based in Sweden. The motivation, process and way of thinking behind the work.",
    url: 'https://vonporat.com/about',
  }
};

export default function About() {
  const verifiedFacts = [
    { label: "BASED IN", value: "Sweden" },
    { label: "PLAYING GUITAR", value: "35+ years" },
    { label: "PROCESS", value: "Lean Six Sigma Green Belt" },
    { label: "CURRENT PROJECTS", value: "Realmforged & Ashwrithe" },
  ];

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
      title: "MUSIC & AUDIO",
      accent: "purple",
      desc: "Composition, guitar, arrangement, recording and the development of connected musical worlds.",
      tags: ["Guitar", "Songwriting", "Arrangement", "Orchestration", "Audio Production"]
    },
    {
      title: "VISUAL PRACTICE",
      accent: "purple",
      desc: "Graphite, charcoal, tattoo studies, miniatures and digital experimentation grounded in observation and repeated practice.",
      tags: ["Drawing", "Tattoo Practice", "Miniatures", "Physical Craft", "Digital Studies"]
    },
    {
      title: "SYSTEMS & IMPROVEMENT",
      accent: "cyan",
      desc: "Structured problem-solving, process design and data-supported improvement used to make complex work clearer and more reliable.",
      tags: ["Lean Six Sigma", "DMAIC", "Process Mapping", "Power BI", "Workflow Design"]
    },
    {
      title: "WEB & DIGITAL SYSTEMS",
      accent: "cyan",
      desc: "Content architecture, visual direction and connected publishing systems for creative projects and personal platforms.",
      tags: ["Next.js", "Payload CMS", "Supabase", "Vercel", "AI-Assisted Workflows"]
    }
  ];

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-16 md:gap-24 relative z-10">
      
      {/* 1. Page Hero */}
      <section className="flex flex-col items-center text-center justify-center gap-4 max-w-4xl mx-auto relative pt-4 pb-2 md:pt-8 md:pb-4">
        {/* Ambient subtle glow backdrop */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-accent-purple/8 blur-[110px] rounded-full pointer-events-none -z-10" />

        <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
          ABOUT
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-gothic text-balance">
          The work changes. The underlying impulse does not.
        </h1>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-0.5 mb-0.5" />

        <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 text-balance text-pretty">
          I am Patrik von Porat—a guitarist, visual artist and systems-minded creator based in Sweden. Across music, images and digital work, I am drawn to the same challenge: taking something unformed and giving it clarity, character and structure.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Explore Selected Work
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* 2. Personal Background Section - Refined Spacious 2-Column + Facts Band */}
      <section className="flex flex-col gap-8 md:gap-10 pt-4 border-t border-white/5">
        
        {/* Section Introduction */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            BACKGROUND
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-gothic tracking-tight text-balance">
            One practice, developed through different disciplines.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
        </div>

        {/* Main Content Row: Narrative (~60%) + Portrait (~35%) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="md:col-span-7 lg:col-span-7 flex flex-col gap-4 text-base md:text-[17px] leading-relaxed md:leading-8 text-zinc-300 font-light">
            <p className="text-pretty">
              Music has been the constant for more than three decades. It taught me to listen for tension, recognise patterns, build arrangements and keep refining until the parts support a coherent whole.
            </p>
            <p className="text-pretty">
              Visual practice asks for the same attention in a different form. Drawing, tattoo studies and physical craft have made observation, control, repetition and material feedback more immediate.
            </p>
            <p className="text-pretty">
              My professional work in operations and continuous improvement added another perspective: how to understand complex systems, identify what matters and make processes clearer and more reliable.
            </p>
            <p className="text-pretty">
              Over time, these stopped feeling like separate interests. They became different applications of the same way of thinking.
            </p>
          </div>

          {/* Portrait Column */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center md:justify-end">
            <div className="w-full max-w-[340px] md:max-w-[380px] aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.6)] group hover:border-accent-purple/40 transition-all duration-500">
              <Image 
                src="/images/patrik_portrait.webp" 
                alt="Portrait of Patrik von Porat" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 380px"
                className="w-full h-full object-cover object-top grayscale transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Core Facts Row: Horizontal Facts Band spanning section width */}
        <div className="w-full rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-5 md:p-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x-0 divide-white/5">
            {verifiedFacts.map((fact, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-1.5 font-mono ${
                  idx > 0 ? 'pt-4 sm:pt-0 sm:pl-0 lg:pl-6 lg:border-l lg:border-white/5' : ''
                }`}
              >
                <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-purple/80" />
                  {fact.label}
                </span>
                <span className="text-sm md:text-base text-zinc-100 font-medium font-sans pl-3.5">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 3. Motivation / Why Section */}
      <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto pt-6 border-t border-white/5">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
          WHAT CONNECTS THE WORK
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          I am drawn to the moment when something vague begins to take form.
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
        <div className="flex flex-col gap-5 text-base md:text-lg text-zinc-300 font-light leading-relaxed md:leading-8 text-pretty">
          <p>
            A riff, a drawing, a visual identity, a website or a workflow may begin in different ways, but each starts with uncertainty. What interests me is finding the pattern within it—then developing that pattern until the result feels deliberate and holds together.
          </p>
          <p className="text-lg md:text-xl text-white font-medium italic border-l-2 sm:border-l-0 sm:border-y border-accent-purple/30 py-3 sm:py-4 px-4 bg-obsidian-950/40 rounded-lg sm:rounded-none">
            Structure does not replace instinct. It gives instinct somewhere to go.
          </p>
        </div>
      </section>

      {/* 4. How I Work Section */}
      <section className="flex flex-col gap-8 pt-6 border-t border-white/5">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl md:max-w-4xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            HOW I WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            From ambiguity to intention.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-3xl md:max-w-4xl leading-relaxed md:leading-8 mt-1 text-pretty">
            I move between creative instinct and structured thinking rather than treating them as opposites.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {processSteps.map((step, idx) => {
            const isPurple = step.accent === 'purple';
            return (
              <GlassCard 
                key={idx} 
                accent={step.accent}
                className="p-5 md:p-6 flex flex-col gap-3 group"
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
                
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 5. Where the Approach Appears (Capabilities in Context) */}
      <section className="flex flex-col gap-8 pt-6 border-t border-white/5">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase font-semibold">
            CAPABILITIES IN CONTEXT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            One way of thinking, applied across four areas.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            The tools change with the material. The underlying approach remains observation, structure, creation and refinement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {capabilityAreas.map((group, idx) => {
            const isPurple = group.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple font-semibold' : 'text-accent-cyan font-semibold';
            const tagBorderHover = isPurple ? 'hover:border-accent-purple/40' : 'hover:border-accent-cyan/40';
            
            return (
              <GlassCard key={idx} accent={group.accent} className="p-5 md:p-6 flex flex-col justify-between gap-4 group">
                <div className="flex flex-col gap-2.5">
                  <span className={`text-xs md:text-sm font-mono uppercase tracking-wider ${accentClass}`}>
                    {group.title}
                  </span>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                    {group.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {group.tags.map((tag, sIdx) => (
                    <span 
                      key={sIdx} 
                      className={`text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 tracking-wider transition-all duration-300 ${tagBorderHover} hover:text-white`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 6. Current Chapter Section */}
      <section className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto pt-6 border-t border-white/5">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
          CURRENT CHAPTER
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          Still building. Still learning.
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed md:leading-8 text-pretty">
          My current focus moves between Realmforged, Ashwrithe, traditional drawing, tattoo practice and the continued development of this creative hub. Each project offers a different material, constraint and reason to keep refining the process.
        </p>
      </section>

      {/* 7. Closing CTA */}
      <section className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto py-6 border-t border-white/5">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          See how the thinking becomes work.
        </h2>
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-balance text-pretty">
          Explore the projects, music, images and systems developed through this approach.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 mt-2 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Explore Selected Work
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
