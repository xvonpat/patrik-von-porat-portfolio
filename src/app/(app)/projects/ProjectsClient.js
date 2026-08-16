'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import BrowserFrame from '@/components/BrowserFrame';

const CATEGORIES = [
  'All',
  'Websites',
  'Music Projects',
  'Visual Craft',
  'Experiments',
  'Concepts'
];

const PROJECTS = [
  {
    id: 'vonporat',
    title: 'vonporat.com',
    category: 'Websites',
    status: 'Live',
    typeLabel: 'Personal Creative Hub',
    description: 'A personal creative hub connecting music, visual art, blog posts, AI experiments and process improvement.',
    manifest: 'Built with Next.js, Payload CMS, Supabase and Vercel. Connects modular content pipelines into a fast, unified digital workspace.',
    role: 'Concept, design direction, content, CMS structure and iterative development with AI-assisted coding.',
    tags: ['Website', 'Payload CMS', 'Supabase', 'Vercel', 'Creative Hub'],
    cta: 'View Site',
    link: 'https://vonporat.com',
    url: 'vonporat.com',
    image: '/images/projects/proof/proof-vonporat.webp',
    accent: 'cyan'
  },
  {
    id: 'realmforged',
    title: 'realmforgedofficial.com',
    category: 'Websites',
    status: 'Live',
    typeLabel: 'Story-Driven Metal Website',
    description: 'A dedicated website for Realmforged, built as a central hub for the project’s music, lore, releases, press material and visual identity.',
    manifest: 'The site supports the cinematic power metal concept behind Realmforged, combining dark fantasy atmosphere with practical release information, streaming links and press-facing content.',
    role: 'Concept, content direction, visual direction, website structure and ongoing project development.',
    tags: ['Website', 'Music Project', 'Power Metal', 'EPK', 'Dark Fantasy'],
    cta: 'View Site',
    link: 'https://realmforgedofficial.com',
    url: 'realmforgedofficial.com',
    image: '/images/projects/proof/proof-realmforged.webp',
    accent: 'purple'
  },
  {
    id: 'ashwrithe',
    title: 'ashwrithe.com',
    category: 'Websites',
    status: 'Live',
    typeLabel: 'Extreme Metal Project Site',
    description: 'A dark project website for Ashwrithe, establishing the visual identity, atmosphere and conceptual foundation of the band.',
    manifest: 'The site presents Ashwrithe as an active blackened melodic death metal project shaped by frostbitten visuals, soot-dark atmosphere and ritualistic extreme metal aesthetics.',
    role: 'Concept, visual direction, content direction, website structure and project worldbuilding.',
    tags: ['Website', 'Music Project', 'Blackened Metal', 'Visual Identity', 'Live'],
    cta: 'Enter Ashwrithe',
    link: 'https://ashwrithe.com',
    url: 'ashwrithe.com',
    image: '/images/projects/proof/proof-ashwrithe-showcase.webp',
    accent: 'purple'
  },
  {
    id: 'realmforged_music',
    title: 'Realmforged',
    category: 'Music Projects',
    status: 'Active',
    typeLabel: 'Story-Driven Power Metal Project',
    description: 'A cinematic power metal project built around dark fantasy storytelling, melodic guitar work and a growing world of interconnected songs, visuals and lore.',
    manifest: 'A symphonic power metal lore-concept designed for digital staging, physical media layouts, and cinematic lyric distribution.',
    role: 'Founder, songwriter, guitars, bass, keyboards, programming, lyrics, visual direction and website development.',
    tags: ['Power Metal', 'Dark Fantasy', 'Storytelling', 'Independent Release', 'Website'],
    cta: 'Visit Realmforged',
    link: 'https://realmforgedofficial.com',
    accent: 'purple'
  },
  {
    id: 'ashwrithe_music',
    title: 'Ashwrithe',
    category: 'Music Projects',
    status: 'In Development',
    typeLabel: 'Blackened Melodic Death Metal Project',
    description: 'A developing extreme metal project shaped by frostbitten melodies, soot-black atmosphere, crushing guitars and ritualistic darkness.',
    manifest: 'An atmospheric extreme metal concept engineered to establish design aesthetics, dark visuals, and raw sonic characteristics before physical release.',
    role: 'Concept, guitars, co-composition, visual direction, worldbuilding and website development.',
    tags: ['Blackened Metal', 'Melodic Death', 'Frostbitten', 'Visual Identity', 'Live'],
    cta: 'Enter Ashwrithe',
    link: 'https://ashwrithe.com',
    accent: 'purple'
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
    image: '/images/projects/proof/proof-graphite.webp',
    accent: 'purple'
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
    accent: 'purple'
  }
];

