'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import BrowserFrame from '@/components/BrowserFrame';

const CATEGORIES = [
  'All',
  'Websites',
  'Visual Craft'
];

const PROJECTS = [
  {
    id: 'vonporat',
    title: 'vonporat.com',
    category: 'Websites',
    status: 'Live',
    typeLabel: 'Personal Creative Hub',
    description: 'The central home for my creative and professional work, bringing music, visual art, writing and structured experimentation into one connected space.',
    manifest: 'Designed as a modular platform rather than a static portfolio, the site connects evolving projects, long-form writing and practical systems within one coherent identity.',
    role: 'Concept, design direction, content architecture, CMS structure and AI-assisted development.',
    tags: ['Next.js', 'Payload CMS', 'Supabase', 'Vercel'],
    cta: 'View Site',
    link: 'https://vonporat.com',
    url: 'vonporat.com',
    image: '/images/projects/proof/proof-vonporat-hub.webp',
    accent: 'cyan',
    isExternal: true
  },
  {
    id: 'realmforged',
    title: 'realmforgedofficial.com',
    category: 'Websites',
    status: 'Live',
    typeLabel: 'Cinematic Power Metal Project',
    description: 'The official digital home of Realmforged, bringing releases, lore, press resources and the project’s visual identity into one central hub.',
    manifest: 'Designed to balance cinematic worldbuilding with practical access to music, release information and press materials.',
    role: 'Concept, content architecture, visual direction, website structure and ongoing development.',
    tags: ['Music Project', 'Power Metal', 'EPK', 'Dark Fantasy'],
    cta: 'View Site',
    link: 'https://realmforgedofficial.com',
    url: 'realmforgedofficial.com',
    image: '/images/projects/proof/realmforged-showcase1.webp',
    accent: 'purple',
    isExternal: true
  },
  {
    id: 'ashwrithe',
    title: 'ashwrithe.com',
    category: 'Websites',
    status: 'Live',
    typeLabel: 'Dark Extreme Metal Project',
    description: 'The official digital home of Ashwrithe, bringing its music, visual identity and evolving world into one focused experience.',
    manifest: 'Designed as an extension of the project itself, the site unites releases, imagery and narrative fragments within a restrained, atmospheric interface.',
    role: 'Concept, visual direction, content architecture, website structure and project worldbuilding.',
    tags: ['Website', 'Music Project', 'Visual Direction'],
    cta: 'View Site',
    link: 'https://ashwrithe.com',
    url: 'ashwrithe.com',
    image: '/images/projects/proof/proof-ashwrithe-showcase.webp',
    accent: 'purple',
    isExternal: true
  },
  {
    id: 'graphite_practice',
    title: 'Graphite Practice',
    category: 'Visual Craft',
    status: 'Active Practice',
    typeLabel: 'Traditional Pencil & Dark Realism',
    description: 'High-contrast dark realism, pencil portraits, and mythological anatomy studies exploring shadow, light falloff, and tactile texture.',
    manifest: 'Traditional physical graphite drawing serving as a tactile counterweight to digital art, 3D pipelines, and software engineering.',
    role: 'Graphite Artist — Pencil portraiture, anatomical studies, chiaroscuro shading, and physical originals.',
    tags: ['Traditional Art', 'Graphite', 'Dark Realism', 'Anatomy', 'Portraiture'],
    cta: 'View Art Gallery',
    link: '/art',
    image: '/images/art/drawings/eye-study.webp',
    accent: 'purple',
    isExternal: false
  },
  {
    id: 'tattoo_practice',
    title: 'Tattoo Practice',
    category: 'Visual Craft',
    status: 'Active Practice',
    typeLabel: 'Needle Technique & Flash Studies',
    description: 'Honing precision linework, pepper shading, whip shading, and dark-art ornamental iconography on synthetic Reelskin.',
    manifest: 'Dedicated technical studies developing clean ink saturation, steady hand control, and enduring black-and-grey skin composition.',
    role: 'Tattoo Practitioner — Needle control, whip shading, stencil creation, flash design.',
    tags: ['Tattoo Craft', 'Black & Grey', 'Linework', 'Pepper Shading', 'Flash Art'],
    cta: 'View Practice',
    link: '/art',
    image: '/images/projects/proof/proof-tattoo.webp',
    accent: 'purple',
    isExternal: false
  }
];

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Fallback gracefully to 'All' if an unknown or deprecated filter (e.g., 'Music Projects') is encountered
  const currentFilter = CATEGORIES.includes(activeFilter) ? activeFilter : 'All';

  // Filter projects
  const filteredProjects = PROJECTS.filter(proj => 
    currentFilter === 'All' || proj.category === currentFilter
  );

  const filterAccents = {
    'All': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
    'Websites': 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5',
    'Visual Craft': 'text-accent-purple border-accent-purple/30 bg-accent-purple/5'
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Live':
        return {
          dotClass: 'bg-emerald-400',
          textClass: 'text-emerald-400',
          label: 'Live'
        };
      case 'Active':
        return {
          dotClass: 'bg-accent-purple',
          textClass: 'text-accent-purple',
          label: 'Active'
        };
      case 'Active Practice':
        return {
          dotClass: 'bg-accent-purple',
          textClass: 'text-accent-purple',
          label: 'Active Practice'
        };
      case 'In Development':
        return {
          dotClass: 'bg-amber-400',
          textClass: 'text-amber-400',
          label: 'In Development'
        };
      default:
        return {
          dotClass: 'bg-zinc-400',
          textClass: 'text-zinc-400',
          label: status
        };
    }
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* Category Navigation Filter - Aligned with Blog Filter */}
      <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-xs font-mono py-3 border-y border-white/5 max-w-4xl mx-auto w-full">
        {CATEGORIES.map((cat, idx) => {
          const isActive = activeFilter === cat;
          return (
            <React.Fragment key={cat}>
              {idx > 0 && <span className="text-zinc-700 select-none">&middot;</span>}
              <button
                onClick={() => setActiveFilter(cat)}
                className={`transition-all duration-300 uppercase tracking-widest px-3.5 py-1.5 rounded font-medium text-xs font-mono focus-visible:ring-2 focus-visible:ring-accent-purple focus:outline-none ${
                  isActive
                    ? `${filterAccents[cat] || 'text-accent-cyan border-accent-cyan/30 bg-accent-cyan/5'} border shadow-[0_0_20px_rgba(0,229,255,0.12)]`
                    : 'text-zinc-400 hover:text-white bg-transparent border border-transparent'
                }`}
              >
                {cat}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Showcase List Container */}
      <div className="flex flex-col gap-7 max-w-5xl xl:max-w-5xl 2xl:max-w-[1100px] mx-auto w-full z-10 relative">
        
        {filteredProjects.map((proj) => {
          const statusInfo = getStatusBadge(proj.status);
          const isPurple = proj.accent === 'purple';
          const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

          return (
            <GlassCard 
              key={proj.id} 
              accent={proj.accent} 
              className="p-5 sm:p-6 md:p-7 flex flex-col gap-5"
            >
              
              {/* 1. Top Metadata Row: Type Label, Status, and Category Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pb-3 border-b border-white/5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] md:text-xs font-mono tracking-widest text-zinc-400 uppercase font-medium">
                      {proj.typeLabel}
                    </span>
                    <span className="text-zinc-700 select-none">&bull;</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${statusInfo.dotClass} animate-pulse`} />
                      <span className={`text-[10px] md:text-[11px] font-mono tracking-wider ${statusInfo.textClass} uppercase font-semibold`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                  
                  {/* 2. Project Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-white tracking-tight font-gothic mt-0.5">
                    {proj.title}
                  </h2>
                </div>
                
                <div className="self-start sm:self-auto">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-900/80 border border-white/[0.08] text-zinc-300 uppercase tracking-wider font-medium inline-block">
                    {proj.category}
                  </span>
                </div>
              </div>

              {/* 3 & 4. Content Details Split: Overview, Role, Project Intent & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-7">
                
                {/* Left Column: Specifications (Overview & Role) */}
                <div className="md:col-span-5 flex flex-col gap-4 text-xs md:text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-mono font-semibold">Overview</span>
                    <p className="text-zinc-300 font-light leading-relaxed font-sans text-sm md:text-[15px] text-pretty">{proj.description}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-mono font-semibold">Role</span>
                    <p className="text-zinc-300 font-light leading-relaxed font-sans text-sm md:text-[15px] text-pretty">{proj.role}</p>
                  </div>
                </div>

                {/* Right Column: Project Intent & Technology Tags */}
                <div className="md:col-span-7 flex flex-col gap-4 justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-mono font-semibold">Project Intent</span>
                    <p className="text-sm md:text-[15px] leading-relaxed text-zinc-300 font-light font-sans text-pretty">
                      {proj.manifest}
                    </p>
                  </div>

                  {/* 5. Technology / Category Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900/80 border border-white/5 text-zinc-300 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* 6. Visual Proof / Screenshot */}
              {proj.category === 'Websites' && proj.image && (
                <div className="w-full pt-1">
                  <BrowserFrame 
                    src={proj.image}
                    url={proj.url || (proj.link ? proj.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'vonporat.com')} 
                    alt={`${proj.title} website interface preview`} 
                  />
                </div>
              )}

              {proj.category !== 'Websites' && proj.image && (
                <div className="w-full pt-1">
                  <div className="w-full overflow-hidden rounded-[12px] border border-white/[0.08] bg-obsidian-950 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <div className="relative w-full aspect-[16/10] bg-obsidian-950 overflow-hidden group">
                      <Image
                        src={proj.image}
                        alt={`${proj.title} proof showcase`}
                        fill
                        quality={90}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1024px"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 7. Footer Action CTA */}
              <div className="pt-3.5 border-t border-white/5 flex justify-end">
                {proj.isExternal ? (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm uppercase font-semibold tracking-widest text-zinc-300 hover:text-white transition-colors duration-200 flex items-center gap-2 font-mono group focus-visible:ring-2 focus-visible:ring-accent-purple focus:outline-none rounded p-1"
                  >
                    <span>{proj.cta}</span>
                    <svg 
                      className={`w-4 h-4 ${accentClass} group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} 
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
                    className="text-xs md:text-sm uppercase font-semibold tracking-widest text-zinc-300 hover:text-white transition-colors duration-200 flex items-center gap-2 font-mono group focus-visible:ring-2 focus-visible:ring-accent-purple focus:outline-none rounded p-1"
                  >
                    <span>{proj.cta}</span>
                    <span className={`${accentClass} group-hover:translate-x-0.5 transition-transform`}>&rarr;</span>
                  </Link>
                )}
              </div>

            </GlassCard>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-3 border border-dashed border-white/5 rounded-xl bg-white/[0.01]">
            <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase font-semibold">No Projects Found</span>
            <p className="text-zinc-300 text-sm font-light max-w-sm leading-relaxed">
              No projects found in category &quot;{activeFilter}&quot;.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
