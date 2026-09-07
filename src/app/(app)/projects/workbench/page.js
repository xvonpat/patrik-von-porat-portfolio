import React from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export const metadata = {
  title: "Workbench | Selected Work | Patrik von Porat",
  description: "A local-first project journal and personal tool built to track active work across creative domains, maintain a clear next action, and record chronological project decisions.",
  alternates: {
    canonical: '/projects/workbench',
  },
  openGraph: {
    title: "Workbench | Selected Work | Patrik von Porat",
    description: "A local-first project journal and personal tool built to track active work across creative domains, maintain a clear next action, and record chronological project decisions.",
    url: 'https://vonporat.com/projects/workbench',
  }
};

export default function WorkbenchPage() {
  const metadataFacts = [
    { label: "STATUS", value: "Ongoing · v1.0 complete", accent: "cyan" },
    { label: "CATEGORY", value: "Web / Personal Tools" },
    { label: "ROLE", value: "Product design, specification, development, and testing" },
    { label: "ARCHITECTURE", value: "Local-first SPA (Client-side)" },
    { label: "PERSISTENCE", value: "Browser localStorage (workbench_v1)" },
    { label: "STACK", value: "Vite, React, TypeScript, Vitest, Playwright" },
  ];

  const techStackLayers = [
    {
      layer: "RUNTIME & INTERFACE",
      badge: "UI Layer",
      accent: "cyan",
      items: [
        {
          name: "React 19 & React Router 8",
          detail: "Modern declarative user interface with client-side SPA routing for Dashboard, Project Detail, and Archive views."
        },
        {
          name: "Vite 8",
          detail: "Lightweight build tooling providing rapid local hot-reloading and optimized static asset packaging."
        },
        {
          name: "TypeScript (Strict)",
          detail: "End-to-end type safety defining strict domain enums, immutable entry types, project models, and reducer actions."
        },
        {
          name: "Design Token Architecture",
          detail: "Custom CSS custom properties with a focused dark palette, semantic badges, and responsive layouts tailored for mobile and desktop."
        }
      ]
    },
    {
      layer: "STATE & PERSISTENCE",
      badge: "Storage Layer",
      accent: "purple",
      items: [
        {
          name: "4-Layer Architecture",
          detail: "Strict boundary separation: React UI → Application State (WorkbenchProvider & useReducer) → Repository Interface → Storage Implementation."
        },
        {
          name: "WorkbenchRepository Interface",
          detail: "Clean TypeScript contract abstracting data persistence so storage backends can be swapped without touching UI logic."
        },
        {
          name: "Local-First Browser Persistence",
          detail: "Zero cloud dependencies. All data lives in browser localStorage under key 'workbench_v1', surviving page refreshes and browser restarts."
        },
        {
          name: "Corrupted Data Safeguards",
          detail: "Automated schema validation on load returning a typed LoadResult (valid, empty, or invalid) with a dedicated InvalidDataScreen to prevent data destruction."
        }
      ]
    },
    {
      layer: "TESTING & QUALITY",
      badge: "Verification",
      accent: "cyan",
      items: [
        {
          name: "Vitest 5 (Unit & Integration)",
          detail: "Comprehensive test suite verifying repository load/save behavior, parsing logic, invalid data detection, and reducer state transitions."
        },
        {
          name: "Playwright (End-to-End)",
          detail: "Headless browser tests validating full user workflows: project creation, inline next-action updates, append-only entries, and archiving."
        },
        {
          name: "Oxlint",
          detail: "Fast static analysis and linting enforcing consistent code quality across components, repository modules, and tests."
        }
      ]
    }
  ];

  const domains = [
    "Music",
    "Traditional Art",
    "Tattoo",
    "3D Printing",
    "Web",
    "Learning",
    "Other"
  ];

  const entryTypes = [
    { type: "Note", desc: "General progress notes, context, or observations.", color: "text-zinc-300" },
    { type: "Experiment", desc: "Testing an assumption, new material, or technique.", color: "text-accent-purple" },
    { type: "Decision", desc: "An architectural or aesthetic choice and its rationale.", color: "text-accent-cyan" },
    { type: "Result", desc: "Verified outcome of an experiment or production step.", color: "text-emerald-400" },
    { type: "Correction", desc: "Append-only amendment to address an earlier error without rewriting history.", color: "text-amber-400" }
  ];

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-14 md:gap-20 relative z-10">
      
      {/* 1. Header & Breadcrumb */}
      <section className="flex flex-col gap-6 pt-2">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors self-start group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
          <span>Back to Selected Work</span>
        </Link>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs md:text-sm font-mono uppercase tracking-widest text-accent-cyan font-semibold">
              WEB · PERSONAL TOOLS
            </span>
            <span className="text-zinc-600 font-mono text-xs">&bull;</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-semibold">
                ONGOING · V1.0 COMPLETE
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Workbench
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl text-balance text-pretty">
            A local-first project journal and personal tool designed to track active work across multidisciplinary craft, maintain a clear next action, and preserve an honest record of decisions.
          </p>
        </div>
      </section>

      {/* 2. Metadata Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 p-5 md:p-6 rounded-2xl bg-obsidian-950/60 border border-white/[0.08] backdrop-blur-md">
        {metadataFacts.map((fact, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 font-medium">
              {fact.label}
            </span>
            <span className={`text-sm md:text-[15px] font-sans text-zinc-200 ${fact.accent === 'cyan' ? 'text-accent-cyan font-medium' : ''}`}>
              {fact.value}
            </span>
          </div>
        ))}
      </section>

      {/* 3. Project Purpose & Philosophy */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Context &amp; Purpose
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Personal Tool
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              The Multidisciplinary Friction
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Working concurrently across music production, traditional drawing, tattoo practice, 3D printing, web development, and systems analysis creates frequent context-switching. Without clear boundaries, project momentum stalls when returning to a discipline after days or weeks away.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Generic task managers and issue trackers are built around infinite backlogs, deadlines, and corporate workflows. Workbench was built as a dedicated personal tool to solve one specific problem: knowing the single next meaningful action for every project the moment you step up to the bench.
            </p>
          </GlassCard>

          <GlassCard accent="cyan" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Personal Learning Project
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Workbench is an ongoing personal tool and learning exploration. It is not a commercial product, a cloud platform, or a public SaaS service. It was designed to test disciplined client-side architecture, local-first data resilience, and automated testing with zero backend overhead.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Version 1.0 is fully complete and in daily personal use. Future development continues iteratively based on genuine studio needs rather than speculative feature lists.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 4. Local-First Guarantees & Privacy */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Local-First Principles
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Zero Cloud
          </span>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>No Cloud Synchronization</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                Workbench runs 100% in the browser. There is no remote database, no user account, no telemetry, and no network requests for data storage. All notes, experiments, and decisions stay entirely on the local device.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <span>Browser Storage (localStorage)</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                Data persists in the browser’s <code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">localStorage</code> under the versioned key <code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">workbench_v1</code>. State reliably survives tab refreshes, window closures, and browser restarts.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Repository Abstraction</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                The UI layer never touches browser APIs directly. All reads and writes pass through a typed repository interface. If local storage is ever migrated to IndexedDB or a local file system API, zero component code changes will be required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Complete Technology Stack */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Complete Technology Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Specification
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {techStackLayers.map((layer, lIdx) => (
            <div 
              key={lIdx}
              className="rounded-xl border border-white/[0.08] bg-obsidian-950/70 p-5 md:p-6 flex flex-col gap-5 justify-between"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className={`text-[10px] md:text-xs font-mono uppercase tracking-wider font-semibold ${layer.accent === 'purple' ? 'text-accent-purple' : 'text-accent-cyan'}`}>
                    {layer.layer}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400 uppercase">
                    {layer.badge}
                  </span>
                </div>

                <div className="flex flex-col gap-3.5">
                  {layer.items.map((item, iIdx) => (
                    <div key={iIdx} className="flex flex-col gap-1">
                      <h4 className="text-sm font-semibold text-white font-mono">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Core Workflow & Data Model */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Data Model &amp; Mechanics
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Workflow Design
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Domains */}
          <GlassCard accent="cyan" className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Disciplinary Domains
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">7 Scopes</span>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Every project belongs to an explicit domain, allowing instant visual filtering and categorization across distinct craft disciplines:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {domains.map((dom, dIdx) => (
                <span 
                  key={dIdx}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900/90 border border-white/10 text-zinc-200"
                >
                  {dom}
                </span>
              ))}
            </div>
            <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 mt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan block mb-1 font-semibold">
                Single Next Action Rule
              </span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                Each active project holds exactly one next action. There are no secondary lists or subtasks. This eliminates analysis paralysis and guarantees immediate momentum upon opening the dashboard.
              </p>
            </div>
          </GlassCard>

          {/* Append-Only Entries */}
          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Append-Only Journal Entries
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Immutable History</span>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Entries are permanent and cannot be edited or deleted. If an error occurs, an explicit <span className="text-amber-400 font-medium">Correction</span> entry is recorded. This preserves an authentic chronology of decisions and outcomes:
            </p>
            <div className="flex flex-col gap-2 pt-1">
              {entryTypes.map((et, eIdx) => (
                <div key={eIdx} className="flex items-start gap-2.5 text-xs">
                  <span className={`font-mono font-semibold uppercase tracking-wider shrink-0 w-24 ${et.color}`}>
                    {et.type}
                  </span>
                  <span className="text-zinc-400 font-light leading-relaxed">
                    {et.desc}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </section>

      {/* 7. Current State & Future Roadmap */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Status &amp; Future Development
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Evolution
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                v1.0 Complete (Current State)
              </h3>
            </div>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li>Active project dashboard with dynamic next-action visibility</li>
              <li>Chronological entry logging with tags and distinct entry badges</li>
              <li>Inline next-action editing without full form modals</li>
              <li>Project archiving and reversible restoration</li>
              <li>LocalStorage persistence with schema validation</li>
              <li>Full test suite with Vitest unit tests and Playwright browser specs</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                Roadmap Candidates (Backlog)
              </h3>
            </div>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li><strong className="text-white font-normal">v1.1 Backup &amp; Restore:</strong> Validated JSON export and import with dry-run verification</li>
              <li><strong className="text-white font-normal">Activity Timestamps:</strong> Optional event occurrence date (<code className="text-accent-cyan font-mono text-xs">occurredAt</code>) distinct from entry creation</li>
              <li><strong className="text-white font-normal">Image Attachments:</strong> Local image storage via IndexedDB for photos of prints, drawings, and prototypes</li>
              <li><strong className="text-white font-normal">Search &amp; Templates:</strong> Fast content search and domain-specific starter templates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Bottom Navigation Footer */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <span>&larr;</span>
          <span>Back to All Projects</span>
        </Link>
        <Link 
          href="/about" 
          className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono text-xs md:text-sm uppercase tracking-wider font-semibold border border-white/20 hover:border-accent-cyan/50 backdrop-blur-md transition-premium"
        >
          How I Work &rarr;
        </Link>
      </section>

    </div>
  );
}
