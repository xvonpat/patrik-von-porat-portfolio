import React from 'react';
import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { ShotLightbox, Shot } from './ShotLightbox';

const IMG = '/images/projects/home-control-panel';

const description = 'A personal Home Assistant control panel, designed around everyday life at home: rooms first, deeper controls when I need them, on the phone and the computer.';

export const metadata = {
  title: 'Home Control Panel | Selected Work | Patrik von Porat',
  description,
  alternates: {
    canonical: '/projects/home-control-panel',
  },
  openGraph: {
    title: 'Home Control Panel | Selected Work | Patrik von Porat',
    description,
    url: 'https://vonporat.com/projects/home-control-panel',
    images: [
      {
        url: `${IMG}/overview-desktop.webp`,
        width: 2880,
        height: 1800,
        alt: 'Desktop control panel with illuminated room tiles, weather, agenda, air quality, coffee and energy cards',
      },
    ],
  },
};

/* Every screenshot on the page, in reading order. The lightbox browses them in this order. */
const shots = [
  {
    src: 'overview-desktop.webp',
    title: 'Desktop overview',
    alt: 'Desktop control panel with illuminated room tiles, weather, agenda, air quality, and the upper parts of the coffee and energy cards.',
    caption: 'The desktop overview. Rooms, everyday controls and the state of the home, brought together.',
  },
  {
    src: 'home-mobile.webp',
    phone: true,
    title: 'Home on the phone',
    alt: 'Phone screen with a swipeable status line, the time, weather with a five-day forecast, and an agenda with sample events. Tabs along the bottom.',
    caption: 'Home, with tabs along the bottom.',
  },
  {
    src: 'lights-mobile.webp',
    phone: true,
    title: 'Lights on the phone',
    alt: 'Mobile lighting tab with homecoming and bedtime moods above a grid of glowing room tiles with brightness bars and power buttons.',
    caption: 'Lights: moods and every room as a tile.',
  },
  {
    src: 'room-detail-desktop.webp',
    title: 'Room detail',
    alt: 'Open living-room panel showing room brightness, current and target temperature with schedule, manual and off modes, and individual lamp controls.',
    caption: 'Open a room to reach heating, individual lights and more detailed adjustments.',
  },
  {
    src: 'air-comfort-mobile.webp',
    phone: true,
    title: 'Air comfort',
    alt: 'Living-room detail with temperature and humidity plotted as a dot towards humid, and a short tip to air the room.',
    caption: 'Temperature and humidity become a position, a description and a practical tip.',
  },
  {
    src: 'energy-desktop.webp',
    title: 'Energy',
    alt: "Energy tab showing the house drawing from the grid at night, solar production at zero, today's totals and the current electricity price marked expensive.",
    caption: 'An evening snapshot: the house is drawing from the grid and solar production is zero.',
  },
  {
    src: 'energy-mobile.webp',
    phone: true,
    title: 'Energy on the phone',
    alt: "Phone energy view with a flow diagram from grid to house, solar at zero, today's totals and the current electricity price marked expensive.",
    caption: 'The same evening on the phone: live flow, today’s totals and the price right now.',
  },
  {
    src: 'coffee-settings-desktop.webp',
    title: 'Coffee settings',
    alt: 'Coffee machine detail panel with drink choices, cup statistics, maintenance status and child lock.',
    caption: 'The coffee card’s deeper controls. The morning routine itself runs in Home Assistant.',
  },
  {
    src: 'hobby-room-desktop.webp',
    title: 'Hobby room',
    alt: 'Hobby-room page with five lighting modes, coloured lighting zones, a TV remote, and temperature and humidity graphs.',
    caption: 'The hobby room: one space, with different settings for the things I do here. The same modes are also set up as scripts for a Stream Deck+ on my desk.',
  },
];

function SectionHeading({ number, label, title, children }) {
  return (
    <div className="flex flex-col gap-4 max-w-3xl">
      <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
        <span className="text-accent-cyan">{number}</span>
        <span className="mx-2 text-zinc-600" aria-hidden="true">/</span>
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic text-balance">
        {title}
      </h2>
      {children && (
        <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-pretty">
          {children}
        </p>
      )}
    </div>
  );
}

