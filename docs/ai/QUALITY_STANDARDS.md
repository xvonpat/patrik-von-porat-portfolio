# vonporat.com — Quality Standards

Last reviewed: 2026-08-25

## Purpose

This document defines what must be true before work on vonporat.com can be considered complete.

It turns project intent into reviewable acceptance criteria across functionality, design, content, CMS behavior, accessibility, SEO, performance, security, testing, deployment, and handoff.

- `AGENTS.md` defines mandatory agent behavior and current page statuses.
- `PROJECT_CONTEXT.md` defines the site's purpose and identity.
- `SITE_ARCHITECTURE.md` defines routes and ownership.
- `DESIGN_SYSTEM.md` defines visual quality and layout rules.
- `CONTENT_GUIDE.md` defines editorial quality and approved copy.
- `TECHNICAL_SYSTEM.md` defines technical workflows and boundaries.
- This file defines acceptance and verification.

## Core quality principle

**Implemented is not the same as complete.**

A change is complete only when the intended outcome works, relevant risks have been checked, the result fits the established Obsidian Noir system, and verification evidence is documented.

Do not call work finished because code was written, a page rendered once, a build command started, or a deployment was triggered.

## Quality levels

### Mandatory gates
These apply to every change unless genuinely irrelevant:
- The requested outcome is satisfied.
- Relevant existing behavior is preserved.
- No unrelated user changes are overwritten.
- No secrets or private content are exposed.
- Claims about verification are truthful.
- The final diff is reviewed.
- Known project constraints remain intact.

### Task-dependent gates
Apply these whenever the task affects the area:
- Functional behavior & Regression testing
- Visual identity & Responsive layout
- Accessibility & Semantic markup
- Content accuracy & Brand boundaries
- CMS publishing & Draft protection
- Media handling & Performance
- SEO, Sitemaps & Metadata
- Database migrations & Deployments

Do not perform irrelevant ceremonial checks. Do not skip relevant checks because a change appears small.

## Evidence standard

Every completion claim needs appropriate evidence:

| Claim | Acceptable evidence |
| --- | --- |
| “The code compiles” | Successful production build (`npm run build`). |
| “Lint passes” | Successful ESLint check (`npm run lint`) with 0 errors/warnings on affected files. |
| “The page works” | Inspection of the relevant route, layout, and interactive controls. |
| “Mobile layout is verified” | Screenshots/inspection across mobile viewports (`390x844`, `360x800`, `390x600`). |
| “Image is optimized” | Appropriate format (WebP, AVIF, SVG), reserved dimensions, and verified rendered output. |
| “The post is public” | Querying published state and verifying public rendering. |
| “The deployment succeeded” | Successful Vercel deployment and verification of the live URL on `vonporat.com`. |
| “SEO is correct” | Inspection of rendered title, meta description, canonical URL, and Open Graph tags. |
| “Accessible” | Keyboard focus visibility, semantic landmarks, descriptive alt text, and reduced-motion support. |

## Verification language

- **Implemented** — the requested change was made in code or content.
- **Checked locally** — behavior was inspected in a local development environment.
- **Automated checks passed** — list the actual commands (`npm run build`, `npm run lint`).
- **Production verified** — the live production URL was opened and inspected.
- **Not verified** — state the missing environment, command, or dependency.

Never replace “not verified” with “should work.”

## Universal acceptance criteria

Before completing any change:
- [ ] The user request has been reread and addressed completely.
- [ ] The affected area and intended outcome are verified in the codebase.
- [ ] Relevant project documentation has been followed.
- [ ] The change is focused and avoids modifying unrelated files.
- [ ] Existing user changes are preserved.
- [ ] The final diff has been reviewed.
- [ ] No secrets, passwords, or tokens appear in code, Markdown, or output.
- [ ] Relevant checks (`npm run build`, `npm run lint`) have been run.
- [ ] Remaining risk is concrete rather than speculative.

## Functional quality

- Initial page load, direct navigation, and browser refresh work reliably.
- Client-side navigation maintains active navigation state.
- Interactive links, email CTAs, and external destinations operate properly.
- Dynamic data queries fail gracefully when data is missing or empty.
- Error and not-found states provide a clear way to return to main sections.

## Regression quality

### Minimum regression scope
- The changed component or route.
- Shared components it uses (e.g. `Navbar.js`, `Footer.js`, `GlassCard.js`).
- The closest related route.
- Desktop and mobile viewports.
- Published/draft boundaries when CMS is affected.

### Shared-system changes
Changes to global styles, navigation, footer, or CMS schemas require inspecting all public routes.

## Visual identity quality (Obsidian Noir)

- Obsidian and graphite surfaces remain the visual foundation.
- Bone or warm off-white text remains readable.
- Purple (`accent-purple`) is the primary accent; turquoise/cyan (`accent-cyan`) is secondary.
- Smoked glass and blur effects are selective and performant.
- Section hierarchy and negative space are clear and well-paced.
- Content-driven card sizing without artificial empty space.

