# vonporat.com — Agent Instructions

## Purpose

This repository powers **vonporat.com**, Patrik von Porat's personal creative hub.

The site brings together:

- Music and guitar work (35+ years)
- Active projects: Realmforged and Ashwrithe
- Graphite drawing and visual art
- Tattoo practice
- Generative visuals, miniatures, and 3D printing
- Websites and digital experiments
- Lean Six Sigma, Power BI, process improvement, and systems thinking
- Long-form writing and behind-the-scenes documentation

The site presents these areas as parts of one coherent identity, not as a disconnected list of hobbies or software skills.

Canonical positioning:

> **Patrik von Porat — guitarist, visual artist and systems-minded creator.**

Supporting principle:

> **One identity. Many expressions.**

The conceptual bridge between creative and analytical work is:

> **Observe → Structure → Create → Refine**

## Instruction priority

When instructions conflict, use this order:

1. The user's current explicit request
2. This `AGENTS.md`
3. Approved project documentation in `docs/ai/`
4. Existing implementation and established patterns
5. Older notes, drafts, mock data, or placeholders

Do not treat outdated copy, template content, or an isolated existing component as stronger authority than the approved project direction.

## Before making changes

1. Read this file completely.
2. Inspect the relevant route, components, styles, data source, and nearby tests.
3. Read only the relevant files in `docs/ai/` when that directory exists.
4. Check the existing package manager, scripts, framework conventions, and repository status before running commands.
5. Identify whether the request is primarily content, design, technical, CMS, SEO, or performance work.
6. Preserve unrelated user changes and keep the implementation focused on the request.
7. For broad redesigns, architecture changes, or multi-page work, propose a short plan before implementation.

Do not rewrite an entire page or system when a focused change will solve the problem.

## Current approved website status

| Area | Current status | Definition |
| --- | --- | --- |
| Home | Approved and locked | Structure, copy, and composition locked. Preserve during unrelated work. |
| Projects | Approved and locked | Publicly visible in navigation; curated Selected Work composition locked. |
| Music | Approved and locked | Realmforged/Ashwrithe priority and discography locked. |
| Art | Approved and locked | Curated visual-practice sections and lightbox locked. |
| About | Approved and locked | Background narrative, studio portrait, and core facts locked. |
| Contact | Approved and locked | Email-led, form-free layout and verified channels locked. |
| Blog index | Under review | Redesigned journal layout implemented; pending final user review. |
| Individual blog articles | Outside scope | Individual post route templates outside recent index redesign. |
| Global consistency audit | Pending | Cross-page alignment, typography, and footer review pending. |
| Final QA & performance audit | Pending | Full site-wide accessibility, SEO, and performance audit pending. |

“Locked” means future unrelated work must preserve the approved structure, copy, and composition. It does not prohibit explicitly requested changes.

## Public information architecture

Current implemented navigation order (in `src/components/Navbar.js`):

1. **Home** (`/`)
2. **Projects** (`/projects`)
3. **Music** (`/music`)
4. **Art** (`/art`)
5. **Blog** (`/blog`)
6. **About** (`/about`)
7. **Contact** (`/contact`)

Projects is approved and active in public navigation. Do not hide or remove it.

## Page responsibilities

### Home (`/`)

The homepage orientates visitors quickly and guides them toward the strongest work through the conceptual journey:
**Why → Expressions → How → Proof → Now → Journal → Contact**.

Section order:
1. Hero with concise positioning (`Patrik von Porat — Guitarist, visual artist and systems-minded creator`)
2. Short introduction (`The Impulse`)
3. Three Core Expressions (`Music & Worlds`, `Visual Practice`, `Systems & Digital Work`)
4. Process (`Observe → Structure → Create → Refine`)
5. Selected Work proof cards (`Realmforged`, `Ashwrithe`, `Visual Practice`)
6. Current Focus (`Music`, `Visual Art`, `Digital & Systems`)
7. Latest Journal entry points (CMS-driven with fallback)
8. Restrained contact / link exit

Avoid repeating biography across multiple sections. Avoid restoring large tool-stack or software-logo walls.

### Projects (`/projects`)

Projects is a curated **Selected Work** showcase connecting creative output with systems thinking.

Current project set:
- **Featured**: `Realmforged` (Active), `Ashwrithe` (In Development)
- **Supporting**: `Visual Practice` (Ongoing Practice), `vonporat.com` (Live · Evolving), `Systems & Improvement` (Professional Practice)

Each card must answer: What is it? Why does it exist? What was Patrik's role? What is the proof/current state? Where can the visitor continue? Do not use invented results, fake metrics, or generic placeholder case studies.

### Music (`/music`)

- Prioritize active projects: **Realmforged** (Active) and **Ashwrithe** (In Development).
- Present **Freternia** (1998–2023) and **Cromonic** (2014–2017) as selected legacy work.
- Make Patrik's role, guitar history (35+ years), and current state clear.
- Use real listening destinations (Spotify, Bandcamp) and official project sites.
- Keep Realmforged and Ashwrithe visual and verbal identities distinct.

### Art (`/art`)

Curated visual and physical practice:
- Traditional Studies (Graphite and charcoal)
- Tattoo Practice (Reelskin studies and linework/shading)
- Miniatures & 3D Prints (Resin printing, acrylic painting)
- Generative Visuals (Visual development and moodboards)

Prefer a curated selection over a complete archive. Each image must have descriptive alt text, title, medium, and concise caption.

### About (`/about`)

The About page connects music, visual craft, technology, and systems thinking into one coherent personal narrative.