const facts = [
  { label: 'Role', value: 'Concept, interface design, requirements and testing' },
  { label: 'Platform', value: 'Home Assistant on a Raspberry Pi 4' },
  { label: 'Used on', value: 'Phone and computer, every day' },
  { label: 'Started', value: 'October 2026, now at version 0.39' },
];

const systemParts = [
  {
    title: 'My interface',
    text: 'The layout, room tiles, detail panels and visual feedback. It runs in the browser on a phone or computer.',
    link: 'Reads status, sends commands',
  },
  {
    title: 'Home Assistant',
    text: 'Open-source software that connects devices from different brands. It provides device states, history, accounts and the automation engine.',
    link: 'Connects through integrations',
  },
  {
    title: 'Raspberry Pi',
    text: 'A small computer, about the size of a deck of cards. Mine runs Home Assistant OS and serves the panel’s code.',
    link: 'The computer behind it all',
  },
  {
    title: 'The devices',
    text: 'Lights, heating, coffee, energy and media. Some are reached on the local network, others through their manufacturers’ online services.',
    link: 'Local network and cloud',
  },
];

const designPoints = [
  {
    title: 'Rooms first',
    text: 'Each room tile combines temperature, lighting status and brightness. A power button controls the room; dragging across the tile adjusts the light level.',
  },
  {
    title: 'Details on demand',
    text: 'Opening a room reveals heating and individual lamps. Other cards follow the same pattern: everyday actions on the front, settings and statistics behind them.',
  },
  {
    title: 'A layout that adapts',
    text: 'On a phone, compact cards and bottom tabs make space for one topic at a time. The panel remembers the selected tab on each device.',
  },
];

const coffeeFlow = [
  { when: '06:30', what: 'Monday to Friday' },
  { when: 'Check', what: 'Workday confirms a working day' },
  { when: 'Check', what: 'The machine is off' },
  { when: 'Action', what: 'Switch on, warm up and rinse' },
];

const signalChain = ['My panel', 'Home Assistant', 'Integration', 'Device or cloud service'];

