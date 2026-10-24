# vonporat.com — Design System

Last reviewed: 2026-10-22

## Purpose

This document defines the visual language, layout behavior, and design principles of vonporat.com.

It describes how the site should feel, how visual elements relate, and how design changes should be evaluated.

- `AGENTS.md` contains mandatory agent behavior and current page statuses.
- `PROJECT_CONTEXT.md` explains Patrik, the audience, and the site's purpose.
- `SITE_ARCHITECTURE.md` defines routes, page responsibilities, and content ownership.
- `CONTENT_GUIDE.md` defines voice, copy, and messaging.
- `TECHNICAL_SYSTEM.md` defines technical configuration and implementation details.

The repository is authoritative for current CSS variables, fonts, breakpoints, component names, and spacing tokens.

## Current visual direction

The approved direction is **Obsidian Noir**.

It feels:
- **Dark** — obsidian and graphite surfaces with rich ambient depth.
- **Premium** — restrained luxury, clean typography, fine borders, and smoked glass.
- **Artistic** — material craft (graphite, ink, paint, guitar) integrated with digital discipline.
- **Modern & Editorial** — magazine-grade pacing, asymmetric balance, and generous negative space.
- **Personal** — authentic photography, personal voice, and real creative output.
- **Cinematic without theatrical excess** — controlled atmosphere without melodrama.

## Superseded directions

- **Warm brown / copper / bronze**: Earlier Crimson Noir concepts are historical explorations. Do not reintroduce them as a primary brand system.
- **SaaS glassmorphism / neon**: Do not interpret dark as bright blue glass, neon glow, or dashboard density.

## Core design principles

### 1. Material depth over visual noise
Depth comes from layered surfaces, controlled transparency, texture, soft shadow, tonal separation, and careful composition. Do not create depth by adding more borders, gradients, or glowing objects.

### 2. Editorial hierarchy over dashboard density
The site guides the eye like a high-end publication. Important content receives space, scale, contrast, and pacing. Avoid dense admin-style layouts.

### 3. Content-driven card sizing
Cards should fit their actual content rather than being forced into artificial equal heights with awkward empty space.

### 4. Natural, content-aware typography
Text measures must be driven by readability and natural line flow. Do not force narrow text measures that create single-word orphan lines, and never use `white-space: nowrap` to bypass responsive layout issues.

### 5. Authentic imagery
Real photography, physical drawings, and real practice pieces must be presented authentically and never replaced with generic AI representations.

### 6. Performance as an aesthetic
Perceived speed, immediate response, and minimal layout shift are essential to a premium feel.

## Color system

### Color roles

| Role | Direction / Token | Use |
| --- | --- | --- |
| Canvas base | Obsidian (`obsidian-950` / `#0a0a0d` / `#040609`) | Main page background and deepest layer. |
| Canvas raised | Dark graphite (`obsidian-900` / `#0f0f14`) | Large sections, panels, and separation. |
| Surface | Smoked graphite (`obsidian-950/70` blur) | Cards, navigation capsule, drawers, and elevated content. |
| Surface strong | Elevated graphite (`white/[0.04]`) | Hovered or selected surfaces. |
| Text primary | Bone / warm off-white (`text-white`) | Headings and primary reading text. |
| Text secondary | Muted ash (`text-zinc-300`) | Descriptions and body paragraphs. |
| Text quiet | Low-contrast gray (`text-zinc-400` / `text-zinc-500`) | Section eyebrows, dates, metadata, and captions. |
| Border subtle | Low-contrast graphite (`border-white/[0.06]` to `[0.12]`) | Structural separation without outlining every object. |
| Accent primary | Amethyst / purple (`accent-purple` / `#8b5cf6`) | Primary interaction, selected filter, signature emphasis, active states. |
| Accent secondary | Controlled turquoise (`accent-cyan` / `#06b6d4` / `#00f0ff`) | Small contrast moments, secondary signals, systems, process numbers, cyan flares. |

