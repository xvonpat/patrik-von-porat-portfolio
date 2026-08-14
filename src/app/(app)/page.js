import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config.ts';

export const revalidate = 60;

export default async function Home() {
  // Gracefully fetch latest published blog posts from Payload CMS
  let latestPosts = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: 3,
    });
    latestPosts = result?.docs || [];
  } catch (error) {
    console.error('Failed to fetch latest posts for homepage:', error);
    latestPosts = [];
  }

  const proofCards = [
    {
      title: 'Realmforged',
      category: 'Music & Worldbuilding',
      status: 'Active · In Production',
      role: 'Songwriter, Lead Guitars & Orchestration',
      description: 'A cinematic power metal project built around dark fantasy storytelling, neoclassical lead guitar work, and symphonic choir arrangements.',
      proof: 'Debut album in production, featuring original compositions, lore worldbuilding, and dedicated project platform.',
      link: '/music',
      ctaText: 'Explore Music',
      accent: 'purple'
    },
    {
      title: 'Ashwrithe',
      category: 'Extreme Metal Project',
      status: 'Active · Live Site',
      role: 'Guitars, Co-Composition & Visual Direction',
      description: 'An atmospheric extreme metal project shaped by frostbitten melodies, soot-black atmosphere, crushing guitars, and ritualistic darkness.',
      proof: 'Live website (ashwrithe.com), visual identity, and debut material currently in active production.',
      link: '/music',
      ctaText: 'Explore Music',
      accent: 'purple'
    },
    {
      title: 'Graphite Practice',
      category: 'Traditional Visual Craft',
      status: 'Active Practice',
      role: 'Graphite Artist',
      description: 'High-contrast dark realism, pencil portraits, and mythological anatomy studies exploring shadow and light falloff.',
      proof: 'Physical studies and traditional drawing practice providing a tactile counterweight to digital workflows.',
      link: '/art',
      ctaText: 'View Artwork',
      accent: 'purple'
    },
    {
      title: 'Tattoo Practice',
      category: 'Visual Craft & Technique',
      status: 'Active Practice',
      role: 'Tattoo Apprentice / Practitioner',
      description: 'Honing precision linework, pepper shading, whip shading, and dark-art ornamental iconography on synthetic Reelskin.',
      proof: 'Structured black-and-grey flash development, needle control exercises, and continuous technical refinement.',
      link: '/art',
      ctaText: 'View Practice',
      accent: 'purple'
    },
    {
      title: 'Power BI & Process Systems',
      category: 'Analytics & Improvement',
      status: 'Continuous Practice',
      role: 'Lean Six Sigma Green Belt',
      description: 'Structured problem-solving with DMAIC, interactive operational dashboards, process mapping, and workflow optimization.',
      proof: 'Professional background in warehouse operations, distribution logistics, and data-backed continuous improvement.',
      link: '/about',
      ctaText: 'Read Philosophy',
      accent: 'cyan'
    },
    {
      title: 'vonporat.com',
      category: 'Digital Creative Hub',
      status: 'Live & Evolving',
      role: 'Architect, Designer & Creator',
      description: 'A unified personal creative hub connecting music releases, visual galleries, editorial writing, and systems thinking.',
      proof: 'Engineered with Next.js App Router, Payload CMS, Supabase PostgreSQL, and automated publishing pipelines.',
      link: '/about',
      ctaText: 'View Architecture',
      accent: 'cyan'
    }
  ];

  const operatingModes = [
    {
      title: 'Music & Sound',
      accent: 'purple',
      description: 'Composition, twin-lead arrangement, and studio audio engineering.',
      skills: ['Lead Guitar', 'Songwriting', 'Pro Tools', 'Kemper Profiling', 'MIDI Orchestration', 'Audio Production']
    },
    {
      title: 'Visual Craft',
      accent: 'purple',
      description: 'Traditional drawing, ink discipline, and physical figure modeling.',
      skills: ['Graphite Drawing', 'Tattoo Practice', 'Photoshop', 'ComfyUI & Generative', '3D Resin Printing', 'Miniature Painting']
    },
    {
      title: 'Digital Systems',
      accent: 'cyan',
      description: 'Modern web architectures and connected publishing tools.',
      skills: ['Next.js App Router', 'Payload CMS', 'Supabase / Postgres', 'Vercel Deployment', 'Content Architecture', 'AI-Assisted Coding']
    },
    {
      title: 'Improvement & Insight',
      accent: 'cyan',
      description: 'Lean methodologies and data-driven operational analysis.',
      skills: ['Lean Six Sigma Green Belt', 'DMAIC Framework', 'Power BI Dashboards', 'Process Mapping', 'Root Cause Analysis', 'Workflow Design']
    }
  ];

  const processSteps = [
    {
      number: '01',
      name: 'Observe',
      desc: 'Study the subject, operational bottleneck, sonic reference, environment, or desired aesthetic mood.'
    },
    {
      number: '02',
      name: 'Structure',
      desc: 'Identify underlying patterns, constraints, relationships, and establish a workable architectural direction.'
    },
    {
      number: '03',
      name: 'Create',
      desc: 'Turn the framework into music arrangements, graphite imagery, software pipelines, or operational dashboards.'
    },
    {
      number: '04',
      name: 'Refine',
      desc: 'Review, test against reality, remove excess complexity, and iterate toward durable precision.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-28 md:gap-36 relative z-10">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center justify-center min-h-[50vh] gap-8 max-w-4xl mx-auto relative py-12 md:py-20">
        {/* Subtle backing purple glow */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-accent-purple/5 blur-[90px] rounded-full pointer-events-none -z-10" />

        {/* Tagline / Eyebrow */}
        <p className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-zinc-500">
          Creative Work &amp; Structured Thinking
        </p>
        
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white font-gothic drop-shadow-sm select-none">
          Patrik von Porat
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-gothic tracking-widest uppercase text-accent-purple max-w-2xl text-center">
          Guitarist, visual artist and systems-minded creator
        </p>
        
        {/* Supporting Copy */}
        <p className="text-base md:text-lg leading-8 text-zinc-400 font-light max-w-2xl mt-4">
          I build music, images and digital systems &mdash; connecting heavy metal, dark aesthetics, traditional craft and structured continuous improvement.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <a 
            href="#selected-work" 
            className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-sm border border-white/20 hover:border-white/35 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Explore Selected Work
          </a>
          <Link 
            href="/blog" 
            className="px-8 py-4 rounded-full bg-zinc-950/45 hover:bg-zinc-900/50 text-white font-semibold uppercase tracking-wider text-sm border border-zinc-800 hover:border-accent-purple/35 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Read Journal
          </Link>
        </div>
        
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-8" />
      </section>

      {/* 2. SHORT INTRODUCTION */}
      <section className="max-w-4xl mx-auto w-full text-center flex flex-col items-center gap-6">
        <span className="text-[10px] font-mono tracking-[0.3em] text-accent-purple uppercase">Orientation</span>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">
          One identity, many expressions.
        </h2>
        <p className="text-sm md:text-base leading-7 md:leading-8 text-zinc-400 font-light max-w-2xl">
          This site is a living index of selected work, active projects and the processes behind them &mdash; from metal composition and traditional graphite drawing to tattoo practice, digital architectures and continuous process improvement.
        </p>
      </section>

      {/* 3. CREATIVE PILLARS SECTION */}
      <section className="flex flex-col gap-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">Core Ecosystem</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic">Creative Pillars</h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Music */}
          <GlassCard accent="purple" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 01</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Music</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                Symphonic power metal orchestration, twin lead guitar work, and release tracking for Realmforged and Ashwrithe.
              </p>
            </div>
            <Link 
              href="/music" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-purple group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Explore Music &rarr;
            </Link>
          </GlassCard>

          {/* Pillar 2: Visual Art */}
          <GlassCard accent="purple" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 02</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Visual Art</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                A gallery of traditional graphite drawings, custom synthetic skin tattoo flashes, and digital neural syntheses.
              </p>
            </div>
            <Link 
              href="/art" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-purple group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Explore Art &rarr;
            </Link>
          </GlassCard>

          {/* Pillar 3: Projects & Systems */}
          <GlassCard accent="cyan" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 03</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Projects</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                Dedicated project websites, custom CMS schemas, and structured continuous improvement frameworks.
              </p>
            </div>
            <a 
              href="#selected-work" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              View Proof &rarr;
            </a>
          </GlassCard>

          {/* Pillar 4: Blog */}
          <GlassCard accent="purple" className="flex flex-col justify-between h-full group">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.25em] text-zinc-500 uppercase mb-2">Pillar 04</span>
              <h3 className="text-xl font-semibold tracking-tight text-white font-gothic mb-3">Journal</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                Chronicles and build logs detailing workflow optimization, creative craft, and behind-the-scenes insights.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="text-[10px] font-mono uppercase tracking-widest text-accent-purple group-hover:text-white transition-colors flex items-center gap-1 mt-6"
            >
              Read Journal &rarr;
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* 4. SELECTED WORK / PROOF CARDS */}
      <section id="selected-work" className="flex flex-col gap-12 max-w-6xl mx-auto w-full scroll-mt-28">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-accent-purple uppercase">Concrete Proof</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic">Selected Work</h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-2" />
          <p className="text-xs md:text-sm text-zinc-400 font-light max-w-xl mt-2">
            A selection of active projects, creative craft and systems I have built or shaped.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofCards.map((card, idx) => {
            const isPurple = card.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';
            return (
              <GlassCard key={idx} accent={card.accent} className="flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{card.category}</span>
                    <span className={`text-[9px] font-mono uppercase tracking-wider ${accentClass}`}>{card.status}</span>
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight text-white font-gothic">{card.title}</h3>
                  <p className="text-[11px] font-mono text-zinc-400 leading-snug"><span className="text-zinc-500">Role:</span> {card.role}</p>
                  
                  <p className="text-xs text-zinc-400 font-light leading-relaxed mt-1">
                    {card.description}
                  </p>

                  <div className="bg-obsidian-950/60 rounded p-3 border border-white/5 mt-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Proof / State</span>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed">
                      {card.proof}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                  <Link 
                    href={card.link}
                    className={`text-[10px] font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1`}
                  >
                    {card.ctaText} &rarr;
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 5. CREATIVE OPERATING SYSTEM */}
      <section className="flex flex-col gap-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-accent-cyan uppercase">Capabilities in Context</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic">Creative Operating System</h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent mt-2" />
          <p className="text-xs md:text-sm text-zinc-400 font-light max-w-xl mt-2">
            A structured breakdown of tools and methods used to turn creative ideas into refined reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {operatingModes.map((mode, idx) => {
            const isPurple = mode.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';
            const hoverBorder = isPurple ? 'hover:border-accent-purple/30' : 'hover:border-accent-cyan/30';
            return (
              <GlassCard key={idx} accent={mode.accent} className="flex flex-col justify-between h-full group p-6">
                <div className="flex flex-col gap-3">
                  <span className={`text-xs font-mono uppercase tracking-widest ${accentClass} font-semibold`}>
                    {mode.title}
                  </span>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {mode.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mode.skills.map((skill, sIdx) => (
                      <span 
                        key={sIdx} 
                        className={`text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900/60 border border-white/5 text-zinc-400 uppercase tracking-wider transition-all duration-200 ${hoverBorder} hover:text-white`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 6. PROCESS: OBSERVE -> STRUCTURE -> CREATE -> REFINE */}
      <section className="flex flex-col gap-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-accent-purple uppercase">Methodology</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic">
            Observe &rarr; Structure &rarr; Create &rarr; Refine
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-2" />
          <p className="text-xs md:text-sm text-zinc-400 font-light max-w-xl mt-2">
            The conceptual sequence connecting creative composition with structured problem-solving.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-obsidian-900/40 border border-white/5 rounded-lg p-6 flex flex-col gap-3 relative transition-premium hover:border-accent-purple/30 group"
            >
              <span className="text-3xl font-gothic font-bold text-accent-purple/40 group-hover:text-accent-purple transition-colors">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-white font-gothic">{step.name}</h3>
              <p className="text-xs leading-5 text-zinc-400 font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. NOW / CURRENT FOCUS */}
      <section className="max-w-4xl mx-auto w-full">
        <GlassCard accent="purple" className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-purple font-semibold">Now / Current Focus</span>
            </div>
            <h3 className="text-xl font-semibold text-white font-gothic">Active Creative Horizon</h3>
            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mt-1">
              Currently building Ashwrithe&apos;s debut material, developing new graphite studies and visual art, refining synthetic skin tattoo technique, and shaping digital tools that make creative work easier to manage.
            </p>
          </div>
          <Link 
            href="/about"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] uppercase tracking-widest border border-white/10 hover:border-accent-purple/40 transition-premium whitespace-nowrap"
          >
            Learn More &rarr;
          </Link>
        </GlassCard>
      </section>

      {/* 8. LATEST FROM THE BLOG */}
      <section className="flex flex-col gap-12 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">Chronicles &amp; Notes</span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">From the Journal</h2>
          </div>
          <Link 
            href="/blog" 
            className="text-[10px] font-mono uppercase tracking-widest text-accent-purple hover:text-white transition-colors flex items-center gap-1"
          >
            View All Posts &rarr;
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => {
              const formattedDate = post.publishedDate 
                ? new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : 'Recent';

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                  <GlassCard accent="purple" className="flex flex-col justify-between h-full p-6 transition-premium">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                        <span className="text-accent-purple font-semibold">{post.category || 'General'}</span>
                        <span>{formattedDate}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white font-gothic group-hover:text-accent-purple transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors flex items-center gap-1 mt-6">
                      Read Article &rarr;
                    </span>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-obsidian-900/40 border border-white/5 rounded-lg p-8 text-center flex flex-col items-center gap-3">
            <p className="text-sm text-zinc-400 font-light">
              Explore reflections on music, visual art, digital systems, and process improvement.
            </p>
            <Link 
              href="/blog" 
              className="text-xs font-mono uppercase tracking-widest text-accent-purple hover:text-white transition-colors mt-2"
            >
              Explore the Blog &rarr;
            </Link>
          </div>
        )}
      </section>

      {/* 9. RESTRAINED CLOSING CONTACT EXIT */}
      <section className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto py-8">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">Let&apos;s Connect</h2>
        <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
          Interested in the work, a collaboration, music inquiries, or the systems behind it?
        </p>
        <Link 
          href="/contact"
          className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs border border-white/20 hover:border-white/35 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
        >
          Get in Touch
        </Link>
      </section>

    </div>
  );
}
