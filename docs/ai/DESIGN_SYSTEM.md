# vonporat.com — Design System

Last reviewed: 2026-08-25

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
| Canvas base | Obsidian (`obsidian-950` / `#0a0a0d`) | Main page background and deepest layer. |
| Canvas raised | Dark graphite (`obsidian-900` / `#0f0f14`) | Large sections, panels, and separation. |
| Surface | Smoked graphite (`obsidian-950/70` blur) | Cards, navigation capsule, drawers, and elevated content. |
| Surface strong | Elevated graphite (`white/[0.04]`) | Hovered or selected surfaces. |
| Text primary | Bone / warm off-white (`text-white`) | Headings and primary reading text. |
| Text secondary | Muted ash (`text-zinc-300`) | Descriptions and body paragraphs. |
| Text quiet | Low-contrast gray (`text-zinc-400` / `text-zinc-500`) | Section eyebrows, dates, metadata, and captions. |
| Border subtle | Low-contrast graphite (`border-white/[0.06]` to `[0.12]`) | Structural separation without outlining every object. |
| Accent primary | Amethyst / purple (`accent-purple` / `#8b5cf6`) | Primary interaction, selected filter, signature emphasis, active states. |
| Accent secondary | Controlled turquoise (`accent-cyan` / `#06b6d4`) | Small contrast moments, secondary signals, systems, process numbers. |

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

The background may use layered visual atmosphere while remaining subordinate to content:
- Subtle graphite grain or soft vignette
- Low-opacity radial ambient glow (e.g. `bg-accent-purple/8 blur-[110px]`)
- Controlled purple or turquoise atmospheric accents

Avoid:
- Obvious repeating noise tiles or animated background particles
- Bright aurora gradients or high-frequency texture behind reading copy
- Effects that create banding or high GPU paint cost

## Typography

### Typography goals
Typography should feel editorial, intentional, and contemporary, supporting both artistic expression and clear long-form reading.

### Type roles
- **Display / Heading**: Expressive editorial serif/gothic style (`font-gothic`).
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

- **Primary actions**: Purple-accented emphasis or smoked-glass pills for the main page action.
- **Secondary actions**: Lower emphasis through outline or subtle text treatment.
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
- Carefully selected generative concept visuals

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
Strongest brand impression: hero ambient glow, 3 Core Expressions, 4-stage Process, Selected Work proof cards, Current Focus snapshots, Journal preview.

### Projects (`/projects`)
Curated showcase: 2 Featured Work cards (`Realmforged`, `Ashwrithe`) with status badges and evidence bullets + 3 Supporting Work cards (`Visual Practice`, `vonporat.com`, `Systems & Improvement`).

### Music (`/music`)
Active project showcases, discography release cards with high-contrast cover art, and legacy band timeline.

### Art (`/art`)
Curated practice showcases with interactive full-screen lightbox zoom.

### About (`/about`)
2-column Background section (narrative + authentic studio portrait), horizontal Core Facts band, natural How I Work measure, contextual capability grid.

### Contact (`/contact`)
Calm minimal composition: primary email CTA + 6 external channels in a 1-row (desktop) / 3×2 grid (mobile) layout.

### Blog (`/blog`)
Editorial journal: `JOURNAL` eyebrow, category filters (`Music`, `Visual Art`, `Making`, `Technology`, `Process`, `Personal`), dynamic `LATEST NOTE`, and text-led fallback cards.

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
