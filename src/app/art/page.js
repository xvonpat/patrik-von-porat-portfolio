import React from 'react';
import GlassCard from '@/components/GlassCard';

export default function Art() {
  const artCategories = [
    {
      title: "Graphite Drawing",
      subtitle: "High-contrast dark realism and pencil portraits",
      description: "Exploring dark fantasy themes, deep shadows, and classical anatomy. Focused on texture, light falloff, and traditional high-detail rendering of gothic and Norse mythological figures.",
      accent: "orange",
      dimensions: "Traditional Paper & Cardboard - Multi-size",
      placeholderGradient: "from-zinc-900 via-neutral-950 to-zinc-900",
      artPieces: ["Odin the Wanderer", "The Crypt Keeper", "Fallen Valkyrie"]
    },
    {
      title: "Tattoo Practice",
      subtitle: "Inkwork, heavy linework, and dark-art iconography",
      description: "Honing precision linework and whip-shading on synthetic skin. Developing custom dark-art templates incorporating traditional Norse woodcarving aesthetics, modern heavy blackwork, and runic designs.",
      accent: "purple",
      dimensions: "Synthetic Skin & Custom Flashes",
      placeholderGradient: "from-purple-950/20 via-zinc-950 to-neutral-900",
      image: "/mariotattoo.jpg",
      artPieces: ["Runic Wolf Flash", "Surtur's Flame Blackwork", "Gothic Archway Study"]
    },
    {
      title: "AI Generated Art",
      subtitle: "Neural synthesis and hybrid generative workflows",
      description: "Investigating the intersection of human curation and AI architecture. Using custom checkpoints and neural models to generate dark, surreal oil-painting aesthetics, high-detail metallic textures, and gothic concept layouts.",
      accent: "cyan",
      dimensions: "Digital - Ultra High-Resolution Outputs",
      placeholderGradient: "from-cyan-950/20 via-zinc-950 to-neutral-900",
      artPieces: ["Obsidian Citadel", "Biomech Cathedral", "The Ash Wraith"]
    },
    {
      title: "Miniatures & 3D Prints",
      subtitle: "Intricate dark fantasy modeling and precision painting",
      description: "Curing SLA resin prints and applying high-end acrylic washes, dry-brushing, and airbrushing techniques. Bringing physical dark-fantasy monsters, metal warriors, and elaborate gaming environments to life.",
      accent: "purple",
      dimensions: "Resin Scale Models & Dioramas",
      placeholderGradient: "from-purple-950/20 via-zinc-950 to-neutral-900",
      artPieces: ["Dreadnought of Ash", "Lich King Diorama", "Gargoyle Bastion Piece"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-16 relative">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-orange uppercase">Visual Expressions</span>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">Art Portfolio</h1>
        <div className="w-16 h-[2px] bg-accent-orange mt-2" />
        <p className="text-sm text-zinc-400 leading-6 mt-4">
          A gallery of traditional and modern visual mediums. Bridging the gap between tactile graphite drawing, ink-on-skin practice, generative neural networks, and physical 3D modeling.
        </p>
      </div>

      {/* Grid of Art Sections */}
      <div className="flex flex-col gap-24 relative z-10">
        {artCategories.map((cat, idx) => (
          <section key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Showcase (5 columns) */}
            <div className={`col-span-1 lg:col-span-6 flex flex-col gap-4 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
              <div className={`w-full aspect-[4/3] rounded-lg bg-gradient-to-tr ${cat.placeholderGradient} border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 group hover:border-accent-${cat.accent}/30 transition-premium`}>
                {cat.image ? (
                  <>
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-75 pointer-events-none" />
                  </>
                ) : (
                  <>
                    {/* Visual subtle glow inside */}
                    <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.85)_100%) pointer-events-none" />
                    
                    {/* Gothic crest graphic placeholder */}
                    <svg className={`w-12 h-12 text-zinc-700 mb-4 group-hover:text-accent-${cat.accent} transition-colors duration-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    
                    <span className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-1">Visual Placeholder</span>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{cat.title} Showcase</span>
                  </>
                )}
                
                {/* Ambient glow highlight */}
                <div className={`absolute bottom-[-50px] w-[80%] h-[40px] bg-accent-${cat.accent}/10 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
              
              {/* Quick pieces list */}
              <div className="grid grid-cols-3 gap-4">
                {cat.artPieces.map((piece, pIdx) => (
                  <div key={pIdx} className="aspect-video bg-zinc-950/40 border border-white/5 rounded p-2 flex flex-col items-center justify-center text-center group hover:border-zinc-800 transition-colors">
                    <span className="text-[9px] font-mono text-zinc-500 truncate w-full uppercase tracking-wider">{piece}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description Details (6 columns, 1 offset) */}
            <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 justify-center">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-[0.3em] text-accent-${cat.accent}`}>{cat.subtitle}</span>
                <h2 className="text-3xl font-bold uppercase tracking-wider text-white mt-2 font-gothic">{cat.title}</h2>
                <div className={`w-12 h-[2px] bg-accent-${cat.accent} mt-3`} />
              </div>
              
              <p className="text-sm md:text-base leading-7 text-zinc-400 font-light">
                {cat.description}
              </p>

              <GlassCard accent={cat.accent} className="p-4! md:p-4!">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <svg className={`w-5 h-5 text-accent-${cat.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <div>
                    <span className="text-zinc-500 block uppercase tracking-widest text-[9px]">Medium Details</span>
                    <span className="text-zinc-300">{cat.dimensions}</span>
                  </div>
                </div>
              </GlassCard>
            </div>

          </section>
        ))}
      </div>

    </div>
  );
}
