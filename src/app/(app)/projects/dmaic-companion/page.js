import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import CtaButton from '@/components/CtaButton';

export const metadata = {
  title: "DMAIC Companion | Selected Work | Patrik von Porat",
  description: "A local-first, guided web app for Lean Six Sigma improvement work. It teaches the method while you use it, and replaces PowerPoint and Excel/Minitab templates with guided workflows that export to a PowerPoint report.",
  alternates: {
    canonical: '/projects/dmaic-companion',
  },
  openGraph: {
    title: "DMAIC Companion | Selected Work | Patrik von Porat",
    description: "A local-first, guided web app for Lean Six Sigma improvement work. It teaches the method while you use it, and replaces PowerPoint and Excel/Minitab templates with guided workflows that export to a PowerPoint report.",
    url: 'https://vonporat.com/projects/dmaic-companion',
    images: [
      {
        url: '/images/projects/proof/dmaic-companion-featured-1600x900.png',
        width: 1200,
        height: 675,
        alt: 'DMAIC Companion – home screen with the three ways in and the D-M-A-I-C phase band',
      },
    ],
  }
};

export default function DmaicCompanionPage() {
  const metadataFacts = [
    { 
      label: "STATUS", 
      value: "Ongoing – all 37 tools built, self-testing before sharing with colleagues", 
      accent: "cyan" 
    },
    { 
      label: "CATEGORY", 
      value: "Web / Improvement Tools" 
    },
    { 
      label: "ROLE", 
      value: "Product idea, method design, specification and testing – built through AI-assisted development (Claude Code)" 
    },
    { 
      label: "ARCHITECTURE", 
      value: "Local-first SPA (client-side), installable as an app" 
    },
    { 
      label: "PERSISTENCE", 
      value: "Browser localStorage autosave + JSON project files (.dmaic.json)" 
    },
    { 
      label: "STACK", 
      value: "Vite, React, TypeScript, Tailwind CSS, React Flow, pptxgenjs, Vitest" 
    },
  ];

  const techStackLayers = [
    {
      layer: "RUNTIME & INTERFACE",
      badge: "UI Layer",
      accent: "cyan",
      items: [
        {
          name: "React 19 & Vite 8",
          detail: "Modern declarative interface with high-performance bundling and sub-second local hot reloading."
        },
        {
          name: "TypeScript 7 (Strict)",
          detail: "Strict type definitions across all 37 tool models, statistical outputs, schemas, and migration pipelines."
        },
        {
          name: "Tailwind CSS 4 & Themes",
          detail: "Clean, responsive interface with both light and dark themes tailored for focused analytical and workshop settings."
        },
        {
          name: "React Flow & PWA Support",
          detail: "Interactive Cause & Effect Tree visual editor powered by React Flow; installable as a standalone app via web manifest."
        }
      ]
    },
    {
      layer: "DATA & STATISTICS",
      badge: "Domain Engine",
      accent: "purple",
      items: [
        {
          name: "Single JSON Object Model",
          detail: "One project equals one JSON object with explicit schema versioning and automatic backward-compatible migrations on open."
        },
        {
          name: "Modular Tool Registry",
          detail: "Every project maintains a composable registry of tools, allowing analyses to start small and expand without restarting."
        },
        {
          name: "Native TypeScript Statistics",
          detail: "Core statistics written entirely in plain TypeScript—mean, standard deviation, histograms, and normal/t/F distributions without third-party math libraries."
        },
        {
          name: "Quality & Process Control",
          detail: "Built-in algorithms for normality testing, process capability (Cp/Cpk), control charts, hypothesis tests, regression, and Gage R&R—eliminating Minitab dependency."
        }
      ]
    },
    {
      layer: "TESTING & QUALITY",
      badge: "Verification",
      accent: "cyan",
      items: [
        {
          name: "Vitest (387 Tests in 62 Files)",
          detail: "Comprehensive automated test suite, including validation that every worked example passes every tool's checklist."
        },
        {
          name: "Oxlint Code Quality",
          detail: "Rapid static analysis enforcing uniform code standards across domain logic, tools, and test suites."
        },
        {
          name: "PowerPoint Export (pptxgenjs)",
          detail: "Client-side report engine generating structured, consulting-style PowerPoint slide decks directly from active project data."
        }
      ]
    }
  ];

  const dmaicPhases = [
    {
      phase: "Define",
      count: "7 Tools",
      color: "text-rose-400",
      accent: "rose",
      examples: "Improvement Charter, Stakeholder analysis, Voice of the Customer (VOC), CTQ Tree, Process Boundary Scope, SIPOC Preview, Project Risk Assessment"
    },
    {
      phase: "Measure",
      count: "7 Tools",
      color: "text-amber-400",
      accent: "amber",
      examples: "SIPOC, Value Stream Map, Data Collection Plan, Operational Definitions, MSA / Gage R&R, Process Baseline, Normality Check"
    },
    {
      phase: "Analyze",
      count: "10 Tools",
      color: "text-accent-purple",
      accent: "purple",
      examples: "5 Whys, Fishbone (Ishikawa), Pareto Analysis, Cause & Effect Tree, FMEA, Multi-Vari Analysis, Hypothesis Testing, Correlation & Regression, Process Flow Detailing, Root Cause Verification"
    },
    {
      phase: "Improve",
      count: "7 Tools",
      color: "text-accent-cyan",
      accent: "cyan",
      examples: "Solution Brainstorming, Solution Selection Matrix, Poka-Yoke (Mistake Proofing), Implementation Plan, Pilot Evaluation, Risk Mitigation, Future State VSM"
    },
    {
      phase: "Control",
      count: "6 Tools",
      color: "text-emerald-400",
      accent: "emerald",
      examples: "Process Capability Before/After (Cp/Cpk), Statistical Process Control Charts, Control Plan, Standard Operating Procedure (SOP), Training Matrix, Final Project Report"
    }
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
              WEB · IMPROVEMENT TOOLS
            </span>
            <span className="text-zinc-600 font-mono text-xs">&bull;</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-semibold">
                ONGOING
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            DMAIC Companion
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl text-balance text-pretty">
            A local-first, guided web app for Lean Six Sigma improvement work. It teaches the method while you use it, and replaces PowerPoint and Excel/Minitab templates with guided workflows that export to a PowerPoint report.
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

      {/* Visual Showcase Banner */}
      <section className="flex flex-col gap-3">
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <Image 
            src="/images/projects/proof/dmaic-companion-featured-1600x900.png" 
            alt="DMAIC Companion – home screen with the three ways in and the D-M-A-I-C phase band" 
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="w-full h-full object-cover object-center"
          />
        </div>
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
            Improvement Tool
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Learning by Building
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              As a Lean Six Sigma Green Belt learning the Apollo root cause analysis method, coursework arrived primarily as slide decks and Excel templates: helpful for reading, but slow for execution.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              The impulse was to build a tool that walks through the method step by step and explains why each step exists in practice.
            </p>
          </GlassCard>

          <GlassCard accent="cyan" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              From One Method to a Toolbox
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              The project started as the Apollo RCA Guide—12 guided steps from problem definition to lessons learned, structured along DMAIC principles.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              It quickly grew into DMAIC Companion: a cohesive environment supporting full DMAIC improvement projects and standalone Lean Six Sigma tools in one uniform format.
            </p>
          </GlassCard>

          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Personal Project
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              DMAIC Companion is an ongoing personal project and learning vehicle—not a commercial product, cloud service, or SaaS business.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Built without a formal coding background by defining requirements, testing every step, and letting an AI coding assistant write the code under a written method guide and strict working rules.
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
                <span>Zero Cloud</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                Runs entirely in the browser. There is no remote server, database, user accounts, or telemetry. Because improvement initiatives frequently handle sensitive operational information, nothing ever leaves the local machine.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span>Files Are the Real Save</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                Every modification autosaves continuously to the browser’s <code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">localStorage</code> as a safety net. The real save is a versioned <code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">.dmaic.json</code> project file that can be archived, backed up, and shared.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Guidance, Not Blockers</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                Every tool checks user input against methodology rules (for example, identifying if an entry states a cause rather than describing what occurred) and explains why. Practitioners always retain full freedom to proceed.
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
          
          {/* Three Ways In */}
          <GlassCard accent="cyan" className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Three Ways In
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Entry Points</span>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Users can approach improvement work through whichever lens fits the immediate problem at hand:
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-xs font-mono text-accent-cyan font-semibold uppercase tracking-wider">
                  1. DMAIC Improvement
                </span>
                <span className="text-xs text-zinc-300 font-light">
                  Full project trajectory from Improvement Charter through to Final Report.
                </span>
              </div>
              <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-xs font-mono text-accent-purple font-semibold uppercase tracking-wider">
                  2. Apollo RCA
                </span>
                <span className="text-xs text-zinc-300 font-light">
                  12 guided steps for systematic problem investigation, cause-and-effect charting, and root cause identification.
                </span>
              </div>
              <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
                  3. Single Tool
                </span>
                <span className="text-xs text-zinc-300 font-light">
                  Jump directly into an isolated tool (e.g. Fishbone, FMEA, Pareto) without needing a full project wrapper.
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light italic pt-1">
              Any tool can be added to an existing project later without starting over.
            </p>
          </GlassCard>

          {/* Method Built In */}
          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Method Built In
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Apollo Principles</span>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
              Root cause principles are woven directly into the interface rather than left to user discipline:
            </p>
            <div className="flex flex-col gap-2 pt-1 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-semibold uppercase tracking-wider shrink-0 w-28 text-accent-purple">Action &amp; Condition</span>
                <span className="text-zinc-400 font-light leading-relaxed">Every effect requires both an action and a condition; root causes are conditions that can be controlled.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-semibold uppercase tracking-wider shrink-0 w-28 text-accent-cyan">Evidence Driven</span>
                <span className="text-zinc-400 font-light leading-relaxed">Every causal statement requires evidence; causes without supporting evidence are visually marked with a &ldquo;?&rdquo;.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-semibold uppercase tracking-wider shrink-0 w-28 text-emerald-400">Blame Free</span>
                <span className="text-zinc-400 font-light leading-relaxed">&ldquo;Don&rsquo;t blame people &ndash; blame the process.&rdquo; Prompts encourage systemic solutions over individual fault.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-mono font-semibold uppercase tracking-wider shrink-0 w-28 text-amber-400">Worked Examples</span>
                <span className="text-zinc-400 font-light leading-relaxed">Integrated Learn library with guides and six complete worked examples—from the Titanic tragedy to full industrial DMAIC projects.</span>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* 37 Tools Phase Breakdown */}
        <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                37 Tools Across the DMAIC Framework
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Complete Coverage
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {dmaicPhases.map((phase, pIdx) => (
              <div key={pIdx} className="bg-obsidian-950/80 rounded-lg p-3.5 border border-white/5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${phase.color}`}>
                    {phase.phase}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-300">
                    {phase.count}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  {phase.examples}
                </p>
              </div>
            ))}
          </div>
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
                Completed (Current State)
              </h3>
            </div>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li><strong className="text-white font-normal">Apollo RCA Guide v1:</strong> 12 guided steps, worked examples, and PowerPoint export</li>
              <li><strong className="text-white font-normal">DMAIC Companion:</strong> All 37 tools built with zero placeholders remaining</li>
              <li><strong className="text-white font-normal">Export Engine:</strong> Formatted report and PowerPoint export for every project type</li>
              <li><strong className="text-white font-normal">Learn Library:</strong> Interactive guides for Define tools and six end-to-end worked examples</li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                Roadmap Candidates (Next)
              </h3>
            </div>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li><strong className="text-white font-normal">Learn Library Expansion:</strong> Guides and quizzes across all remaining tools</li>
              <li><strong className="text-white font-normal">Comprehensive Self-Test:</strong> End-to-end verification under a written test procedure</li>
              <li><strong className="text-white font-normal">Colleague Sharing:</strong> Packaged to run locally or as a hosted static web app</li>
              <li><strong className="text-white font-normal">Swedish Translation:</strong> Localized UI copy (all interface strings centralized)</li>
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
        <div className="flex items-center gap-4">
          <CtaButton 
            href="/about" 
            className="px-6 py-2.5 text-xs md:text-sm"
          >
            <span>How I Work</span>
            <span className="aurora-cta-arrow inline-block" aria-hidden="true">&rarr;</span>
          </CtaButton>
        </div>
      </section>

    </div>
  );
}
