# vonporat.com — Agent Instructions

## Purpose

This repository powers **vonporat.com**, Patrik von Porat's personal creative hub.

The site brings together:

- Music and guitar work
- Active projects such as Realmforged and Ashwrithe
- Graphite drawing and visual art
- Tattoo practice
- Generative visuals, miniatures, and 3D printing
- Websites and digital experiments
- Lean Six Sigma, Power BI, process improvement, and systems thinking
- Long-form writing and behind-the-scenes documentation

The site should present these areas as parts of one coherent identity, not as a disconnected list of hobbies or software skills.

Canonical positioning:

> **Patrik von Porat — guitarist, visual artist and systems-minded creator.**

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

## Public information architecture

The intended navigation order is:

1. Home
2. Music
3. Art
4. Projects
5. Blog
6. About
7. Contact

### Current visibility rule

The `/projects` route may remain implemented, but **Projects must stay hidden from the public navigation until its descriptions, proof cards, images, and links have been reviewed and approved**.

Do not reveal unfinished pages, placeholder-heavy sections, private tools, admin routes, or experimental features without explicit approval.

## Page responsibilities

### Home

The homepage should help a new visitor understand Patrik quickly and then guide them toward the strongest work.

Preferred information order:

1. Hero and concise positioning
2. Short introduction
3. Creative pillars
4. Selected Work / Proof Cards
5. Creative Operating System / capabilities
6. Observe → Structure → Create → Refine
7. Now / Current Focus
8. Latest strong blog content
9. Restrained contact or link exit

Avoid repeating the same biography or positioning in the hero, introduction, capability section, and About preview.

### Music

- Prioritize active projects, especially Realmforged and Ashwrithe.
- Present Freternia, Cromonic, and other relevant history as selected legacy work.
- Make Patrik's role and each project's current status clear.
- Use real listening and project destinations.
- Do not give every historical project equal visual weight.

### Art

Organize selected work into clear groups such as:

- Graphite
- Tattoo Practice
- Generative Visuals
- Miniatures & 3D Printing

Prefer a curated selection over a complete archive. Each published image should have useful alt text and, where relevant, a title, category, year or status, and concise caption.

### Projects

Initial proof-card subjects are:

- vonporat.com
- Realmforged
- Ashwrithe
- Graphite Practice
- Tattoo Practice
- Power BI / Process Improvement

Each card should answer:

- What is it?
- Why does it exist?
- What was Patrik's role?
- What is the proof, result, or current state?
- Where can the visitor continue?

Do not use invented results, fake metrics, or generic placeholder case studies.

### Blog

The blog adds depth through reflections, behind-the-scenes work, technical notes, creative process, and learning.

Preferred category set:

- Behind the Scenes
- Music
- Visual Art
- Process & Systems
- Tools & Experiments
- Personal

Keep category values consistent between Payload CMS and the public interface. Visual-art posts, including drawing and tattoo practice, must be able to use **Visual Art**.

### About

The About page must connect music, visual craft, technology, and systems thinking into one personal narrative.

It should be editorial, structured, and scannable rather than a text wall or résumé. Mention tools such as Power BI, Photoshop, Pro Tools, Minitab, or ComfyUI only in context. Use a discreet Tool Stack rather than oversized software logos.

### Contact

Keep Contact concise: one useful paragraph, essential destinations, and a clear collaboration path. Do not repeat the full biography.

## Visual direction

The visual identity should feel:

- Dark
- Premium
- Artistic
- Modern
- Editorial
- Personal
- Cinematic without becoming theatrical

Current palette direction:

- Obsidian and graphite foundations
- Bone or warm off-white text
- Purple as the primary accent
- Turquoise as a controlled secondary accent

Use texture, depth, shadow, careful typography, and selective glass treatment. The result should feel like a curated artistic identity rather than a generic portfolio template.

### Avoid

- Generic corporate portfolio styling
- Flat Linktree-like layouts
- Bright SaaS glassmorphism
- Excessive neon glow
- Decorative gradients without purpose
- Glow or glass effects on every surface
- Continuous decorative animation
- Large colorful software-logo walls
- Generic stock photography
- Placeholder-heavy grids
- Visual changes that reduce readability or mobile performance

Do not replace the established visual identity, palette, typography feel, navigation model, or overall tone without explicit approval.

## Content and copy rules

Public-facing copy should normally be written in **English** unless the user requests another language.

Copy should be:

- Personal
- Specific
- Calm and confident
- Thoughtful
- Concise enough to scan
- Supported by real work or experience

Prefer concrete proof over broad claims.

Avoid:

- Generic “multidisciplinary creative” filler
- Corporate mission-statement language
- Empty superlatives
- Inflated expertise claims
- Repetitive introductions
- Long lists of tools without context
- Copy that makes unrelated disciplines feel arbitrarily combined

