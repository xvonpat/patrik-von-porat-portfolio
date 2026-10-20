import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import CtaButton from '@/components/CtaButton';

export const metadata = {
  title: "DMAIC Companion | Selected Work | Patrik von Porat",
  description: "A guided web app for Lean Six Sigma improvement work and Apollo root cause analysis. It teaches the method while you use it, with guides, interactive labs and gentle checks, and replaces PowerPoint and Excel/Minitab templates with guided workflows that end in a PowerPoint report.",
  alternates: {
    canonical: '/projects/dmaic-companion',
  },
  openGraph: {
    title: "DMAIC Companion | Selected Work | Patrik von Porat",
    description: "A guided web app for Lean Six Sigma improvement work and Apollo root cause analysis. It teaches the method while you use it, with guides, interactive labs and gentle checks, and replaces PowerPoint and Excel/Minitab templates with guided workflows that end in a PowerPoint report.",
    url: 'https://vonporat.com/projects/dmaic-companion',
    images: [
      {
        url: '/images/projects/dmaic-companion/01-hero-promo.png',
        width: 1600,
        height: 1000,
        alt: 'DMAIC Companion: "Every Lean Six Sigma tool. One guided flow." with a wall of real tool screens: Cause & Effect Tree, Pareto, control chart, capability, Fishbone, boxplot and more',
      },
    ],
  }
};