### Accent hierarchy
- **Purple** is the dominant accent for primary identity, interactive emphasis, and active states.
- **Cyan/Turquoise** is secondary for systems, data, and complementary contrast moments.
- Do not give purple and turquoise equal visual dominance across every component.

### Contrast
- Body copy must remain comfortably readable against obsidian surfaces.
- Muted text must not become unreadable gray.
- Focus, hover, active, selected, disabled, and error states must be distinguishable.
- Text over imagery requires a protected overlay or alternate layout.

## Background and atmosphere

The homepage hero employs a multi-theme interactive 3D WebGL sculpture engine (`DigitalSculpture`) positioned as a non-intrusive backdrop:
- **Harmonic Nexus** (Default): 3D cymatic guitar strings and a particle attractor around an obsidian core beside the hero text.
- **Chladni Plate**: Sand settling into vibration figures on a plate; bone-white resting grains with cyan/violet accents.
- **Ink in Water**: Violet, cyan and rose ink drops blooming and dissolving in still water.
- **Contour Flow**: Dark river-valley survey drawn as hundreds of hair-thin elevation lines; deep teal hills, a luminous cyan river, sparse rose contours, slow downhill drift and a soft pulse along the valley.
- **Alpine Landscape**: Sharp alpine survey with arête ridges, peaks, and cirque valleys.
- **Readability & Text Protection**: A smoothly feathered darkening veil (`readabilityMask`) keeps the left-hand text column clear and legible.
- **Scroll Alignment**: A `--section-calm` CSS property dynamically softens contrast and brightness as the visitor scrolls towards *Selected Work*.

Avoid:
- Obvious repeating noise tiles or animated background particles
- Bright aurora gradients or high-frequency texture behind reading copy
- Effects that create banding or high GPU paint cost

## Typography

### Typography goals
Typography should feel editorial, intentional, and contemporary, supporting both artistic expression and clear long-form reading.

### Type roles
- **Display / Heading**: Expressive editorial serif/gothic style (`font-gothic`), with clean sans exceptions on selected featured components (such as the featured `LATEST NOTE` journal card using `font-sans font-medium`).
- **Body**: Clean, highly readable sans-serif typography (`font-sans`).
- **Labels / Eyebrows**: Monospace tracking (`font-mono tracking-[0.2em]` to `[0.3em]`).

### Line length and measure
- Long-form body text should use a readable measure (`max-w-2xl` to `max-w-4xl`).
- Important introductions should use enough width to wrap naturally (`text-pretty`).
- Do not use `white-space: nowrap` on responsive multi-word titles or sentences.

## Layout system

### Container behavior
The site uses consistent content frames (`max-w-5xl` to `max-w-7xl mx-auto px-6 lg:px-8`) with intentional exceptions for full-width atmosphere or hero presentation.

### Section rhythm
Sections should be separated through meaningful vertical spacing (`py-8 md:py-14` or `gap-14 md:gap-24`), not a border or card around every block.

### Grid behavior
- Use grids to compare items with similar importance.
- Use asymmetric layouts when one item deserves emphasis.
- Allow cards to stack naturally on narrow screens.
- Use minimum card widths that preserve readable content without cramping text or controls.

### Alignment
Left alignment is preferred for reading, introductions, and editorial hierarchy. Centered alignment is used for concise ceremonial headers, isolated CTAs, or intentionally symmetrical compositions.

## Navigation

The main navigation (`Navbar.js`) is a floating smoked-glass capsule:
- **Surface**: Dark translucent graphite (`bg-obsidian-900/80`) with backdrop blur and subtle border.
- **Current implemented navigation order**: `Home`, `Projects`, `Music`, `Art`, `Blog`, `About`, `Contact`.
- **Desktop**: Centered floating capsule with active pill state.
- **Mobile**: Responsive hamburger menu expanding to a clean dark backdrop panel.

