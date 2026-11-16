/**
 * Content for the /home-test layout experiment.
 *
 * The copy is a verbatim duplicate of the approved homepage (`src/app/(app)/page.js`), which
 * stays untouched while the two versions are compared. If the test layout is adopted, this
 * file should be merged back so the copy has a single owner again.
 */

export const selectedWork = [
  {
    title: 'Realmforged',
    category: 'MUSIC · WORLDBUILDING · DIGITAL EXPERIENCE',
    description: 'A cinematic power metal project developed across music, dark-fantasy storytelling, visual direction, release design and a dedicated digital home.',
    image: '/images/projects/proof/realmforged-showcase1.webp',
    imageAlt: 'Realmforged cinematic music and worldbuilding showcase',
    link: 'https://realmforgedofficial.com',
    isExternal: true,
    ctaText: 'Explore Realmforged',
    accent: 'purple',
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
    accent: 'purple',
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
    accent: 'purple',
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
    accent: 'purple',
  },
  {
    title: 'DMAIC Companion',
    category: 'WEB · IMPROVEMENT TOOLS',
    description: 'A local-first, guided web app for Lean Six Sigma improvement work and Apollo root cause analysis, replacing static templates with guided workflows.',
    image: '/images/projects/dmaic-companion/01-hero-promo.png',
    imageAlt: 'DMAIC Companion: "Every Lean Six Sigma tool. One guided flow." with a wall of real tool screens: Cause & Effect Tree, Pareto, control chart, capability, Fishbone, boxplot and more',
    link: '/projects/dmaic-companion',
    ctaText: 'Explore DMAIC Companion',
    accent: 'cyan',
  },
  {
    title: 'Home Control Panel',
    category: 'SMART HOME · INTERFACE DESIGN',
    description: 'A personal Home Assistant interface for the whole house, organised by room: a quick overview first, deeper controls when I need them. In daily use on phone and desktop.',
    image: '/images/projects/home-control-panel/overview-desktop.webp',
    imageAlt: 'Desktop control panel with illuminated room tiles, weather, agenda, air quality, coffee and energy cards',
    link: '/projects/home-control-panel',
    ctaText: 'Explore Home Control Panel',
    accent: 'cyan',
  },
];

// Panel images reuse work already shown elsewhere on the site (the About triptych).
export const expressions = [
  {
    title: 'Music & Worlds',
    description: 'Composition, guitar and interconnected creative worlds built through sound, story and visual direction.',
    link: '/music',
    ctaText: 'Explore Music',
    accent: 'purple',
    image: '/images/projects/proof/realmforged-showcase1.webp',
  },
  {
    title: 'Visual Practice',
    description: 'Drawing, tattoo practice, physical models and digital experimentation grounded in observation and craft.',
    link: '/art',
    ctaText: 'Explore Art',
    accent: 'purple',
    image: '/images/art/drawings/eye-study.webp',
  },
  {
    title: 'Systems & Digital Work',
    description: 'Websites, workflows and improvement systems that turn complexity into something clearer and more useful.',
    link: '/projects',
    ctaText: 'Explore Projects',
    accent: 'cyan',
    image: '/images/projects/dmaic-companion/01-hero-promo.png',
  },
];

export const processSteps = [
  {
    number: '01',
    name: 'OBSERVE',
    desc: 'Catching raw guitar riffs, studying pencil proportions, or spotting friction in daily studio habits.',
    accent: 'purple',
  },
  {
    number: '02',
    name: 'STRUCTURE',
    desc: 'Arranging tempos for Realmforged, mapping graphite values, or designing local data models for DMAIC Companion.',
    accent: 'purple',
  },
  {
    number: '03',
    name: 'CREATE',
    desc: 'Tracking layered guitars, rendering physical ink studies, or building focused tools that run right in the browser.',
    accent: 'cyan',
  },
  {
    number: '04',
    name: 'REFINE',
    desc: 'Trimming arrangement clutter, balancing drawing contrast, and testing tools until they hold up in real use.',
    accent: 'cyan',
  },
];

export const currentFocusItems = [
  { text: 'Developing the first official Ashwrithe material', link: '/music#current-projects' },
  { text: 'Building the next phase of Realmforged', link: '/music#current-projects' },
  { text: 'Studying charcoal, drawing and tattoo technique', link: '/art' },
];
