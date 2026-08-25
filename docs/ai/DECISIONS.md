# vonporat.com — Decision Log

Last reviewed: 2026-08-25

## Purpose

This document records durable decisions for vonporat.com so they are not reopened during unrelated work.

It is not a backlog, idea list, changelog, or archive of every discussion. It contains decisions that materially govern the site's identity, content, design, architecture, publishing, security, or delivery.

## How to use this log

- Treat **Active** decisions as binding project context.
- Treat **Superseded** decisions as historical context only.
- Treat **Under review** decisions as unresolved; do not assume an outcome.
- A current explicit instruction from Patrik may override a recorded decision.
- When a request conflicts with an Active decision, identify the conflict before making a broad change.
- Do not reopen a decision merely because another solution is fashionable or technically possible.

## Status definitions

| Status | Meaning |
| --- | --- |
| Active | Current governing decision. |
| Under review | Explicitly being reconsidered; no replacement is final. |
| Superseded | Replaced by a newer decision. |
| Retired | No longer relevant because the system or need disappeared. |

---

## D-001 — Site role and positioning

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

### Decision

vonporat.com is Patrik von Porat's personal creative hub.

Canonical positioning:

> **Patrik von Porat — guitarist, visual artist and systems-minded creator.**

Supporting thought:

> **One identity. Many expressions.**

Process bridge:

> **Observe → Structure → Create → Refine**

### Rationale

The site needs to connect music, visual craft, technology, writing, and process improvement without forcing Patrik into one narrow professional label or presenting his interests as unrelated hobbies.

### Implications

- The site is not a conventional CV or portfolio template.
- It is not an exhaustive archive or a Linktree replacement.
- Pages show selected evidence and clear destinations.
- Tools and skills support the identity rather than replace it.

---

## D-002 — Public navigation order

**Status:** Active  
**Decision date:** Updated 2026-08-25

### Decision

The current implemented public navigation order (in `src/components/Navbar.js`) is:

1. **Home** (`/`)
2. **Projects** (`/projects`)
3. **Music** (`/music`)
4. **Art** (`/art`)
5. **Blog** (`/blog`)
6. **About** (`/about`)
7. **Contact** (`/contact`)

### Rationale

Placing Projects after Home gives visitors immediate access to concrete proof and creative worlds before exploring specific creative disciplines (Music, Art), deeper writing (Blog), full personal narrative (About), and direct contact.

### Implications

- Do not reorder navigation during unrelated design work.
- Mobile and desktop navigation follow the same sequence.
- Projects is public and active in navigation.

---

## D-003 — Projects remains hidden until ready

**Status:** Superseded (by D-018 on 2026-08-25)  
**Decision date:** 2026-06-01; superseded 2026-08-25

### Decision (Historical)

The `/projects` route was retained in code but kept hidden from public navigation until its descriptions, proof cards, images, and links were reviewed and approved.

### Rationale for Superseding

The curated Selected Work proof cards (`Realmforged`, `Ashwrithe`, `Visual Practice`, `vonporat.com`, `Systems & Improvement`), dedicated imagery, and live destinations have been reviewed, approved, and integrated into the public navigation.

---

## D-004 — Selected work over exhaustive archive

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

### Decision

The site presents a curated selection of work rather than everything Patrik has made.

### Rationale

Selection creates a clearer identity, stronger proof, better performance, and a maintainable site.

### Implications

- Art galleries and project cards are curated.
- Music history supports active work rather than competing equally with it.
- Homepage sections feature only the strongest current examples.

---

## D-005 — Active music projects receive priority

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

### Decision

Realmforged (Active) and Ashwrithe (In Development) are the primary active projects on Music. Freternia (1998–2023) and Cromonic (2014–2017) are presented as selected legacy work.

### Rationale

Visitors should understand what Patrik is building now while still seeing the depth of his 35+ years of musical experience.

---

## D-006 — Independent project identities

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

### Decision

vonporat.com, Realmforged, and Ashwrithe retain distinct voices and visual identities.

### Rationale

The personal hub needs a broad, human, readable voice. Realmforged and Ashwrithe serve different musical, narrative, and aesthetic purposes.

### Implications

- Do not transfer Ashwrithe's ritualistic language into general personal-site copy.
- Do not make personal-site sections sound like a fantasy campaign.
- The personal site introduces each project and links to its dedicated external environment.

---

## D-007 — Public language and personal-site voice

**Status:** Active  
**Decision date:** Established 2025; reaffirmed 2026-08-25

### Decision

Public-facing website copy is written in **English**.

The voice is personal, specific, calm, confident, thoughtful, readable, and grounded in real work.

---

## D-008 — Homepage information hierarchy

**Status:** Active  
**Decision date:** Updated 2026-08-25

### Decision

The approved homepage information hierarchy follows the conceptual journey:
**Why → Expressions → How → Proof → Now → Journal → Contact**

1. Hero with concise positioning
2. Short introduction (*The Impulse*)
3. Three Core Expressions (`Music & Worlds`, `Visual Practice`, `Systems & Digital Work`)
4. How I Work process (`01 OBSERVE`, `02 STRUCTURE`, `03 CREATE`, `04 REFINE`)
5. Selected Work proof cards (`Realmforged`, `Ashwrithe`, `Visual Practice`)
6. Current Focus snapshots (`Music`, `Visual Art`, `Digital & Systems`)
7. Latest Journal entry points
8. Restrained contact / link exit

