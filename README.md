# vonporat.com

Personal creative hub for **Patrik von Porat — guitarist, visual artist and systems-minded creator**.

[Visit vonporat.com](https://vonporat.com)

## Overview

vonporat.com brings Patrik's creative and analytical work together in one place:

- Music and guitar
- Realmforged and Ashwrithe
- Graphite drawing and visual art
- Tattoo practice
- Generative visuals, miniatures, and 3D printing
- Websites and digital experiments
- Lean Six Sigma, Power BI, process improvement, and systems thinking
- Long-form writing and behind-the-scenes documentation

The conceptual bridge between these disciplines is:

> **Observe → Structure → Create → Refine**

The site is a curated, evolving overview of selected work and active projects. It is not intended to be an exhaustive archive, a traditional CV, or a generic portfolio template.

## Technology

The project is built around:

- **Next.js** — public application, routes, rendering, and metadata
- **Payload CMS** — private administration and structured publishing
- **Supabase / PostgreSQL** — persistent CMS data and configured media storage
- **Vercel** — hosting, deployments, and analytics
- **GitHub** — source control and deployment source
- **Google Search Console** — indexing and search-performance review

The repository is the source of truth for exact versions, paths, package manager, scripts, schemas, and configuration.

## Content architecture

The intended public navigation is:

```text
Home · Music · Art · Projects · Blog · About · Contact
```

The `/projects` route may remain implemented, but **Projects stays hidden from public navigation until its descriptions, proof cards, images, and links have been reviewed and approved**.

### Content ownership

- **Blog** is the primary CMS-driven public section.
- **Home, Music, Art, Projects, About, and Contact** remain repository-managed by default.
- New Payload collections or broader CMS migrations require an observed maintenance need and explicit approval.
- Draft and private content must never be exposed publicly.

## Local development

### Prerequisites

- Use the Node.js version required by the repository.
- Identify the package manager from the committed lockfile.
- Review the scripts defined in `package.json`.
- Obtain the required local environment-variable names through the approved project setup.

Never place real credentials in this README, source code, committed environment files, screenshots, logs, or documentation.

### Start the project

1. Clone the repository.
2. Install dependencies with the package manager associated with the lockfile.
3. Configure the required local environment variables without committing their values.
4. Run the existing development script from `package.json`.
5. Open the local URL reported by the development server.

Example command pattern:

```text
<package-manager> install
<package-manager> run dev
```

Do not guess the package manager or replace the lockfile as part of routine setup.

## Validation

Before considering a change complete, run the relevant existing repository checks. Depending on the affected area, these may include:

- Lint
- Type check
- Unit or integration tests
- Production build
- Payload type or import-map generation
- Migration validation

Also verify the affected behavior manually at appropriate desktop and mobile widths.

Use the actual scripts in `package.json`; do not assume command names from this README.

## Payload CMS

Payload provides the private editorial interface for approved CMS content.

When working with Payload:

- Inspect the installed Payload version and current configuration.
- Review collection schemas, access rules, hooks, migrations, and generated types before changing them.
- Preserve draft/published behavior.
- Verify changes in both the admin interface and public output.
- Never weaken authentication or access control to simplify implementation.

## Media

Uploaded media is managed through Payload and the configured storage system.

Media changes should preserve:

- Valid first-load URLs
- Responsive dimensions
- Appropriate formats and file sizes
- Deliberate fallbacks
- Useful alt text for content images
- Stable layout while images load

Music and Art are naturally image-heavy and require particular attention on mobile.

## Deployment

The established delivery flow is:

```text
Local development → Git repository → GitHub → Vercel → vonporat.com
```

A successful push is not proof of a successful release. When deployment is part of the task:

1. Complete local verification.
2. Run the relevant production checks.
3. Review the final diff.
4. Use the approved GitHub/Vercel workflow.
5. Confirm the deployment result.
6. Verify the affected live route, data, media, and responsive behavior.

Do not deploy, migrate production data, or change environment configuration unless the task explicitly authorizes it.

## AI and contributor documentation

AI agents must read [`AGENTS.md`](./AGENTS.md) before making changes.

Detailed project documentation is stored in [`docs/ai/`](./docs/ai/):

- [`PROJECT_CONTEXT.md`](./docs/ai/PROJECT_CONTEXT.md) — purpose, identity, audience, and content pillars
- [`SITE_ARCHITECTURE.md`](./docs/ai/SITE_ARCHITECTURE.md) — routes, page responsibilities, ownership, and data flow
- [`DESIGN_SYSTEM.md`](./docs/ai/DESIGN_SYSTEM.md) — Obsidian Noir visual system and interaction principles
- [`CONTENT_GUIDE.md`](./docs/ai/CONTENT_GUIDE.md) — voice, messaging, page copy, blog, CTAs, and terminology
- [`TECHNICAL_SYSTEM.md`](./docs/ai/TECHNICAL_SYSTEM.md) — technical boundaries, workflows, diagnostics, and operations
- [`QUALITY_STANDARDS.md`](./docs/ai/QUALITY_STANDARDS.md) — acceptance criteria and Definition of Done
- [`DECISIONS.md`](./docs/ai/DECISIONS.md) — durable decisions and their rationale
- [`PLANS.md`](./docs/ai/PLANS.md) — execution-plan requirements and template

Read only the documents relevant to the current task after reading `AGENTS.md`.

## Current priorities

Current project priorities include:

1. Refine the homepage information hierarchy and remove repeated messaging.
2. Curate the strongest current work across Music and Art.
3. Complete accurate proof cards and dedicated images before revealing Projects.
4. Keep blog categories and CMS behavior consistent.
5. Improve mobile performance without losing the established visual identity.

## Security

If a secret or credential-bearing URL is discovered:

1. Do not repeat the value.
2. Identify the affected location.
3. Treat the credential as exposed.
4. Rotate it through the provider.
5. Update approved environment stores.
6. Remove the exposed value from current tracked content.

Repository-history rewriting or destructive cleanup requires a separate approved plan.

## License and reuse

This repository contains personal branding, writing, artwork, media, and project material belonging to Patrik von Porat and associated projects. Do not assume that repository visibility grants permission to reuse creative assets or content.