## Surfaces and glass

Glass is a selective material, not the identity itself.
- **Appropriate uses**: Main navigation capsule, elevated feature cards, lightbox modal, compact overlays.
- **Avoid**: Translucent panels behind long-form article text where blur adds no hierarchy.
- **Composition**: Translucent dark fill, moderate backdrop blur, fine low-contrast edge, soft shadow.

## Cards

Cards should have a clear job (routing to a discipline, presenting a project, showing an article, or providing proof).
- **Hierarchy**: Title should be obvious, metadata supporting, description concise, and clickable action clear.
- **Content-driven**: Allow cards to size naturally according to their content rather than forcing rigid equal heights with artificial empty space.

## Buttons, links, and actions

- **CTA Buttons (Aurora Orbit Interaction)**:
  - **Component**: Standardize on `<CtaButton>` (`import CtaButton from '@/components/CtaButton'`). Supports Next.js internal routing (`<Link>`), external links (`<a>`), and action triggers (`<button>`).
  - **Primary Variant (`variant="primary"` / `.btn-primary`)**: Cyan-led rotating conic beam along the 1px masked border, 50% atmospheric bloom (`#6de7e4` and `#e062b5`), and subtle arrow translate on hover.
  - **Secondary Variant (`variant="secondary"` / `.btn-secondary`)**: Orchid-led rotating conic beam along the 1px masked border, 32% restrained bloom, and muted obsidian surface (`rgba(14, 16, 20, 0.75)`).
  - **Universal Fallback**: Automatic CSS pattern matching in `globals.css` ensures that any future CTA added with raw Tailwind classes (`bg-white/10` or `bg-zinc-950/60` with `rounded-full`) automatically inherits the 1px border sweep and bloom without requiring manual nested markup.
  - **Reduced Motion**: Full `prefers-reduced-motion: reduce` compliance with static gradient color transitions and zero translation or rotation.
- **Touch targets**: Maintain comfortable touch targets (minimum 44–48px per accessibility standards).
- **Labels**: Use clear, destination-specific labels. Avoid repeated generic “Learn more.”

## Hero sections

- Clear focal point with protected text readability.
- Keep primary action visible on common viewports.
- Crop imagery deliberately for mobile viewports.

## Imagery

Preferred sources:
- Original photography (studio portraits, instruments)
- Traditional artwork (graphite and charcoal studies)
- Tattoo practice pieces on synthetic skin
- Project artwork and album covers
- Miniatures and physical objects
- Screenshots of Patrik's own tools (case studies)

AI-generated imagery is not used as content on the site.

Image treatment:
- Preserve focal subject when cropping across breakpoints.
- Control contrast so images sit harmoniously within obsidian environments.
- Provide descriptive alt text for content images and captions for medium/status.
- Ensure aspect ratios are reserved to avoid layout shift.

## Iconography

- Simple, consistent stroke weights and optical sizing.
- Secondary to text labels; retain official platform marks for external channels.
- Provide accessible labels or `aria-label`s for icon-based links.

## Motion and interaction

- Short transitions (opacity, subtle transform).
- Controlled hover feedback without layout-shifting jumps.
- Respect `prefers-reduced-motion` unconditionally.
- Avoid continuous decorative animation loops or heavy parallax on mobile.

### Call-to-action (CTA) buttons — Aurora Orbit
All rectangular CTA buttons use the **Aurora Orbit** interaction:
- Standard component: `<CtaButton>` (`@/components/CtaButton`) with `variant="primary"` (default) or `variant="secondary"`.
- Canonical classes: `.btn-primary` and `.btn-secondary`. Automatic CSS rules in `src/app/globals.css` also cover raw button/link elements using standard Tailwind classes (`bg-white/10` and `bg-zinc-950/60` with `rounded-full`), preventing future additions from missing the styling.