### Rationale

Moves from rapid orientation to evidence, process, current activity, deeper writing, and a natural next step without repeating biography or displaying an oversized software-logo wall.

---

## D-009 — Obsidian Noir visual direction

**Status:** Active  
**Decision date:** 2026-05-11; consolidated 2026-08-14; reaffirmed 2026-08-25

### Decision

The visual direction is **Obsidian Noir**:
- Obsidian and graphite foundations
- Bone or warm off-white primary text
- Purple (`accent-purple`) primary accent
- Turquoise/cyan (`accent-cyan`) controlled secondary accent
- Material depth with selective smoked glass
- Restrained motion respecting `prefers-reduced-motion`

---

## D-010 — Copper and bronze direction is superseded

**Status:** Superseded  
**Decision date:** Superseded by Obsidian Noir in 2026

Earlier warm brown, copper, and bronze concepts are historical exploration, not the current system.

---

## D-011 — Blog-first CMS strategy

**Status:** Active  
**Decision date:** 2026-05-29; reaffirmed 2026-08-25

### Decision

Blog is the primary CMS-driven public section. Home, Music, Art, Projects, About, and Contact remain static by default.

---

## D-012 — Repository is authoritative for implementation

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

The repository and runtime services are authoritative for package versions, file paths, commands, schemas, and implementation details.

---

## D-013 — Mobile performance is a design constraint

**Status:** Active  
**Decision date:** 2026-06-12; reaffirmed 2026-08-25

Mobile performance is part of design quality and Definition of Done.

---

## D-014 — Security and secret storage

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

Secrets belong exclusively in approved environment-variable stores and password managers. They must never appear in Git, Markdown, logs, screenshots, or user-facing output.

---

## D-015 — GitHub and Vercel delivery flow

**Status:** Active  
**Decision date:** Established 2026; reaffirmed 2026-08-25

Source changes move through Git/GitHub into Vercel production deployments upon push to `main`.

---

## D-016 — Tool Stack remains contextual and discreet

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

Tools are mentioned only in context within capability modes. Avoid large software logo walls or rating systems.

---

## D-017 — AI use is transparent but not the whole story

**Status:** Active  
**Decision date:** Consolidated 2026-08-14; reaffirmed 2026-08-25

AI-assisted work is described honestly and proportionately alongside traditional craft, physical making, and human direction.

---

## D-018 — Projects approved for public navigation

**Status:** Active  
**Decision date:** 2026-08-25

### Decision

The `/projects` route is approved, locked, and active in public navigation.

### Rationale

The curated proof card set (`Realmforged`, `Ashwrithe`, `Visual Practice`, `vonporat.com`, `Systems & Improvement`) was completed with verified evidence, roles, and destinations.

---

## D-019 — Editorial site hierarchy and homepage structure

**Status:** Active  
**Decision date:** 2026-08-25

The site follows the conceptual journey `Why → Expressions → How → Proof → Now → Journal → Contact`. The homepage uses a concise 4-stage process (`Observe → Structure → Create → Refine`) rather than a heavy Creative Operating System or tool-stack feature.

---

## D-020 — Curated Selected Work over filterable catalog

**Status:** Active  
**Decision date:** 2026-08-25

Projects presents curated proof cards linking creative work and systems thinking rather than a filterable inventory or placeholder case studies.

---

## D-021 — Page-by-page approval and verification workflow

**Status:** Active  
**Decision date:** 2026-08-25

Page redesigns are executed, verified across standard responsive viewports with screenshots, and approved individually before moving to the next page.

---

## D-022 — About page Background composition with authentic portrait

**Status:** Active  
**Decision date:** 2026-08-25

The About page Background section uses a spacious 2-column desktop composition (narrative + authentic studio portrait) with a horizontal Core Facts band underneath (`Sweden`, `35+ years`, `Lean Six Sigma Green Belt`, `Realmforged & Ashwrithe`).

---

## D-023 — Contact page is email-led and form-free

**Status:** Active  
**Decision date:** 2026-08-25

The Contact page provides one primary email action targeting the configured `mailto:` destination and 6 verified external channels (Spotify, YouTube, Instagram, Patreon, Bandcamp, LinkedIn). No contact form, newsletter signup, or booking widget is used.

---

## D-024 — Blog index status remains under review

**Status:** Active  
**Decision date:** 2026-08-25

The redesigned Blog index (featuring `JOURNAL`, dynamic `LATEST NOTE`, category navigation, and text-led card fallbacks) is implemented but remains under review until explicitly approved.

---

## D-025 — Natural, content-aware responsive typography

**Status:** Active  
**Decision date:** 2026-08-25

Responsive typography must use natural, content-aware wrapping (`text-pretty`, appropriate readable measures) rather than brittle `white-space: nowrap` or excessively narrow measures that cause orphan words.

---

## D-026 — Global consistency audit and footer tagline review

**Status:** Under review  
**Decision date:** 2026-08-25

### Decision

A comprehensive global consistency audit is pending. The current footer tagline:
`GUITARIST · ARTIST · OPTIMIZER`
is flagged for review to determine whether it should be aligned with the canonical positioning:
`Guitarist · Visual Artist · Systems-Minded Creator`.
No code changes are to be made until explicitly directed.
