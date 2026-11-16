import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CtaButton from '@/components/CtaButton';
import DigitalSculpture from '@/components/digital-sculpture/DigitalSculpture';
import WorkShowcase from '@/components/home-test/WorkShowcase';
import styles from '@/components/home-test/HomeTest.module.css';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config.ts';
import { selectedWork, expressions, processSteps, currentFocusItems } from './content';

/**
 * /home-test: a layout and design experiment for the homepage, kept beside the approved
 * page at `/` so the two can be compared. Same copy, same section order, same content.
 * Not linked from navigation and not indexed.
 */

export const revalidate = 60;

export const metadata = {
  title: 'Home Test | Patrik von Porat',
  robots: { index: false, follow: false },
  alternates: { canonical: '/' },
};

const CONTAINER = 'mx-auto w-full max-w-7xl px-6 lg:px-8';

function SectionHeader({ index, eyebrow, title, intro, children }) {
  return (
    <div className={`${styles.reveal} flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12`}>
      <div className="flex max-w-4xl flex-col gap-5">
        <p className="flex items-center gap-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-purple">
          <span aria-hidden="true">{index}</span>
          <span className="h-px w-10 bg-accent-purple/60" aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
        <h2 className="font-gothic text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
          {title}
        </h2>
      </div>
      {(intro || children) && (
        <div className="flex max-w-md flex-col gap-4 lg:pb-2">
          {intro && (
            <p className="text-base font-light leading-relaxed text-zinc-300 md:text-lg md:leading-8 text-pretty">
              {intro}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

function ArrowLink({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-zinc-300 transition-colors hover:text-white md:text-sm ${className}`}
    >
      <span>{children}</span>
      <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default async function HomeTest() {
  let latestPosts = [];
  let homepageBackground = 'harmonic-nexus';
  try {
    const payload = await getPayload({ config: configPromise });
    const [postsResult, siteSettings] = await Promise.all([
      payload.find({
        collection: 'posts',
        where: { status: { equals: 'published' } },
        sort: '-publishedDate',
        limit: 3,
      }),
      payload.findGlobal({ slug: 'site-settings' }).catch((err) => {
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

  return (
    <>
      <DigitalSculpture theme={homepageBackground} className={styles.sculpture} />

      <div className={`${styles.page} relative z-10 flex flex-col`}>

        {/* 1. HERO: one full screen */}
        <section className={`${styles.hero} ${CONTAINER} flex flex-col`}>
          <div className={`${styles.intro} flex flex-1 flex-col items-start justify-center gap-6 py-10 lg:max-w-[66%]`}>
            <p style={{ '--i': 0 }} className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-zinc-300 md:text-sm">
              PATRIK VON PORAT · CREATIVE HUB
            </p>

            <h1 style={{ '--i': 1 }} className="font-gothic text-[clamp(2.75rem,6.4vw,6.25rem)] font-semibold leading-[1.03] tracking-tight text-white select-none text-balance">
              Creative instinct, given structure.
            </h1>

            <p style={{ '--i': 2 }} className="max-w-xl text-lg font-light leading-relaxed text-zinc-300 md:text-xl md:leading-9 text-pretty">
              I’m Patrik von Porat. I make heavy music, draw by hand, and build digital tools for creative work. This is where I share the projects, and the thinking that shapes them.
            </p>

            <div style={{ '--i': 3 }} className="mt-2 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
              <CtaButton href="#selected-work" className="px-8 py-3.5 text-xs md:text-sm">
                Explore Selected Work
              </CtaButton>
              <CtaButton href="/about" variant="secondary" className="px-8 py-3.5 text-xs md:text-sm">
                About the Process
              </CtaButton>
            </div>
          </div>

          {/* Bottom rail: identity line and a quiet scroll cue */}
          <div className={`${styles.intro} flex items-end justify-between gap-6 border-t border-white/10 pb-8 pt-5`}>
            <p style={{ '--i': 5 }} className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent-purple sm:text-sm">
              Guitarist &middot; Visual Artist &middot; Systems-Minded Creator
            </p>
            <div style={{ '--i': 6 }} className="hidden items-center gap-3 sm:flex" aria-hidden="true">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">Scroll</span>
              <span className={styles.scrollCue} />
            </div>
          </div>
        </section>

        {/* 2. SELECTED WORK: large image-led showcase */}
        <section id="selected-work" className="flex scroll-mt-24 flex-col gap-10 py-24 md:gap-14 md:py-36">
          <div className={CONTAINER}>
            <SectionHeader
              index="01"
              eyebrow="SELECTED WORK"
              title="Concrete projects across sound, image and code."
              intro="Active music releases, hands-on craft and personal tools in development."
            >
              <ArrowLink href="/projects">View all projects</ArrowLink>
            </SectionHeader>
          </div>

          <WorkShowcase items={selectedWork} />
        </section>

        {/* 3. EXPRESSIONS: three image panels */}
        <section className={`${CONTAINER} flex flex-col gap-10 py-24 md:gap-14 md:py-36`}>
          <SectionHeader
            index="02"
            eyebrow={<>ONE IDENTITY &middot; MANY EXPRESSIONS</>}
            title="Explore by discipline."
            intro="Three distinct creative areas connected by the same commitment to craft, structure, and continuous improvement."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {expressions.map((item, idx) => {
              const isCyan = item.accent === 'cyan';
              return (
                <Link
                  key={item.title}
                  href={item.link}
                  className={`${styles.reveal} group relative flex aspect-[4/3] flex-col justify-end overflow-hidden border border-white/[0.08] bg-obsidian-950 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-cyan md:aspect-[3/4]`}
                >
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover opacity-55 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-75 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/75 to-obsidian-950/10" aria-hidden="true" />

                  <span className="absolute left-6 top-6 font-mono text-xs font-semibold tracking-[0.3em] text-zinc-200 md:left-7 md:top-7" aria-hidden="true">
                    0{idx + 1}
                  </span>

                  <div className="relative flex flex-col gap-3 p-6 md:p-7">
                    <h3 className="font-gothic text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-zinc-200 md:text-[15px] text-pretty">
                      {item.description}
                    </p>
                    <span className={`mt-2 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors group-hover:text-white ${isCyan ? 'text-accent-cyan' : 'text-accent-purple'}`}>
                      <span>{item.ctaText}</span>
                      <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4. PROCESS: one connected line */}
        <section className={`${CONTAINER} flex flex-col gap-12 py-24 md:gap-16 md:py-36`}>
          <SectionHeader
            index="03"
            eyebrow="HOW I WORK"
            title="From raw instinct to deliberate execution."
            intro="The medium dictates the tools, but the underlying discipline connects every project."
          />

          <div className={`${styles.process} relative`}>
            {/* Rail: vertical on small screens, horizontal on desktop */}
            <div className={`${styles.processRail} absolute bottom-0 left-[5px] top-0 w-px lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto`} aria-hidden="true">
              <div className={`${styles.processFill} h-full w-full`} />
            </div>

            <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
              {processSteps.map((step) => {
                const isCyan = step.accent === 'cyan';
                return (
                  <li key={step.number} className={`${styles.step} relative flex flex-col gap-3 pl-9 lg:pl-0 lg:pt-10`}>
                    <span
                      className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full ring-4 ring-obsidian-950 lg:top-0 ${isCyan ? 'bg-accent-cyan' : 'bg-accent-purple'}`}
                      aria-hidden="true"
                    />
                    <span className={`font-mono text-xs font-bold tracking-widest ${isCyan ? 'text-accent-cyan' : 'text-accent-purple'}`}>
                      {step.number}
                    </span>
                    <h3 className="font-gothic text-xl font-semibold tracking-wide text-white md:text-2xl">
                      {step.name}
                    </h3>
                    <p className="max-w-sm text-sm font-light leading-relaxed text-zinc-300 md:text-[15px] text-pretty">
                      {step.desc}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <ArrowLink href="/about">Read the full process on About</ArrowLink>
        </section>

        {/* 5. CURRENTLY: a slim, frameless row */}
        <section className={`${CONTAINER} py-10 md:py-14`}>
          <div className={`${styles.reveal} grid grid-cols-1 gap-8 border-y border-white/10 py-10 md:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16`}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-purple animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-purple">
                  CURRENTLY
                </span>
              </div>
              <h3 className="font-gothic text-2xl font-semibold text-white sm:text-3xl md:text-4xl text-balance">
                What I am building and learning now.
              </h3>
            </div>

            <ul className="flex flex-col divide-y divide-white/10">
              {currentFocusItems.map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.link}
                    className="group flex items-center justify-between gap-4 py-4 text-base font-light leading-relaxed text-zinc-200 transition-colors hover:text-white md:text-lg"
                  >
                    <span className="text-pretty">{item.text}</span>
                    <span className="text-accent-purple transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. FROM THE JOURNAL: editorial list */}
        <section className={`${CONTAINER} flex flex-col gap-10 py-24 md:gap-14 md:py-36`}>
          <SectionHeader index="04" eyebrow="FROM THE JOURNAL" title="Notes from the process.">
            <ArrowLink href="/blog" className="!text-accent-purple hover:!text-white">View All Notes</ArrowLink>
          </SectionHeader>

          {latestPosts.length > 0 ? (
            <ul className="flex flex-col border-t border-white/10">
              {latestPosts.map((post) => {
                const formattedDate = post.publishedDate
                  ? new Date(post.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  : 'Recent';
                const category = typeof post.category === 'object' && post.category !== null
                  ? (post.category.name || post.category.slug || 'Chronicle')
                  : (post.category || 'Chronicle');
                const isCyan = typeof post.category === 'object' && post.category?.accent === 'cyan';

                return (
                  <li key={post.id} className={`${styles.reveal} border-b border-white/10`}>
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read note: ${post.title}`}
                      className="group grid grid-cols-1 gap-3 py-7 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-purple/70 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:items-baseline md:gap-8 md:py-9"
                    >
                      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-widest md:flex-col md:items-start md:gap-1.5">
                        <span className="text-zinc-300">{formattedDate}</span>
                        <span className={`font-semibold ${isCyan ? 'text-accent-cyan' : 'text-accent-purple'}`}>{category}</span>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        <h3 className="font-gothic text-2xl font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-accent-purple md:text-3xl lg:text-4xl text-balance">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="max-w-3xl text-sm font-light leading-relaxed text-zinc-300 line-clamp-2 md:text-base text-pretty">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-colors group-hover:text-accent-purple">
                        <span>Read Note</span>
                        <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-3 border-y border-white/10 py-10">
              <p className="text-base font-light text-zinc-300">
                Explore reflections on music, visual art, digital systems, and process improvement.
              </p>
              <ArrowLink href="/blog" className="!text-accent-purple hover:!text-white">Read the Journal</ArrowLink>
            </div>
          )}
        </section>

        {/* 7. CLOSING: the heading at full scale */}
        <section className={`${CONTAINER} flex flex-col items-center gap-7 pb-24 pt-16 text-center md:pb-36 md:pt-24`}>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent-purple to-transparent" aria-hidden="true" />
          <h2 className={`${styles.reveal} font-gothic text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[1.02] tracking-tight text-white text-balance`}>
            Follow the work as it develops.
          </h2>
          <p className="text-base font-light leading-relaxed text-zinc-300 md:text-xl text-balance">
            Music, images, experiments and the thinking behind them.
          </p>
          <div className="mt-2 flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <CtaButton href="/blog" className="px-8 py-3.5 text-xs md:text-sm">
              Read the Journal
            </CtaButton>
            <CtaButton href="/contact" variant="secondary" className="px-8 py-3.5 text-xs md:text-sm">
              Get in Touch
            </CtaButton>
          </div>
          <div className="mt-1 flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-zinc-300">
            <a href="https://www.instagram.com/patrikvonporat/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a>
            <span className="text-zinc-600" aria-hidden="true">&middot;</span>
            <a href="https://www.threads.com/@patrikvonporat" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Threads</a>
          </div>
        </section>
      </div>

      {/* Comparison helper: only on the test page */}
      <Link
        href="/"
        className="fixed bottom-4 right-4 z-40 border border-white/15 bg-obsidian-950/85 px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-200 backdrop-blur transition-colors hover:border-white/40 hover:text-white"
      >
        Test layout &middot; View current home &rarr;
      </Link>
    </>
  );
}
