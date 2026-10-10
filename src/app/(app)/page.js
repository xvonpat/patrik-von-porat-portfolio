import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import CtaButton from '@/components/CtaButton';
import { getPayload } from 'payload';
import configPromise from '../../../payload.config.ts';

export const revalidate = 60;

export default async function Home() {
  // Gracefully fetch latest published blog posts from Payload CMS
  let latestPosts = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      limit: 3,
    });
    latestPosts = result?.docs || [];
  } catch (error) {
    console.error('Failed to fetch latest posts for homepage:', error);
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
      desc: 'Tracking layered guitars, rendering physical ink studies, or building client-side tools without cloud bloat.',
      accent: 'cyan'
    },
    {
      number: '04',
      name: 'REFINE',
      desc: 'Trimming arrangement clutter, balancing drawing contrast, and writing automated tests that verify durability.',
      accent: 'cyan'
    }
  ];

  // 3. Curated Selected Work Entries (Music, Physical Visual Art, Digital Tools)
  const selectedWork = [
    {
      title: 'Realmforged',
      category: 'MUSIC · WORLDBUILDING · DIGITAL EXPERIENCE',
      description: 'A cinematic power metal project developed across music, dark-fantasy storytelling, visual direction, release design and a dedicated digital home.',
      image: '/images/projects/proof/realmforged-showcase1.webp',
      imageAlt: 'Realmforged cinematic music and worldbuilding showcase',
      link: '/music',
      ctaText: 'Explore Realmforged',
      accent: 'purple'
    },
    {
      title: 'Ashwrithe',
      category: 'MUSIC · ATMOSPHERE · VISUAL IDENTITY',
      description: 'An evolving dark extreme metal project built through sound, restraint, ritual atmosphere and a deliberately controlled visual identity.',
      image: '/images/projects/proof/proof-ashwrithe-showcase.webp',
      imageAlt: 'Ashwrithe dark extreme metal visual identity showcase',
      link: '/music',
      ctaText: 'Explore Ashwrithe',
      accent: 'purple'
    },
    {
      title: 'Visual Practice',
      category: 'DRAWING · TATTOO PRACTICE · PHYSICAL CRAFT',
      description: 'An ongoing exploration of traditional materials, controlled technique and visual observation through studies, experiments and finished work.',
      image: '/images/art/drawings/eye-study.webp',
      imageAlt: 'Visual practice graphite drawing study',
      link: '/art',
      ctaText: 'Explore Visual Practice',
      accent: 'purple'
    },
    {
      title: 'DMAIC Companion',
      category: 'WEB · IMPROVEMENT TOOLS',
      description: 'A local-first, guided web app for Lean Six Sigma improvement work and Apollo root cause analysis, replacing static templates with guided workflows.',
      image: '/images/projects/proof/dmaic-companion-featured-1600x900.png',
      imageAlt: 'DMAIC Companion – home screen with the three ways in and the D-M-A-I-C phase band',
      link: '/projects/dmaic-companion',
      ctaText: 'Explore DMAIC Companion',
      accent: 'cyan'
    }
  ];

  // 4. Current Focus Items
  const currentFocusItems = [
    'Developing the first official Ashwrithe material',
    'Building the next phase of Realmforged',
    'Studying charcoal, drawing and tattoo technique'
  ];

  return (
    <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[1320px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-16 md:gap-24 relative z-10">
      
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center text-center justify-center gap-5 max-w-4xl mx-auto relative pt-4 pb-2 md:pt-8 md:pb-4">
        {/* Ambient subtle glow backdrop */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[85%] h-[60%] bg-accent-purple/8 blur-[110px] rounded-full pointer-events-none -z-10" />

        {/* Eyebrow */}
        <p className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-zinc-400 font-medium">
          PATRIK VON PORAT · CREATIVE HUB
        </p>
        
        {/* Primary Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white font-gothic leading-[1.08] select-none text-balance">
          Creative instinct, given structure.
        </h1>
        
        {/* Body Copy */}
        <p className="text-lg md:text-xl leading-relaxed md:leading-9 text-zinc-300 font-light max-w-3xl mt-1 text-balance text-pretty">
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
            Active music releases, physical craft, and personal tools currently in development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {selectedWork.map((card, idx) => {
            const isPurple = card.accent === 'purple';
            const accentClass = isPurple ? 'text-accent-purple' : 'text-accent-cyan';

            return (
              <GlassCard key={idx} accent={card.accent} className="p-5 md:p-6 flex flex-col justify-between h-full group">
                <div className="flex flex-col gap-4">
                  {/* Visual Showcase Banner */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group-hover:border-white/20 transition-all duration-500">
                    <Image 
                      src={card.image} 
                      alt={card.imageAlt} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                  </div>

                  {/* Category & Title */}
                  <div className="flex flex-col gap-1.5 pb-2.5 border-b border-white/5">
                    <span className={`text-[10px] md:text-[11px] font-mono uppercase tracking-wider font-semibold ${accentClass}`}>
                      {card.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-white/5 flex justify-end">
                  <Link 
                    href={card.link}
                    className={`text-xs font-mono uppercase tracking-widest ${accentClass} group-hover:text-white transition-colors flex items-center gap-1 font-semibold`}
                  >
                    {card.ctaText} &rarr;
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>

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
            {currentFocusItems.map((item, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-2.5 text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed bg-obsidian-950/50 border border-white/[0.05] p-3.5 rounded-lg"
              >
                <span className="text-accent-purple font-mono text-xs mt-0.5 select-none">&bull;</span>
                <span className="text-pretty">{item}</span>
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
                    <h3 className="blog-card-title text-xl md:text-2xl font-semibold font-gothic line-clamp-2">
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
      </section>

    </div>
  );
}
