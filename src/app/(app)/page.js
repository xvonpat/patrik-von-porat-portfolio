import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import CtaButton from '@/components/CtaButton';
import DigitalSculpture from '@/components/digital-sculpture/DigitalSculpture';
import SelectedWorkCarousel from '@/components/SelectedWorkCarousel';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config.ts';

export const revalidate = 60;

export default async function Home() {
  // Gracefully fetch latest published blog posts and site settings from Payload CMS
  let latestPosts = [];
  let homepageBackground = 'harmonic-nexus';
  try {
    const payload = await getPayload({ config: configPromise });
    const [postsResult, siteSettings] = await Promise.all([
      payload.find({
        collection: 'posts',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: '-publishedDate',
        limit: 3,
      }),
      payload.findGlobal({
        slug: 'site-settings',
      }).catch((err) => {
        console.warn('Could not fetch site-settings global:', err?.message);
        return null;
      }),
    ]);
    latestPosts = postsResult?.docs || [];
    if (siteSettings?.homepageBackground) {
      homepageBackground = siteSettings.homepageBackground;
    }
  } catch (error) {
    console.error('Failed to fetch homepage data from Payload:', error);
    latestPosts = [];
  }

  // 1. Three Core Expressions of One Identity
  const expressions = [
    {
      title: 'Music & Worlds',
      description: 'Composition, guitar and interconnected creative worlds built through sound, story and visual direction.',
      link: '/music',
      ctaText: 'Explore Music',
      accent: 'purple'
    },
    {
      title: 'Visual Practice',
      description: 'Drawing, tattoo practice, physical models and digital experimentation grounded in observation and craft.',
      link: '/art',
      ctaText: 'Explore Art',
      accent: 'purple'
    },
    {
      title: 'Systems & Digital Work',
      description: 'Websites, workflows and improvement systems that turn complexity into something clearer and more useful.',
      link: '/projects',
      ctaText: 'Explore Projects',
      accent: 'cyan'
    }
  ];

  // 2. The Four-Stage Process (Concrete examples from showcased work)
  const processSteps = [
    {
      number: '01',
      name: 'OBSERVE',
      desc: 'Catching raw guitar riffs, studying pencil proportions, or spotting friction in daily studio habits.',
      accent: 'purple'
    },
    {
      number: '02',
      name: 'STRUCTURE',
      desc: 'Arranging tempos for Realmforged, mapping graphite values, or designing local data models for DMAIC Companion.',
      accent: 'purple'
    },
    {
      number: '03',
      name: 'CREATE',
      desc: 'Tracking layered guitars, rendering physical ink studies, or building focused tools that run right in the browser.',
      accent: 'cyan'
    },
    {
      number: '04',
      name: 'REFINE',
      desc: 'Trimming arrangement clutter, balancing drawing contrast, and testing tools until they hold up in real use.',
      accent: 'cyan'
    }
  ];

  // 3. Curated Selected Work Entries (Music, Visual Art, Digital Tools)
  const selectedWork = [
    {
      title: 'Realmforged',
      category: 'MUSIC · WORLDBUILDING · DIGITAL EXPERIENCE',
      description: 'A cinematic power metal project developed across music, dark-fantasy storytelling, visual direction, release design and a dedicated digital home.',
      image: '/images/projects/proof/realmforged-showcase1.webp',
      imageAlt: 'Realmforged cinematic music and worldbuilding showcase',
      link: 'https://realmforgedofficial.com',
      isExternal: true,
      ctaText: 'Explore Realmforged',
      accent: 'purple'
    },
    {
      title: 'Ashwrithe',
      category: 'MUSIC · ATMOSPHERE · VISUAL IDENTITY',
      description: 'An evolving dark extreme metal project built through sound, restraint, ritual atmosphere and a deliberately controlled visual identity.',
      image: '/images/projects/proof/proof-ashwrithe-showcase.webp',
      imageAlt: 'Ashwrithe dark extreme metal visual identity showcase',
      link: 'https://ashwrithe.com',
      isExternal: true,
      ctaText: 'Explore Ashwrithe',
      accent: 'purple'
    },
    {
      title: 'The Butcher Bust',
      category: 'VISUAL ART · MINIATURES · PAINTING',
      description: 'A resin-printed bust painted by hand with layered acrylic washes, custom skin-tone blending, a copper harness and weathering.',
      image: '/images/art/butcher/The_Butcher-1.webp',
      imageAlt: 'Painted resin bust of The Butcher showing layered skin tones, copper harness, and acrylic weathering.',
      imagePosition: 'center 30%',
      link: '/art#other-forms',
      ctaText: 'Explore Physical Craft',
      accent: 'purple'
    },
    {
      title: 'Conan the Barbarian',
      category: 'VISUAL ART · MINIATURES · PAINTING',
      description: 'A resin print painted with flesh-tone transitions, metallic drybrushing, leather straps and a hand-finished stone terrain base.',
      image: '/images/art/conan/Conan-2.webp',
      imageAlt: 'Painted resin miniature of Conan the Barbarian holding a sword, with shaded skin, leather straps and a stone terrain base.',
      imagePosition: 'center 16%',
      link: '/art#other-forms',
      ctaText: 'Explore Physical Craft',
      accent: 'purple'
    },
    {
      title: 'DMAIC Companion',
      category: 'WEB · IMPROVEMENT TOOLS',
      description: 'A local-first, guided web app for Lean Six Sigma improvement work and Apollo root cause analysis, replacing static templates with guided workflows.',
      image: '/images/projects/dmaic-companion/01-hero-promo.png',
      imageAlt: 'DMAIC Companion – "Every Lean Six Sigma tool. One guided flow." with a wall of real tool screens: Cause & Effect Tree, Pareto, control chart, capability, Fishbone, boxplot and more',
      link: '/projects/dmaic-companion',
      ctaText: 'Explore DMAIC Companion',
      accent: 'cyan'
    },
    {
      title: 'Home Control Panel',
      category: 'SMART HOME · INTERFACE DESIGN',
      description: 'A wall-mounted control panel for the whole house: lights, heating, the front door, EV charging and solar power in one calm, glanceable interface.',
      image: '/images/projects/home-control-panel/00-cover.webp',
      imageAlt: 'Dark smart-home control panel shown on a large screen and a phone',
      link: '/projects/home-control-panel',
      ctaText: 'Explore Home Control Panel',
      accent: 'cyan'
    }
  ];

  // 4. Current Focus Items
  const currentFocusItems = [
    { text: 'Developing the first official Ashwrithe material', link: '/music#current-projects' },
    { text: 'Building the next phase of Realmforged', link: '/music#current-projects' },
    { text: 'Studying charcoal, drawing and tattoo technique', link: '/art' }
  ];

  return (
    <>
      {/* 3D Digital Sculpture Background (homepage-scoped full viewport, configured via Payload CMS) */}
      <DigitalSculpture theme={homepageBackground} />

      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1320px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-6 w-full relative pt-2 pb-2 md:pt-6 md:pb-4 lg:pt-8">
          {/* Ambient subtle glow backdrop */}
          <div className="hero-ambient absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-accent-purple/8 blur-[110px] rounded-full pointer-events-none -z-10" />

          {/* Introductory Text (Left Column on Desktop) */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-5 max-w-4xl mx-auto lg:mx-0">
            {/* Eyebrow */}
            <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
              PATRIK VON PORAT · CREATIVE HUB
            </p>
            
            {/* Primary Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.25rem] font-semibold tracking-tight text-white font-gothic leading-[1.08] select-none text-balance">
              Creative instinct, given structure.
            </h1>
            
            {/* Body Copy */}
            <p className="text-lg md:text-xl leading-relaxed md:leading-9 text-zinc-300 font-light max-w-3xl lg:max-w-2xl mt-1 text-balance text-pretty">
              I’m Patrik von Porat. I make heavy music, draw by hand, and build digital tools for creative work. This is where I share the projects—and the thinking that shapes them.
            </p>

            {/* Identity Line */}
            <p className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-accent-purple font-medium mt-1">
              Guitarist &middot; Visual Artist &middot; Systems-Minded Creator
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full sm:w-auto">
              <CtaButton 
                href="#selected-work" 
                className="px-8 py-3.5 text-xs md:text-sm"
              >
                Explore Selected Work
              </CtaButton>
              <CtaButton 
                href="/about" 
                variant="secondary"
                className="px-8 py-3.5 text-xs md:text-sm"
              >
                About the Process
              </CtaButton>
            </div>
            
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/80 to-transparent mt-6" />
          </div>

          {/* Open negative space on desktop framing the 3D sculpture's detailed core */}
          <div className="hidden lg:block min-h-[460px] pointer-events-none" aria-hidden="true" />
        </section>

      {/* 2. SELECTED WORK SECTION (Presented early for first-time visitors) */}
      <section id="selected-work" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            SELECTED WORK
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Concrete projects across sound, image and code.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            Active music releases, hands-on craft and personal tools in development.
          </p>
        </div>

        <SelectedWorkCarousel cards={selectedWork} initialIndex={2} />

        {/* Understated link beneath section */}
        <div className="flex justify-center pt-2">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors group font-medium"
          >
            <span>View all projects</span>
            <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* 3. EXPRESSIONS SECTION */}
      <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            ONE IDENTITY &middot; MANY EXPRESSIONS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            Explore by discipline.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            Three distinct creative areas connected by the same commitment to craft, structure, and continuous improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {expressions.map((item, idx) => {
            const isPurple = item.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';
            return (
              <GlassCard key={idx} accent={item.accent} className="p-6 md:p-7 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase font-semibold">
                      Expression 0{idx + 1}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-accent-purple' : 'bg-accent-cyan'}`} />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm md:text-[15px] leading-relaxed text-zinc-300 font-light text-pretty">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-white/5 flex justify-end">
                  <Link 
                    href={item.link}
                    className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1 font-semibold`}
                  >
                    {item.ctaText} &rarr;
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. PROCESS SECTION (Grounded with specific examples from work) */}
      <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            HOW I WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            From raw instinct to deliberate execution.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            The medium dictates the tools, but the underlying discipline connects every project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {processSteps.map((step, idx) => {
            const isPurple = step.accent === 'purple';
            return (
              <div 
                key={idx} 
                className="p-5 md:p-6 rounded-xl bg-obsidian-950/60 border border-white/[0.08] flex flex-col gap-3 group hover:border-white/20 transition-premium relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold tracking-widest ${isPurple ? 'text-accent-purple' : 'text-accent-cyan'}`}>
                    {step.number}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${isPurple ? 'bg-accent-purple' : 'bg-accent-cyan'}`} />
                </div>

                <h3 className="text-lg md:text-xl font-semibold text-white font-gothic tracking-wide">
                  {step.name}
                </h3>
                
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Understated link to full process on About */}
        <div className="flex justify-center pt-1">
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors group font-medium"
          >
            <span>Read the full process on About</span>
            <span className="transform group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* 5. CURRENT FOCUS SECTION */}
      <section className="max-w-4xl mx-auto w-full">
        <GlassCard accent="purple" className="flex flex-col gap-5 p-6 md:p-8">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-accent-purple font-semibold">
                CURRENTLY
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white font-gothic text-balance">
              What I am building and learning now.
            </h3>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 border-t border-white/5">
            {currentFocusItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.link}
                  className="group flex items-start gap-2.5 h-full text-sm md:text-[15px] text-zinc-300 hover:text-white font-light leading-relaxed bg-obsidian-950/50 border border-white/[0.05] hover:border-white/15 p-3.5 rounded-lg transition-colors"
                >
                  <span className="text-accent-purple font-mono text-xs mt-0.5 select-none">&bull;</span>
                  <span className="text-pretty flex-1">{item.text}</span>
                  <span className="text-accent-purple text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      {/* 6. FROM THE JOURNAL */}
      <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/5 pb-3">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-xs font-mono tracking-[0.3em] text-zinc-400 uppercase font-medium">
              FROM THE JOURNAL
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic">
              Notes from the process.
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="text-xs font-mono uppercase tracking-widest text-accent-purple hover:text-white transition-colors flex items-center gap-1 font-semibold"
          >
            View All Notes &rarr;
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {latestPosts.map((post) => {
              const formattedDate = post.publishedDate 
                ? new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : 'Recent';

              return (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  aria-label={`Read note: ${post.title}`}
                  className="blog-card group flex flex-col justify-between h-full p-5 md:p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/70 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-950"
                >
                  {/* Decorative inner gothic notch or line */}
                  <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      <span className={`font-semibold ${(typeof post.category === 'object' && post.category?.accent === 'cyan') ? 'text-accent-cyan' : 'text-accent-purple'}`}>
                        {typeof post.category === 'object' && post.category !== null ? (post.category.name || post.category.slug || 'Chronicle') : (post.category || 'Chronicle')}
                      </span>
                      <span>{formattedDate}</span>
                    </div>
                    <h3 className="blog-card-title text-xl md:text-2xl font-semibold font-gothic line-clamp-3">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-accent-purple group-focus-visible:text-accent-purple transition-colors duration-200 flex items-center gap-1.5 mt-6 font-semibold">
                    <span>Read Note</span>
                    <span className="blog-card-arrow" aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-obsidian-900/40 border border-white/5 rounded-xl p-8 md:p-10 text-center flex flex-col items-center gap-3">
            <p className="text-base text-zinc-300 font-light">
              Explore reflections on music, visual art, digital systems, and process improvement.
            </p>
            <Link 
              href="/blog" 
              className="text-xs font-mono uppercase tracking-widest text-accent-purple hover:text-white transition-colors mt-2 font-semibold"
            >
              Read the Journal &rarr;
            </Link>
          </div>
        )}
      </section>

      {/* 7. CLOSING SECTION */}
      <section className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto py-6">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
          Follow the work as it develops.
        </h2>
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-balance text-pretty">
          Music, images, experiments and the thinking behind them.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 mt-2 w-full sm:w-auto">
          <CtaButton 
            href="/blog" 
            className="px-8 py-3.5 text-xs md:text-sm"
          >
            Read the Journal
          </CtaButton>
          <CtaButton 
            href="/contact" 
            variant="secondary"
            className="px-8 py-3.5 text-xs md:text-sm"
          >
            Get in Touch
          </CtaButton>
        </div>
        <div className="flex items-center gap-5 mt-1 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <a href="https://www.instagram.com/patrikvonporat/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <span className="text-zinc-600" aria-hidden="true">&middot;</span>
          <a href="https://www.threads.com/@patrikvonporat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Threads</a>
        </div>
      </section>

    </div>
    </>
  );
}
