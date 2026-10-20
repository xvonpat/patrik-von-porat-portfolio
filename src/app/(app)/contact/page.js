import React from 'react';
import Image from 'next/image';
import ContactLinks from '@/components/ContactLinks';

export const metadata = {
  title: "Contact | Patrik von Porat",
  description: "Start a conversation with Patrik von Porat. Inquiries for creative collaborations, music, visual art, or systems and process work.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact | Patrik von Porat",
    description: "Start a conversation with Patrik von Porat. Inquiries for creative collaborations, music, visual art, or systems and process work.",
    url: 'https://vonporat.com/contact',
    images: [
      {
        url: '/images/PvP2.png',
        width: 1200,
        height: 630,
        alt: 'Patrik von Porat - Contact',
      },
    ],
  }
};

const reasons = [
  {
    num: '01',
    title: 'Creative collaborations',
    desc: 'Projects that move across sound, image and story.',
    accent: 'purple',
  },
  {
    num: '02',
    title: 'Music & visual art',
    desc: 'Realmforged, Ashwrithe, drawing, tattoo practice and physical craft.',
    accent: 'purple',
  },
  {
    num: '03',
    title: 'Systems & process work',
    desc: 'Improvement work, workflows and focused digital tools.',
    accent: 'cyan',
  },
];

export default function Contact() {
  return (
    <div className="max-w-5xl xl:max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:min-h-[calc(100vh-14rem)] flex items-center relative z-10">
      <div className="absolute top-[15%] right-[5%] w-[45%] h-[55%] bg-accent-purple/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="w-full flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">

        {/* 1. A short personal note */}
        <header className="lg:col-span-7 lg:row-start-1 flex flex-col items-center text-center lg:items-start lg:text-left gap-3">
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] text-accent-purple uppercase font-semibold">
            CONTACT
          </span>
          <h1 className="text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[4.2rem] font-semibold tracking-tight text-white font-gothic text-balance">
            Start a conversation.
          </h1>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent-purple to-transparent lg:from-accent-purple lg:via-accent-purple/40 mt-1 mb-1" />
          <p className="text-base md:text-lg leading-relaxed md:leading-8 text-zinc-300 font-light max-w-xl text-pretty">
            If something here connects with you, whether it’s the music, the visual work, the digital systems or the process behind them, send me an email. That’s the best place to start. You can also follow what I’m working on through the channels below.
          </p>
        </header>

        {/* 2. Direct line: email first, then the other channels */}
        <aside className="lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-2 lg:self-center">
          <div className="relative rounded-2xl border border-white/[0.08] bg-obsidian-950/60 backdrop-blur-md px-6 py-8 sm:px-8 sm:py-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/40 to-transparent" />
            <p className="text-center text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">
              Direct line
            </p>
            <ContactLinks />
          </div>
        </aside>

        {/* 3. Reasons to write and sign-off */}
        <div className="lg:col-span-7 lg:row-start-2 flex flex-col gap-10">
          <ul className="flex flex-col divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {reasons.map((reason) => (
              <li key={reason.num} className="flex items-baseline gap-4 py-4">
                <span className={`font-mono text-xs font-bold tracking-widest ${reason.accent === 'cyan' ? 'text-accent-cyan' : 'text-accent-purple'}`}>
                  {reason.num}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-base md:text-lg text-white font-gothic font-semibold tracking-tight">
                    {reason.title}
                  </span>
                  <span className="text-sm text-zinc-400 font-light text-pretty">
                    {reason.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center lg:items-start gap-2">
            <Image
              src="/images/pvp_signature.png"
              alt="Patrik von Porat signature"
              width={945}
              height={211}
              className="w-[220px] md:w-[260px] h-auto opacity-80"
            />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500">
              Patrik von Porat · Sweden
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
