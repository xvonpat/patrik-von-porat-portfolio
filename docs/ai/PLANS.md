# vonporat.com — Execution Plans & Roadmap

Last reviewed: 2026-08-25

## Purpose

This document defines when and how to create an execution plan for significant work on vonporat.com, and tracks active work status, completed milestones, and the remaining project roadmap.

- `AGENTS.md` defines mandatory agent behavior and current page statuses.
- `PROJECT_CONTEXT.md` defines project identity and audiences.
- `SITE_ARCHITECTURE.md` defines routes and ownership boundaries.
- `QUALITY_STANDARDS.md` defines acceptance criteria and verification procedures.

---

## Current Roadmap & Project Status

### 1. Completed & Approved Pages (Locked)

| Page | Approved Scope | Date Locked |
| --- | --- | --- |
| **Home** (`/`) | Hero positioning, The Impulse, 3 Core Expressions, 4-stage Process, Selected Work proof cards, Current Focus, Journal preview, Contact exit. | 2026-08-25 |
| **Projects** (`/projects`) | Publicly active in navigation. Curated Selected Work (Realmforged, Ashwrithe, Visual Practice, vonporat.com, Systems & Improvement). | 2026-08-25 |
| **Music** (`/music`) | Realmforged and Ashwrithe active showcases, verified discography releases, and Freternia/Cromonic legacy timeline. | 2026-08-25 |
| **Art** (`/art`) | Curated Traditional Studies, Tattoo Practice, Miniatures & 3D Prints, Generative Visuals, and interactive full-screen lightbox. | 2026-08-25 |
| **About** (`/about`) | Personal narrative, studio portrait + Core Facts band in Background, How I Work natural typography measure, contextual capability modes. | 2026-08-25 |
| **Contact** (`/contact`) | Direct email CTA targeting the configured `mailto:` destination, form-free layout, 6 verified external channels (Spotify, YouTube, Instagram, Patreon, Bandcamp, LinkedIn). | 2026-08-25 |

### 2. In Progress / Under Review

| Area | Current State | Next Action |
| --- | --- | --- |
| **Blog Index** (`/blog`) | Redesigned editorial journal (`JOURNAL`, dynamic `LATEST NOTE`, category filters, text-led card fallbacks) is implemented and live. | Awaiting Patrik's final review and approval. |

### 3. Remaining Final Work

| Task | Scope & Objectives | Status |
| --- | --- | --- |
| **Global Consistency Audit** | • **Footer Tagline Review**: Review whether `GUITARIST · ARTIST · OPTIMIZER` in `Footer.js` should align with canonical `Guitarist · Visual Artist · Systems-Minded Creator`.<br>• **Navigation Consistency**: Verify desktop and mobile navigation across all routes.<br>• **Typography Audit**: Verify heading scales, line heights, and container widths across all pages.<br>• **Link Audit**: Test all internal and external links site-wide. | Pending |
| **Final SEO & Accessibility Audit** | • Comprehensive check of semantic landmarks, ARIA labels, focus states, keyboard navigation, Open Graph tags, canonicals, sitemap, and robots directives. | Pending |
| **Final Performance & Mobile QA** | • Mobile audits on image assets, layout shifts (CLS < 0.1), CSS backdrop-filters, and page load times. | Pending |
| **Final Production Verification** | • Final live production verification on `vonporat.com` after all pending items are resolved. | Pending |

---

## When a formal plan is required

Create a formal plan before implementation for tasks such as:
- Broad homepage or multi-page structural changes
- Navigation or route restructuring
- Moving static content into Payload CMS
- Adding a new Payload collection or database migration
- Storage-adapter or media-URL redesign
- Major performance or dependency programs
- Authentication or access-control changes

### When a formal plan is usually unnecessary
A direct workflow is sufficient for:
- Small copy edits or single image replacements
- Focused CSS or typography corrections
- Broken link fixes or isolated accessibility adjustments
- Single blog post creation or documentation updates

---

## Planning principles

1. **Inspect before planning**: Ground the plan in actual repository code, routes, schemas, and dependencies.
2. **Plan toward an outcome**: Define what becomes true for the visitor or editor.
3. **Keep scope explicit**: Separate included work from excluded work.
4. **Reduce risk early**: Resolve data ownership, access rules, and media behavior before cosmetic styling.
5. **Executable verification**: Every step must have a concrete validation check.
6. **Keep the plan alive**: Update the plan when assumptions change or steps complete.

---

## Standard execution plan template

```md
# Plan — <Short task name>

Status: Draft | Approved | In progress | Blocked | Completed
Owner: <Agent / Contributor>
Created: YYYY-MM-DD
Updated: YYYY-MM-DD

## Goal
Describe the user-visible or system outcome.

## Why now
Explain the observed requirement or problem.

## Success criteria
- Observable result
- Quality and performance requirements
- Required verification

## Current state
Summarize verified implementation and behavior from code inspection.

## Scope
### Included
- Explicitly included work
### Excluded
- Explicitly excluded work

## Proposed approach
Describe the chosen approach and why it fits the current system.

## Affected areas
- Routes, components, CMS collections, styles, or dependencies.

## Implementation steps
1. [pending] Focused step 1 (expected result + verification)
2. [pending] Focused step 2 (expected result + verification)

## Verification plan
- Automated checks: `npm run build`, `npm run lint`.
- Manual QA: Viewports (`1440x900`, `1280x800`, `1024x768`, `768x1024`, `390x844`, `360x800`).
- Screenshots captured and inspected outside `public/`.

## Risks and mitigations
| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Concrete risk | Low / Med / High | Low / Med / High | Preventative action |

## Progress log
- YYYY-MM-DD: Step completed or verified.

## Final handoff
Summary of outcome, main files, verification commands, and deployment state.
```

---

## Planning by change type

### Redesign or multi-page work
Address information hierarchy, existing design tokens, responsive behavior, accessibility, and page-by-page rollout.

### Navigation or route change
Address approved information architecture, desktop and mobile menus, active states, direct routes, footer links, sitemap, and canonical URLs.

### CMS collection or static-to-CMS migration
Address maintenance rationale, content ownership, collection schema, access control, draft/published behavior, migration, frontend queries, and admin UI.

### Database migration
Address verified target environment, migration review, data-loss risk, backups, application compatibility, and rollback strategy.

### Media or storage change
Address media schema, storage adapter, public URL construction, remote host permissions, and fallbacks.

### Performance program
Address baseline measurement, ranked opportunities (media, blur, layout stability), visual quality preservation, and before/after evidence.