## Responsive quality

Mobile is a first-class layout, not a compressed desktop view.

### Required viewports for UI changes
- `1440 × 900` (Wide Desktop)
- `1280 × 800` (Standard Desktop)
- `1024 × 768` (Small Desktop / Tablet Landscape)
- `768 × 1024` (Tablet Portrait)
- `390 × 844` (Standard Mobile)
- `360 × 800` (Narrow Mobile)
- `390 × 600` (Short Mobile / Landscape)

### Responsive acceptance
- No horizontal overflow or clipped text.
- Navigation and hamburger menu operate smoothly.
- Text uses readable measures and wraps naturally without `white-space: nowrap`.
- Comfortable touch targets (minimum 44–48px per accessibility standards).
- Multi-column layouts stack before becoming cramped.
- Layout remains usable under browser zoom (up to 200%).

## Accessibility quality

- **Keyboard navigation**: All interactive elements reachable with visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent-purple`).
- **Semantic structure**: Proper landmarks (`nav`, `main`, `footer`), logical heading hierarchy (`h1` &rarr; `h2` &rarr; `h3`), and labeled form/button controls.
- **Images and media**: Descriptive alt text on content images; purely decorative imagery marked appropriately.
- **Color & motion**: WCAG AA contrast compliance; transitions respect `prefers-reduced-motion`.

## Content quality

- Public copy is written in English.
- Claims, roles, dates, and credits are verifiable against real work.
- Personal, calm, confident, and specific voice without inflated superlatives.
- Brand boundaries respected (no Ashwrithe ritual lore on general personal pages).
- Official project names spelled accurately (`vonporat.com`, `Realmforged`, `Ashwrithe`).

## Page-specific quality criteria

### Home (`/`) — Approved & Locked
- [ ] Conceptual journey: `Why → Expressions → How → Proof → Now → Journal → Contact`.
- [ ] Hero positioning: *“Guitarist, visual artist and systems-minded creator.”*
- [ ] Three Core Expressions link to `/music`, `/art`, and `/projects`.
- [ ] Process section uses `01 Observe → 02 Structure → 03 Create → 04 Refine`.
- [ ] Selected Work proof cards for Realmforged, Ashwrithe, and Visual Practice.
- [ ] Journal preview renders latest published notes with fallback.

### Projects (`/projects`) — Approved & Locked
- [ ] Publicly visible in navigation (`Navbar.js`).
- [ ] Featured Projects: `Realmforged` (Active) and `Ashwrithe` (In Development).
- [ ] Supporting Projects: `Visual Practice`, `vonporat.com`, `Systems & Improvement`.
- [ ] Proof cards state purpose, role, evidence, and valid destination.
- [ ] No invented case studies or placeholder metrics.

### Music (`/music`) — Approved & Locked
- [ ] Realmforged and Ashwrithe receive active priority.
- [ ] Verified releases (*Through Ash and Light*, *Echoes of Betrayal*, *Spiritbound*) have working links.
- [ ] Legacy bands (*Freternia*, *Cromonic*) presented as selected history.
- [ ] Patrik's role and 35+ years guitar timeline are clear.

### Art (`/art`) — Approved & Locked
- [ ] Curated showcases: Traditional Studies, Tattoo Practice, Miniatures & 3D Prints, Generative Visuals.
- [ ] Synthetic skin practice pieces identified honestly.
- [ ] Interactive lightbox modal functions with zoom, captions, and keyboard navigation.

### About (`/about`) — Approved & Locked
- [ ] Background section features 2-column layout (narrative + authentic studio portrait).
- [ ] Horizontal Core Facts band underneath: `Sweden`, `35+ years`, `Lean Six Sigma Green Belt`, `Realmforged & Ashwrithe`.
- [ ] How I Work container uses natural readable measure (`max-w-3xl md:max-w-4xl text-pretty`).
- [ ] Contextual capability modes without software-logo walls.

### Contact (`/contact`) — Approved & Locked
- [ ] Minimal email-led CTA targeting the configured `mailto:` destination with comfortable touch target.
- [ ] 6 verified external channels (Spotify, YouTube, Instagram, Patreon, Bandcamp, LinkedIn).
- [ ] Responsive channel layout: 1 row on desktop/tablet, 3 × 2 grid on mobile.
- [ ] Form-free layout without fields or booking widgets.

### Blog (`/blog` & `/blog/[slug]`) — Under Review
- [ ] Journal listing with `JOURNAL` eyebrow, category filters, and dynamic `LATEST NOTE`.
- [ ] Active categories: `Music`, `Visual Art`, `Technology`, `Process`, `Personal`.
- [ ] Clean text-led card fallbacks for posts without featured images.
- [ ] Published/draft boundary intact (draft posts never exposed publicly).
- [ ] Lexical rich-text body renders with clean typography.

## CMS quality

- **Admin panel**: Authenticated editor can manage collections at `/admin`.
- **Draft protection**: Drafts can be saved incomplete and are never exposed publicly.
- **Publishing flow**: Published posts appear on blog index and slug routes with correct metadata.
- **Schema changes**: Migrations and generated types tested before production deployment.

## Media quality

- Images use modern formats (WebP, AVIF, SVG, PNG where transparency is required).
- Dimensions are reserved to prevent layout shift (CLS target < 0.1).
- Purpose-sized assets (thumbnails are not served as multi-megabyte originals).
- Deliberate fallbacks when media is missing.

## SEO quality

- Page titles and meta descriptions are unique, accurate, and concise.
- Canonical URLs match the public route (`https://vonporat.com/...`).
- Open Graph tags and social preview images resolve properly.
- Sitemaps include published routes and exclude private/admin endpoints.

