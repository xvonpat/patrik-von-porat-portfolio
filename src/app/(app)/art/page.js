"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import LightboxGallery from '@/components/LightboxGallery';

export default function Art() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const artCategories = [
    {
      title: "Miniatures & 3D Prints",
      subtitle: "Intricate dark fantasy modeling and precision painting",
      description: "Curing SLA resin prints and applying high-end acrylic washes, dry-brushing, and airbrushing techniques. Bringing physical dark-fantasy monsters, metal warriors, and elaborate gaming environments to life.",
      accent: "purple",
      dimensions: "Resin Scale Models & Dioramas",
      placeholderGradient: "from-purple-950/20 via-zinc-950 to-neutral-900",
      image: "/images/art/butcher/The_Butcher-2.jpg",
      gallery: [
        { src: "/images/art/butcher/The_Butcher-2.jpg", title: "The Butcher Bust - Front", caption: "SLA resin print. Applied heavy layers of acrylic washes, custom skin-tone blending, and weathering.", category: "Miniatures & 3D Prints", alt: "Butcher front view" },
        { src: "/images/art/butcher/The_Butcher-1.jpg", title: "The Butcher Bust - Back Detail", caption: "Precision detailing on spine segments, muscle textures, and copper harness.", category: "Miniatures & 3D Prints", alt: "Butcher spine details" },
        { src: "/images/art/butcher/The_Butcher-3.jpg", title: "The Butcher Bust - Side Profile", caption: "Contrast highlight check on tusks, horns, and skin contours.", category: "Miniatures & 3D Prints", alt: "Butcher side view" },
        { src: "/images/art/butcher/The_Butcher-4.jpg", title: "The Butcher Bust - Face Close-up", caption: "Precision detail check on teeth, glowing green eyes, and blood splatters.", category: "Miniatures & 3D Prints", alt: "Butcher head close-up" }
      ]
    },
    {
      title: "Graphite Drawing",
      subtitle: "High-contrast dark realism and pencil portraits",
      description: "Exploring dark fantasy themes, deep shadows, and classical anatomy. Focused on texture, light falloff, and traditional high-detail rendering of gothic and Norse mythological figures.",
      accent: "orange",
      dimensions: "Traditional Paper & Cardboard - Multi-size",
      placeholderGradient: "from-zinc-900 via-neutral-950 to-zinc-900",
      gallery: [
        { src: "", title: "Odin the Wanderer", caption: "Detailed pencil rendering of Odin in classical Norse style.", category: "Graphite Drawing", alt: "Odin pencil sketch" },
        { src: "", title: "The Crypt Keeper", caption: "High-contrast dark realism and shadow rendering.", category: "Graphite Drawing", alt: "Crypt keeper graphite art" },
        { src: "", title: "Fallen Valkyrie", caption: "Mythological Norse graphite study on card.", category: "Graphite Drawing", alt: "Fallen valkyrie sketch" }
      ]
    },
    {
      title: "Tattoo Practice",
      subtitle: "Inkwork, heavy linework, and dark-art iconography",
      description: "Honing precision linework and whip-shading on synthetic skin. Developing custom dark-art templates incorporating traditional Norse woodcarving aesthetics, modern heavy blackwork, and runic designs.",
      accent: "purple",
      dimensions: "Synthetic Skin & Custom Flashes",
      placeholderGradient: "from-purple-950/20 via-zinc-950 to-neutral-900",
      image: "/images/tattoos/mariotattoo.jpg",
      gallery: [
        { src: "/images/tattoos/mariotattoo.jpg", title: "Mario Shading Practice", caption: "Honing precision linework and whip-shading on synthetic skin.", category: "Tattoo Practice", alt: "Mario tattoo Synthetic skin" },
        { src: "/images/avatar/IMG_1360-2.jpg", title: "Runic Wolf Flash", caption: "Norse woodcarving runes flash template.", category: "Tattoo Practice", alt: "Runic wolf" },
        { src: "/images/avatar/Patrik.png", title: "Gothic Archway Study", caption: "Intricate blackwork lining study of architectural curves.", category: "Tattoo Practice", alt: "Gothic archway" }
      ]
    },
    {
      title: "AI Generated Art",
      subtitle: "Neural synthesis and hybrid generative workflows",
      description: "Investigating the intersection of human curation and AI architecture. Using custom checkpoints and neural models to generate dark, surreal oil-painting aesthetics, high-detail metallic textures, and gothic concept layouts.",
      accent: "cyan",
      dimensions: "Digital - Ultra High-Resolution Outputs",
      placeholderGradient: "from-cyan-950/20 via-zinc-950 to-neutral-900",
      gallery: [
        { src: "/images/art/hero-banner.png", title: "Obsidian Citadel", caption: "Surreal, high-contrast dark oil-painting neural synthesis.", category: "AI Generated Art", alt: "Obsidian citadel digital" },
        { src: "", title: "Biomech Cathedral", caption: "Generative model study on architectural metal textures.", category: "AI Generated Art", alt: "Biomech cathedral" },
        { src: "", title: "The Ash Wraith", caption: "Tactile dark concepts and texture metadata prompt pipelines.", category: "AI Generated Art", alt: "Ash wraith concept" }
      ]
    }
  ];

  const openLightbox = (categoryIdx, imageIdx) => {
    setLightboxImages(artCategories[categoryIdx].gallery);
    setActiveImageIndex(imageIdx);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-16 relative">
        
        {/* Page Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-orange uppercase">Visual Expressions</span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Art Portfolio</h1>
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
                <div 
                  onClick={() => openLightbox(idx, 0)}
                  className={`w-full aspect-[4/3] rounded-lg bg-gradient-to-tr ${cat.placeholderGradient} border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8 group hover:border-accent-${cat.accent}/30 transition-premium cursor-pointer`}
                >
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
                
                {/* Quick pieces list / Gallery Thumbnails */}
                <div className="grid grid-cols-3 gap-4">
                  {cat.gallery.slice(0, 3).map((item, pIdx) => (
                    <button 
                      key={pIdx} 
                      onClick={() => openLightbox(idx, pIdx)}
                      className="aspect-video bg-zinc-950/40 border border-white/5 rounded-lg flex flex-col items-center justify-center text-center group hover:border-accent-purple/30 transition-premium relative overflow-hidden focus:outline-none"
                    >
                      {item.src && !item.src.includes("...") ? (
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-[9px] font-mono text-zinc-500 truncate w-full uppercase tracking-wider relative z-10 px-2">{item.title}</span>
                      )}
                      
                      {/* Hover Overlay Icon */}
                      <div className="absolute inset-0 bg-obsidian-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-20">
                        <svg className={`w-4 h-4 text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description Details (6 columns, 1 offset) */}
              <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 justify-center">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-[0.3em] text-accent-${cat.accent}`}>{cat.subtitle}</span>
                  <h2 className="text-3xl font-semibold tracking-tight text-white mt-2 font-gothic">{cat.title}</h2>
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

      {/* Full Screen Lightbox Modal */}
      <LightboxGallery 
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={activeImageIndex}
        setCurrentIndex={setActiveImageIndex}
      />
    </>
  );
}
