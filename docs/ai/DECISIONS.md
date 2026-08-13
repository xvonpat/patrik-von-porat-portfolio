# vonporat.com — Decision Log

Last reviewed: 2026-08-14

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

## Decision record format

Each decision contains:

- **Status** — current state
- **Decision** — what is established
- **Rationale** — why it was chosen
- **Implications** — what it requires or prevents
- **Reconsider when** — evidence or event that justifies review

---

## D-001 — Site role and positioning

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

vonporat.com is Patrik von Porat's personal creative hub.

Canonical positioning:

> **Patrik von Porat — guitarist, visual artist and systems-minded creator.**

Supporting thought:

> **One identity, many expressions.**

Process bridge:

> **Observe → Structure → Create → Refine**

### Rationale

The site needs to connect music, visual craft, technology, writing, and process improvement without forcing Patrik into one narrow professional label or presenting his interests as unrelated hobbies.

### Implications

- The site is not a conventional CV.
- It is not an exhaustive portfolio archive.
- It is not a social-media feed or Linktree replacement.
- Pages should show selected evidence and clear destinations.
- Tools and skills should support the identity rather than replace it.

### Reconsider when

Patrik explicitly changes the purpose of the domain or chooses a substantially narrower public identity.

---

## D-002 — Public navigation order

**Status:** Active  
**Decision date:** 2026-06-01

### Decision

The intended public navigation order is:

1. Home
2. Music
3. Art
4. Projects
5. Blog
6. About
7. Contact

### Rationale

Music and Art are primary creative pillars. Projects provides proof and systems context before the deeper writing in Blog. About and Contact serve orientation and utility later in the sequence.

### Implications

- Do not reorder navigation during unrelated design work.
- Mobile and desktop navigation should follow the same conceptual order.
- Route existence and navigation visibility remain separate decisions.

### Reconsider when

User research, content volume, or an explicit strategic change shows that visitors need a different hierarchy.

---

## D-003 — Projects remains hidden until ready

**Status:** Active  
**Decision date:** 2026-06-01; reaffirmed 2026-08-14

### Decision

The `/projects` route may remain implemented, but Projects must stay hidden from public navigation until its descriptions, proof cards, images, links, and overall presentation have been reviewed and approved.

### Rationale

An unfinished or inaccurate proof section weakens trust more than a temporarily smaller navigation.

### Implications

- Do not expose Projects because its route exists.
- Do not add it to header, mobile navigation, footer promotion, sitemap emphasis, or homepage CTA without approval.
- Initial proof subjects are vonporat.com, Realmforged, Ashwrithe, Graphite Practice, Tattoo Practice, and Power BI / Process Improvement.
- No invented case studies, metrics, clients, or results.

### Reconsider when

The initial proof-card set is accurate, visually complete, linked correctly, and explicitly approved for public promotion.

---

## D-004 — Selected work over exhaustive archive

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

The site presents a curated selection of work rather than everything Patrik has made.

### Rationale

Selection creates a clearer identity, stronger proof, better performance, and a site that remains maintainable.

### Implications

- Art galleries should be curated.
- Music history should support active work rather than compete equally with it.
- Homepage sections should feature only the strongest current examples.
- New filters and archive structures require enough content to justify them.

### Reconsider when

The volume of high-quality published work creates a real discovery problem that a larger archive would solve.

---

## D-005 — Active music projects receive priority

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

Realmforged and Ashwrithe are the primary active projects on Music. Freternia, Cromonic, and other relevant work are presented as selected history.

### Rationale

Visitors should understand what Patrik is building now while still seeing the depth of his musical background.

### Implications

- Active and legacy states must be visibly distinguishable.
- Patrik's role and current project status should be clear.
- Real listening and project destinations should be used.
- Historical projects should not receive equal visual prominence by default.

### Reconsider when

A project changes status or Patrik explicitly changes his active musical priorities.

---

## D-006 — Independent project identities

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

vonporat.com, Realmforged, and Ashwrithe retain distinct voices and visual identities.

### Rationale

The personal hub needs a broad, human, readable voice. Realmforged and Ashwrithe serve different musical and narrative purposes.

### Implications

- Do not transfer Ashwrithe's ritual language or lore into general personal-site copy.
- Do not make unrelated personal-site sections sound like Realmforged fantasy copy.
- The personal site may introduce each project clearly and then link to its dedicated environment.
- Project-specific colors and imagery should sit within the personal site's overall structure without merging identities.

