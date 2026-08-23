import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "Music | Patrik von Porat",
  description: "Guitar, composition, arrangement and recording across more than 35 years of heavy music. Featuring Realmforged, Ashwrithe, Freternia and Cromonic.",
  alternates: {
    canonical: '/music',
  },
  openGraph: {
    title: "Music | Patrik von Porat",
    description: "Guitar, composition, arrangement and recording across more than 35 years of heavy music. Featuring Realmforged, Ashwrithe, Freternia and Cromonic.",
    url: 'https://vonporat.com/music',
  }
};

export default function Music() {
  const currentProjects = [
    {
      id: 'realmforged',
      title: 'Realmforged',
      genre: 'CINEMATIC POWER METAL',
      status: 'ACTIVE',
      statusType: 'active',
      description: 'A cinematic power metal project built around melodic guitar work, orchestration, dark-fantasy storytelling and songs designed to feel part of a larger world.',
      role: 'Founder · Songwriter · Guitars · Bass · Keyboards · Programming · Arrangement',
      currentState: 'Released music available now, with a full-length album in development.',
      image: '/images/music/qa-v3-full.webp',
      imageAlt: 'Realmforged cinematic power metal artwork and metallic emblem',
      primaryAction: {
        label: 'Listen to Realmforged',
        url: 'https://open.spotify.com/artist/1w5nRV4hbOrPFuYRYuvgnB'
      },
      secondaryAction: {
        label: 'Visit Realmforged',
        url: 'https://realmforgedofficial.com'
      },
      accent: 'purple'
    },
    {
      id: 'ashwrithe',
      title: 'Ashwrithe',
      genre: 'DARK EXTREME METAL',
      status: 'IN DEVELOPMENT',
      statusType: 'development',
      description: 'A developing dark extreme metal project shaped by frostbitten melody, aggressive guitar work, dense orchestration and ritual atmosphere.',
      role: 'Concept · Guitars · Co-composition · Arrangement',
      currentState: "Debut material is in development, with the project's first musical and visual fragments beginning to emerge.",
      image: '/images/music/qa-ashwrithe.webp',
      imageAlt: 'Ashwrithe dark extreme metal atmospheric emblem and visual identity',
      primaryAction: {
        label: 'Enter Ashwrithe',
        url: 'https://ashwrithe.com'
      },
      secondaryAction: null,
      accent: 'purple'
    }
  ];

  const selectedReleases = [
    {
      id: 'through-ash-and-light',
      title: 'Through Ash and Light',
      artist: 'Realmforged · feat. Mio Jäger',
      type: 'SINGLE · 2025',
      description: 'A cinematic anthem of fire and ruin—the first signal from the fractured realm.',
      listenUrl: 'https://open.spotify.com/album/7KzqptOEEgGyoicwDYqFID',
      image: '/images/music/cover-through-ash-and-light.webp',
      imageAlt: 'Through Ash and Light single cover artwork by Realmforged',
      accent: 'purple'
    },
    {
      id: 'echoes-of-betrayal',
      title: 'Echoes of Betrayal',
      artist: 'Realmforged',
      type: 'SINGLE · 2025',
      description: 'A shadowed chapter of fracture, omen, and the cost of broken allegiance.',
      listenUrl: 'https://open.spotify.com/track/3NbEyxosBUCT9skzvSRol3',
      image: '/images/music/cover-echoes-of-betrayal.webp',
      imageAlt: 'Echoes of Betrayal single cover artwork by Realmforged',
      accent: 'purple'
    },
    {
      id: 'spiritbound',
      title: 'Spiritbound',
      artist: 'Realmforged · feat. Alicke Kostopoulou',
      type: 'SINGLE · 2025',
      description: 'A song of oath, memory, and the unseen flame that endures beyond ruin.',
      listenUrl: 'https://open.spotify.com/track/4BpbgcqYG3Dme8JRuCwcU2',
      image: '/images/music/cover-spiritbound.webp',
      imageAlt: 'Spiritbound single cover artwork by Realmforged',
      accent: 'purple'
    }
  ];

  const historicalBands = [
    {
      id: 'freternia',
      title: 'Freternia',
      genre: 'SWEDISH MELODIC POWER METAL',
      role: 'Guitars · Co-founder',
      description: 'A formative part of my musical history, built around fast melodic writing, twin-guitar harmonies and anthemic power metal.',
      actionLabel: 'Listen to Freternia',
      link: 'https://freterniaofficial.com',
      image: '/images/music/freternia.webp',
      imageAlt: 'Freternia Swedish melodic power metal band artwork',
      accent: 'purple'
    },
    {
      id: 'cromonic',
      title: 'Cromonic',
      genre: 'MELODIC HEAVY / POWER METAL',
      role: 'Guitars',
      description: 'Melodic heavy metal shaped by strong vocal hooks, driving rhythm guitars and a balance between memorable lead work and classic shred.',
      actionLabel: 'Listen to Cromonic',
      link: 'https://open.spotify.com/artist/6Lj1yeMDpsRQO8ai5VnZLn',
      image: null,
      accent: 'cyan'
    }
  ];

  return (
    <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1320px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-16 md:gap-24 relative z-10">
      
      {/* 1. Page Hero */}
      <section className="flex flex-col items-center text-center justify-center gap-4 max-w-4xl mx-auto relative pt-4 pb-2 md:pt-8 md:pb-4">
        {/* Ambient subtle glow backdrop */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-accent-purple/8 blur-[110px] rounded-full pointer-events-none -z-10" />

        <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
          MUSIC
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-gothic text-balance">
          Music has been the constant.
        </h1>

        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-0.5 mb-0.5" />

        <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 text-balance text-pretty">
          For more than three decades, I have written, recorded and shaped heavy music through guitar, melody and atmosphere. This page brings together the projects I lead and the bands that form part of that history.
        </p>

        <p className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-accent-purple font-medium mt-1">
          GUITAR &middot; COMPOSITION &middot; ARRANGEMENT &middot; RECORDING
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full sm:w-auto">
          <a 
            href="#selected-releases" 
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Listen to Selected Releases
          </a>
          <a 
            href="#current-projects" 
            className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Explore Current Projects
          </a>
        </div>
      </section>

      {/* 2. Current Projects Section */}
      <section id="current-projects" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            CURRENT PROJECTS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Music I am building now.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            Two distinct projects shaped through different forms of melody, atmosphere and storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-8">
          {currentProjects.map((project) => {
            const isPurple = project.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';
            const statusDot = project.statusType === 'active' ? 'bg-accent-purple' : 'bg-amber-400';
            const statusText = project.statusType === 'active' ? 'text-accent-purple' : 'text-amber-400';

            return (
              <GlassCard key={project.id} accent={project.accent} className="p-6 md:p-8 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-5">
                  
                  {/* Top Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                      {project.genre}
                    </span>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className={`h-2 w-2 rounded-full ${statusDot}`} />
                      <span className={`text-[10px] md:text-xs font-mono uppercase tracking-wider font-semibold ${statusText}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic">
                      {project.title}
                    </h3>
                    <p className="text-base md:text-[17px] leading-relaxed md:leading-8 text-zinc-300 font-light text-pretty">
                      {project.description}
                    </p>
                  </div>

                  {/* Artwork Showcase Banner */}
                  {project.image && (
                    <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.5)] group-hover:border-white/20 transition-all duration-500">
                      <Image 
                        src={project.image} 
                        alt={project.imageAlt} 
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
                      {project.role}
                    </p>
                  </div>

                  {/* Current State Highlight */}
                  <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">
                      Current State
                    </span>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed text-pretty">
                      {project.currentState}
                    </p>
                  </div>

                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 mt-6 border-t border-white/5 flex flex-wrap items-center justify-end gap-3">
                  {project.secondaryAction && (
                    <a
                      href={project.secondaryAction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md transition-premium flex items-center gap-1.5"
                    >
                      <span>{project.secondaryAction.label}</span>
                      <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.primaryAction && (
                    <a
                      href={project.primaryAction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-purple/50 backdrop-blur-md hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-premium flex items-center gap-2 group/btn"
                    >
                      <span>{project.primaryAction.label}</span>
                      <svg 
                        className={`w-4 h-4 ${accentClass} group-hover/btn:text-white transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. Selected Releases Section */}
      <section id="selected-releases" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24 pt-4 border-t border-white/5">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            SELECTED RELEASES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            Three places to begin.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            A small selection from Realmforged&apos;s released music.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {selectedReleases.map((release) => {
            const isPurple = release.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

            return (
              <GlassCard key={release.id} accent={release.accent} className="p-5 md:p-6 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-4">
                  
                  {/* Square 1:1 Cover Artwork Showcase */}
                  <div className="w-full aspect-square rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)] group-hover:border-white/20 transition-all duration-500">
                    <Image 
                      src={release.image} 
                      alt={release.imageAlt} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent opacity-40 pointer-events-none" />
                  </div>

                  {/* Title & Artist */}
                  <div className="flex flex-col gap-1 pb-2.5 border-b border-white/5">
                    <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-accent-purple font-semibold">
                      {release.type}
                    </span>
                    <h3 className="text-2xl font-semibold text-white tracking-tight font-gothic">
                      {release.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-300 font-medium">
                      {release.artist}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                    {release.description}
                  </p>

                </div>

                {/* Direct Listen Action */}
                <div className="pt-3.5 mt-5 border-t border-white/5 flex justify-end">
                  <a
                    href={release.listenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1.5 font-semibold`}
                  >
                    <span>Listen on Spotify</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. Bands & Contributions Section */}
      <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full pt-4 border-t border-white/5">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-zinc-400 uppercase font-semibold">
            BANDS &amp; CONTRIBUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            Other chapters in the music.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            Projects and bands that form part of my history as a guitarist and songwriter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 items-start">
          {historicalBands.map((band) => {
            const isPurple = band.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

            return (
              <GlassCard key={band.id} accent={band.accent} className="p-6 md:p-7 flex flex-col group">
                <div className="flex flex-col gap-4">
                  
                  {/* Top Metadata */}
                  <div className="flex flex-col gap-1 pb-2.5 border-b border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      {band.genre}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-gothic">
                      {band.title}
                    </h3>
                  </div>

                  {/* Artwork Showcase (if available) */}
                  {band.image && (
                    <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group-hover:border-white/20 transition-all duration-500">
                      <Image 
                        src={band.image} 
                        alt={band.imageAlt} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                    </div>
                  )}

                  {/* Role */}
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] font-mono font-semibold">
                      Role
                    </span>
                    <p className="text-zinc-300 font-light leading-relaxed font-sans text-xs sm:text-[14px] text-pretty">
                      {band.role}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] leading-relaxed text-zinc-300 font-light text-pretty">
                    {band.description}
                  </p>

                </div>

                {/* Footer Action */}
                <div className="pt-3.5 mt-5 border-t border-white/5 flex justify-end">
                  <a
                    href={band.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1.5 font-semibold`}
                  >
                    <span>{band.actionLabel}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 5. Closing Section */}
      <section className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto py-6 border-t border-white/5">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
          BEYOND THE RECORDINGS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          Each project has a world around the music.
        </h2>
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-balance text-pretty">
          Artwork, stories, release structures and digital spaces all grow from the same musical starting point.
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
