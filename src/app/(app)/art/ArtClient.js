"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import LightboxGallery from '@/components/LightboxGallery';

export default function ArtClient() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // 1. Traditional Studies Artwork
  const traditionalImages = [
    {
      src: "/images/art/drawings/eye-study.webp",
      title: "Eye Study",
      category: "Graphite Study",
      medium: "Graphite on paper",
      caption: "Graphite on paper. High-contrast study exploring iris micro-textures, skin folds, and controlled value transitions.",
      alt: "High-contrast graphite eye study showing detailed iris micro-textures, skin folds, and subtle light reflections on paper."
    }
  ];

  // 2. Tattoo Practice Artwork
  const tattooImages = [
    {
      src: "/images/art/tattoo/skull-flow-study.webp",
      title: "Skull & Flow Study",
      category: "Tattoo Practice",
      medium: "Synthetic practice skin · Black & grey ink",
      caption: "Synthetic skin study focused on skull structure, ornamental curves, pepper shading, and contrast control.",
      alt: "Black and grey reelskin tattoo practice of a skull with flowing ornamental curves and pepper shading."
    },
    {
      src: "/images/tattoos/mariotattoo.webp",
      title: "Mario Shading Practice",
      category: "Tattoo Practice",
      medium: "Synthetic practice skin · Black & grey ink",
      caption: "Practice on synthetic skin exploring consistent needle depth, solid fill packing, and linework control.",
      alt: "Synthetic skin tattoo practice of Mario with solid linework and fill shading."
    }
  ];

  // 3. Miniatures & 3D Prints Artwork
  const miniatureImages = [
    {
      src: "/images/art/butcher/The_Butcher-1.webp",
      title: "The Butcher Bust",
      category: "Miniatures & 3D Prints",
      medium: "Resin print · Acrylic painting & weathering",
      caption: "Resin print with layered acrylic washes, custom skin-tone blending, and weathering.",
      alt: "Painted resin bust of The Butcher showing layered skin tones, copper harness, and acrylic weathering."
    },
    {
      src: "/images/art/conan/Conan.webp",
      title: "Conan the Barbarian",
      category: "Miniatures & 3D Prints",
      medium: "Resin print · Acrylic painting",
      caption: "Resin print with flesh-tone transitions, metallic drybrushing, and hand-finished stone terrain base.",
      alt: "Painted resin miniature of Conan the Barbarian with drybrushed metallic steel and stone base."
    },
    {
      src: "/images/art/spacemarine/SpaceMarine.webp",
      title: "Space Marine",
      category: "Miniatures & 3D Prints",
      medium: "Miniature · Acrylic painting & battle weathering",
      caption: "Power armor acrylic painting practice with airbrush transitions and battle-damage weathering.",
      alt: "Space Marine miniature painted in deep blue power armor with battle-damage weathering."
    },
    {
      src: "/images/art/butcher/The_Butcher-2.webp",
      title: "The Butcher Bust - Spine Detail",
      category: "Miniatures & 3D Prints",
      medium: "Resin print · Detail study",
      caption: "Detailing on spine segments, muscle textures, and copper harness.",
      alt: "Close-up detail of The Butcher bust spine and harness."
    },
    {
      src: "/images/art/butcher/The_Butcher-3.webp",
      title: "The Butcher Bust - Profile",
      category: "Miniatures & 3D Prints",
      medium: "Resin print · Profile study",
      caption: "Contrast highlight check on tusks, horns, and facial contours.",
      alt: "Side profile of The Butcher bust showing horns and skin contours."
    },
    {
      src: "/images/art/conan/Conan-2.webp",
      title: "Conan the Barbarian - Close-up",
      category: "Miniatures & 3D Prints",
      medium: "Resin print · Close-up study",
      caption: "Macro view emphasizing skin shading, leather straps, and hair highlights.",
      alt: "Macro view of Conan miniature emphasizing facial expression and skin shading."
    }
  ];

  // 4. Digital & Generative Artwork
  const digitalImages = [
    {
      src: "/images/art/hero-banner.webp",
      title: "Obsidian Citadel",
      category: "Digital & Generative",
      medium: "Generative study · Digital curation & editing",
      caption: "Exploratory generative concept investigating monolithic scale, gothic architectural silhouettes, and atmosphere for worldbuilding projects.",
      alt: "Dark atmospheric concept showing obsidian monolithic towers and gothic arches under stormy clouds."
    }
  ];

  const allImages = [
    ...traditionalImages,
    ...tattooImages,
    ...miniatureImages,
    ...digitalImages
  ];

  const openLightboxWithImage = (imageSrc) => {
    const idx = allImages.findIndex((img) => img.src === imageSrc);
    if (idx !== -1) {
      setLightboxImages(allImages);
      setActiveImageIndex(idx);
      setIsLightboxOpen(true);
    }
  };

  return (
    <>
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1320px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* 1. Page Hero */}
        <section className="flex flex-col items-center text-center justify-center gap-4 max-w-4xl mx-auto relative pt-4 pb-2 md:pt-8 md:pb-4">
          {/* Ambient subtle glow backdrop */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-accent-purple/8 blur-[110px] rounded-full pointer-events-none -z-10" />

          <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
            ART
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-gothic text-balance">
            Learning through material and repetition.
          </h1>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-0.5 mb-0.5" />

          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 text-balance text-pretty">
            My visual work moves between graphite, charcoal, tattoo practice, miniatures and digital experimentation. Each medium asks for a different kind of control, but the underlying process remains observation, repetition and refinement.
          </p>

          <p className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-accent-purple font-medium mt-1">
            DRAWING &middot; TATTOO PRACTICE &middot; PHYSICAL CRAFT &middot; DIGITAL EXPERIMENTATION
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full sm:w-auto">
            <a 
              href="#traditional-studies" 
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
            >
              Explore the Work
            </a>
            <Link 
              href="/blog" 
              className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
            >
              Read Visual Notes
            </Link>
          </div>
        </section>

        {/* 2. Traditional Studies Section */}
        <section id="traditional-studies" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24">
          <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
              TRADITIONAL STUDIES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
              Learning to see more clearly.
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
            <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
              Drawing is where I slow down and study form, value, texture and edges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-8 items-start">
            
            {/* Featured Graphite Artwork Showcase */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div 
                onClick={() => openLightboxWithImage(traditionalImages[0].src)}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.5)] group hover:border-accent-purple/40 transition-all duration-500 cursor-pointer"
              >
                <Image 
                  src={traditionalImages[0].src} 
                  alt={traditionalImages[0].alt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 700px"
                  priority
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Hover Expand Cue */}
                <div className="absolute bottom-4 right-4 bg-obsidian-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-mono text-zinc-300">
                  <span>Expand</span>
                  <svg className="w-3.5 h-3.5 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="font-gothic text-sm text-white font-medium">{traditionalImages[0].title}</span>
                <span className="font-mono text-zinc-400 uppercase tracking-wider">{traditionalImages[0].medium}</span>
              </div>
            </div>

            {/* Featured Practice Editorial Card */}
            <div className="lg:col-span-5 flex flex-col">
              <GlassCard accent="purple" className="p-6 md:p-8 flex flex-col gap-5">
                
                {/* Header & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                    FEATURED PRACTICE
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent-purple" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                      ONGOING PRACTICE
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic">
                    Graphite &amp; Charcoal
                  </h3>
                  <p className="text-base md:text-[17px] leading-relaxed md:leading-8 text-zinc-300 font-light text-pretty">
                    The work moves between detailed graphite pieces, smaller observational studies and early charcoal exploration—using each drawing to better understand light, structure and controlled transitions.
                  </p>
                </div>

                {/* Materials Specification */}
                <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5 mt-1">
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">
                    Materials
                  </span>
                  <p className="text-sm text-zinc-200 font-mono font-light">
                    Graphite &middot; Charcoal &middot; Paper
                  </p>
                </div>

              </GlassCard>
            </div>

          </div>
        </section>

        {/* 3. Tattoo Practice Section */}
        <section id="tattoo-practice" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24 pt-4 border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
              TATTOO PRACTICE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
              Rebuilding control, one study at a time.
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
            <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
              After first learning tattooing more than two decades ago, I have returned to the practice through synthetic-skin studies—rebuilding control in linework, black-and-grey shading and composition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 md:gap-8 items-start">
            
            {/* Practice Context Card (5 columns) */}
            <div className="lg:col-span-5 flex flex-col">
              <GlassCard accent="purple" className="p-6 md:p-8 flex flex-col gap-5">
                
                {/* Header & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                    HAND CRAFT
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-accent-purple" />
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                      ACTIVE PRACTICE
                    </span>
                  </div>
                </div>

                {/* Focus & Materials */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                      Focus
                    </span>
                    <p className="text-sm md:text-base text-zinc-200 font-light leading-relaxed">
                      Linework &middot; Pepper Shading &middot; Whip Shading &middot; Composition
                    </p>
                  </div>

                  <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5">
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">
                      Materials
                    </span>
                    <p className="text-sm text-zinc-200 font-mono font-light">
                      Synthetic Practice Skin &middot; Black &amp; Grey Ink
                    </p>
                  </div>
                </div>

              </GlassCard>
            </div>

            {/* Tattoo Practice Studies Gallery (7 columns) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {tattooImages.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2.5">
                  <div 
                    onClick={() => openLightboxWithImage(item.src)}
                    className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.5)] group hover:border-accent-purple/40 transition-all duration-500 cursor-pointer"
                  >
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 350px"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Hover Expand Cue */}
                    <div className="absolute bottom-3 right-3 bg-obsidian-950/80 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[11px] font-mono text-zinc-300">
                      <span>Expand</span>
                      <svg className="w-3 h-3 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1 text-xs">
                    <span className="font-gothic text-sm text-white font-medium">{item.title}</span>
                    <span className="font-mono text-zinc-400 text-[11px] uppercase">{item.medium.split('·')[0]}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. Physical and Digital Forms */}
        <section id="other-forms" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24 pt-4 border-t border-white/5">
          <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
            <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
              OTHER FORMS
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
              From physical objects to digital experiments.
            </h2>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
            <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
              Some ideas are explored through objects and paint. Others begin as digital compositions and generative studies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-8 items-start">
            
            {/* Practice 1: Miniatures & 3D Prints */}
            <GlassCard accent="purple" className="p-6 md:p-8 flex flex-col gap-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                  PHYSICAL PRACTICE
                </span>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                  MINIATURES &middot; 3D PRINTS
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-gothic">
                  Miniatures &amp; 3D Prints
                </h3>
                <p className="text-base leading-relaxed md:leading-7 text-zinc-300 font-light text-pretty">
                  Printing, preparing and painting physical figures combines technical process with slower material decisions around surface, colour, contrast and wear.
                </p>
              </div>

              {/* Featured Showcase */}
              <div 
                onClick={() => openLightboxWithImage(miniatureImages[0].src)}
                className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group hover:border-accent-purple/40 transition-all duration-500 cursor-pointer"
              >
                <Image 
                  src={miniatureImages[0].src} 
                  alt={miniatureImages[0].alt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-200">
                  <span>{miniatureImages[0].title}</span>
                  <span className="text-[11px] text-zinc-400">Expand</span>
                </div>
              </div>

              {/* Detail Thumbnails */}
              <div className="grid grid-cols-3 gap-2.5">
                {miniatureImages.slice(1, 4).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => openLightboxWithImage(item.src)}
                    className="aspect-square rounded-lg overflow-hidden border border-white/[0.08] bg-obsidian-950 relative group hover:border-accent-purple/40 transition-all duration-300 cursor-pointer"
                  >
                    <Image 
                      src={item.src} 
                      alt={item.alt} 
                      fill
                      sizes="(max-width: 768px) 33vw, 15vw"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-obsidian-950/40 group-hover:opacity-0 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Scope */}
              <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">
                  Scope
                </span>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Resin and FDM Printing &middot; Preparation &middot; Acrylic Painting &middot; Miniatures
                </p>
              </div>

            </GlassCard>

            {/* Practice 2: Digital & Generative Work */}
            <GlassCard accent="cyan" className="p-6 md:p-8 flex flex-col gap-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-accent-cyan font-semibold">
                  EXPERIMENTAL PRACTICE
                </span>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-zinc-400 font-medium">
                  DIGITAL &middot; GENERATIVE
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-gothic">
                  Digital &amp; Generative Work
                </h3>
                <p className="text-base leading-relaxed md:leading-7 text-zinc-300 font-light text-pretty">
                  Generative tools form part of an exploratory visual workflow used to test composition, atmosphere and possible creative directions. Selected results are curated and, where relevant, developed further through editing, layout and project context.
                </p>
              </div>

              {/* Featured Showcase */}
              <div 
                onClick={() => openLightboxWithImage(digitalImages[0].src)}
                className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group hover:border-accent-cyan/40 transition-all duration-500 cursor-pointer"
              >
                <Image 
                  src={digitalImages[0].src} 
                  alt={digitalImages[0].alt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-200">
                  <span>{digitalImages[0].title}</span>
                  <span className="text-[11px] text-zinc-400">Expand</span>
                </div>
              </div>

              {/* Scope */}
              <div className="bg-obsidian-950/70 rounded-lg p-3.5 border border-white/5 text-xs mt-auto">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1 font-semibold">
                  Scope
                </span>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Generative Studies &middot; Image Curation &middot; Photoshop &middot; Visual Development
                </p>
              </div>

            </GlassCard>

          </div>
        </section>

        {/* 5. Closing Section */}
        <section className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto py-6 border-t border-white/5">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            THE WORK CONTINUES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            Some pieces are finished. Others exist to teach me what to do next.
          </h2>
          <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-balance text-pretty">
            The practice develops through observation, repetition and the willingness to begin again in a different material.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 mt-2 w-full sm:w-auto">
            <Link 
              href="/blog" 
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
            >
              Read the Journal
            </Link>
            <Link 
              href="/projects" 
              className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
            >
              Explore Selected Work
            </Link>
          </div>
        </section>

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