### Reconsider when

A project is formally absorbed into another identity or Patrik approves a deliberate cross-project campaign.

---

## D-007 — Public language and personal-site voice

**Status:** Active  
**Decision date:** Established 2025; reaffirmed 2026-08-14

### Decision

Public-facing website copy is normally written in English.

The voice is personal, specific, calm, confident, thoughtful, readable, and grounded in real work.

### Rationale

English supports the site's international creative and professional audience. A clear personal voice connects varied disciplines better than corporate or persona-driven language.

### Implications

- Avoid generic “multidisciplinary creative” filler.
- Avoid corporate mission language, empty superlatives, inflated expertise, and keyword stuffing.
- Use first person naturally.
- Lead with identity and work before tools.
- Swedish may be used when explicitly requested or for internal material.

### Reconsider when

Patrik chooses bilingual publishing or changes the primary target audience.

---

## D-008 — Homepage information hierarchy

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

The intended homepage sequence is:

1. Hero and concise positioning
2. Short introduction
3. Creative pillars
4. Selected Work / Proof Cards
5. Creative Operating System / capabilities
6. Observe → Structure → Create → Refine
7. Now / Current Focus
8. Latest strong blog content
9. Restrained contact or link exit

### Rationale

The sequence moves from rapid orientation to evidence, process, current activity, deeper writing, and a natural next step.

### Implications

- Home should not duplicate About.
- Hero, introduction, pillars, and capability copy need different jobs.
- Selected Work should provide proof rather than more abstract positioning.
- Current Focus should remain short and time-sensitive.
- Not every section needs equal visual weight.

### Reconsider when

The actual content inventory, visitor behavior, or a deliberate homepage redesign demonstrates a better hierarchy.

---

## D-009 — Obsidian Noir visual direction

**Status:** Active  
**Decision date:** 2026-05-11; consolidated 2026-08-14

### Decision

The current visual direction is **Obsidian Noir**:

- Obsidian and graphite foundations
- Bone or warm off-white primary text
- Purple/amethyst primary accent
- Controlled turquoise secondary accent
- Dark editorial materiality
- Selective smoked glass
- Subtle grain, depth, shadow, and atmosphere
- Restrained motion

### Rationale

This direction feels personal, artistic, modern, and premium without becoming corporate, flat, or a neon technology demo.

### Implications

- Purple has greater accent dominance than turquoise.
- Glass, blur, glow, and gradients remain selective.
- Mobile performance constrains visual effects.
- Exact tokens are verified in the repository rather than invented in documentation.

### Reconsider when

Patrik explicitly approves a new visual direction or a systematic redesign process reaches a replacement decision.

---

## D-010 — Copper and bronze direction is superseded

**Status:** Superseded  
**Decision date:** Superseded by Obsidian Noir in 2026

### Decision

Earlier warm brown, copper, bronze, and related Crimson Noir concepts are historical exploration, not the current default system.

### Rationale

The later Obsidian Noir direction better reflects the desired graphite, bone, purple, and turquoise identity.

### Implications

- Do not reintroduce copper, bronze, sepia, or warm-brown branding as a primary system from old mockups or notes.
- Old code or assets using those colors are not automatic authority.

### Reconsider when

Only through an explicit approved visual-direction change.

---

## D-011 — Blog-first CMS strategy

**Status:** Active  
**Decision date:** 2026-05-29

### Decision

Blog is the primary CMS-driven public section.

Home, Music, Art, Projects, About, and Contact remain static by default until a specific migration is approved.

### Rationale

The blog has a clear recurring publishing need. Broad CMS expansion would add backend complexity before static content and presentation are fully established.

### Implications

- Do not migrate static pages incidentally.
- Do not add Bands, Artwork, Projects, Site Settings, or Contact Links collections without an observed need and explicit approval.
- Avoid dual ownership of the same content in code and CMS.
- Preserve draft/published boundaries.

### Reconsider when

Repeated manual updates to a static content type create measurable friction and a concrete first CMS version is approved.

---

## D-012 — Repository is authoritative for implementation

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

The repository and configured runtime services are authoritative for package versions, file paths, commands, schemas, environment-variable names, branch behavior, and current implementation.

### Rationale

Documentation provides durable intent but can become stale. Guessing technical details creates avoidable errors.

