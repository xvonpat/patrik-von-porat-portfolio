# vonporat.com — Decision Log

Last reviewed: 2026-10-17

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

---

## D-027 — Interactive 3D Digital Sculpture Background Engine

**Status:** Active  
**Decision date:** 2026-10-17

### Decision

The homepage hero incorporates a non-intrusive interactive 3D WebGL background (`DigitalSculpture`), supporting selectable themes with **Digital Eclipse** (`digital-eclipse`) as the primary default, alongside **Contour Flow** (`contour-flow`) and **Alpine Landscape** (`alpine-landscape`).

### Rationale

The background reinforces the site's identity—creative instinct given digital structure—through live mathematical forms without competing with the typography. Dynamic idle loading (`requestIdleCallback`), visibility pausing, and mobile frame-rate caps ensure zero impact on page load speed or reading performance.

---

## D-028 — CMS-Driven Background Theme Selection via SiteSettings Global

**Status:** Active  
**Decision date:** 2026-10-17

### Decision

Background theme selection is governed by a Payload CMS Global (`SiteSettings`, field `backgroundTheme`), stored in PostgreSQL and switchable directly from the Payload Admin Dashboard via an interactive card with 1-click thumbnail controls.

### Rationale

Allows Patrik to switch the website's background theme instantly from the administrative panel without code deployments or database migrations, while preserving ISR caching (60s revalidation) for public visitors.

---

## D-029 — Monogram Logo Aurora Hover State Alignment

**Status:** Active  
**Decision date:** 2026-10-17

### Decision

The navbar monogram logo uses the standard background glow on mouse hover matching the rest of the navigation pills, rather than colorizing the logo artwork itself.

---

## D-030 — Additive Digital Eclipse II

**Status:** Implemented locally; database option enabled

**Decision date:** 2026-10-17

### Decision

`digital-eclipse-v2` (Digital Eclipse II) is a separate background option. The original eclipse, both landscape themes, their aliases, and the saved homepage selection remain unchanged. Preview with `/?theme=eclipse-v2`. The additive PostgreSQL enum migration was applied to the configured database with explicit user approval and recorded as migration batch 20. Other databases require this migration before the new value can be saved in Site Settings.

The new front-facing corona uses a seeded Canvas renderer in `src/components/digital-sculpture/eclipse-v2/`. Fine curved filaments, dust, a thin non-additive rim, and local cyan/pink scattering are cached independently of the animated overlay. This avoids accumulated white stroke roots and adds no dependency. Visual controls live in `DIGITAL_ECLIPSE_V2_SETTINGS`: density, rim opacity, cyan/pink glow, motion speed, parallax and pointer reach.

Motion is capped at 30 fps on desktop and 24 fps on narrow screens, with pixel-ratio limits. Rendering pauses in hidden tabs and below the hero. Reduced-motion changes are observed live and render a static frame. Passive pointer observation preserves native scrolling, text selection and navigation. Listeners, animation frames and canvas backing stores are released on unmount or drawing failure.

### Verification

Compared and refined the actual localhost render against the supplied 1536×1024 reference; inspected desktop, tablet and mobile layouts. Tested mobile scrolling, About and Projects navigation, route cleanup and pointer input. Full lint and production build passed, plus nine Node lifecycle tests (`node --test tests/eclipse-v2-lifecycle.test.mjs`). The restricted build stalled at compilation; the unrestricted build completed successfully.

The result retains a softer, less dense outer sparkle field than the supplied reference. Existing typography, logo, content, buttons and page structure are preserved. After applying the user-approved migration, an actual database update to `digital-eclipse-v2` succeeded in a rolled-back verification transaction, and the saved selection was confirmed unchanged. No commit, push or deployment was performed.

*Superseded by D-031: both eclipse themes have been removed.*

---

## D-031 — Chladni Plate and Ink in Water added; Digital Eclipse themes removed

**Status:** Implemented; database options enabled

**Decision date:** 2026-10-19

### Decision

Two new homepage background themes, each a separate module so existing themes are untouched:

