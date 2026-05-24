import React from 'react';
import GlassCard from '@/components/GlassCard';

export default function Music() {
  const bands = [
    {
      name: "Realmforged",
      genre: "Symphonic Power Metal",
      role: "Lead Guitar & Orchestration",
      description: "A canvas of epic proportions, weaving sweeping orchestral strings, thundering choir arrangements, and intricate neo-classical lead guitar melodies to craft fantastical sonic worlds.",
      status: "Active - Album in Production",
      accent: "purple",
      tags: ["Epic", "Orchestral", "Gothic Fantasy"]
    },
    {
      name: "Freternia",
      genre: "Melodic Power Metal",
      role: "Guitars",
      description: "Pioneering Swedish melodic power metal. Fast-paced, driving rhythm lines paired with high-flying anthemic vocals and memorable twin-lead harmonies.",
      status: "Active - Touring & Writing",
      accent: "orange",
      tags: ["Swedish", "Anthemic", "Speed"]
    },
    {
      name: "Cromonic",
      genre: "Progressive Melodic Metal",
      role: "Guitars",
      description: "Where complexity meets accessibility. Combining syncopated rhythms, time signature changes, and soaring vocal melodies with rich synthesizer soundscapes.",
      status: "Active - Recording Sessions",
      accent: "cyan",
      tags: ["Progressive", "Harmonic", "Atmospheric"]
    },
    {
      name: "Shred Eternity",
      genre: "Instrumental Guitar Metal",
      role: "All Instruments & Composition",
      description: "A solo creative sandbox dedicated to technical fretboard wizardry. Merging high-speed sweeping, alternate picking, and complex phrasing with modern heavy grooves.",
      status: "Solo Project - Singles Released",
      accent: "orange",
      tags: ["Shred", "Instrumental", "Technical"]
    },
    {
      name: "Ashwrithe",
      genre: "Modern Dark Melodic Death Metal",
      role: "Guitars & Co-Composition",
      description: "Exploring darker, visceral auditory landscapes. Combining aggressive growls, down-tuned crushing riffs, and melancholy guitar lines to paint a stark gothic atmosphere.",
      status: "Side Project - EP Available",
      accent: "purple",
      tags: ["Melodeath", "Aggressive", "Melancholic"],
      logo: "/images/music/ashwrithe_logo_transparent.png"
    },
    {
      name: "Neon Ronin",
      genre: "Cyberpunk Synthwave Metal",
      role: "Guitars & Synths",
      description: "A neon-soaked retro-future hybrid. Driving synthesizer hooks, retro drum machines, and heavy, processed guitar riffs clashing in a cinematic futuristic sprawl.",
      status: "Concept Project - Pre-production",
      accent: "cyan",
      tags: ["Cyberpunk", "Synthwave", "Industrial"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-12 relative">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase">Sonic Manifestations</span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Music Portfolio</h1>
        <div className="w-16 h-[2px] bg-accent-purple mt-2" />
        <p className="text-sm text-zinc-400 leading-6 mt-4">
          A chronicle of active bands, studio recording sessions, and solo explorations. From symphonic gothic-metal landscapes to aggressive, cyber-infused riffs.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 relative z-10">
        {bands.map((band, idx) => (
          <GlassCard key={idx} accent={band.accent} className="flex flex-col justify-between h-full group">
            <div>
              {/* Brand Logo Banner */}
              {band.logo && (
                <div className="w-full h-28 mb-6 rounded-lg bg-obsidian-950/40 border border-white/5 flex items-center justify-center p-4 overflow-hidden relative transition-all duration-300 hover:border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />
                  <img
                    src={band.logo}
                    alt={`${band.name} logo`}
                    className="max-h-full max-w-full object-contain filter invert brightness-[1.1] drop-shadow-[0_0_10px_rgba(255,255,255,0.12)] transition-all duration-500 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.2)]"
                  />
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight font-gothic">{band.name}</h2>
                  <p className="text-xs text-accent-purple font-mono uppercase tracking-wider mt-1">{band.genre}</p>
                </div>
                {/* Status dot */}
                <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-zinc-400 uppercase tracking-widest">
                  {band.status.split(' - ')[0]}
                </span>
              </div>

              {/* Role */}
              <p className="text-xs font-semibold text-zinc-300 uppercase tracking-widest mb-4 font-mono">
                Role: <span className="text-white font-normal">{band.role}</span>
              </p>

              {/* Description */}
              <p className="text-sm leading-6 text-zinc-400 font-light mb-6">
                {band.description}
              </p>
            </div>

            {/* Tags and Status Footer */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {band.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-1 rounded bg-obsidian-800 border border-white/5 text-zinc-500 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  {band.status.split(' - ')[1] || band.status}
                </span>
                <button className="text-xs uppercase font-bold tracking-widest text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1 font-mono">
                  <span>Listen</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

    </div>
  );
}
