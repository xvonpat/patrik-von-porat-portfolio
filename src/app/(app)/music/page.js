import React from 'react';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "Music Portfolio | Patrik von Porat",
  description: "Explore the dark, symphonic, and progressive music of Patrik von Porat. Lead guitar and orchestration works featuring Realmforged, Freternia, Cromonic, and Ashwrithe.",
  alternates: {
    canonical: '/music',
  },
  openGraph: {
    title: "Music Portfolio | Patrik von Porat",
    description: "Explore the dark, symphonic, and progressive music of Patrik von Porat. Lead guitar and orchestration works featuring Realmforged, Freternia, Cromonic, and Ashwrithe.",
    url: 'https://vonporat.com/music',
  }
};

export default function Music() {
  const currentProjects = [
    {
      name: "Realmforged",
      genre: "Symphonic Power Metal",
      role: "Lead Guitar, Songwriting & Orchestration",
      description: "A cinematic power metal project built around dark fantasy worldbuilding, sweeping choral orchestrations, and intricate neoclassical twin-lead guitar work.",
      status: "Active · Album In Production",
      accent: "purple",
      tags: ["Symphonic Power Metal", "Neoclassical Lead", "Fantasy Lore", "Studio Production"],
      logo: "/images/music/realmforged-logo-hero-showcase.webp",
      fullBanner: true,
      bannerPosition: "object-center",
      proof: "Debut full-length album currently in active studio recording and symphonic orchestration.",
      ctaText: "Explore Realmforged",
      link: "https://realmforgedofficial.com"
    },
    {
      name: "Ashwrithe",
      genre: "Blackened Melodic Death",
      role: "Guitars, Co-Composition & Visual Direction",
      description: "An atmospheric extreme metal project shaped by frostbitten melodies, soot-black atmosphere, crushing rhythm guitars and ritualistic darkness.",
      status: "Active · Live Site",
      accent: "purple",
      tags: ["Blackened Melodic Death", "Atmospheric Darkness", "Visual Identity", "Active Production"],
      logo: "/images/music/qa-ashwrithe.webp",
      fullBanner: true,
      bannerPosition: "object-center",
      proof: "Live standalone web platform at ashwrithe.com. Debut material in active studio production.",
      ctaText: "Enter Ashwrithe",
      link: "https://ashwrithe.com"
    }
  ];

  const legacyProjects = [
    {
      name: "Freternia",
      genre: "Melodic Power Metal",
      role: "Guitars & Live Performance",
      description: "Pioneering Swedish melodic power metal. Fast-paced, driving rhythm lines paired with high-flying anthemic vocals and memorable twin-lead harmonies.",
      status: "The Final Stand (ROAR / Rock of Angels)",
      accent: "purple",
      tags: ["Swedish Melodic Metal", "Twin-Lead Harmonies", "Touring & Writing"],
      logo: "/images/music/freternia.webp",
      fullBanner: true,
      bannerPosition: "object-top",
      ctaText: "Listen on Bandcamp",
      link: "https://roar-freternia.bandcamp.com/album/the-final-stand"
    },
    {
      name: "Cromonic",
      genre: "Melodic Heavy / Power Metal",
      role: "Guitars & Lead Lines",
      description: "Classic Swedish melodic heavy metal featuring powerful vocal hooks, sharp rhythm guitars, soaring melodies, and expressive shred solo work.",
      status: "Time (Pure Steel Records)",
      accent: "cyan",
      tags: ["Classic Swedish Metal", "Shred Guitar", "Studio Album"],
      logo: null,
      ctaText: "Listen on Spotify",
      link: "https://open.spotify.com/artist/6Lj1yeMDpsRQO8ai5VnZLn?si=D67mevHWSRuAdHo2pAvdTA"
    }
  ];

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 2xl:px-10 pt-4 pb-14 md:pt-6 md:pb-16 flex flex-col gap-10 md:gap-12 relative z-10 transition-all duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl xl:max-w-4xl mx-auto">
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-medium">Sonic Manifestations</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">Music Portfolio</h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed md:leading-8 mt-1 text-balance">
          A chronicle of active creative bands, studio production sessions, and guitar composition &mdash; from symphonic gothic fantasy arrangements to blackened extreme metal.
        </p>
      </div>

      {/* TIER 1: CURRENT WORK (PRIMARY FEATURED) */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-pulse" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Current Work
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">Primary Focus</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
          {currentProjects.map((band) => (
            <GlassCard key={band.name} accent={band.accent} className="p-6 md:p-7 xl:p-8 flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-4">
                
                {/* Large Visual Showcase Banner */}
                <div className="w-full h-44 sm:h-52 xl:h-56 rounded-xl bg-obsidian-950/80 border border-white/[0.08] flex items-center justify-center overflow-hidden relative transition-all duration-500 group-hover:border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-10" />
                  {band.logo ? (
                    <Image
                      src={band.logo}
                      alt={`${band.name} logo`}
                      width={band.fullBanner ? 800 : 420}
                      height={240}
                      className={`${band.fullBanner ? `w-full h-full object-cover ${band.bannerPosition || 'object-center'}` : 'max-h-[75%] max-w-[82%] object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]'} transition-all duration-700 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
                    />
                  ) : (
                    <div className="text-center p-6">
                      <span className="font-gothic text-4xl font-semibold text-zinc-300">{band.name}</span>
                    </div>
                  )}
                </div>

                {/* Header Information */}
                <div className="flex flex-col gap-1.5 pb-3 border-b border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs md:text-sm text-accent-purple font-mono uppercase tracking-widest font-semibold">{band.genre}</span>
                    <span className="self-start sm:self-auto text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 bg-white/[0.06] border border-white/10 rounded-full font-mono text-zinc-200 uppercase tracking-wider font-semibold whitespace-nowrap">
                      {band.status}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic mt-0.5">{band.name}</h3>
                  <p className="text-xs md:text-sm font-mono text-zinc-300">
                    <span className="text-zinc-400 font-semibold">Role:</span> {band.role}
                  </p>
                </div>

                {/* Body Description */}
                <p className="text-base leading-relaxed md:leading-8 text-zinc-300 font-light text-pretty">
                  {band.description}
                </p>

                {/* Proof / State Highlight Box */}
                <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5">
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">Current State</span>
                  <p className="text-sm text-zinc-200 font-light leading-relaxed text-pretty">
                    {band.proof}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {band.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Area */}
              <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider font-medium">
                  {band.status.split(' · ')[1] || 'In Production'}
                </span>
                {band.link && (
                  <a 
                    href={band.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-purple/50 backdrop-blur-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-premium flex items-center gap-2"
                  >
                    <span>{band.ctaText}</span>
                    <svg className="w-4 h-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* TIER 2: EARLIER CHAPTERS (SELECTED LEGACY) */}
      <section className="flex flex-col gap-5 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            <h2 className="text-xl md:text-2xl font-semibold text-zinc-300 font-gothic tracking-wide">
              Earlier Chapters &amp; Selected Legacy
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">Historical Work</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {legacyProjects.map((band) => (
            <GlassCard key={band.name} accent={band.accent} className="p-5 md:p-6 xl:p-7 flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-4">
                
                {/* Legacy Visual Showcase Banner */}
                <div className="w-full h-32 sm:h-36 rounded-xl bg-obsidian-950/60 border border-white/[0.08] flex items-center justify-center overflow-hidden relative transition-all duration-300 group-hover:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-10" />
                  {band.logo ? (
                    <Image
                      src={band.logo}
                      alt={`${band.name} logo`}
                      width={band.fullBanner ? 600 : 300}
                      height={144}
                      className={`${band.fullBanner ? `w-full h-full object-cover ${band.bannerPosition || 'object-center'}` : 'max-h-[70%] max-w-[75%] object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.12)]'} transition-all duration-500 group-hover:scale-[1.02]`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4 relative z-10">
                      <span className="font-gothic text-3xl font-semibold text-white tracking-wide drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">{band.name}</span>
                      <span className="text-[11px] font-mono text-accent-cyan uppercase tracking-widest mt-1 font-medium">Melodic Heavy / Power Metal</span>
                    </div>
                  )}
                </div>

                {/* Header Information */}
                <div className="flex flex-col gap-1 pb-2.5 border-b border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${band.accent === 'cyan' ? 'text-accent-cyan' : 'text-accent-purple'}`}>{band.genre}</span>
                    <span className="self-start sm:self-auto text-[11px] px-2.5 py-0.5 bg-white/[0.04] border border-white/10 rounded font-mono text-zinc-300 uppercase tracking-wider font-medium">
                      Legacy Release
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight font-gothic">{band.name}</h3>
                  <p className="text-xs font-mono text-zinc-300">
                    <span className="text-zinc-400 font-semibold">Role:</span> {band.role}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm md:text-[15px] leading-relaxed text-zinc-300 font-light text-pretty">
                  {band.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {band.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Area */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
                  {band.status}
                </span>
                {band.link && (
                  <a 
                    href={band.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider font-semibold border border-white/10 hover:border-white/30 transition-premium flex items-center gap-1.5"
                  >
                    <span>{band.ctaText}</span>
                    <svg className="w-3.5 h-3.5 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

    </div>
  );
}