Preserve official spellings: **vonporat.com**, **Realmforged**, and **Ashwrithe**.

Ashwrithe and Realmforged have their own identities. Do not silently apply one project's voice, genre language, visual system, or lore to the personal site or to the other project.

## Technical baseline

The current platform is based on:

- Next.js
- Payload CMS
- Supabase / PostgreSQL and media storage
- Vercel hosting and analytics
- GitHub source control and deployment flow
- Google Search Console

Treat the repository as the source of truth for exact versions, paths, package manager, scripts, configuration, and available tests.

### CMS strategy

- Blog is the primary CMS-driven section.
- Keep Music, Art, Projects, About, and Contact static unless the user approves a specific migration.
- Add Bands, Artwork, Projects, Site Settings, or Contact Links collections only when a real repeated maintenance problem justifies them.
- Do not build backend complexity merely because it may be useful later.
- Preserve draft/published behavior and do not expose draft content publicly.

## Security and privacy

Never place or expose any of the following in source files, Markdown documentation, Notion, logs, screenshots, generated examples, commits, or user-facing output:

- Database passwords
- Connection strings containing credentials
- API keys
- Supabase service or S3 secrets
- OAuth client secrets
- Payload secrets
- Private tokens
- Full environment-variable values

Secrets belong only in approved environment-variable stores and a password manager.

If a secret is found in tracked content or documentation:

1. Do not repeat its value.
2. Report the affected location.
3. Treat the credential as exposed.
4. Recommend rotation before removal.
5. Update references to name the variable or management location, never the value.

Never weaken authentication, authorization, Payload access control, Supabase policies, or environment handling to make a feature easier to implement.

## Performance requirements

Mobile performance is a design constraint and part of the definition of done.

Known risk areas include:

- Oversized hero and avatar assets
- Image-heavy Music and Art pages
- Large photographic PNG files
- Gallery thumbnails served at full resolution
- CSS blur, shadow, and backdrop-filter cost
- Continuous animation loops
- Layout shift caused by media without reserved dimensions

For visual changes:

- Use appropriate responsive dimensions.
- Prefer WebP or AVIF for photographic assets when suitable.
- Separate thumbnail, card, hero, and full-view use cases.
- Lazy-load below-the-fold media.
- Prioritize genuine above-the-fold content when needed.
- Preserve width and height to reduce layout shift.
- Verify perceived loading and interaction on mobile.

Do not sacrifice the established aesthetic, but achieve it with controlled and measurable implementation choices.

## SEO and accessibility

For public pages and posts, preserve or add as appropriate:

- Unique page title
- Meta description
- Canonical URL
- Open Graph metadata and image
- Logical heading hierarchy
- Descriptive image alt text
- Clear link and button labels
- Keyboard-usable interactions
- Visible focus states
- Appropriate indexing behavior

Do not use SEO text that conflicts with the personal, editorial voice of the site.

## Implementation workflow

1. Inspect the current implementation and related content source.
2. State any assumption that materially affects the result.
3. Make the smallest coherent change that fully addresses the request.
4. Preserve existing patterns unless there is a clear reason to improve them.
5. Add or update tests when behavior changes and the repository supports them.
6. Run the relevant existing lint, type-check, test, and build commands.
7. Review the diff for unrelated edits, exposed secrets, regressions, and accidental rewrites.
8. Verify the affected page at desktop and mobile sizes.
9. For deployment work, verify the live result after the approved GitHub/Vercel flow.
10. Summarize what changed, what was verified, and any remaining risk.

Do not deploy, publish, enable hidden navigation, migrate content models, add production dependencies, or perform destructive data operations unless the user's request clearly authorizes it.

## Definition of done

A change is complete only when:

- The requested outcome is implemented.
- The result matches the established identity and page purpose.
- Desktop and mobile behavior have been checked.
- Links and primary actions work.
- Images are optimized and accessible where relevant.
- Relevant lint, type, test, and build checks pass, or any unavailable check is reported.
- No secrets or private content are exposed.
- Draft or hidden content remains protected.
- The final diff contains no unrelated changes.
- Significant new constraints or durable decisions are documented.

## Decision discipline

Do not reopen established decisions during an unrelated task. If a request conflicts with a documented decision, explain the conflict and ask for direction before implementing a broad change.

Record a new durable rule only when it represents one of the following:

- An explicit user decision
- A recurring correction
- A consequential technical constraint
- A security or publishing safeguard
- A stable definition of quality

Keep this file concise enough to remain useful. Put detailed project context, architecture, design tokens, content examples, and execution-plan templates in `docs/ai/` rather than expanding `AGENTS.md` indefinitely.