export default function DmaicCompanionPage() {
  const metadataFacts = [
    { 
      label: "STATUS", 
      value: "Live at dmaic.vonporat.com (invite only). All 37 tools built; self-testing and initial user invites", 
      accent: "cyan" 
    },
    { 
      label: "CATEGORY", 
      value: "Web / Improvement Tools" 
    },
    { 
      label: "ROLE", 
      value: "Product idea, method design, specification and testing, built through AI-assisted development (Claude Code)" 
    },
    { 
      label: "ARCHITECTURE", 
      value: "Local-first web app (client-side), installable, with an optional online sign-in" 
    },
    { 
      label: "PERSISTENCE", 
      value: "Projects stay on the user's computer: browser autosave + .dmaic.json project files. Online only: sign-in and user list" 
    },
    { 
      label: "STACK", 
      value: "Vite, React, TypeScript, Tailwind CSS, React Flow, pptxgenjs, Supabase, Vercel, Vitest" 
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
          detail: "Declarative interface, fast local builds."
        },
        {
          name: "TypeScript 7 (Strict)",
          detail: "Typed models for all 37 tools, statistics, file schema and migrations."
        },
        {
          name: "Tailwind CSS 4 & 12 Themes",
          detail: "From calm \"Cream paper\" to a vonporat.com theme with the site's own fonts; colour meanings (action, condition, root cause) are the same in every theme."
        },
        {
          name: "React Flow, Installable App, Phone Layout",
          detail: "Interactive charts (Cause & Effect Tree, Fishbone, Value Stream Map…) with full-screen mode; installs as an app; usable on a phone."
        }
      ]
    },
    {
      layer: "DATA & STATISTICS",
      badge: "Domain Engine",
      accent: "purple",
      items: [
        {
          name: "One JSON Object per Project",
          detail: "Schema version and backward-compatible migrations on open."
        },
        {
          name: "Modular Tool Registry",
          detail: "Every project is a list of tools, so any project can grow."
        },
        {
          name: "Statistics in Plain TypeScript",
          detail: "Mean, standard deviation, histograms, normal/t/F distributions, normality test. No maths library."
        },
        {
          name: "Quality & Process Control",
          detail: "Capability (Cp/Cpk), control charts, hypothesis tests and ANOVA, regression and Gage R&R. No Minitab needed. Data is pasted straight from Excel."
        }
      ]
    },
    {
      layer: "ONLINE, TESTING & QUALITY",
      badge: "Verification & Online",
      accent: "cyan",
      items: [
        {
          name: "Vercel + Supabase",
          detail: "Hosted at dmaic.vonporat.com; invite-only sign-in with e-mail invites, user/admin roles, and an Admin panel for people, tool release and feedback. Tight database rules: each user can only read their own profile."
        },
        {
          name: "Vitest (678 Tests in 79 Files)",
          detail: "Including checks that every worked example passes every tool's checklist, and that every guide and glossary term is consistent."
        },
        {
          name: "Oxlint & PowerPoint Export",
          detail: "Fast code checks; client-side PowerPoint report (pptxgenjs) for every project type."
        }
      ]
    }
  ];

  const labsList = [
    {
      num: "1",
      title: "Center, spread and histograms",
      desc: "Drag the dots and watch the mean, median and histogram move."
    },
    {
      num: "2",
      title: "Sampling",
      desc: "Draw samples and see why bigger samples give more precise answers."
    },
    {
      num: "3",
      title: "Process capability",
      desc: "Slide the centre, the spread and the limits; watch Cp and Cpk respond."
    },
    {
      num: "4",
      title: "Control charts",
      desc: "Shift or drift the process and see when the chart notices, and by which rule."
    },
    {
      num: "5",
      title: "Boxplots",
      desc: "Three shifts as boxes, with the data points that make them."
    },
    {
      num: "6",
      title: "Correlation",
      desc: "Order size against packing time, and why correlation is not causation."
    },
    {
      num: "7",
      title: "Process flow",
      desc: "Orders flowing through a warehouse: throughput, lead time, work in progress, Little's law and the bottleneck."
    }
  ];

  const dmaicPhases = [
    {
      phase: "Define",
      count: "7 Tools",
      color: "text-rose-400",
      accent: "rose",
      examples: "Problem definition, Team & scope, Improvement Charter, Stakeholder analysis, Communication plan, Voice of the Customer, Define tollgate"
    },
    {
      phase: "Measure",
      count: "7 Tools",
      color: "text-amber-400",
      accent: "amber",
      examples: "Evidence & timeline, SIPOC, Process map, Value Stream Map, CTQ tree, Data collection plan, MSA / Gage R&R"
    },
    {
      phase: "Analyze",
      count: "10 Tools",
      color: "text-accent-purple",
      accent: "purple",
      examples: "Analysis tools (5 Whys, Fishbone, Pareto), Cause & Effect Tree, Root causes, Basic statistics & histogram, Boxplot & stratification, Scatter plot & correlation, Hypothesis tests, Regression, FMEA, Affinity diagram"
    },
    {
      phase: "Improve",
      count: "7 Tools",
      color: "text-accent-cyan",
      accent: "cyan",
      examples: "Solutions, Action plan, Solution selection matrix, Poka-yoke, Minimal Viable Product (pilot), Six Thinking Hats, House of Change"
    },
    {
      phase: "Control",
      count: "6 Tools",
      color: "text-emerald-400",
      accent: "emerald",
      examples: "Validate & sustain, Lessons learned, Control plan, Control charts (SPC), Capability before/after, Final report"
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
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                LIVE · INVITE ONLY
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            DMAIC Companion
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl text-balance text-pretty">
            A guided web app for Lean Six Sigma improvement work and Apollo root cause analysis. It teaches the method while you use it, with guides, interactive labs and gentle checks, and replaces PowerPoint and Excel/Minitab templates with guided workflows that end in a PowerPoint report.
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
        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <Image 
            src="/images/projects/dmaic-companion/01-hero-promo.png" 
            alt="DMAIC Companion: &ldquo;Every Lean Six Sigma tool. One guided flow.&rdquo; with a wall of real tool screens: Cause &amp; Effect Tree, Pareto, control chart, capability, Fishbone, boxplot and more" 
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
              As a Lean Six Sigma Green Belt learning the Apollo root cause analysis method, my course material came as slide decks and Excel templates: good for reading, slow for doing.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              I wanted a tool that walks through the method step by step and explains <em>why</em> each step exists.
            </p>
          </GlassCard>

          <GlassCard accent="cyan" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              From One Method to a Toolbox
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              It started as the <em>Apollo RCA Guide</em>: 12 guided steps from problem definition to lessons learned, structured by DMAIC.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              It grew into DMAIC Companion: full DMAIC improvement projects, Apollo RCAs and single Lean Six Sigma tools in one format. Then it became a place to learn, with a library of 50 guides and seven hands-on labs.
            </p>
          </GlassCard>

          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Personal Project
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              An ongoing personal project and learning vehicle, not a commercial product or SaaS.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Built without a formal coding background: I write the requirements, test every step, and let an AI coding assistant write the code under a written method guide and strict working rules. Since October 2026 it is online for invited test users.
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
            Local-First
          </span>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs uppercase tracking-wider font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Projects Never Leave Your Machine</span>
              </div>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                Improvement work often holds confidential information, so project data is never sent to a server, not even when the app runs online. The server only knows who may sign in (names, e-mails, roles), feedback messages and which tools are released. On a laptop the app also runs fully offline, without sign-in.
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
                Every change is autosaved in the browser as a safety net. The real save is a versioned <code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">.dmaic.json</code> project file that can be kept, backed up and shared. Older files, including the original RCA files, still open.
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
                Every tool checks the input against the method (for example, &ldquo;this looks like a cause; describe only what happened&rdquo;) and explains why. The user can always continue.
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

        {/* Architecture Showcase: Phone Layout & Cross-Device Readiness */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <Image 
              src="/images/projects/dmaic-companion/09-phone.png" 
              alt="DMAIC Companion on a phone: the Learn page, a control chart and a lab" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center sm:text-left">
            Responsive architecture: Learn page, control chart, and interactive lab running on phone width
          </span>
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
          <GlassCard accent="cyan" className="p-6 flex flex-col gap-5">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Image 
                src="/images/projects/dmaic-companion/02-home.png" 
                alt="The Home page: the D-M-A-I-C phase band and &ldquo;continue where you left off&rdquo;" 
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Three Ways In
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Entry Points</span>
            </div>
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-xs font-mono text-accent-cyan font-semibold uppercase tracking-wider">
                  1. DMAIC improvement
                </span>
                <span className="text-xs text-zinc-300 font-light">
                  The full Lean Six Sigma flow, from Improvement Charter to Final report.
                </span>
              </div>
              <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-xs font-mono text-accent-purple font-semibold uppercase tracking-wider">
                  2. Apollo RCA
                </span>
                <span className="text-xs text-zinc-300 font-light">
                  12 guided steps: problem definition, evidence and timeline, Cause &amp; Effect Tree, root causes, solutions, action plan and lessons learned.
                </span>
              </div>
              <div className="bg-obsidian-950/60 rounded-lg p-3 border border-white/5 flex flex-col gap-1">
                <span className="text-xs font-mono text-zinc-300 font-semibold uppercase tracking-wider">
                  3. Single tool
                </span>
                <span className="text-xs text-zinc-300 font-light">
                  Just one tool, e.g. a Fishbone, an FMEA or a capability study.
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-light italic pt-1">
              Any tool can be added to a project later without starting over.
            </p>
          </GlassCard>

          {/* Method Built In */}
          <GlassCard accent="purple" className="p-6 flex flex-col gap-5">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Image 
                src="/images/projects/dmaic-companion/03-cause-effect-tree.png" 
                alt="A Cause &amp; Effect Tree with actions, conditions, evidence codes, root causes and stop signs" 
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Method Built In
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Apollo Principles</span>
            </div>
            <div className="flex flex-col gap-2.5 pt-1 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono font-semibold uppercase tracking-wider text-accent-purple">Action &amp; condition</span>
                <span className="text-zinc-400 font-light leading-relaxed">Every effect needs at least one action and one condition; root causes are conditions.</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono font-semibold uppercase tracking-wider text-accent-cyan">Evidence driven</span>
                <span className="text-zinc-400 font-light leading-relaxed">Every cause needs evidence. A cause without it is marked with a &ldquo;?&rdquo;.</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono font-semibold uppercase tracking-wider text-emerald-400">Blame free</span>
                <span className="text-zinc-400 font-light leading-relaxed">&ldquo;Don&apos;t blame people. Blame the process.&rdquo;</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono font-semibold uppercase tracking-wider text-amber-400">Worked examples</span>
                <span className="text-zinc-400 font-light leading-relaxed">11 complete examples, small to large: from the Titanic and a hot-coffee burn to a full manufacturing DMAIC project with Gage R&amp;R, ANOVA, regression, control charts and capability. One is a practice case to solve yourself first.</span>
              </div>
            </div>
          </GlassCard>

        </div>
      </section>

      {/* 7. NEW SECTION – Labs: Change Something, See What Happens */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Labs: Change Something, See What Happens
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Interactive Labs
          </span>
        </div>

        <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed max-w-4xl text-pretty">
          Learn is for reading; Labs is for trying. Seven interactive experiments with the charts and numbers of improvement work. Drag a data point, change the process, draw a new sample, and watch the chart and the numbers respond. Each lab has five challenges: guess what will happen, try it, then see why it happened and what it means in a project. The data is made up, so nothing touches your projects.
        </p>

        {/* First image: 06-labs.png */}
        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <Image 
            src="/images/projects/dmaic-companion/06-labs.png" 
            alt="The Labs page: seven interactive labs, each with a small picture of its chart" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Seven labs list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {labsList.map((lab) => (
            <div 
              key={lab.num} 
              className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-4 md:p-5 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-accent-cyan">
                  {lab.num}.
                </span>
                <h4 className="text-sm font-semibold text-white font-mono">
                  {lab.title}
                </h4>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {lab.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Labs Gallery (07 & 08) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Image 
                src="/images/projects/dmaic-companion/07-lab-capability.png" 
                alt="The Process capability lab: a histogram against the customer's limits, with Cp and Cpk" 
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center sm:text-left">
              Process capability lab: histogram against customer limits with Cp and Cpk
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Image 
                src="/images/projects/dmaic-companion/08-lab-process-flow.png" 
                alt="The Process flow lab: orders moving through Picking, Packing and Shipping, with lead time and the bottleneck" 
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center sm:text-left">
              Process flow lab: orders moving through Picking, Packing and Shipping
            </span>
          </div>
        </div>

      </section>

      {/* 8. Learn Library */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Learn Library
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Knowledge Base
          </span>
        </div>

        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <Image 
            src="/images/projects/dmaic-companion/05-learn-library.png" 
            alt="The Learn page with guides, learning paths, &ldquo;Which tool when?&rdquo; and a glossary" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-8 flex flex-col gap-4">
          <ul className="flex flex-col gap-3 text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-accent-cyan font-mono font-bold">&bull;</span>
              <span>
                <strong className="text-white font-medium">50 guides:</strong> one per tool, plus <em>The method</em> (DMAIC, Apollo principles, actions and conditions, roles, which project to choose) and <em>Statistics basics</em>. Each guide: what it is, when to use it, how to do it, common mistakes and a short quiz.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-accent-cyan font-mono font-bold">&bull;</span>
              <span>
                <strong className="text-white font-medium">Four learning paths</strong>, <strong className="text-white font-medium">&ldquo;Which tool when?&rdquo;</strong> and a <strong className="text-white font-medium">glossary of about 300 terms</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-accent-cyan font-mono font-bold">&bull;</span>
              <span>
                <strong className="text-white font-medium">Linked both ways:</strong> every step&apos;s help panel links to its guide; guides link to the matching labs.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-accent-cyan font-mono font-bold">&bull;</span>
              <span>
                <strong className="text-white font-medium">All guides as one PDF:</strong> a printable book with cover and contents.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 9. 37 Tools Across the DMAIC Framework */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              37 Tools Across the DMAIC Framework
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Complete Coverage
          </span>
        </div>

        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <Image 
            src="/images/projects/dmaic-companion/04-tool-library.png" 
            alt="The Tool library, every tool grouped by DMAIC phase" 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dmaicPhases.map((phase, pIdx) => (
            <div key={pIdx} className="bg-obsidian-950/80 rounded-xl p-4 border border-white/[0.08] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${phase.color}`}>
                  {phase.phase}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-300">
                  {phase.count}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {phase.examples}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Current State & Future Roadmap */}
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
          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                Completed (Current State)
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li><strong className="text-white font-normal">Apollo RCA Guide v1:</strong> 12 guided steps, worked examples and PowerPoint export</li>
              <li><strong className="text-white font-normal">DMAIC Companion:</strong> All 37 tools built, no placeholders left; report and PowerPoint export for every project type</li>
              <li><strong className="text-white font-normal">Learn library:</strong> 50 guides, learning paths, glossary and a printable PDF book</li>
              <li><strong className="text-white font-normal">Labs:</strong> Seven interactive labs with five challenges each</li>
              <li><strong className="text-white font-normal">Online:</strong> Live at dmaic.vonporat.com with invite-only sign-in, roles, an Admin panel, tool release and in-app feedback</li>
              <li><strong className="text-white font-normal">11 worked examples, 12 colour themes, installable, usable on a phone</strong></li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                Roadmap (Next)
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li><strong className="text-white font-normal">Full self-test</strong> of the app with the written test guide</li>
              <li><strong className="text-white font-normal">Inviting initial test users</strong> and collecting feedback</li>
              <li><strong className="text-white font-normal">PowerPoint export for all users</strong> (admin-only online until verified)</li>
              <li><strong className="text-white font-normal">Phone layout,</strong> the next steps</li>
              <li><strong className="text-white font-normal">Swedish translation</strong> (all interface text is already kept in one place)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 11. Bottom Navigation Footer */}
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
