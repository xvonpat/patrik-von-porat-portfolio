import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import CtaButton from '@/components/CtaButton';

export const metadata = {
  title: "About | Patrik von Porat",
  description: "Guitarist, visual artist and systems-minded creator based in Sweden. The motivation, process and way of thinking behind the work.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About | Patrik von Porat",
    description: "Guitarist, visual artist and systems-minded creator based in Sweden. The motivation, process and way of thinking behind the work.",
    url: 'https://vonporat.com/about',
    images: [
      {
        url: '/images/PvP2.png',
        width: 1200,
        height: 630,
        alt: 'Patrik von Porat - About',
      },
    ],
  }
};

function Eyebrow({ children, accent = 'purple' }) {
  return (
    <span className={`text-xs font-mono tracking-[0.3em] uppercase font-semibold ${accent === 'cyan' ? 'text-accent-cyan' : 'text-accent-purple'}`}>
      {children}
    </span>
  );
}

export default function About() {
  const verifiedFacts = [
    { label: "Based in", value: "Sweden" },
    { label: "Playing guitar", value: "35+ years" },
    { label: "Process", value: "Lean Six Sigma Green Belt" },
    { label: "Current projects", value: "Realmforged & Ashwrithe" },
  ];

  const materials = [
    {
      area: "Music",
      title: "Realmforged",
      caption: "Cinematic power metal, built across sound, story and a dedicated digital home.",
      image: "/images/projects/proof/realmforged-showcase1.webp",
      alt: "Realmforged cinematic power metal project and digital hub showcase",
      link: "/music",
      accent: "purple",
    },
    {
      area: "Visual practice",
      title: "Eye Study",
      caption: "Graphite on paper: iris micro-textures, skin folds and controlled value transitions.",
      image: "/images/art/drawings/eye-study.webp",
      alt: "High-contrast graphite eye study showing detailed iris micro-textures, skin folds, and subtle light reflections on paper.",
      link: "/art",
      accent: "purple",
    },
    {
      area: "Systems",
      title: "DMAIC Companion",
      caption: "A guided web app for Lean Six Sigma improvement work and Apollo root cause analysis.",
      image: "/images/projects/dmaic-companion/01-hero-promo.png",
      alt: "DMAIC Companion: “Every Lean Six Sigma tool. One guided flow.” with a wall of real tool screens",
      link: "/projects/dmaic-companion",
      accent: "cyan",
      position: "left center",
    },
  ];

  const processSteps = [
    {
      num: "01",
      title: "Observe",
      desc: "Find the pattern, tension or possibility.",
      accent: "purple",
      examples: {
        music: "Catching raw guitar riffs.",
        visual: "Studying pencil proportions.",
        systems: "Spotting friction in daily studio habits.",
      },
    },
    {
      num: "02",
      title: "Structure",
      desc: "Give the idea constraints, hierarchy and direction.",
      accent: "purple",
      examples: {
        music: "Arranging tempos for Realmforged.",
        visual: "Mapping graphite values.",
        systems: "Designing local data models for DMAIC Companion.",
      },
    },
    {
      num: "03",
      title: "Create",
      desc: "Turn the concept into sound, image or system.",
      accent: "cyan",
      examples: {
        music: "Tracking layered guitars.",
        visual: "Rendering physical ink studies.",
        systems: "Building focused tools that run right in the browser.",
      },
    },
    {
      num: "04",
      title: "Refine",
      desc: "Remove noise and strengthen what remains.",
      accent: "cyan",
      examples: {
        music: "Trimming arrangement clutter.",
        visual: "Balancing drawing contrast.",
        systems: "Testing tools until they hold up in real use.",
      },
    },
  ];

  const disciplines = [
    { key: "music", label: "Music" },
    { key: "visual", label: "Visual" },
    { key: "systems", label: "Systems" },
  ];

  const capabilityAreas = [
    {
      title: "Music & Audio",
      accent: "purple",
      desc: "Composition, guitar, arrangement, recording and the development of connected musical worlds.",
      tags: ["Guitar", "Songwriting", "Arrangement", "Orchestration", "Audio Production"],
      link: "/music",
      cta: "Explore Music",
    },
    {
      title: "Visual Practice",
      accent: "purple",
      desc: "Graphite, charcoal, tattoo studies, miniatures and digital experimentation grounded in observation and repeated practice.",
      tags: ["Drawing", "Tattoo Practice", "Miniatures", "Physical Craft", "Digital Studies"],
      link: "/art",
      cta: "Explore Art",
    },
    {
      title: "Systems & Improvement",
      accent: "cyan",
      desc: "Structured problem-solving, process design and data-supported improvement used to make complex work clearer and more reliable.",
      tags: ["Lean Six Sigma", "DMAIC", "Process Mapping", "Power BI", "Workflow Design"],
      link: "/projects/dmaic-companion",
      cta: "See DMAIC Companion",
    },
    {
      title: "Web & Digital Systems",
      accent: "cyan",
      desc: "Content architecture, visual direction and connected publishing systems for creative projects and personal platforms.",
      tags: ["Next.js", "Payload CMS", "Supabase", "Vercel", "AI-Assisted Workflows"],
      link: "/projects",
      cta: "Explore Projects",
    },
  ];

  return (
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-20 md:gap-28 relative z-10">

      {/* 1. Editorial hero: statement and introduction beside the portrait */}
      <section className="relative flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8 pt-2 md:pt-6">
        <div className="absolute top-[5%] left-[20%] w-[60%] h-[70%] bg-accent-purple/8 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="flex flex-col gap-4 lg:col-span-7 lg:row-start-1 lg:self-end">
          <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
            ABOUT
          </p>
          <h1 className="text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[3.3rem] xl:text-[3.75rem] font-semibold tracking-tight text-white font-gothic text-balance">
            The work changes. The underlying impulse does not.
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-accent-purple to-transparent mt-1" />
        </div>

        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 flex justify-center lg:justify-end">
          <figure className="relative w-full max-w-[420px] aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
            <Image
              src="/images/patrik_portrait.webp"
              alt="Portrait of Patrik von Porat"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover object-top grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent pointer-events-none" />
            <figcaption className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-300">
              <span>Patrik von Porat</span>
              <span className="text-accent-purple">Sweden</span>
            </figcaption>
          </figure>
        </div>

        <p className="lg:col-span-7 lg:row-start-2 text-lg md:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-9 text-pretty">
          I am Patrik von Porat, a guitarist, visual artist and systems-minded creator based in Sweden. Across music, images and digital work, I am drawn to the same challenge: taking something unformed and giving it clarity, character and structure.
        </p>
      </section>

      {/* 2. Core facts */}
      <section aria-label="Core facts" className="-mt-6 md:-mt-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 rounded-xl border border-white/[0.08] bg-obsidian-950/60 backdrop-blur-md overflow-hidden">
          {verifiedFacts.map((fact, idx) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-2 p-5 md:p-6 border-white/[0.06] ${idx % 2 === 1 ? 'border-l' : ''} ${idx >= 2 ? 'border-t lg:border-t-0' : ''} ${idx === 2 ? 'lg:border-l' : ''}`}
            >
              <dt className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                {fact.label}
              </dt>
              <dd className="text-xl md:text-2xl lg:text-[1.35rem] font-gothic font-semibold text-white leading-tight text-balance">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. Background narrative and what connects the work */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Background</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-semibold text-white font-gothic tracking-tight leading-[1.1] text-balance">
            One practice, developed through different disciplines.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-accent-purple to-transparent mt-1" />
        </div>

        <div className="lg:col-span-8 flex flex-col gap-5 text-base md:text-lg leading-relaxed md:leading-9 text-zinc-300 font-light max-w-2xl">
          <p className="text-pretty">
            Music has been the constant for more than three decades. It taught me to listen for tension, recognise patterns, build arrangements and keep refining until the parts support a coherent whole.
          </p>
          <p className="text-pretty">
            Visual practice asks for the same attention in a different form. Drawing, tattoo studies and physical craft have made observation, control, repetition and material feedback more immediate.
          </p>
          <p className="text-pretty">
            My professional work in operations and continuous improvement added another perspective: how to understand complex systems, identify what matters and make processes clearer and more reliable.
          </p>
          <p className="text-pretty">
            Over time, these stopped feeling like separate interests. They became different applications of the same way of thinking.
          </p>
          <p className="text-pretty text-zinc-200">
            A riff, a drawing, a visual identity, a website or a workflow may begin in different ways, but each starts with uncertainty. What interests me is finding the pattern within it, then developing that pattern until the result feels deliberate and holds together.
          </p>
        </div>
      </section>

      {/* 4. Pull quote */}
      <figure className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6 py-4">
        <span className="font-gothic text-7xl md:text-8xl leading-none text-accent-purple/30 select-none -mb-6" aria-hidden="true">&ldquo;</span>
        <blockquote className="text-3xl sm:text-4xl md:text-5xl font-gothic font-semibold tracking-tight text-white leading-[1.15] text-balance">
          Structure does not replace instinct. It gives instinct somewhere to go.
        </blockquote>
        <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
          <span className="w-10 h-[1px] bg-accent-purple/50" />
          What connects the work
          <span className="w-10 h-[1px] bg-accent-purple/50" />
        </div>
      </figure>

      {/* 5. Same hands, different materials */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div className="flex flex-col gap-3">
            <Eyebrow>Across materials</Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
              Same hands, different materials.
            </h2>
          </div>
          <p className="text-sm md:text-base text-zinc-400 font-light max-w-sm text-pretty">
            Sound, graphite and software: three surfaces for the same way of working.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {materials.map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 rounded-xl"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] group-hover:border-white/20 transition-colors duration-500">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={item.position ? { objectPosition: item.position } : undefined}
                  className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                />
                {/* Even out bright and dark sources so the three read as one set */}
                <div className="absolute inset-0 bg-obsidian-950/25 group-hover:bg-transparent bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent transition-colors duration-700 pointer-events-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className={`text-[10px] md:text-[11px] font-mono uppercase tracking-widest font-semibold ${item.accent === 'cyan' ? 'text-accent-cyan' : 'text-accent-purple'}`}>
                  {item.area}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-tight flex items-center gap-2">
                  {item.title}
                  <span className="text-base text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" aria-hidden="true">&rarr;</span>
                </h3>
                <p className="text-sm text-zinc-400 font-light leading-relaxed text-pretty">
                  {item.caption}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. How I work: one process, three disciplines */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl md:max-w-4xl mx-auto">
          <Eyebrow>How I work</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            From ambiguity to intention.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-3xl md:max-w-4xl leading-relaxed md:leading-8 mt-1 text-pretty">
            I move between creative instinct and structured thinking rather than treating them as opposites.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_auto] gap-4 md:gap-5">
          {processSteps.map((step) => {
            const isPurple = step.accent === 'purple';
            return (
              <li
                key={step.num}
                className="lg:row-span-4 lg:grid lg:grid-rows-subgrid flex flex-col gap-0 rounded-xl border border-white/[0.08] bg-obsidian-950/60 overflow-hidden"
              >
                <div className="flex flex-col gap-2 p-5 md:p-6 border-b border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold tracking-widest ${isPurple ? 'text-accent-purple' : 'text-accent-cyan'}`}>
                      {step.num}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-accent-purple' : 'bg-accent-cyan'}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white font-gothic tracking-wide uppercase">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                    {step.desc}
                  </p>
                </div>
                {disciplines.map((d) => (
                  <div key={d.key} className="flex flex-col gap-1 px-5 md:px-6 py-3.5 border-b last:border-b-0 border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
                      {d.label}
                    </span>
                    <span className="text-[13px] text-zinc-400 font-light leading-relaxed text-pretty">
                      {step.examples[d.key]}
                    </span>
                  </div>
                ))}
              </li>
            );
          })}
        </ol>
      </section>

      {/* 7. Capabilities in context */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <Eyebrow accent="cyan">Capabilities in context</Eyebrow>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            One way of thinking, applied across four areas.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            The tools change with the material. The underlying approach remains observation, structure, creation and refinement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilityAreas.map((group) => {
            const isPurple = group.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

            return (
              <GlassCard key={group.title} accent={group.accent} className="p-5 md:p-6 flex flex-col gap-4 h-full group">
                <span className={`text-xs md:text-sm font-mono uppercase tracking-wider font-semibold ${accentClass}`}>
                  {group.title}
                </span>
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  {group.desc}
                </p>
                <p className="text-[11px] font-mono text-zinc-500 tracking-wide leading-relaxed">
                  {group.tags.join(' · ')}
                </p>
                <Link
                  href={group.link}
                  className={`mt-auto pt-3.5 border-t border-white/5 text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1 font-semibold`}
                >
                  {group.cta} &rarr;
                </Link>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 8. Current chapter and closing */}
      <section className="flex flex-col items-center text-center gap-5 max-w-3xl mx-auto pb-4">
        <Eyebrow>Current chapter</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          Still building. Still learning.
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed md:leading-8 text-pretty">
          My current focus moves between Realmforged, Ashwrithe, traditional drawing, tattoo practice and the continued development of this creative hub. Each project offers a different material, constraint and reason to keep refining the process.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 mt-3 w-full sm:w-auto">
          <CtaButton href="/projects" className="px-8 py-3.5 text-xs md:text-sm">
            Explore Selected Work
          </CtaButton>
          <CtaButton href="/contact" variant="secondary" className="px-8 py-3.5 text-xs md:text-sm">
            Get in Touch
          </CtaButton>
        </div>
      </section>

    </div>
  );
}
