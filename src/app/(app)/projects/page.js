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
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-12 flex flex-col gap-7 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
        <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-cyan uppercase font-medium">
          CREATIVE SYSTEMS &amp; DIGITAL BUILDS
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic">
          Projects
        </h1>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent mt-1" />
        <p className="text-base md:text-lg text-zinc-300 leading-relaxed md:leading-8 mt-1 font-light max-w-2xl">
          A collection of websites, digital systems and creative experiments built to support my music, visual art, writing and process-driven workflows.
        </p>
      </div>

      {/* Interactive Projects Showcase */}
      <ProjectsClient />

    </div>
  );
}