- **Hero**: *“The work changes. The underlying impulse does not.”*
- **Background Section**: Spacious 2-column desktop layout (narrative + authentic studio portrait) with a horizontal Core Facts band underneath (`Based in Sweden`, `Playing guitar 35+ years`, `Process Lean Six Sigma Green Belt`, `Current projects Realmforged & Ashwrithe`).
- **How I Work**: Natural, content-aware typography measure (`max-w-3xl md:max-w-4xl text-pretty`).
- **Capabilities**: Grouped by mode (`Music & Audio`, `Visual Practice`, `Systems & Improvement`, `Web & Digital Systems`).
- Uses tools contextually rather than as a logo wall.

### Contact (`/contact`)

Deliberately minimal link-exit page:
- **Hero**: `CONTACT` / `Start a conversation.`
- **Introductory copy**: Personal and direct.
- **Primary action**: Send an Email button targeting the configured `mailto:` destination.
- **Elsewhere channels**: Spotify, YouTube, Instagram, Patreon, Bandcamp, LinkedIn.
- **No contact form**: Do not add forms, fields, Calendly, or booking widgets.

### Blog (`/blog` & `/blog/[slug]`)

Personal editorial journal:
- **Active Categories**: `Music`, `Visual Art`, `Technology`, `Process`, `Personal`.
- **Listing**: Lead entry (`LATEST NOTE`), dynamic category archive headings, text-led card fallbacks for posts without images.
- **Publishing boundary**: Only published posts are public; draft content remains strictly protected.
- Status: Blog index is under review; individual article routes remain outside recent redesign.

## Visual direction

The visual identity is **Obsidian Noir**:

- Obsidian and graphite foundations
- Bone or warm off-white text
- Purple (`accent-purple`) as primary accent
- Turquoise/cyan (`accent-cyan`) as controlled secondary accent
- Subtle borders, smoked glass panels, and material depth
- Restrained motion respecting `prefers-reduced-motion`

### Avoid

- Generic corporate portfolio or SaaS styling
- Flat Linktree-like layouts
- Bright blue/white glassmorphism or excessive neon glow
- Continuous decorative animation loops
- Large colorful software-logo walls
- Generic stock photography or decorative AI imagery without meaning
- Forcing narrow text measures or using `white-space: nowrap` to hide wrapping issues

## Content and copy rules

Public-facing copy must be written in **English**.

Copy should be:
- Personal, calm, confident, specific, and proof-led
- Concise enough to scan
- Grounded in real work and verified facts

Preserve official names: **Patrik von Porat**, **vonporat.com**, **Realmforged**, **Ashwrithe**.

Realmforged and Ashwrithe have independent identities. Do not transfer Ashwrithe's ritualistic language or lore to the personal site.

## Technical baseline

- **Framework**: Next.js (App Router, Turbopack)
- **CMS**: Payload CMS (v3.85+, Lexical rich text, Postgres adapter)
- **Database**: Supabase / PostgreSQL
- **Storage**: Configured S3/Supabase storage adapter
- **Hosting**: Vercel (Analytics & Speed Insights enabled)
- **Source Control**: GitHub (`main` branch triggers production builds)

### CMS boundary

- **Blog** is the primary CMS-driven section.
- **Home, Music, Art, Projects, About, Contact** remain static by default.
- Do not create dual ownership of content between code and CMS without an explicit synchronization plan.
- Preserve draft/published behavior and do not expose draft content.

## Security and privacy

Never expose in source files, Markdown, logs, screenshots, or user-facing output:
- Database passwords or connection strings
- API keys, secrets, or service tokens
- S3/Supabase storage secrets
- Full environment-variable values

Secrets belong exclusively in approved environment-variable stores and password managers.

## Quality and QA workflow

For page-level design and content work:
1. Inspect implementation and dependencies.
2. Make one bounded page change.
3. Report exact changed files.
4. Run production build (`npm run build`) and lint (`npm run lint`).
5. Perform read-only QA and capture screenshots across standard viewports:
   - `1440 × 900` (Wide Desktop)
   - `1280 × 800` (Standard Desktop)
   - `1024 × 768` (Small Desktop / Tablet Landscape)
   - `768 × 1024` (Tablet Portrait)
   - `390 × 844` (Mobile)
   - `360 × 800` (Narrow Mobile)
6. Visually inspect screenshots for hierarchy, contrast, and overflow.
7. Store QA screenshots outside `public/` (in agent artifacts directory).
8. Verify links, keyboard focus, and accessibility.
9. Obtain explicit user approval before proceeding to the next page.
10. Commit and deploy only with user authorization.

## Detailed project documentation

For detailed architecture, design tokens, content rules, and technical systems, consult:
- [`docs/ai/PROJECT_CONTEXT.md`](./docs/ai/PROJECT_CONTEXT.md) — Purpose, identity, audience, and pillars
- [`docs/ai/SITE_ARCHITECTURE.md`](./docs/ai/SITE_ARCHITECTURE.md) — Routes, ownership, and data flow
- [`docs/ai/DESIGN_SYSTEM.md`](./docs/ai/DESIGN_SYSTEM.md) — Tokens, typography, layout, and visual principles
- [`docs/ai/CONTENT_GUIDE.md`](./docs/ai/CONTENT_GUIDE.md) — Voice, page copy, CTAs, and terminology
- [`docs/ai/TECHNICAL_SYSTEM.md`](./docs/ai/TECHNICAL_SYSTEM.md) — Architecture, Payload CMS, database, and deployment
- [`docs/ai/QUALITY_STANDARDS.md`](./docs/ai/QUALITY_STANDARDS.md) — Acceptance criteria and Definition of Done
- [`docs/ai/DECISIONS.md`](./docs/ai/DECISIONS.md) — Durable decision log
- [`docs/ai/PLANS.md`](./docs/ai/PLANS.md) — Execution plans and status tracking
