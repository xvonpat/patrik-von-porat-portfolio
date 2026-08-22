import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
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

  // 2. The Four-Stage Process
  const processSteps = [
    {
      number: '01',
      name: 'OBSERVE',
      desc: 'Find the pattern, tension or possibility.',
      accent: 'purple'
    },
    {
      number: '02',
      name: 'STRUCTURE',
      desc: 'Give the idea constraints, hierarchy and direction.',
      accent: 'purple'
    },
    {
      number: '03',
      name: 'CREATE',
      desc: 'Turn the concept into sound, image or system.',
      accent: 'cyan'
    },
    {
      number: '04',
      name: 'REFINE',
      desc: 'Remove noise and strengthen what remains.',
      accent: 'cyan'
    }
  ];

  // 3. Three Curated Selected Work Entries
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
      image: '/images/music/qa-ashwrithe.webp',
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
          I turn unformed ideas into music, images and digital systems—using observation, structure, craft and refinement to make each part belong to a coherent whole.
        </p>

        {/* Identity Line */}
        <p className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-accent-purple font-medium mt-1">
          Guitarist &middot; Visual Artist &middot; Systems-Minded Creator
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3.5 mt-4 w-full sm:w-auto">
          <Link 
            href="/projects" 
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Explore Selected Work
          </Link>
          <Link 
            href="/about" 
            className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            About the Process
          </Link>
        </div>
        
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/80 to-transparent mt-6" />
      </section>

      {/* 2. EXPRESSIONS SECTION */}
      <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            ONE IDENTITY &middot; MANY EXPRESSIONS
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Different materials. One underlying approach.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            My work moves between sound, image and systems. Each begins with something unformed that needs observation, structure and direction.
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

      {/* 3. PROCESS SECTION */}
      <section className="flex flex-col gap-8 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            HOW I WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white font-gothic text-balance">
            From ambiguity to intention.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
          <p className="text-base md:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed md:leading-8 mt-1 text-balance text-pretty">
            Whether I am building a song, an image, a website or a workflow, the underlying process remains much the same.
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
      </section>

      {/* 4. SELECTED WORK SECTION */}
      <section id="selected-work" className="flex flex-col gap-8 max-w-6xl mx-auto w-full scroll-mt-24">
        <div className="flex flex-col items-center text-center gap-2.5 max-w-3xl mx-auto">
          <span className="text-xs font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            SELECTED WORK
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Ideas developed into coherent worlds and systems.
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent mt-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {selectedWork.map((card, idx) => (
            <GlassCard key={idx} accent={card.accent} className="p-5 md:p-6 flex flex-col justify-between h-full group">
              <div className="flex flex-col gap-4">
                {/* Visual Showcase Banner */}
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-md group-hover:border-white/20 transition-all duration-500">
                  <Image 
                    src={card.image} 
                    alt={card.imageAlt} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Category & Title */}
                <div className="flex flex-col gap-1.5 pb-2.5 border-b border-white/5">
                  <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-accent-purple font-semibold">
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
                  className="text-xs font-mono uppercase tracking-widest text-accent-purple group-hover:text-white transition-colors flex items-center gap-1 font-semibold"
                >
                  {card.ctaText} &rarr;
                </Link>
              </div>
            </GlassCard>
          ))}
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
                <Link key={post.id} href={`/blog/${post.slug}`} className="group h-full">
                  <GlassCard accent="purple" className="flex flex-col justify-between h-full p-5 md:p-6 transition-premium">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        <span className="text-accent-purple font-semibold">{post.category || 'Chronicle'}</span>
                        <span>{formattedDate}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-semibold text-white font-gothic group-hover:text-accent-purple transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 mt-6 font-semibold">
                      Read Note &rarr;
                    </span>
                  </GlassCard>
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
          <Link 
            href="/blog" 
            className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-white/20 hover:border-white/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Read the Journal
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-3.5 rounded-full bg-zinc-950/60 hover:bg-zinc-900/70 text-white font-semibold uppercase tracking-wider text-xs md:text-sm font-mono border border-zinc-800 hover:border-accent-purple/40 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.18)] hover:-translate-y-0.5 active:translate-y-0 text-center transition-premium"
          >
            Get in Touch
          </Link>
        </div>
      </section>

    </div>
  );
}
