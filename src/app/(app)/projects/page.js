import React from 'react';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: "Projects | Patrik von Porat",
  description: "A collection of websites, digital systems and creative experiments built to support my music, visual art, writing and process-driven workflows.",
  openGraph: {
    title: "Projects | Patrik von Porat",
    description: "A collection of websites, digital systems and creative experiments built to support my music, visual art, writing and process-driven workflows.",
    url: 'https://vonporat.com/projects',
  }
};

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col gap-8 relative">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
        <span className="text-xs font-mono tracking-[0.3em] text-accent-cyan uppercase">
          CREATIVE SYSTEMS & DIGITAL BUILDS
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic">
          Projects
        </h1>
        <div className="w-16 h-[2px] bg-accent-cyan mt-1" />
        <p className="text-sm md:text-base text-zinc-400 leading-7 mt-4 font-light max-w-2xl">
          A collection of websites, digital systems and creative experiments built to support my music, visual art, writing and process-driven workflows.
        </p>
      </div>

      {/* Interactive Projects Showcase */}
      <ProjectsClient />

    </div>
  );
}