## Performance quality

- Measure before and after media or layout changes.
- Above-the-fold assets load promptly; below-the-fold media is lazy-loaded.
- Avoid heavy backdrop-filter layers and continuous animation loops.
- Prevent unexpected layout shift (CLS < 0.1).

## Security and privacy quality

- No secrets, database connection strings, or API tokens in code, Markdown, logs, or screenshots.
- Server-only variables remain server-only.
- Authentication and authorization rules are strictly maintained.
- Private and draft content remains protected.

## Code quality

- Follows existing App Router module patterns and naming conventions.
- Clean TypeScript/JavaScript with proper error handling.
- Dead code, debug statements, and test artifacts are removed before completion.
- No unnecessary production dependencies added.

## Automated testing & build verification

- Run `npm run build` locally before release.
- Run `npm run lint` on affected files.
- Report any unavailable checks honestly.

## Deployment quality

- Production deployments are authorized by the user.
- Changes committed to `main` trigger Vercel deployment.
- Deployed routes verified on `https://vonporat.com` post-release.

## Severity model

- **Blocker**: Secret exposure, broken build, public draft exposure, broken primary route, data-loss risk. (Must be resolved immediately).
- **Major**: Broken mobile layout, broken navigation, missing critical asset, severe performance regression. (Must be resolved before completion).
- **Minor**: Inconsistent spacing, non-critical caption issue, minor metadata mismatch.
- **Observation**: Useful follow-up outside the current task scope.

## Change-type checklists

### Copy-only change
- [ ] Facts, spelling, and brand boundaries verified.
- [ ] Nearby repetition avoided.
- [ ] Line wrapping and typography measures checked.
- [ ] Relevant route inspected.

### Visual component change
- [ ] Design system tokens and Obsidian Noir rules followed.
- [ ] Desktop and mobile viewports inspected.
- [ ] Focus, hover, and active states checked.
- [ ] Reduced motion respected.

### Blog / CMS change
- [ ] Admin editing and validation checked.
- [ ] Draft and published states tested.
- [ ] Listing and slug routes verified.
- [ ] Rich-text rendering and media checked.

### Route or navigation change
- [ ] Desktop header and mobile menu checked.
- [ ] Active states and footer links verified.
- [ ] Sitemap, metadata, and canonical URLs checked.

## Final Definition of Done

A task is complete only when:
1. **Outcome**: The user's requested result is fully implemented.
2. **Scope**: Unrelated areas and user changes are preserved.
3. **Identity**: The result fits the personal Obsidian Noir aesthetic.
4. **Content**: Claims, terminology, and copy are accurate.
5. **Responsive**: UI works across desktop, tablet, and mobile viewports.
6. **Accessible**: Keyboard focus, semantic markup, and contrast standards are met.
7. **CMS**: Draft, published, and admin boundaries remain protected.
8. **SEO**: Metadata, Open Graph tags, and canonicals are correct.
9. **Performance**: Layout stability is preserved (CLS < 0.1) without heavy visual bloat.
10. **Security**: No secrets or credentials are exposed.
11. **Code & Build**: Production build (`npm run build`) and lint pass cleanly.
12. **Deployment**: Target environment verified when deployment was requested.
13. **Documentation**: Durable changes are recorded.
14. **Handoff**: Verification evidence and concrete remaining risks are reported truthfully.

## Handoff template

```md
## Outcome
Summary of what was accomplished.

## Main files
- List of changed files.

## Verification
- Commands run (`npm run build`, `npm run lint`).
- Viewports inspected (`1440x900`, `1280x800`, `1024x768`, `768x1024`, `390x844`, `360x800`).
- Environment verified (local / preview / production).

## Deployment state
- Target branch and live URL verification.

## Remaining risk
- Concrete unresolved items or “None identified within the verified scope.”
```