export default function HomeControlPanelPage() {
  return (
    <ShotLightbox shots={shots}>
    <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-[1240px] mx-auto px-6 lg:px-8 py-8 md:py-14 flex flex-col gap-20 md:gap-28 relative z-10">

      {/* Hero */}
      <header className="flex flex-col gap-10 md:gap-12 pt-2">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 py-2 text-xs md:text-sm font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors self-start group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true">&larr;</span>
          <span>Back to Selected Work</span>
        </Link>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-accent-purple font-semibold">
              Personal project · Home Assistant
            </span>
            <span className="text-zinc-600 font-mono text-xs" aria-hidden="true">&bull;</span>
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" aria-hidden="true" />
              In daily use · In development
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white font-gothic text-balance">
            Home Control Panel
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-16 lg:items-end">
            <p className="text-2xl md:text-3xl text-white font-light leading-snug tracking-tight text-balance">
              A home full of different devices. <span className="text-zinc-400">One interface, made my way.</span>
            </p>
            <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-pretty">
              I designed a control panel that brings everyday adjustments into one place. A quick overview first, with deeper controls when I need them.
            </p>
          </div>
        </div>

        <Shot
          src="overview-desktop.webp"
          priority
        />

        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 border-y border-white/[0.08] py-6 md:py-8">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5">
              <dt className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">{fact.label}</dt>
              <dd className="text-sm md:text-[15px] text-zinc-200 leading-relaxed text-pretty">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* 01 The idea */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-20">
        <div className="lg:sticky lg:top-28 self-start">
          <SectionHeading number="01" label="The idea" title="Fewer apps for the small things." />
        </div>
        <div className="flex flex-col gap-5 text-base md:text-lg text-zinc-300 font-light leading-relaxed text-pretty max-w-2xl">
          <p>
            Changing the lights, adjusting the heating or checking the coffee machine meant opening separate apps. Each worked in its own way, but none gave me the whole picture.
          </p>
          <p>
            I installed Home Assistant on a Raspberry Pi and built my own interface on top of it. I wanted the controls to look and behave the way I use the home: organised by room, easy to scan and ready to go deeper.
          </p>
          <p>
            It now handles my everyday control on the phone and computer. Using it is also how I find the next thing to improve.
          </p>
        </div>
      </section>

      {/* At hand: the phone */}
      <section className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[480px] w-full mx-auto md:mx-0 md:w-[480px]">
          <Shot
            src="home-mobile.webp"
            className="hidden sm:flex"
            sizes="230px"
          />
          <Shot
            src="lights-mobile.webp"
            sizes="(max-width: 640px) 280px, 230px"
          />
        </div>
        <div className="flex flex-col gap-5 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple">At hand</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white font-gothic text-balance">
            A small adjustment. A single place to make it.
          </h2>
          <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed text-pretty">
            Turn a room on, adjust its brightness or open the individual lights. On the phone the same panel becomes one column, with each topic behind its own tab.
          </p>
        </div>
      </section>

      {/* 02 The system */}
      <section className="flex flex-col gap-10 md:gap-12">
        <SectionHeading number="02" label="The system" title="Four parts, working together.">
          Home Assistant provides the foundation. My work is the interface and the way the system is set up around our home.
        </SectionHeading>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.08]">
          {systemParts.map((part, idx) => (
            <li key={part.title} className="flex flex-col gap-3 p-6 md:p-7 bg-obsidian-950">
              <span className="font-mono text-xs text-accent-cyan">0{idx + 1}</span>
              <h3 className="text-xl font-semibold text-white font-gothic">{part.title}</h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">{part.text}</p>
              <span className="mt-auto pt-3 text-[11px] font-mono uppercase tracking-wider text-zinc-500">{part.link}</span>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="flex flex-col gap-3 border-l border-accent-purple/50 pl-5">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple">What I built</h3>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              The interface, the hobby-room page, the energy diagram, the air-comfort indicator and the way it all behaves. I also connected and organised the devices, configured the routines and created the lighting scenes. As with <Link href="/projects/dmaic-companion" className="text-white underline decoration-accent-purple/60 underline-offset-4 hover:text-accent-purple transition-colors">DMAIC Companion</Link>, I set the direction and test every step at home, while an AI coding assistant (Claude Code) writes the code.
            </p>
          </div>
          <div className="flex flex-col gap-3 border-l border-white/15 pl-5">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">What I build on</h3>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              Home Assistant and its community provide the platform and the integrations. My panel sends requests to Home Assistant; it never talks to the devices directly.
            </p>
          </div>
        </div>
      </section>

      {/* 03 The interface */}
      <section className="flex flex-col gap-12 md:gap-16">
        <SectionHeading number="03" label="The interface" title="An overview, with room to go deeper.">
          I wanted the first view to make sense quickly. More detailed controls belong one step further in.
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {designPoints.map((point) => (
            <div key={point.title} className="flex flex-col gap-3 border-t border-white/[0.1] pt-5">
              <h3 className="text-lg font-semibold text-white font-gothic">{point.title}</h3>
              <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">{point.text}</p>
            </div>
          ))}
        </div>

        <Shot
          src="room-detail-desktop.webp"
        />

        {/* Making information readable */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-center rounded-2xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-10">
          <Shot
            src="air-comfort-mobile.webp"
          />
          <div className="flex flex-col gap-5">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan">Making information readable</span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">More than a number.</h3>
            <p className="text-base text-zinc-300 font-light leading-relaxed text-pretty">
              A temperature or humidity reading is useful, but it still needs interpretation. I built an air-comfort indicator that places a dot between warm, cold, dry and humid, with a short explanation alongside it.
            </p>
            <p className="text-base text-zinc-300 font-light leading-relaxed text-pretty">
              The air purifier works the same way. Its values get plain names such as fine particles, stuffiness or odours, each with a word and a colour: good, OK or poor.
            </p>
          </div>
        </div>

        {/* Energy */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-6 lg:gap-20">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic text-balance">
              Where the electricity is going.
            </h3>
            <p className="text-base text-zinc-300 font-light leading-relaxed text-pretty max-w-2xl">
              The energy view shows the flow between the solar panels, the house, the grid and the car charger, with today’s totals underneath. The price card compares the current price with the rest of the day and marks the cheapest three hours in a row.
            </p>
          </div>
          <Shot
            src="energy-desktop.webp"
            className="hidden md:flex"
          />
          <Shot
            src="energy-mobile.webp"
            className="md:hidden"
          />
        </div>
      </section>

      {/* 04 Everyday routines */}
      <section className="flex flex-col gap-14 md:gap-20">
        <SectionHeading number="04" label="Everyday routines" title="Small routines. Fewer separate steps.">
          Some things happen on a schedule. Others bring several changes together at the press of a button.
        </SectionHeading>

        {/* Coffee */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple">A weekday morning</span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic">Warm before I get there.</h3>
            <p className="text-base text-zinc-300 font-light leading-relaxed text-pretty">
              At 06:30 on working days, Home Assistant switches on the coffee machine if it is off. The machine warms up and rinses itself. Brewing is still something I choose.
            </p>
            <p className="text-base text-zinc-300 font-light leading-relaxed text-pretty">
              The Workday integration knows the Swedish public holidays, and I added Christmas Eve, New Year’s Eve and Midsummer Eve as days off. My personal calendar is separate and only supplies the panel’s agenda.
            </p>
            <ol className="mt-2 flex flex-col">
              {coffeeFlow.map((step, idx) => (
                <li key={step.what} className="grid grid-cols-[64px_1fr] gap-4 py-3 border-t border-white/[0.08] last:border-b">
                  <span className={`font-mono text-xs uppercase tracking-wider pt-0.5 ${idx === coffeeFlow.length - 1 ? 'text-accent-cyan' : 'text-zinc-500'}`}>{step.when}</span>
                  <span className="text-sm text-zinc-200">{step.what}</span>
                </li>
              ))}
            </ol>
          </div>
          <Shot
            src="coffee-settings-desktop.webp"
          />
        </div>

        {/* Hobby room */}
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-6 lg:gap-20">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple">A room for different kinds of making</span>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-gothic text-balance">Set the room for what comes next.</h3>
            </div>
            <div className="flex flex-col gap-4 text-base text-zinc-300 font-light leading-relaxed text-pretty max-w-2xl">
              <p>
                My hobby room has its own page, with lighting modes for work, building, drawing and gaming. The drawing mode also turns on the TV and opens YouTube, all in one action.
              </p>
              <p>
                Lighting zones and individual controls stay available for fine-tuning. Temperature and humidity graphs show the room’s conditions, with a reference band for what suits my instruments.
              </p>
            </div>
          </div>
          <Shot
            src="hobby-room-desktop.webp"
          />
        </div>
      </section>

      {/* 05 Under the surface */}
      <section className="flex flex-col gap-10 md:gap-12">
        <SectionHeading number="05" label="Under the surface" title="What happens after a tap?">
          An API is a defined way for software to exchange information and commands. My panel uses Home Assistant’s interfaces to request actions and receive updates.
        </SectionHeading>

        <ol className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0" aria-label="How a command travels">
          {signalChain.map((node, idx) => (
            <li key={node} className="flex flex-col md:flex-row md:flex-1 items-center gap-2 md:gap-0">
              <span className={`w-full md:flex-1 text-center rounded-xl border px-4 py-4 text-sm ${idx === 0 ? 'border-accent-purple/50 text-white bg-accent-purple/[0.06]' : 'border-white/[0.1] text-zinc-200 bg-obsidian-950/60'}`}>
                {node}
              </span>
              {idx < signalChain.length - 1 && (
                <span className="text-accent-cyan font-mono text-sm md:px-3 rotate-90 md:rotate-0" aria-hidden="true">&harr;</span>
              )}
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white font-gothic">A connection that stays open</h3>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              A WebSocket lets the browser and Home Assistant exchange messages over a connection that stays open. The panel shares the Home Assistant frontend’s connection for live state, commands and extra data such as history and energy statistics.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              When I tap a light, the panel calls <code className="font-mono text-[13px] text-accent-cyan">hass.callService</code>. Home Assistant passes the command to the integration, and the updated device state flows back to the panel.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white font-gothic">Some requests work differently</h3>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              Calendar events use Home Assistant’s REST API: one request, one response. It is the panel’s only REST call. Weather forecasts arrive through a WebSocket subscription.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              The Hue bridge, the HomeWizard meter and the Sungrow inverter (over Modbus TCP) are reached locally. Heating through tado and coffee through Home Connect depend on their cloud services.
            </p>
          </div>
        </div>

        <details className="group border-y border-white/[0.1]">
          <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-sm font-mono uppercase tracking-[0.2em] text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:text-white">
            Implementation notes
            <span className="text-accent-purple text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 pb-8 pt-2">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white">A custom dashboard component</h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  Plain JavaScript, HTML and CSS in one file, registered as Web Components inside Home Assistant’s dashboard. The code is served from the Raspberry Pi and runs in the browser, with no framework or build step.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white">Responsive to its own space</h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  A <code className="font-mono text-[13px] text-accent-cyan">ResizeObserver</code> watches the panel’s own width rather than the screen. Below 700 pixels it switches to the mobile layout.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white">Small details in daily use</h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  Each card’s HTML is compared with its previous version before the page is touched. Open detail panels keep their scroll position. Drag and long-press gestures are kept apart from taps, so a room is not switched off by mistake.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-white">Real devices have limitations</h3>
                <p className="text-sm text-zinc-300 font-light leading-relaxed text-pretty">
                  The charger can respond slowly, so its toggle pauses for 20 seconds after a press. Live charger power may lag, and some device controls still need more testing.
                </p>
              </div>
            </div>
          </div>
        </details>
      </section>

      {/* 06 Still taking shape */}
      <section className="flex flex-col gap-10">
        <SectionHeading number="06" label="Still taking shape" title="Built through daily use." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-7 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-cyan">Now</span>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              I use the panel every day on my phone and computer, and it is the default view for everyone at home. The first version ran on 18 October 2026; ten days later it is at version 0.39.
            </p>
            <p className="text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed text-pretty">
              Daily use gives me small, specific things to refine: how a control responds, what deserves space and what can stay one step further in.
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-obsidian-950/60 p-6 md:p-7 flex flex-col gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-accent-purple">Next</span>
            <ul className="flex flex-col gap-3 text-sm md:text-[15px] text-zinc-300 font-light leading-relaxed">
              <li className="flex gap-3"><span className="text-accent-purple" aria-hidden="true">&bull;</span><span>A wall-mounted tablet in the hallway. Kiosk mode is ready, but the tablet is not installed yet.</span></li>
              <li className="flex gap-3"><span className="text-accent-purple" aria-hidden="true">&bull;</span><span>Charging the car during the cheapest hours of the day.</span></li>
              <li className="flex gap-3"><span className="text-accent-purple" aria-hidden="true">&bull;</span><span>Household consumption hour by hour, next to the price chart.</span></li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed max-w-3xl text-pretty">
          About the screenshots: real captures of the running panel, taken on 28 October 2026 in its own demo mode. Names are anonymised, calendar events are sample data, and the alarm, lock and doorbell are hidden. Phone views were captured with phone emulation. The air purifier’s filter value has been unavailable since its integration was re-added, so the overview shows it as a warning.
        </p>
      </section>

      {/* Closing */}
      <section className="flex flex-col gap-8 pt-10 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <CtaButton href="/about" className="px-6 py-3 text-xs md:text-sm">
            <span>How I Work</span>
            <span className="aurora-cta-arrow inline-block" aria-hidden="true">&rarr;</span>
          </CtaButton>
          <CtaButton href="/projects" variant="secondary" className="px-6 py-3 text-xs md:text-sm">
            Back to Selected Work
          </CtaButton>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-x-10 gap-y-1 text-sm text-zinc-400">
          <Link href="/projects/dmaic-companion" className="py-3 hover:text-white transition-colors">
            More systems work: <span className="text-zinc-200">DMAIC Companion</span> <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href="/art" className="py-3 hover:text-white transition-colors">
            Another material: <span className="text-zinc-200">graphite and visual practice</span> <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

    </div>
    </ShotLightbox>
  );
}