- `chladni-plate` (`/?theme=chladni`): sand on a vibrating plate. Eight square-plate modes (calm to intricate) change every 9 s; grains are thrown by vibration amplitude and drift to nodal lines, so a figure forms out of noise — the Observe → Structure → Create → Refine idea made visible through sound. Pointer stirs the sand, a background click plays the next tone, reduced motion draws one finished figure.
- `ink-in-water` (`/?theme=ink`): GPU stable-fluids simulation (half-float targets) with ink drops released every few seconds on the right. Pointer drags the water, a background click releases a drop, reduced motion draws one still frame. Without half-float render targets the theme reports failure and the background hides.

Both pause in hidden tabs and below the hero, and cap at 60 fps (30 fps on narrow/touch screens).

`contour-flow` was rebuilt as a shader-based renderer (`contour/scene.js`) to match the approved river-valley reference: per-pixel contour lines on GPU-evaluated terrain, teal lines brightening to cyan along the river and on lit slopes, sparse rose contours, slow downhill drift and a travelling pulse. Its theme id is unchanged, so no migration was needed. `alpine-landscape` keeps the original geometry renderer.

`digital-eclipse` and `digital-eclipse-v2` were removed from code, CMS options and the dashboard card. Harmonic Nexus remains the default. The PostgreSQL enum still contains the two old values (enum values cannot be dropped without recreating the type); they are unused. The additive enum migrations for the new themes were applied with explicit user approval.

Related fix (2026-10-19): the Harmonic Nexus strings showed a flickering horizontal seam left of the core because an `atan()` angle was interpolated across the ±π wrap. The vertex shader now passes the direction vector and the angle is computed per fragment.

---

## D-032 — Home Control Panel project and case study

**Status:** Implemented and live

**Decision date:** 2026-10-19

`Home Control Panel` (In Development) joins Broader Practice on `/projects`, with a case study at `/projects/home-control-panel` built from Patrik's own material. Screenshots use the panel's demo mode (no real names, calendar entries, cameras or addresses) and are served as resized WebP. The source zip is not kept in the repository.

---

## D-033 — Homepage Selected Work carousel and homepage polish

**Status:** Implemented and live

**Decision date:** 2026-10-20

On desktop, Selected Work is a horizontal snap-scrolling carousel with arrow buttons; the card nearest the centre scales up and shows its image in colour. Below 1024px the cards stack as before. Cards: Realmforged and Ashwrithe (linking to their official sites), The Butcher Bust and Conan the Barbarian (linking to Physical Craft on `/art`), DMAIC Companion and Home Control Panel. The carousel opens on The Butcher Bust.

In the same pass: footer tagline aligned with the canonical positioning, Currently items made clickable, journal titles allowed three lines, process copy made less technical, and Instagram and Threads added to the closing section. Removing "Explore by discipline" and adding an art image strip were considered and left for a later decision.

---

## D-034 — About and Contact redesigns

**Status:** Implemented and live

**Decision date:** 2026-10-20

About moved from repeated centred sections to an editorial rhythm: split hero with the portrait, Core Facts band, sticky background heading, a large pull quote, a "Same hands, different materials" triptych, a How I Work matrix with concrete examples, linked capability cards and a merged closing. Existing copy and facts were kept; duplicate headings were removed.

Contact became a short personal note: reasons to write, a direct-line panel (email CTA, visible address with a Copy button for visitors without a mail app, LinkedIn, Threads, Instagram) and Patrik's signature. It stays email-led and form-free. A domain email address and a stated reply time were proposed but not adopted.

---

## D-035 — Copy without dashes; no AI-generated imagery

**Status:** Implemented

**Decision date:** 2026-10-22

Public copy, alt text and metadata no longer use em dashes or spaced en dashes as punctuation; Patrik reads them as a sign of AI-written text. All repository copy was rewritten (2026-10-20). Dashes in CMS content (blog posts, gallery titles) are cleaned up by Patrik in Payload.

The planned "Generative Visuals" section of `/art` was dropped: AI-generated imagery is not shown on the site, so the visual practice reads as hand-made work.

The 2026-10-22 audit also added `/gallery` to the sitemap, aligned the site description and JSON-LD with the canonical positioning (adding Threads), brought meta descriptions to 134–157 characters, renamed blog post titles to `<Title> | Journal | Patrik von Porat`, and documented the `Projects` blog category.