### Implications

- Inspect before editing.
- Do not invent commands, paths, fields, or tokens.
- Separate Established, Intended, Planned, and repository-specific details.
- Update documentation when architecture materially changes.

### Reconsider when

Never as a general principle; only the location of technical authority may change if the project adopts another controlled source.

---

## D-013 — Mobile performance is a design constraint

**Status:** Active  
**Decision date:** 2026-06-12; reaffirmed 2026-08-14

### Decision

Mobile performance is part of design quality and Definition of Done.

### Rationale

The site has experienced perceived slowness from large media, image-heavy pages, blur, and animation. A premium visual experience must also feel responsive and stable.

### Implications

- Audit before broad optimization.
- Preserve visual identity while simplifying expensive mobile effects.
- Use purpose-sized media and appropriate formats.
- Control layout shift, blur, backdrop filters, shadow, animation, and client-side JavaScript.
- Do not claim improvement without appropriate evidence.

### Reconsider when

The specific techniques may change, but performance remains a permanent quality requirement.

---

## D-014 — Security and secret storage

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

Secrets belong only in approved environment-variable stores and a password manager. They must not be stored in Git, Markdown, Notion, logs, screenshots, prompts, examples, or public output.

### Rationale

Credentials previously stored in plain text must be treated as exposed. Documentation should describe where a secret is managed, never its value.

### Implications

- Never repeat discovered secret values.
- Rotate exposed credentials before removing old references.
- Never weaken authentication, access control, storage policy, or authorization to simplify implementation.
- Server-only values must not enter browser bundles.

### Reconsider when

The approved secret-management system changes. The non-exposure principle remains permanent.

---

## D-015 — GitHub and Vercel delivery flow

**Status:** Active  
**Decision date:** Established 2026

### Decision

Source changes move through the Git repository and GitHub into the configured Vercel deployment flow for vonporat.com.

### Rationale

Version control and managed deployment provide reviewability, reproducibility, and rollback options.

### Implications

- Local implementation and verification precede release.
- A push is not proof of successful deployment.
- Production completion requires deployed-route verification.
- Deployment, push, merge, migration, and destructive operations require authorization from the user's request.

### Reconsider when

Hosting or source-control architecture changes explicitly.

---

## D-016 — Tool Stack remains contextual and discreet

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

Tools such as Power BI, Pro Tools, Photoshop, Minitab, ComfyUI, Next.js, Payload, Supabase, and Vercel are shown only when they support a capability, project, or real workflow.

### Rationale

Proof and practice communicate more than decorative software logos or generic skill lists.

### Implications

- Avoid large colorful tool walls.
- Group tools by what they enable.
- Do not use ratings or skill percentages.
- Keep About narrative-first.

### Reconsider when

A specific audience or project requires a technical capability matrix with a clear practical purpose.

---

## D-017 — AI use is transparent but not the whole story

**Status:** Active  
**Decision date:** Consolidated 2026-08-14

### Decision

AI-assisted work should be described honestly and proportionately. The site should also show traditional craft, physical practice, human direction, selection, iteration, and project context.

### Rationale

Patrik uses generative tools as part of a broader practice. Presenting all visual work as either purely manual or purely generated would misrepresent the process.

### Implications

- Use terms such as “AI-assisted” and “generative visuals” accurately.
- Do not imply prompting alone is the whole creative contribution.
- Do not hide AI use when it is materially relevant.
- Keep graphite, tattoo practice, music, and physical making visible as real craft.

### Reconsider when

Tools, public expectations, or Patrik's creative process materially changes.

---

## Adding a new decision

Add a record only when the choice is durable and materially changes future work.

Good reasons:

- Patrik explicitly resolves a recurring question.
- A visual, editorial, technical, or publishing direction changes.
- A safeguard becomes mandatory.
- A planned system becomes approved.
- A recurring correction needs to persist.

Do not add:

- Individual backlog items
- Temporary release copy
- One-off implementation details
- Routine bug fixes
- Ideas without approval
- Facts already owned by a more suitable technical source

## Decision update procedure

When replacing a decision:

1. Keep the old record.
2. Mark it **Superseded**.
3. Add the replacement as a new record.
4. Link the two records in their rationale or implications.
5. Update affected project documentation.
6. Verify implementation if the decision changes live behavior.

Do not silently rewrite history in a way that makes old code or discussions impossible to interpret.