### Navigation and monogram
- The navbar monogram is filled with the aurora gradient (`#a855f7` → `#5ee6e6`, top left to bottom right), the same as the favicon. On hover it brightens slightly; there is no glow behind it.
- Desktop nav items have no glow. The current page is marked by a thin 2px aurora underline under the label, which glides to the hovered or focused item and back.
- In the mobile menu the current page is shown in aurora gradient text.

## Responsive behavior

Mobile is a first-class layout, not a compressed desktop view:
- Stack multi-column layouts before columns become cramped.
- Maintain comfortable gutters and touch targets.
- Crop imagery intentionally.
- Verify across standard viewports (`1440x900`, `1280x800`, `1024x768`, `768x1024`, `390x844`, `360x800`, and short mobile `390x600`).

## Long-form content

- Controlled reading measure and generous vertical separation.
- Clear heading hierarchy (`h1` &rarr; `h2` &rarr; `h3`).
- Payload Lexical rich-text content inherits intentional typography.

## Page-specific visual patterns

### Home (`/`)
Strongest brand impression: hero over the selectable WebGL background, then the Selected Work carousel (snap scrolling, arrow buttons, centre card scaled up and in colour, edges faded; stacked below 1024px), 3 Core Expressions, 4-stage Process, Currently, Journal preview.

### Projects (`/projects`)
Curated showcase: 2 Featured Work cards (`Realmforged`, `Ashwrithe`) with status badges and evidence + 3 Broader Practice cards (`DMAIC Companion`, `Home Control Panel`, `vonporat.com`). Case studies use a metadata grid, wide screenshots, phone screenshots in portrait frames, technology layers and a status/roadmap pair.

### Music (`/music`)
Active project showcases, discography release cards with high-contrast cover art, and legacy band timeline.

### Art (`/art`)
Curated practice showcases with interactive full-screen lightbox zoom.

### Art (`/art`) note
No AI-generated imagery; the page shows hand-made work only.

### About (`/about`)
Editorial rhythm instead of repeated centred sections: split hero with the portrait, large-value Core Facts band, sticky Background heading beside the narrative, oversized pull quote, linked image triptych (grayscale until hover), How I Work matrix (subgrid rows aligned across the four steps), equal-height capability cards, merged closing.

### Contact (`/contact`)
Short personal note: left column with heading, intro, three numbered reasons and the signature; right column "Direct line" panel with the email CTA, visible address with Copy, and LinkedIn, Threads and Instagram. Email comes first on mobile.

### Blog (`/blog`)
Editorial journal: `JOURNAL` eyebrow, category filters (`Music`, `Visual Art`, `Making`, `Technology`, `Process`, `Personal`, `Projects`), dynamic `LATEST NOTE` featuring the Clean Sans heading treatment (`font-sans font-medium text-2xl sm:text-3xl md:text-4xl`), and text-led fallback cards.

## Accessibility

- WCAG AA contrast standards maintained.
- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent-purple`).
- Semantic landmarks and logical heading hierarchy.
- Icon actions have accessible names.

## Performance-aware design

- Use purpose-sized modern image formats (WebP, AVIF, SVG, PNG where transparency is required).
- Lazy-load below-the-fold media.
- Restrain backdrop-filter count, large blurred shadows, and client JavaScript.
- Avoid unexpected layout shift (CLS target < 0.1).

## Visual anti-patterns to reject

- Generic corporate portfolio or SaaS styling
- Flat Linktree-like lists or dense dashboards
- Bright blue glassmorphism or excessive neon glow
- Wall of identical cards forced to unnatural heights
- Unreadable low-contrast gray text
- Large colorful software-logo walls
- Decorative AI imagery without real purpose

## Component decision test

Before adding a visual component, verify:
1. What information or action does it clarify?
2. Does an existing component already solve the need?
3. Does it strengthen the personal Obsidian Noir identity?
4. Is it readable and usable on mobile without hover?
5. Does it meet accessibility and performance standards?