// Placeholder upcoming projects for other categories to support natural expansion
const UPCOMING_PROJECTS = {
  'Experiments': {
    title: 'AI Assisted Coding Log',
    label: 'Agentic Development Tracker',
    description: 'Telemetry and structured learnings of pair programming sessions, prompt chains, and automated migration routines.'
  },
  'Concepts': {
    title: 'DMAIC Metrics Engine',
    label: 'Six Sigma Flow Optimization',
    description: 'Analytical dashboards for tracking simulated cycle times, defect ratios, and continuous process improvements.'
  }
};

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter projects
  const filteredProjects = PROJECTS.filter(proj => 
    activeFilter === 'All' || proj.category === activeFilter
  );

  const upcomingProject = CATEGORIES.includes(activeFilter) && 
    activeFilter !== 'All' && 
    activeFilter !== 'Websites' && 
    activeFilter !== 'Music Projects' &&
    activeFilter !== 'Visual Craft'
    ? UPCOMING_PROJECTS[activeFilter] 
    : null;

  return (
    <div className="flex flex-col gap-10 mt-4">
      
      {/* Category Filter Selector Row */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 py-3 border-y border-white/5 max-w-4xl mx-auto w-full">
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.16), rgba(139, 92, 246, 0.14))',
                      border: '1px solid rgba(0, 229, 255, 0.5)',
                      boxShadow: '0 0 20px rgba(0, 229, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      color: '#e8fbff',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#a1a1aa',
                    }
              }
              className={`text-xs font-mono px-3.5 py-1.5 rounded transition-all duration-300 tracking-wider uppercase font-medium active:scale-[0.98] ${
                isActive
                  ? 'hover:border-accent-cyan/60 hover:shadow-[0_0_22px_rgba(0,229,255,0.18)]'
                  : 'hover:text-white hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.04)]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Grid */}
      <div className="flex flex-col gap-8 max-w-4xl xl:max-w-[1000px] mx-auto w-full z-10 relative">
        
        {/* Render Live Projects */}
        {filteredProjects.map((proj) => (
          <GlassCard key={proj.id} accent={proj.accent} className="p-6 md:p-8 flex flex-col gap-5">
            
            {/* Header Metadata Section */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-3.5 border-b border-white/5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-medium">
                    {proj.typeLabel}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${proj.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                  <span className={`text-[10px] md:text-xs font-mono tracking-wider ${proj.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'} uppercase font-bold`}>
                    {proj.status}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight font-gothic mt-0.5">
                  {proj.title}
                </h2>
              </div>
              
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-800/60 border border-white/[0.08] text-zinc-300 uppercase tracking-wider font-medium">
                {proj.category}
              </span>
            </div>

            {/* Content Details Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
              
              {/* Left Column: Specifications */}
              <div className="md:col-span-1 flex flex-col gap-5 text-xs md:text-sm font-mono">
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-semibold">Overview</span>
                  <p className="text-zinc-300 font-light leading-relaxed normal-case font-sans">{proj.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] md:text-xs font-semibold">Role</span>
                  <p className="text-zinc-300 font-light leading-relaxed normal-case font-sans">{proj.role}</p>
                </div>
              </div>

              {/* Right Column: Case description & Tech */}
              <div className="md:col-span-2 flex flex-col gap-4 justify-between">
                <div className="flex flex-col gap-2.5">
                  <span className="text-zinc-400 font-mono uppercase tracking-widest text-[10px] md:text-xs font-semibold">Manifest</span>
                  <p className="text-base leading-relaxed md:leading-8 text-zinc-300 font-light">
                    {proj.manifest}
                  </p>
                </div>

                {/* Tech tags */}
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

            {/* Visual Preview for Web Projects */}
            {proj.category === 'Websites' && (
              <div className="w-full pt-1">
                <BrowserFrame 
                  src={proj.image}
                  url={proj.url || (proj.link ? proj.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'vonporat.com')} 
                  alt={`${proj.title} website interface preview`} 
                />
              </div>
            )}

            {/* Visual Preview for Non-Web Projects */}
            {proj.image && proj.category !== 'Websites' && (
              <div className="w-full pt-1">
                <div className="w-full overflow-hidden rounded-[14px] border border-white/[0.08] bg-obsidian-950 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
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

            {/* Footer Action Area */}
            <div className="pt-3.5 border-t border-white/5 flex justify-end">
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm uppercase font-semibold tracking-widest text-zinc-300 hover:text-white transition-colors duration-200 flex items-center gap-2 font-mono group"
              >
                <span>{proj.cta}</span>
                <svg 
                  className="w-4 h-4 text-accent-purple group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            </div>

          </GlassCard>
        ))}

        {/* Render Upcoming Expansion Placeholder Card */}
        {upcomingProject && (
          <GlassCard accent="zinc" className="p-6 md:p-8 border border-dashed border-white/10 opacity-70 flex flex-col gap-3.5">
            <div className="flex justify-between items-center pb-2.5 border-b border-white/5">
              <div className="flex items-center gap-2 text-zinc-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs font-mono tracking-widest uppercase font-medium">System Encrypted</span>
              </div>
              <span className="text-xs font-mono text-zinc-400 uppercase font-medium">{activeFilter}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold text-white font-gothic tracking-wide">{upcomingProject.title}</h3>
              <span className="text-xs font-mono text-zinc-400">{upcomingProject.label}</span>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-light max-w-2xl">
              {upcomingProject.description}
            </p>
            
            <div className="text-xs font-mono text-zinc-500 uppercase pt-1">
              Status: Iterative staging scheduled with AI partner
            </div>
          </GlassCard>
        )}

        {/* Empty filter message fallback if no projects/upcoming matched */}
        {filteredProjects.length === 0 && !upcomingProject && (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-3 border border-dashed border-white/5 rounded-xl bg-white/[0.01]">
            <span className="text-zinc-400 font-mono text-xs tracking-widest uppercase font-semibold">No Active Nodes</span>
            <p className="text-zinc-300 text-sm font-light max-w-sm leading-relaxed">
              No builds have been staged for category &quot;{activeFilter}&quot; yet. Manifest expansion in progress.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
