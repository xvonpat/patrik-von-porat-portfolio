'use client'

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';

const CATEGORIES = [
  'All',
  'Websites',
  'CMS & Backend',
  'Music Projects',
  'Creative Workflows',
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
    accent: 'purple'
  },
  {
    id: 'ashwrithe',
    title: 'ashwrithe.com',
    category: 'Websites',
    status: 'In Development',
    typeLabel: 'Extreme Metal Project Site',
    description: 'A dark project website for Ashwrithe, created to establish the visual identity, atmosphere and conceptual foundation of the band before the first official release.',
    manifest: 'The site presents Ashwrithe as a developing blackened melodic death metal project shaped by frostbitten visuals, soot-dark atmosphere and ritualistic extreme metal aesthetics.',
    role: 'Concept, visual direction, content direction, website structure and project worldbuilding.',
    tags: ['Website', 'Music Project', 'Blackened Metal', 'Visual Identity', 'In Development'],
    cta: 'Enter Ashwrithe',
    link: 'https://ashwrithe.com',
    accent: 'zinc'
  }
];

// Placeholder upcoming projects for other categories to support natural expansion
const UPCOMING_PROJECTS = {
  'CMS & Backend': {
    title: 'CMS Control Center',
    label: 'Payload & Supabase Infrastructure',
    description: 'Production schema designs, robust access control policies, automated PostgreSQL backup solutions, and custom S3 storage adapters.'
  },
  'Music Projects': {
    title: 'Ashwrithe Soundscapes',
    label: 'Sonic Environment Index',
    description: 'Interactive audio manifest managing synth patches, digital release metadata pipelines, and distribution schedules.'
  },
  'Creative Workflows': {
    title: 'Realmforged Systems',
    label: 'Asset Generation Pipeline',
    description: 'Workflow architectures linking generative tooling with structural asset archives, batch prompt executors, and optimization logs.'
  },
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

  const upcomingProject = CATEGORIES.includes(activeFilter) && activeFilter !== 'All' && activeFilter !== 'Websites' 
    ? UPCOMING_PROJECTS[activeFilter] 
    : null;

  return (
    <div className="flex flex-col gap-12 mt-6">
      
      {/* Category Filter Selector Row */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 py-2 border-y border-white/5 max-w-4xl mx-auto w-full">
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.14), rgba(139, 92, 246, 0.12))',
                      border: '1px solid rgba(0, 229, 255, 0.45)',
                      boxShadow: '0 0 18px rgba(0, 229, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      color: '#e8fbff',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#a1a1aa',
                    }
              }
              className={`text-[10px] md:text-xs font-mono px-3 py-1.5 rounded transition-all duration-300 tracking-wider uppercase font-medium active:scale-[0.98] ${
                isActive
                  ? 'hover:border-accent-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.12)]'
                  : 'hover:text-white hover:border-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.03)]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Showcase Grid */}
      <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full z-10 relative">
        
        {/* Render Live Projects */}
        {filteredProjects.map((proj) => (
          <GlassCard key={proj.id} accent={proj.accent} className="p-6 md:p-8 flex flex-col gap-6">
            
            {/* Header Metadata Section */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-4 border-b border-white/5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    {proj.typeLabel}
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full ${proj.status === 'Live' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                  <span className={`text-[9px] font-mono tracking-wider ${proj.status === 'Live' ? 'text-emerald-400' : 'text-amber-400'} uppercase font-bold`}>
                    {proj.status}
                  </span>
                </div>
                <h2 className="text-3xl font-semibold text-white tracking-tight font-gothic mt-1">
                  {proj.title}
                </h2>
              </div>
              
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-800/40 border border-white/5 text-zinc-300 uppercase tracking-wider">
                {proj.category}
              </span>
            </div>

            {/* Content Details Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              
              {/* Left Column: Specifications */}
              <div className="md:col-span-1 flex flex-col gap-6 text-xs font-mono">
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Overview</span>
                  <p className="text-zinc-300 font-light leading-5 normal-case font-sans">{proj.description}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-zinc-500 uppercase tracking-widest text-[9px]">Role</span>
                  <p className="text-zinc-300 font-light leading-5 normal-case font-sans">{proj.role}</p>
                </div>
              </div>

              {/* Right Column: Case description & Tech */}
              <div className="md:col-span-2 flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-4">
                  <span className="text-zinc-500 font-mono uppercase tracking-widest text-[9px]">Manifest</span>
                  <p className="text-sm leading-6 text-zinc-400 font-light">
                    {proj.manifest}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Action Area */}
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase font-bold tracking-widest text-zinc-200 hover:text-white transition-colors duration-200 flex items-center gap-2 font-mono group"
              >
                <span>{proj.cta}</span>
                <svg 
                  className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
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
          <GlassCard accent="zinc" className="p-6 md:p-8 border border-dashed border-white/10 opacity-60 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-2 text-zinc-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[10px] font-mono tracking-widest uppercase">System Encrypted</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">{activeFilter}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-medium text-zinc-300 font-gothic tracking-wide">{upcomingProject.title}</h3>
              <span className="text-[10px] font-mono text-zinc-500">{upcomingProject.label}</span>
            </div>
            
            <p className="text-xs leading-5 text-zinc-400 font-light max-w-2xl">
              {upcomingProject.description}
            </p>
            
            <div className="text-[9px] font-mono text-zinc-600 uppercase pt-2">
              Status: Iterative staging scheduled with AI partner
            </div>
          </GlassCard>
        )}

        {/* Empty filter message fallback if no projects/upcoming matched */}
        {filteredProjects.length === 0 && !upcomingProject && (
          <div className="py-16 text-center flex flex-col items-center justify-center gap-3 border border-dashed border-white/5 rounded-lg bg-white/[0.01]">
            <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase">No Active Nodes</span>
            <p className="text-zinc-400 text-xs font-light max-w-sm leading-5">
              No builds have been staged for category &quot;{activeFilter}&quot; yet. Manifest expansion in progress.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
