# vonporat.com

Personal creative hub for **Patrik von Porat — guitarist, visual artist and systems-minded creator**.

[Visit vonporat.com](https://vonporat.com)

## Overview

vonporat.com brings Patrik's creative and analytical work together in one place:

- Music and guitar work (35+ years)
- Active projects: Realmforged and Ashwrithe
- Graphite drawing and visual practice
- Tattoo practice
- Generative visuals, miniatures, and 3D printing
- Websites and digital experiments
- Lean Six Sigma, Power BI, process improvement, and systems thinking
- Long-form writing and behind-the-scenes documentation

The conceptual bridge between these disciplines is:

> **Observe → Structure → Create → Refine**

The site is a curated, evolving overview of selected work and active projects. It is not intended to be an exhaustive archive, a traditional CV, or a generic portfolio template.

## Technology

The platform is built on:

- **Next.js (App Router, Turbopack)** — public application, routes, rendering, and metadata
- **Payload CMS (v3.85+)** — private administration, rich-text editing, and structured publishing
- **Supabase / PostgreSQL** — persistent CMS data and media storage
- **Vercel** — hosting, deployment automation, Vercel Analytics, and Speed Insights
- **GitHub** — source control and automated deployment pipeline
- **Google Search Console** — indexing and search performance review

The repository is authoritative for exact dependencies, scripts, schemas, and runtime configuration.

## Public Navigation & Site Status

Current implemented navigation order (in `src/components/Navbar.js`):

```text
Home · Projects · Music · Art · Blog · About · Contact
```

### Current Website Status

| Page / Route | Status | Notes |
| --- | --- | --- |
| **Home** (`/`) | Approved & locked | Hero, The Impulse, 3 Expressions, 4-stage Process, Selected Work, Now, Journal preview, Contact exit. |
| **Projects** (`/projects`) | Approved & locked | Curated Selected Work (Realmforged, Ashwrithe, Visual Practice, vonporat.com, Systems & Improvement). Publicly visible. |
| **Music** (`/music`) | Approved & locked | Realmforged & Ashwrithe priority, verified discography, Freternia/Cromonic legacy history. |
| **Art** (`/art`) | Approved & locked | Curated Traditional Studies, Tattoo Practice, Miniatures & 3D Prints, Generative Visuals, full lightbox. |
| **About** (`/about`) | Approved & locked | Personal narrative, studio portrait + Core Facts band in Background, How I Work measure, contextual capabilities. |
| **Contact** (`/contact`) | Approved & locked | Email-led CTA targeting the configured `mailto:` destination, form-free layout, 6 external channels (Spotify, YouTube, Instagram, Patreon, Bandcamp, LinkedIn). |
| **Blog index** (`/blog`) | Under review | Redesigned editorial journal with category filters (`Music`, `Visual Art`, `Making`, `Technology`, `Process`, `Personal`) and text-led cards implemented; awaiting final review. |
| **Blog post** (`/blog/[slug]`) | Outside review | Individual article rendering templates. |
| **Global consistency audit** | Pending | Footer positioning tagline review, cross-page typography, and link consistency audit. |
| **Final QA & performance audit** | Pending | Comprehensive site-wide accessibility, SEO, and mobile performance audit. |

## Content Ownership

- **Blog** is the primary CMS-driven public section.
- **Home, Music, Art, Projects, About, and Contact** remain repository-managed by default.
- New Payload collections or broader CMS migrations require an observed maintenance need and explicit approval.
- Draft and private content must never be exposed publicly.

## Local Development

### Prerequisites

- Node.js (LTS recommended)
- `npm` (matching package-lock.json)
- Environment variables configured in `.env` (never commit real secret values)

### Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run ESLint check
npm run lint

# Build for production
npm run build
```

## Security Rules

Never place real credentials, passwords, service tokens, API keys, or connection strings in this README, source code, committed environment files, screenshots, logs, or documentation.

If a secret is found in tracked files:
1. Do not repeat its value.
2. Rotate it through the provider immediately.
3. Update environment stores.
4. Remove the exposed value from tracked files.

## Project Documentation

AI agents and contributors must read [`AGENTS.md`](./AGENTS.md) before making changes.

Detailed documentation in [`docs/ai/`](./docs/ai/):

- [`PROJECT_CONTEXT.md`](./docs/ai/PROJECT_CONTEXT.md) — Purpose, identity, audience, and content pillars
- [`SITE_ARCHITECTURE.md`](./docs/ai/SITE_ARCHITECTURE.md) — Routes, page responsibilities, content ownership, and data flow
- [`DESIGN_SYSTEM.md`](./docs/ai/DESIGN_SYSTEM.md) — Obsidian Noir visual system, design tokens, and interaction rules
- [`CONTENT_GUIDE.md`](./docs/ai/CONTENT_GUIDE.md) — Voice, approved messaging, page copy, CTAs, and terminology
- [`TECHNICAL_SYSTEM.md`](./docs/ai/TECHNICAL_SYSTEM.md) — Technical architecture, Payload CMS, Supabase, and operations
- [`QUALITY_STANDARDS.md`](./docs/ai/QUALITY_STANDARDS.md) — Acceptance criteria, verification checklists, and Definition of Done
- [`DECISIONS.md`](./docs/ai/DECISIONS.md) — Durable decision log (active and historical records)
- [`PLANS.md`](./docs/ai/PLANS.md) — Execution planning standards and status tracking

## License and Reuse

This repository contains personal branding, writing, artwork, media, and project material belonging to Patrik von Porat and associated projects. Do not reuse creative assets or content without permission.
