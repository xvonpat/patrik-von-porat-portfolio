import React from 'react';
import GlassCard from '@/components/GlassCard';

export default function Projects() {
  const projects = [
    {
      title: "DMAIC Companion",
      category: "Process Improvement / Six Sigma",
      description: "An interactive, web-based toolkit built to streamline continuous improvement projects. Simplifies the Define, Measure, Analyze, Improve, and Control stages, providing structured templates, data visualization interfaces, and metric recalculations on the fly.",
      tech: ["React", "Tailwind CSS", "Chart.js", "LocalStorage"],
      accent: "cyan",
      stats: { metric: "Cycle Time Reduction", value: "35% (Simulated)" }
    },
    {
      title: "Hobby Room Inventory",
      category: "Resource Management System",
      description: "A tailored inventory tracker designed for physical hobbyists. Enables tracking of resin stock levels, miniature paints (sorted by brand/color code), airbrush nozzles, cure cycles, and raw filament materials, complete with smart barcode/QR scanning capabilities.",
      tech: ["Next.js", "Supabase", "Tailwind CSS", "HTML5 QR Scanner"],
      accent: "orange",
      stats: { metric: "Stock Level Accuracy", value: "99.8%" }
    },
    {
      title: "AI Asset Vault",
      category: "Digital Asset Repository",
      description: "A high-performance personal system designed to index, search, and categorize AI-synthesized 3D assets, textures, and custom checkpoints. Automatically reads metadata prompts, tags images, and indexes files for fast local retrieval.",
      tech: ["Node.js", "sqlite3", "Tailwind CSS", "ExifReader"],
      accent: "cyan",
      stats: { metric: "Retrieval Speed", value: "<150ms" }
    },
    {
      title: "Music Release Command Center",
      category: "Operations Pipeline Dashboard",
      description: "A centralized operations center built to organize, distribute, and track musical releases. Manages everything from artwork specs, lyrics files, Spotify URI registration codes, social media schedules, and digital distributor deadlines.",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Notion API"],
      accent: "purple",
      stats: { metric: "Release Milestones Tracked", value: "48+" }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-12 relative">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase">Systems & Tools</span>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-widest text-white">Project Vault</h1>
        <div className="w-16 h-[2px] bg-accent-cyan mt-2" />
        <p className="text-sm text-zinc-400 leading-6 mt-4">
          A showcase of custom software utilities built to optimize creative and logistical workflows. Fusing technology with organization to create streamlined systems.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 relative z-10">
        {projects.map((proj, idx) => (
          <GlassCard key={idx} accent={proj.accent} className="flex flex-col justify-between h-full">
            <div>
              {/* Header */}
              <div className="mb-4">
                <span className={`text-[10px] font-mono uppercase tracking-[0.25em] text-accent-${proj.accent}`}>
                  {proj.category}
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide mt-1 font-gothic">
                  {proj.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-sm leading-6 text-zinc-400 font-light mb-6">
                {proj.description}
              </p>
            </div>

            {/* Footer Details */}
            <div>
              {/* Core statistic banner */}
              <div className="bg-obsidian-950/60 border border-white/5 rounded-md p-4 mb-6 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-500 uppercase tracking-wider">{proj.stats.metric}</span>
                <span className={`text-accent-${proj.accent} font-bold`}>{proj.stats.value}</span>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tech.map((techItem, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-1 rounded bg-obsidian-850 border border-white/5 text-zinc-400 uppercase tracking-wider">
                    {techItem}
                  </span>
                ))}
              </div>

              {/* Button */}
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button className={`text-xs uppercase font-bold tracking-widest text-zinc-400 hover:text-accent-${proj.accent} transition-colors duration-200 flex items-center gap-1 font-mono`}>
                  <span>Explore Stack</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
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
