import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "Selected Work | Patrik von Porat",
  description: "Selected music projects, visual practices and digital systems shaped through the same underlying process: observe, structure, create and refine.",
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: "Selected Work | Patrik von Porat",
    description: "Selected music projects, visual practices and digital systems shaped through the same underlying process: observe, structure, create and refine.",
    url: 'https://vonporat.com/projects',
  }
};

export default function Projects() {
  const featuredProjects = [
    {
      id: 'realmforged',
      title: 'Realmforged',
      category: 'MUSIC · WORLDBUILDING · DIGITAL EXPERIENCE',
      status: 'ACTIVE',
      statusType: 'active',
      intro: 'A cinematic power metal project developed across music, dark-fantasy storytelling, visual direction, release design and a dedicated digital home.',
      role: 'Founder · Songwriting · Guitars · Bass · Keyboards · Programming · Visual Direction · Project Development',
      builtAcross: [
        'Music and orchestration',
        'Dark-fantasy storytelling',
        'Visual identity and release design',
        'Website and press experience'
      ],
      evidence: 'Released music, an evolving album project and a dedicated digital ecosystem for listeners, collaborators and press.',
      cta: 'Explore Realmforged',
      link: 'https://realmforgedofficial.com',
      image: '/images/projects/proof/realmforged-showcase1.webp',
      imageAlt: 'Realmforged cinematic power metal project and digital hub showcase',
      accent: 'purple',
      isExternal: true
    },
    {
      id: 'ashwrithe',
      title: 'Ashwrithe',
      category: 'MUSIC · ATMOSPHERE · VISUAL IDENTITY',
      status: 'IN DEVELOPMENT',
      statusType: 'development',
      intro: 'An evolving dark extreme metal project built through sound, restraint, ritual atmosphere and a deliberately controlled visual identity.',
      role: 'Concept · Guitars · Co-composition · Visual Direction · Worldbuilding · Digital Development',
      builtAcross: [
        'Music and arrangement',
        'Ritual atmosphere and visual language',
        'Project identity and worldbuilding',
        'Website and launch content'
      ],
      evidence: 'A live visual identity and digital home supporting teaser content and debut material currently in development.',
      cta: 'Enter Ashwrithe',
      link: 'https://ashwrithe.com',
      image: '/images/projects/proof/proof-ashwrithe-showcase.webp',
      imageAlt: 'Ashwrithe dark extreme metal visual identity and digital experience',
      accent: 'purple',
      isExternal: true
    }
  ];

  const supportingProjects = [
    {
      id: 'visual-practice',
      title: 'Visual Practice',
      category: 'DRAWING · TATTOO PRACTICE · PHYSICAL CRAFT',
      status: 'ONGOING PRACTICE',
      statusType: 'active',
      intro: 'An ongoing exploration of observation, material and controlled technique across traditional and physical forms.',
      scopeLabel: 'Scope',
      scopeItems: [
        'Graphite and charcoal studies',
        'Tattoo linework and shading practice',
        'Miniatures and physical models',
        'Selected digital experimentation'
      ],
      role: null,
      evidence: 'Studies, experiments and finished work documenting continued development across different materials.',
      cta: 'View Visual Practice',
      link: '/art',
      image: '/images/art/drawings/eye-study.webp',
      imageAlt: 'Visual practice traditional graphite drawing study',
      accent: 'purple',
      isExternal: false
    },
    {
      id: 'vonporat',
      title: 'vonporat.com',
      category: 'CREATIVE HUB · EDITORIAL SYSTEM · WEB',
      status: 'LIVE · EVOLVING',
      statusType: 'live',
      intro: 'A personal creative hub designed to connect music, visual practice, writing and systems thinking within one coherent identity.',
      role: 'Concept · Content Architecture · Design Direction · CMS Structure · Iterative Development',
      scopeLabel: 'Built with',
      scopeItems: [
        'Next.js',
        'Payload CMS',
        'Supabase',
        'Vercel',
        'AI-assisted development workflows'
      ],
      evidence: 'A live publishing platform connecting project work, visual galleries, journal entries and structured content.',
      cta: 'View Project',
      link: 'https://vonporat.com',
      image: '/images/projects/proof/proof-vonporat-showcase.webp',
      imageAlt: 'vonporat.com personal creative hub platform interface preview',
      accent: 'cyan',
      isExternal: true
    },
    {
      id: 'systems-improvement',
      title: 'Systems & Improvement',
      category: 'PROCESS · DATA · CONTINUOUS IMPROVEMENT',
      status: 'PROFESSIONAL PRACTICE',
      statusType: 'practice',
      intro: 'Structured problem-solving used to make complex work clearer, more reliable and easier to navigate.',
      role: 'Lean Six Sigma Green Belt · Process Improvement · Data and Workflow Design',
      scopeLabel: 'Scope',
      scopeItems: [
        'Lean Six Sigma and DMAIC',
        'Process mapping and workflow design',
        'Power BI and data-supported decisions',
        'Continuous improvement'
      ],
      evidence: 'Professional experience across warehouse operations, distribution logistics and data-supported continuous improvement.',
      cta: 'About the Process',
      link: '/about',
      image: null,
      accent: 'cyan',
      isExternal: false
    }
  ];

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'live':
        return {
          dotClass: 'bg-emerald-400',
          textClass: 'text-emerald-400',
        };
      case 'active':
        return {
          dotClass: 'bg-accent-purple',
          textClass: 'text-accent-purple',
        };
      case 'development':
        return {
          dotClass: 'bg-amber-400',
          textClass: 'text-amber-400',
        };
      case 'practice':
        return {
          dotClass: 'bg-accent-cyan',
          textClass: 'text-accent-cyan',
        };
      default:
        return {
          dotClass: 'bg-zinc-400',
          textClass: 'text-zinc-400',
        };
    }
  };

  return (
    <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1320px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-14 md:gap-20 relative z-10">
      
      {/* 1. Page Introduction */}
      <section className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
        <span className="text-xs md:text-sm font-mono tracking-widest sm:tracking-[0.3em] text-accent-purple uppercase font-medium">
          PROJECTS
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
          Selected work.
        </h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1 mb-1" />
        <p className="text-base md:text-lg text-zinc-300 leading-relaxed md:leading-8 font-light max-w-2xl text-balance text-pretty">
          A selection of music projects, visual practices and digital systems shaped through the same underlying process: observe, structure, create and refine.
        </p>
        <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed font-light max-w-xl text-balance text-pretty">
          Each project brings sound, image, story or systems together into something coherent and deliberately built.
        </p>
      </section>

      {/* 2. Featured Projects (Realmforged & Ashwrithe) */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-pulse" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Featured Work
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Creative Worlds
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-8">
          {featuredProjects.map((proj) => {
            const statusBadge = getStatusBadge(proj.status, proj.statusType);
            const isPurple = proj.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

            return (
              <GlassCard key={proj.id} accent={proj.accent} className="p-6 md:p-8 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-5">
                  
                  {/* Top Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                      {proj.category}
                    </span>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className={`h-2 w-2 rounded-full ${statusBadge.dotClass}`} />
                      <span className={`text-[10px] md:text-xs font-mono uppercase tracking-wider font-semibold ${statusBadge.textClass}`}>
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Title & Intro */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic">
                      {proj.title}
                    </h3>
                    <p className="text-base md:text-[17px] leading-relaxed md:leading-8 text-zinc-300 font-light text-pretty">
                      {proj.intro}
                    </p>
                  </div>

                  {/* Visual Showcase Banner */}
                  {proj.image && (
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/20 transition-all duration-500">
                      <Image 
                        src={proj.image} 
                        alt={proj.imageAlt} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                  )}

                  {/* Role Specification */}
                  <div className="flex flex-col gap-1 text-xs md:text-sm">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-mono font-semibold">
                      Role
                    </span>
                    <p className="text-zinc-300 font-light leading-relaxed font-sans text-sm md:text-[15px] text-pretty">
                      {proj.role}
                    </p>
                  </div>

                  {/* Built Across Pillars */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-mono font-semibold">
                      Built across
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {proj.builtAcross.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-2 text-xs md:text-sm text-zinc-300 font-light">
                          <span className="text-accent-purple font-mono text-xs select-none">&bull;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Highlight Box */}
                  <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">
                      Evidence
                    </span>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed text-pretty">
                      {proj.evidence}
                    </p>
                  </div>

                </div>

                {/* Footer Primary Action */}
                <div className="pt-4 mt-6 border-t border-white/5 flex justify-end">
                  {proj.isExternal ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-purple/50 backdrop-blur-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-premium flex items-center gap-2 group/btn"
                    >
                      <span>{proj.cta}</span>
                      <svg 
                        className={`w-4 h-4 ${accentClass} group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={proj.link}
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-purple/50 backdrop-blur-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-premium flex items-center gap-2 group/btn"
                    >
                      <span>{proj.cta}</span>
                      <span className={`${accentClass} group-hover/btn:translate-x-0.5 transition-transform`}>&rarr;</span>
                    </Link>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. Supporting Projects (Visual Practice, vonporat.com, Systems & Improvement) */}
      <section className="flex flex-col gap-6 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <h2 className="text-xl md:text-2xl font-semibold text-zinc-200 font-gothic tracking-wide">
              Broader Practice
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Broader Scope
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {supportingProjects.map((proj) => {
            const statusBadge = getStatusBadge(proj.status, proj.statusType);
            const isPurple = proj.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

            return (
              <GlassCard key={proj.id} accent={proj.accent} className="p-5 md:p-6 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-4">
                  
                  {/* Top Metadata */}
                  <div className="flex flex-col gap-1.5 pb-2.5 border-b border-white/5">
                    <span className={`text-[10px] md:text-[11px] font-mono uppercase tracking-wider font-semibold ${accentClass}`}>
                      {proj.category}
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight font-gothic">
                        {proj.title}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`h-1.5 w-1.5 rounded-full ${statusBadge.dotClass}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-medium ${statusBadge.textClass}`}>
                          {proj.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Intro Description */}
                  <p className="text-sm md:text-[15px] leading-relaxed text-zinc-300 font-light text-pretty">
                    {proj.intro}
                  </p>

                  {/* Visual Showcase (if available) or Editorial Text Treatment */}
                  {proj.image ? (
                    <div className="w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group-hover:border-white/20 transition-all duration-500">
                      <Image 
                        src={proj.image} 
                        alt={proj.imageAlt} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-full rounded-lg border border-white/[0.08] bg-obsidian-950/50 p-4 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Analytical &amp; Systems Practice</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        Data-backed continuous improvement, DMAIC problem solving, and structured operational workflows.
                      </p>
                    </div>
                  )}

                  {/* Role (if present) */}
                  {proj.role && (
                    <div className="flex flex-col gap-0.5 text-xs">
                      <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-mono font-semibold">
                        Role
                      </span>
                      <p className="text-zinc-300 font-light leading-relaxed font-sans text-xs sm:text-[13px] text-pretty">
                        {proj.role}
                      </p>
                    </div>
                  )}

                  {/* Scope / Built With */}
                  <div className="flex flex-col gap-1.5 pt-1 border-t border-white/5">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-mono font-semibold">
                      {proj.scopeLabel}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.scopeItems.map((item, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="text-[10px] md:text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 uppercase tracking-wider"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Box */}
                  <div className="bg-obsidian-950/70 rounded-lg p-3 border border-white/5 mt-auto">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-0.5 font-semibold">
                      Evidence
                    </span>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed text-pretty">
                      {proj.evidence}
                    </p>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="pt-3.5 mt-5 border-t border-white/5 flex justify-end">
                  {proj.isExternal ? (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1.5 font-semibold`}
                    >
                      <span>{proj.cta}</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={proj.link}
                      className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1 font-semibold`}
                    >
                      <span>{proj.cta}</span>
                      <span>&rarr;</span>
                    </Link>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. Closing Section */}
      <section className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto py-6 border-t border-white/5">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
          BEHIND THE WORK
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          Different outcomes. The same underlying process.
        </h2>
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-balance text-pretty">
          Music, images and systems may require different tools, but each begins with observation and becomes clearer through structure, creation and refinement.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 mt-2 w-full sm:w-auto">
          <Link 
            href="/about" 
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            About the Process
          </Link>
          <Link 
            href="/blog" 
            className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Read the Journal
          </Link>
        </div>
      </section>

    </div>
  );
}
