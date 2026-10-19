import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import CtaButton from '@/components/CtaButton';

const IMG = '/images/projects/home-control-panel';

export const metadata = {
  title: "Home Control Panel | Selected Work | Patrik von Porat",
  description: "A custom control panel for the whole house, built on Home Assistant. Lights, heating, the front door, EV charging, solar power, the doorbell camera and the coffee machine in one calm, glanceable interface – designed for a wall-mounted tablet and just as usable on a phone.",
  alternates: {
    canonical: '/projects/home-control-panel',
  },
  openGraph: {
    title: "Home Control Panel | Selected Work | Patrik von Porat",
    description: "A custom control panel for the whole house, built on Home Assistant. Lights, heating, the front door, EV charging, solar power, the doorbell camera and the coffee machine in one calm, glanceable interface – designed for a wall-mounted tablet and just as usable on a phone.",
    url: 'https://vonporat.com/projects/home-control-panel',
    images: [
      {
        url: `${IMG}/00-cover.webp`,
        width: 1600,
        height: 1000,
        alt: 'Dark smart-home control panel shown on a large screen and a phone',
      },
    ],
  }
};

function PhoneShot({ src, alt, caption }) {
  return (
    <figure className="flex flex-col gap-2.5 w-full">
      <div className="w-full aspect-[780/1688] rounded-[1.5rem] overflow-hidden border border-white/[0.1] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 45vw, 260px"
          className="w-full h-full object-cover object-top"
        />
      </div>
      {caption && (
        <figcaption className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider leading-relaxed text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function HomeControlPanelPage() {
  const metadataFacts = [
    {
      label: "STATUS",
      value: "In development – running at home; wall tablet next",
      accent: "amber"
    },
    {
      label: "CATEGORY",
      value: "Smart Home / Interface Design"
    },
    {
      label: "ROLE",
      value: "Concept, interface design, requirements, testing and integration setup – built through AI-assisted development (Claude Code)"
    },
    {
      label: "PLATFORM",
      value: "Home Assistant on a Raspberry Pi"
    },
    {
      label: "ARCHITECTURE",
      value: "One custom Lovelace card (a JavaScript Web Component) in a full-screen panel view – no build step, no framework, no extra front-end dependencies"
    },
    {
      label: "INTEGRATIONS",
      value: "Philips Hue, tado, Yale, Easee, Sungrow, Siemens Home Connect, Google Nest, Sonos, Google Cast, iCloud Calendar, Met.no"
    },
  ];

  const principles = [
    {
      title: "Glanceable First",
      color: "text-accent-cyan",
      text: "The status bar answers the important questions in one line: who is home, is the door locked, is anything heating, is the sun producing, is the car charging. Details live one tap deeper."
    },
    {
      title: "The Interface Reflects the House",
      color: "text-accent-purple",
      text: "Room tiles glow in the actual colour and brightness of their lights. Heating zones glow warm while the radiator is working. The energy flow animates only when power is actually flowing."
    },
    {
      title: "Safe by Default",
      color: "text-amber-400",
      text: "Anything with consequences asks first: unlocking the front door, starting a coffee (“place a cup under the spout first”). Slow devices are protected against double taps."
    },
    {
      title: "Local Where It Matters",
      color: "text-emerald-400",
      text: "The front-door lock runs over Bluetooth and the solar inverter over the local network, so both keep working without the internet. Cloud services are used only where the manufacturer offers nothing else."
    }
  ];

  const techStackLayers = [
    {
      layer: "RUNTIME & INTERFACE",
      badge: "UI Layer",
      accent: "cyan",
      items: [
        {
          name: "Home Assistant on a Raspberry Pi",
          detail: "The house's local hub – every device and integration runs through it."
        },
        {
          name: "One Custom Lovelace Card",
          detail: "A dependency-free JavaScript Web Component (~2,200 lines) with Shadow DOM and CSS Grid."
        },
        {
          name: "Dark “Control Room” Theme",
          detail: "Frosted cards and accents with fixed meanings – teal = OK, amber = active, blue = info, red = attention – set in Inter."
        },
        {
          name: "Live Camera via WebRTC",
          detail: "Home Assistant's own live-camera element, reused for the doorbell video."
        }
      ]
    },
    {
      layer: "DEVICES & DATA",
      badge: "Integrations",
      accent: "purple",
      items: [
        {
          name: "Lights & Climate",
          detail: "Philips Hue lights and scenes; tado heating (cloud) plus a HomeKit bridge."
        },
        {
          name: "Lock & Doorbell",
          detail: "Yale lock over Bluetooth (local); Google Nest doorbell via the SDM API with Pub/Sub events."
        },
        {
          name: "Energy & EV",
          detail: "Sungrow SG8.0RT inverter over local Modbus; Easee EV charger."
        },
        {
          name: "Appliances, Media & Calendar",
          detail: "Siemens Home Connect, Sonos and Google Cast, iCloud via CalDAV, Met.no weather; presence and push via the Home Assistant Companion app."
        }
      ]
    },
    {
      layer: "HOW IT WAS BUILT",
      badge: "Process",
      accent: "cyan",
      items: [
        {
          name: "Requirements, Design & Testing",
          detail: "Requirements, design direction and testing by me; code written by an AI coding assistant (Claude Code)."
        },
        {
          name: "Structure Before Interface",
          detail: "Device names and rooms cleaned up first, so the interface could rely on a consistent structure."
        },
        {
          name: "Verified in the Real House",
          detail: "Every change tested at home before moving on – one device at a time."
        }
      ]
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
              SMART HOME · INTERFACE DESIGN · AUTOMATION
            </span>
            <span className="text-zinc-600 font-mono text-xs">&bull;</span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                IN DEVELOPMENT
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Home Control Panel
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-3xl text-balance text-pretty">
            A custom control panel for the whole house, built on Home Assistant. It brings lights, heating, the front door, EV charging, solar power, the doorbell camera and the coffee machine into one calm, glanceable interface – designed for a wall-mounted tablet in the hallway, and just as usable on a phone.
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
            <span className={`text-sm md:text-[15px] font-sans text-zinc-200 ${fact.accent === 'amber' ? 'text-amber-400 font-medium' : ''}`}>
              {fact.value}
            </span>
          </div>
        ))}
      </section>

      {/* Visual Showcase Banner */}
      <section className="flex flex-col gap-3">
        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <Image
            src={`${IMG}/00-cover.webp`}
            alt="Dark smart-home control panel shown on a large screen and a phone"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center sm:text-left">
          The panel on a wall-tablet layout and on a phone &ndash; all screenshots use the panel&apos;s demo mode
        </span>
      </section>

      {/* 3. Context & Purpose */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Context &amp; Purpose
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Smart Home
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Too Many Apps for One Home
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Every device in the house came with its own app: one for the lights, one for the heating, one for the lock, the charger, the solar inverter, the doorbell and the coffee machine.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Each one works – but nothing works <em>together</em>, and none of them answers the simple question at the front door: <em>is everything okay before I leave?</em>
            </p>
          </GlassCard>

          <GlassCard accent="cyan" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              One Surface, Many Systems
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Home Assistant already connects the devices. What was missing was an interface worth looking at every day.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              Something that reads at a glance from across the hallway, behaves well under a thumb, and feels designed rather than assembled from default cards.
            </p>
          </GlassCard>

          <GlassCard accent="purple" className="p-6 flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Personal Project
            </h3>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              An ongoing personal project and learning vehicle – not a product.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
              As with <Link href="/projects/dmaic-companion" className="text-accent-cyan hover:text-white transition-colors underline underline-offset-2">DMAIC Companion</Link>, I write the requirements and test every step, while an AI coding assistant writes the code under clear working rules. The project grows one device at a time.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* 4. Design Principles */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Design Principles
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Interface Design
          </span>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {principles.map((p) => (
              <div key={p.title} className="flex flex-col gap-2">
                <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${p.color}`}>
                  {p.title}
                </span>
                <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-full aspect-[1600/1111] rounded-2xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            <Image
              src={`${IMG}/01-desktop-overview.webp`}
              alt="Control panel with status pills, a large clock, glowing room tiles and a doorbell card"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center sm:text-left">
            Everything important above the fold &ndash; status bar, clock and forecast, room lighting and the doorbell
          </span>
        </div>
      </section>

      {/* 5. What It Does */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              What It Does
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            Features
          </span>
        </div>

        {/* Lights & scenes – wide desktop image */}
        <GlassCard accent="purple" className="p-6 md:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
              Lights &amp; Scenes
            </h3>
            <span className="text-[10px] font-mono uppercase text-zinc-400">Philips Hue</span>
          </div>
          <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light max-w-3xl text-pretty">
            Ten rooms as tiles that toggle with one tap. A room pop-up shows every lamp with its own colour-matched dimmer, plus the room&apos;s Hue scenes. One &ldquo;All off&rdquo; for leaving the house.
          </p>
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-[1600/1111] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Image
                src={`${IMG}/03-desktop-room-popup.webp`}
                alt="Pop-up listing lamps in a hobby room with coloured brightness sliders"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 1100px"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center sm:text-left">
              Room detail &ndash; each lamp&apos;s slider takes the colour of the light itself
            </span>
          </div>
        </GlassCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Climate */}
          <GlassCard accent="cyan" className="p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Climate
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">tado</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light text-pretty">
              Eight tado heating zones with current temperature, target, humidity and how hard each radiator is working. Tap a zone to adjust in half degrees or switch between schedule, manual and off. Open windows are flagged.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <PhoneShot
                src={`${IMG}/07-mobile-climate.webp`}
                alt="Grid of room temperatures with heating indicators"
                caption="Rooms that are heating glow warm"
              />
              <PhoneShot
                src={`${IMG}/10-mobile-climate-popup.webp`}
                alt="Thermostat pop-up with current and target temperature"
                caption="Adjusting a zone in half degrees"
              />
            </div>
          </GlassCard>

          {/* Front door & doorbell */}
          <GlassCard accent="purple" className="p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Front Door &amp; Doorbell
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Yale · Nest</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light text-pretty">
              The Yale lock shows locked/unlocked, door open/closed and who used it last – unlocking always needs confirmation. The Nest doorbell shows the last ring and the last person at the door; live video starts only on request, to spare the battery.
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed font-light text-pretty">
              <strong className="text-white font-medium">When someone rings, the live view opens full-screen on every open panel</strong>, with an &ldquo;Unlock front door&rdquo; button, and a notification with live video reaches the phone.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <PhoneShot
                src={`${IMG}/05-mobile-home-security.webp`}
                alt="Phone view of the doorbell card and a locked front door"
                caption="Doorbell and lock on the phone"
              />
            </div>
          </GlassCard>

          {/* Energy & EV */}
          <GlassCard accent="cyan" className="p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Energy &amp; EV Charging
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Sungrow · Easee</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light text-pretty">
              Live solar production from the Sungrow inverter with share of peak, today&apos;s yield and lifetime total, and an animated flow from sun to house to charger. The Easee charger shows status, power, session energy and monthly cost, with start/pause and smart charging.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <PhoneShot
                src={`${IMG}/08-mobile-energy.webp`}
                alt="Solar output of 4.62 kW and an EV charger charging at 7.4 kW"
                caption="Live solar production and EV charging"
              />
            </div>
          </GlassCard>

          {/* Coffee */}
          <GlassCard accent="purple" className="p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white font-gothic">
                Coffee
              </h3>
              <span className="text-[10px] font-mono uppercase text-zinc-400">Siemens Home Connect</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light text-pretty">
              The Siemens EQ.9 can be started from the panel – including personal presets with their own strength, volume and milk ratio, sent to the machine with every brew.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <PhoneShot
                src={`${IMG}/11-mobile-coffee.webp`}
                alt="Coffee card with two personal presets and six drink buttons"
                caption="Personal presets and standard drinks"
              />
              <PhoneShot
                src={`${IMG}/12-mobile-coffee-confirm.webp`}
                alt="Confirmation dialog for brewing a cappuccino"
                caption="Every brew asks first"
              />
            </div>
          </GlassCard>
        </div>

        {/* Calendar, media & shopping list */}
        <GlassCard accent="cyan" className="p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg md:text-xl font-semibold text-white font-gothic">
                  Calendar, Media &amp; Shopping List
                </h3>
                <span className="text-[10px] font-mono uppercase text-zinc-400">iCloud · Sonos · Cast</span>
              </div>
              <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed font-light text-pretty">
                The shared family calendar from iCloud with colour per person and a &ldquo;coming up&rdquo; countdown for birthdays and holidays. Sonos and Google speakers with artwork, controls and volume. A shopping list that anyone can add to from the hallway.
              </p>
            </div>
            <div className="w-full max-w-[220px] mx-auto sm:mx-0">
              <PhoneShot
                src={`${IMG}/09-mobile-media.webp`}
                alt="Now-playing card with controls and a shopping list"
                caption="Music, speakers and the shopping list"
              />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 6. Responsive Architecture */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-cyan" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Responsive Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">
            One Card, Three Layouts
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-10">
          <div className="flex flex-col gap-6">
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              The panel measures its own width rather than the screen&apos;s. <strong className="text-white font-medium">Wide:</strong> three columns for the wall tablet and desktop. <strong className="text-white font-medium">Medium:</strong> two columns. <strong className="text-white font-medium">Narrow:</strong> a phone layout with bottom tabs (Home · Lights · Climate · Energy · Media), a swipeable status bar and compact cards. Small badges on the tabs show what is happening elsewhere – lights on, rooms heating, car charging, music playing.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md">
              <PhoneShot
                src={`${IMG}/04-mobile-home.webp`}
                alt="Phone view with clock, forecast, scene buttons and tab bar"
                caption="The home tab with bottom navigation"
              />
              <PhoneShot
                src={`${IMG}/06-mobile-lights.webp`}
                alt="Grid of room tiles in warm, pink and violet light"
                caption="Room tiles glow in the colour of their lights"
              />
            </div>

            <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 flex flex-col gap-4">
              <h3 className="text-base font-semibold text-white font-mono uppercase tracking-wider">
                Built for Real Use
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-300 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-cyan font-mono font-bold">&bull;</span>
                  <span>
                    <strong className="text-white font-medium">Kiosk mode</strong> (<code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">?kiosk</code>) hides Home Assistant&apos;s own header and sidebar for the wall tablet.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-cyan font-mono font-bold">&bull;</span>
                  <span>
                    <strong className="text-white font-medium">Demo mode</strong> (<code className="text-accent-cyan font-mono text-xs px-1 py-0.5 rounded bg-zinc-900/90 border border-white/5">?demo</code>) replaces names and calendar entries with neutral placeholders – used for every screenshot on this page.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-cyan font-mono font-bold">&bull;</span>
                  <span>Greets whoever is signed in; presence for each household member via the Home Assistant phone app.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-accent-cyan font-mono font-bold">&bull;</span>
                  <span>Renders only what changed, so the panel stays smooth on modest tablets.</span>
                </li>
              </ul>
            </div>
          </div>

          <figure className="flex flex-col gap-3 w-full max-w-[340px] mx-auto lg:mx-0">
            <div className="w-full aspect-[1440/2760] rounded-xl overflow-hidden border border-white/[0.08] bg-obsidian-950/80 relative shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <Image
                src={`${IMG}/02-desktop-full.webp`}
                alt="Full-length view of the three-column control panel"
                fill
                sizes="340px"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <figcaption className="text-xs font-mono text-zinc-400 uppercase tracking-wider text-center lg:text-left">
              The complete wall-tablet layout, from status bar to shopping list
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 7. Complete Technology Overview */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent-purple" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Complete Technology Overview
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
              className="rounded-xl border border-white/[0.08] bg-obsidian-950/70 p-5 md:p-6 flex flex-col gap-4"
            >
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
          ))}
        </div>
      </section>

      {/* 8. Current State & What's Next */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h2 className="text-xl md:text-2xl font-semibold text-white font-gothic tracking-wide">
              Status &amp; What&apos;s Next
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
                Running Today
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-zinc-300 font-light list-disc list-inside">
              <li><strong className="text-white font-normal">Lights:</strong> 10 rooms with per-lamp dimmers and Hue scenes</li>
              <li><strong className="text-white font-normal">Climate:</strong> 8 tado heating zones</li>
              <li><strong className="text-white font-normal">Security:</strong> Yale lock and Nest doorbell with full-screen live view on ring</li>
              <li><strong className="text-white font-normal">Energy:</strong> Sungrow solar production and Easee EV charging</li>
              <li><strong className="text-white font-normal">Everyday:</strong> coffee presets, family calendar, speakers and a shared shopping list</li>
              <li><strong className="text-white font-normal">Layouts:</strong> wall tablet, desktop and a dedicated phone layout</li>
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
              <li><strong className="text-white font-normal">Wall tablet</strong> mounted in the hallway, with its own account, screen wake on motion and kiosk mode</li>
              <li><strong className="text-white font-normal">A dedicated energy page</strong> with an illustrated house and live flows – once an electricity meter is connected</li>
              <li><strong className="text-white font-normal">Alarm system and robot vacuum</strong></li>
              <li><strong className="text-white font-normal">Automations</strong> that use the panel&apos;s knowledge: lights that follow presence, heating that follows the calendar</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 9. Bottom Navigation Footer */}
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
