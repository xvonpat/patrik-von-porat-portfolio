# vonporat.com — Quality Standards

Last reviewed: 2026-08-14

## Purpose

This document defines what must be true before work on vonporat.com can be considered complete.

It turns project intent into reviewable acceptance criteria across functionality, design, content, CMS behavior, accessibility, SEO, performance, security, testing, deployment, and handoff.

- `AGENTS.md` defines mandatory agent behavior.
- `PROJECT_CONTEXT.md` defines the site's purpose and identity.
- `SITE_ARCHITECTURE.md` defines routes and ownership.
- `DESIGN_SYSTEM.md` defines visual quality.
- `CONTENT_GUIDE.md` defines editorial quality.
- `TECHNICAL_SYSTEM.md` defines technical workflows and boundaries.
- This file defines acceptance and verification.

## Core principle

**Implemented is not the same as complete.**

A change is complete only when the intended outcome works, relevant risks have been checked, the result fits the established system, and the verification evidence is accurately reported.

Do not call work finished because code was written, a page rendered once, a build command started, or a deployment was triggered.

## Quality levels

### Mandatory gates

These apply to every change unless they are genuinely irrelevant:

- The requested outcome is satisfied.
- Relevant existing behavior is preserved.
- No unrelated user changes are overwritten.
- No secrets or private content are exposed.
- Claims about verification are truthful.
- The final diff is reviewed.
- Known project constraints remain intact.

### Task-dependent gates

Apply these whenever the task affects the area:

- Functional behavior
- Visual identity
- Responsive layout
- Accessibility
- Content accuracy
- CMS publishing
- Media handling
- SEO and discoverability
- Performance
- Authentication and authorization
- Data and migrations
- Deployment and production

Do not perform irrelevant ceremonial checks. Do not skip relevant checks because the change appears small.

## Evidence standard

Every completion claim needs appropriate evidence.

| Claim | Acceptable evidence |
| --- | --- |
| “The code compiles” | Successful relevant type check or production build. |
| “Tests pass” | Successful test command with the affected test scope identified. |
| “The page works” | Manual or automated verification of the relevant route and interaction. |
| “Mobile is fixed” | Inspection at appropriate narrow widths and, when relevant, performance evidence. |
| “The image is optimized” | File dimensions/format/size and verified rendered use. |
| “The post is public” | Published-state query and public route verification. |
| “The deployment succeeded” | Successful deployment plus verification of the deployed route. |
| “SEO is correct” | Inspection of rendered metadata, canonical, indexing behavior, and relevant generated files. |
| “Accessible” | Relevant keyboard, focus, semantic, contrast, alternative-text, and motion checks. |

Do not imply exhaustive assurance when only one narrow check was performed.

## Verification language

Use precise status language:

- **Implemented** — the requested change was made in code or content.
- **Checked locally** — behavior was inspected in a local environment.
- **Automated checks passed** — list the actual commands or suites.
- **Preview verified** — the preview deployment was opened and checked.
- **Production verified** — the live production result was opened and checked.
- **Not verified** — state the missing environment, command, access, or dependency.

Never replace “not verified” with “should work.”

## Universal acceptance criteria

Before completing any change:

- [ ] The user request has been reread.
- [ ] The affected area and intended outcome are clear.
- [ ] Relevant project documentation has been followed.
- [ ] The current implementation was inspected before editing.
- [ ] Assumptions with material impact were verified or disclosed.
- [ ] The change is focused and does not rewrite unrelated areas.
- [ ] Existing user changes are preserved.
- [ ] The final diff has been reviewed.
- [ ] No secrets, private content, or credential-bearing URLs appear in the diff or output.
- [ ] Relevant checks have been run and accurately reported.
- [ ] Remaining risk is concrete rather than speculative.

## Functional quality

A functional change must work through the complete user path, not only at component level.

### Verify as relevant

- Initial page load
- Direct navigation to the route
- Client-side navigation
- Browser refresh
- Back and forward navigation
- Primary and secondary actions
- Links and external destinations
- Forms and validation
- Empty state
- Loading state
- Error state
- Not-found state
- Keyboard operation
- Authenticated and unauthenticated state
- Draft and published state
- Slow or missing external resource

### Functional failure patterns

Reject work that:

- Works only after client-side navigation but fails on first load
- Relies on stale local state
- Produces broken links
- Hides errors without a useful fallback
- Exposes draft or private content
- Requires a refresh without explaining why
- Fails when optional data is absent
- Uses placeholder actions that appear interactive but do nothing
- Changes an existing route unintentionally

## Regression quality

Every change should be reviewed for nearby regressions.

### Minimum regression scope

Check:

- The changed component or route
- Shared components it uses
- The closest related route
- Desktop and mobile behavior when UI is affected
- Published/draft or public/private behavior when CMS/auth is affected
- Metadata and media when page data changes

### Shared-system changes

Changes to these areas require broader review:

- Global CSS or design tokens
- Shared layout or container
- Header or navigation
- Footer
- Buttons and links
- Media URL handling
- Rich-text renderer
- Payload configuration
- Access rules
- Database adapter
- Storage adapter
- Next.js configuration
- Metadata base, sitemap, or robots
- Environment handling

Do not approve global changes based on one page looking correct.

## Visual identity quality

All public UI changes must preserve the **Obsidian Noir** direction.

The result should remain:

- Dark
- Premium
- Artistic
- Editorial
- Personal
- Material
- Restrained
- Cinematic without theatrical excess

### Visual acceptance

- [ ] Obsidian and graphite remain the visual foundation.
- [ ] Bone or warm off-white text remains readable.
- [ ] Purple is the primary accent.
- [ ] Turquoise remains a controlled secondary accent.
- [ ] Glass is selective rather than universal.
- [ ] Glow and gradients support hierarchy rather than decoration.
- [ ] Section hierarchy is clear.
- [ ] Cards have a real content or interaction purpose.
- [ ] Images support the work or atmosphere.
- [ ] The result does not resemble a generic SaaS, Linktree, dashboard, or template portfolio.

### Visual rejection conditions

Reject or revise a change that introduces:

- Bright SaaS glassmorphism
- Copper, bronze, sepia, or warm-brown branding as a primary direction
- Excessive neon
- Equal purple/turquoise dominance everywhere
- A uniform wall of identical cards
- Low-contrast body text
- Glow on every surface
- Decorative animation without purpose
- Generic stock imagery
- Placeholder-heavy grids
- Project-specific lore as personal-site decoration
- Visual effects that materially slow mobile use

## Responsive quality

Mobile is a first-class layout, not a scaled desktop page.

### Required responsive checks for UI changes

- [ ] No horizontal overflow.
- [ ] Navigation is usable.
- [ ] Text remains readable without zooming.
- [ ] Touch targets are comfortable.
- [ ] Important actions are visible and understandable.
- [ ] Content order remains logical.
- [ ] Images crop intentionally.
- [ ] Cards stack before they become cramped.
- [ ] Fixed heights do not clip content.
- [ ] Hover is not required to reveal critical information.
- [ ] Decorative effects are reduced before readability is compromised.
- [ ] The page remains stable while media loads.

### Viewport strategy

Use the repository's actual breakpoints and test representative widths around affected layout transitions.

At minimum for meaningful layout work, inspect:

- A narrow mobile width
- A common mobile width
- A tablet or intermediate width when the layout changes there
- A standard desktop width
- A wide desktop width when full-width composition is affected

Do not invent a permanent breakpoint standard in this document. Verify the implementation.

## Accessibility quality

Accessibility is part of completion, not optional polish.

### Semantics

- [ ] Landmarks and elements match their purpose.
- [ ] Heading order is logical.
- [ ] Buttons perform actions; links navigate.
- [ ] Lists and tables use appropriate structure.
- [ ] Form fields have labels.
- [ ] Status and errors are communicated meaningfully.

### Keyboard and focus

- [ ] All interactive elements are keyboard reachable.
- [ ] Focus order is logical.
- [ ] Focus remains visible.
- [ ] Modals and drawers manage focus correctly.
- [ ] Closing an overlay restores focus appropriately.
- [ ] No keyboard trap exists.

### Images and media

- [ ] Content images have useful alt text.
- [ ] Decorative images are correctly ignored.
- [ ] Captions add context rather than repeat alt text.
- [ ] Embedded media has an understandable accessible name.
- [ ] Media controls remain usable.

### Color and motion

- [ ] Meaning is not communicated by color alone.
- [ ] Text and controls remain distinguishable against their backgrounds.
- [ ] Reduced-motion preferences are respected.
- [ ] Animation does not block reading or interaction.
- [ ] Flashing or distracting repeated motion is absent.

### Zoom and text

- [ ] Content remains usable with browser zoom.
- [ ] Text does not overlap or become clipped.
- [ ] Long labels and translated-length text do not break controls where relevant.

Do not claim standards-level conformance unless it was actually audited against that standard.

## Content quality

Public content must be accurate, specific, and consistent with `CONTENT_GUIDE.md`.

### Editorial acceptance

- [ ] Public copy is English unless another language was requested.
- [ ] The subject is understandable quickly.
- [ ] Claims are supported by real experience or work.
- [ ] Roles, dates, status, links, and credits are verified.
- [ ] Practice, concept, legacy, active, planned, and released states are accurate.
- [ ] No invented metrics, outcomes, clients, or audience claims appear.
- [ ] Copy does not repeat nearby sections.
- [ ] Tools are mentioned in context.
- [ ] Calls to action describe their destination.
- [ ] Project identities remain distinct.
- [ ] AI use is described honestly and proportionately.
- [ ] Official names and spellings are correct.

### Voice rejection conditions

Reject or revise copy that is:

- Generic corporate filler
- Inflated self-promotion
- Keyword-stuffed
- Vague inspiration without substance
- Artificially occult on the personal site
- Ashwrithe lore used as general vonporat.com voice
- Realmforged fantasy language used for unrelated disciplines
- A list of software presented as identity
- Written to fill space rather than communicate

## Page-specific quality

### Home

- [ ] A new visitor can understand who Patrik is within the first screen or immediate opening sequence.
- [ ] Hero, introduction, pillars, and About preview do not repeat the same message.
- [ ] The strongest current work is visible.
- [ ] Creative pillars have clear destinations.
- [ ] Selected Work provides evidence.
- [ ] Current Focus reflects actual priorities.
- [ ] Latest Blog fails gracefully with limited or no content.
- [ ] There is one clear primary action.
- [ ] Mobile initial load is not dominated by unnecessary media.

### Music

- [ ] Realmforged and Ashwrithe receive active-project priority.
- [ ] Patrik's role is clear.
- [ ] Listening and project links are real and current.
- [ ] Legacy work is clearly distinguished from active work.
- [ ] Project-specific identity remains intact.
- [ ] Logos and images render correctly and efficiently.

### Art

- [ ] The selection is curated rather than exhaustive.
- [ ] Graphite, Tattoo Practice, Generative Visuals, and Miniatures & 3D Printing are understandable categories when used.
- [ ] Practice work is identified honestly.
- [ ] Titles, captions, medium, year, or status are included when useful.
- [ ] Images have appropriate alt text.
- [ ] Thumbnails are not served as oversized full-resolution assets.
- [ ] Gallery behavior works with keyboard and touch when applicable.

### Projects

- [ ] Projects remains hidden from public navigation until Patrik approves it.
- [ ] Each card has a title, category, status, overview, purpose, role, proof/current state, and useful destination where available.
- [ ] All results and metrics are real.
- [ ] Screenshots and artifacts are legible enough to support the claim.
- [ ] Placeholder case studies are absent.
- [ ] The page explains both creative work and systems thinking.

### Blog listing

- [ ] Only published posts are listed.
- [ ] Ordering is predictable.
- [ ] Titles, excerpts, dates, categories, and images render consistently.
- [ ] Visual Art is available and displayed consistently.
- [ ] Pagination or load behavior works when relevant.
- [ ] Empty state is deliberate.
- [ ] Card links resolve to stable routes.
- [ ] First-load media works, not only client navigation.

### Blog article

- [ ] Valid published slug renders the full article.
- [ ] Invalid or unavailable slug returns the intended not-found state.
- [ ] Draft content is protected.
- [ ] Rich text renders all enabled node types correctly.
- [ ] Heading hierarchy is logical.
- [ ] Media is responsive and does not overflow.
- [ ] Metadata uses the article with sensible fallbacks.
- [ ] Long-form typography is readable.
- [ ] Links are distinguishable and functional.

### About

- [ ] The page connects music, visual craft, technology, and systems thinking.
- [ ] It is structured and scannable rather than a text wall.
- [ ] It does not read like a generic CV or LinkedIn summary.
- [ ] More than 30 years of guitar experience is represented accurately.
- [ ] Tools support the narrative rather than replace it.
- [ ] Observe → Structure → Create → Refine is explained once and clearly.
- [ ] The contact path is easy to find.

### Contact

- [ ] The page is concise.
- [ ] The introductory copy gives a clear reason to make contact.
- [ ] Icons have visible labels or accessible names.
- [ ] Email and external links are valid.
- [ ] The page does not repeat the full About narrative.
- [ ] No private contact or account data is exposed unintentionally.

## CMS quality

CMS work must be verified from editor to public output.

### Payload admin

- [ ] Authorized editor can sign in.
- [ ] Relevant collection can be opened.
- [ ] Fields have clear labels and suitable validation.
- [ ] Required fields behave as intended.
- [ ] Existing records remain usable.
- [ ] Admin changes do not expose private system details.

### Draft and publishing

- [ ] Draft can be saved without becoming public.
- [ ] Published state is queryable publicly.
- [ ] Unpublishing removes normal public access as intended.
- [ ] Dates and status remain consistent.
- [ ] Preview behavior works when part of the task.
- [ ] Cache or revalidation behavior reflects publishing changes.

### Schema changes

- [ ] Actual collection schema was inspected.
- [ ] Migration need was determined.
- [ ] Existing data impact was reviewed.
- [ ] Generated types or artifacts were updated when required.
- [ ] Both admin and public rendering were verified.
- [ ] Rollback or recovery risk is understood.

Do not approve a CMS change based only on TypeScript compilation.

## Media quality

### Functional media checks

- [ ] Media record exists and resolves.
- [ ] URL construction is correct.
- [ ] First load works.
- [ ] Refresh works.
- [ ] Remote-host configuration permits intended media.
- [ ] Missing media has a deliberate fallback.
- [ ] Width and height or aspect ratio are reserved.

### Visual media checks

- [ ] Crop preserves the subject.
- [ ] Resolution is sufficient at rendered size.
- [ ] Compression does not visibly damage important work.
- [ ] Color and contrast fit the surrounding page without destroying the source image.
- [ ] Captions and alt text are accurate.

### Performance media checks

- [ ] File format suits the content.
- [ ] Dimensions suit the use case.
- [ ] Thumbnail, card, hero, and full-view assets are not conflated unnecessarily.
- [ ] Below-the-fold media is not eagerly loaded without reason.
- [ ] Transparent PNG is used only where transparency is needed.
- [ ] No obvious multi-megabyte asset is introduced without justification.

## SEO quality

### Page-level SEO

- [ ] Page title is unique and accurate.
- [ ] Meta description reflects actual content.
- [ ] Canonical URL is correct.
- [ ] Open Graph title, description, and image are appropriate.
- [ ] Heading hierarchy matches page meaning.
- [ ] Important images have meaningful alt text.
- [ ] Indexing state is intentional.

### Site-level SEO

- [ ] Sitemap includes intended public routes.
- [ ] Hidden, draft, private, and admin routes are excluded as appropriate.
- [ ] Robots behavior is intentional.
- [ ] Redirects preserve moved public URLs.
- [ ] Metadata base and absolute social URLs resolve correctly.
- [ ] Not-found behavior returns the intended status and experience.

### CMS SEO

- [ ] Published post metadata comes from the correct record.
- [ ] Missing optional SEO fields use sensible fallbacks.
- [ ] Draft posts do not appear in sitemaps or public metadata.
- [ ] Slug changes consider redirects and existing links.

Avoid SEO copy that damages the site's human editorial voice.

## Performance quality

Performance claims require measurement appropriate to the issue. No universal numeric score target is established in this document.

### Mandatory performance principles

- Measure before and after meaningful optimization work.
- Prioritize user-visible impact over cosmetic scores.
- Test mobile behavior.
- Do not regress image delivery while redesigning.
- Consider network, rendering, JavaScript, layout stability, and interaction separately.
- Preserve visual identity through efficient implementation.

### Performance acceptance for UI/media work

- [ ] No clearly unnecessary oversized media was introduced.
- [ ] Above-the-fold assets are prioritized deliberately.
- [ ] Below-the-fold assets load appropriately.
- [ ] Layout shift is controlled.
- [ ] Blur, backdrop filter, shadow, and animation scope is restrained.
- [ ] Client-component and JavaScript scope is justified.
- [ ] Mobile interaction does not feel blocked by decoration.
- [ ] Build output or runtime evidence shows no obvious new issue.

### Known hotspots

Review carefully when touching:

- Hero images
- Avatar or portrait images
- Music page media
- Art galleries
- Project screenshots
- Transparent PNG logos
- Backdrop blur
- Repeating animation
- Rich embeds
- Fonts

Do not claim a performance improvement based only on reducing source-code length or converting a file format without checking the delivered result.

## Security and privacy quality

### Mandatory security gate

- [ ] No secret values appear in source, Markdown, logs, screenshots, test output, commits, or user-facing responses.
- [ ] Server-only values remain server-only.
- [ ] Authentication is not weakened.
- [ ] Authorization and access rules remain intentional.
- [ ] Draft and private content remain protected.
- [ ] Error messages do not expose internals.
- [ ] External integrations do not receive unnecessary data.
- [ ] Destructive operations target the verified environment and data.

### Sensitive changes

Changes involving these areas require explicit review:

- Payload user authentication
- Access-control functions
- Supabase policies
- Database connection configuration
- Storage visibility
- OAuth
- Environment-variable exposure
- Admin routes
- Cookies and sessions
- Destructive migrations
- Account or credential management

Never trade security for convenience without an explicit, informed decision.

## Code quality

Code should fit the existing project rather than demonstrate a separate preferred architecture.

### Acceptance

- [ ] Existing naming and module patterns are followed.
- [ ] Types are accurate and useful.
- [ ] Error handling is intentional.
- [ ] Server/client boundaries are respected.
- [ ] No unnecessary dependency was added.
- [ ] No duplicate data-fetching path was introduced without reason.
- [ ] Reusable behavior is extracted only when reuse is real.
- [ ] Comments explain non-obvious decisions, not obvious syntax.
- [ ] Dead code and debug output introduced by the task are removed.
- [ ] Generated files are handled through the established workflow.

### Avoid

- Broad refactors unrelated to the request
- Premature abstractions
- `any` or unsafe casts used to bypass an understood type problem
- Silent error swallowing
- Client-side code for behavior that belongs securely on the server
- Hard-coded production URLs where configured bases already exist
- Repeated magic values instead of established tokens or configuration
- Dependency upgrades hidden inside feature work

## Automated testing

The repository determines actual commands and frameworks.

### Test selection

Run the smallest sufficient set first, then broader checks when shared behavior or risk requires it.

Possible layers:

- Static analysis
- Lint
- Type check
- Unit tests
- Component tests
- Integration tests
- End-to-end tests
- Production build
- CMS generation checks
- Migration validation

### Test quality

Tests should verify meaningful behavior rather than implementation trivia.

Add or update tests when:

- Behavior changes
- A bug is fixed and recurrence is plausible
- Access rules change
- Data transformation changes
- Shared components change meaningfully
- Error or fallback behavior is important

Do not create brittle snapshots as a substitute for testing the requested outcome.

## Manual verification

Manual review remains required for areas automation cannot fully judge.

Examples:

- Visual hierarchy
- Image crop
- Responsive composition
- Readability
- Copy repetition
- Project identity
- Perceived mobile performance
- Keyboard flow
- Published CMS behavior
- External destinations

Record what was actually inspected.

## Build quality

A successful development server is not proof of production readiness.

When relevant, verify:

- Production build completes
- Type generation is current
- Server/client imports are valid
- Required environment-variable names are present in the target environment
- Dynamic routes build or resolve correctly
- Metadata generation does not fail
- CMS and database access occur at valid lifecycle stages
- Image hosts and assets are accepted
- No unexpected build-time data mutation occurs

Report warnings that materially affect the requested work.

## Migration quality

Before a migration:

- [ ] Target environment is verified.
- [ ] Existing schema and migration history are inspected.
- [ ] Data-loss risk is understood.
- [ ] Backup/recovery path is verified when material data is affected.
- [ ] Migration is reviewed.
- [ ] Rollback or forward-fix strategy exists.

After a migration:

- [ ] Migration status is clean.
- [ ] Existing content is present.
- [ ] Payload admin works.
- [ ] Public queries work.
- [ ] Relevant fields and types match.
- [ ] Production verification occurs when production was changed.

Never describe a schema change as complete before the application behavior using that schema is verified.

## Deployment quality

### Before deployment

- [ ] Deployment is authorized by the user's request.
- [ ] Branch and target environment are verified.
- [ ] Relevant checks pass.
- [ ] Diff has been reviewed.
- [ ] Migration order is understood.
- [ ] Required target environment variables exist.
- [ ] Rollback path is understood.

### After deployment

- [ ] Vercel reports a successful deployment.
- [ ] The affected deployed route opens.
- [ ] Primary interaction works.
- [ ] CMS/data path works when affected.
- [ ] Media loads when affected.
- [ ] Metadata is correct when affected.
- [ ] Mobile behavior is checked when affected.
- [ ] No obvious regression appears in adjacent shared areas.

A successful deployment record without live verification is not production verification.

## Dependency quality

Before accepting a new production dependency:

- [ ] Existing stack cannot solve the need clearly.
- [ ] Package is compatible with current framework versions.
- [ ] Bundle/runtime cost is understood.
- [ ] Maintenance and security posture are reasonable.
- [ ] License is appropriate.
- [ ] Addition is authorized when it materially affects production.

Do not accept a dependency only because it shortens one small implementation.

## External service quality

When changing external links, embeds, analytics, or integrations:

- [ ] Destination is current and owned or intentionally referenced.
- [ ] Failure state is acceptable.
- [ ] Privacy impact is considered.
- [ ] Accessibility is considered.
- [ ] Performance cost is justified.
- [ ] No private account information is exposed.
- [ ] The integration does not weaken the core experience when blocked.

## Documentation quality

Update documentation when the change creates a durable fact, not for every implementation detail.

Document:

- New route responsibility
- Changed CMS ownership
- New collection or schema concept
- Changed authentication or access boundary
- Changed visual-system rule
- Changed editorial rule
- Changed deployment, caching, storage, or migration workflow
- Recurring failure with an established diagnostic path

Documentation must:

- Match current behavior
- Separate established, intended, and planned work
- Avoid credentials
- Use exact official names
- Point agents toward repository verification where details can change

## Severity model

Use this model during review:

### Blocker

Must be resolved before completion or release.

Examples:

- Secret exposure
- Data-loss risk
- Broken production build
- Public draft/private content
- Unusable primary route
- Authentication bypass
- Destructive migration without recovery

### Major

Materially damages the requested outcome or an important existing behavior.

Examples:

- Broken mobile navigation
- Featured image fails on first load
- Incorrect project status or role
- Large performance regression
- Missing keyboard access to a primary interaction
- Wrong canonical or route behavior

### Minor

Noticeable quality issue that does not prevent the primary outcome.

Examples:

- Inconsistent spacing
- Weak empty-state copy
- Minor metadata inconsistency
- One non-critical crop issue

### Observation

Useful follow-up that is outside the current acceptance boundary.

Do not inflate observations into blockers or hide blockers as future improvements.

## Change-type checklists

### Copy-only change

- [ ] Facts and spelling verified
- [ ] Voice and brand boundary checked
- [ ] Nearby repetition checked
- [ ] Layout and wrapping checked
- [ ] Metadata updated if the page meaning changed
- [ ] Relevant public route checked

### Visual component change

- [ ] Existing tokens and patterns inspected
- [ ] Desktop and mobile checked
- [ ] Hover, focus, and active states checked
- [ ] Keyboard operation checked
- [ ] Reduced motion checked when relevant
- [ ] Performance cost reviewed
- [ ] Shared-use regressions checked

### Blog/CMS change

- [ ] Admin editing checked
- [ ] Draft state checked
- [ ] Published state checked
- [ ] Listing checked
- [ ] Slug route checked
- [ ] Media checked on first load
- [ ] Rich text checked
- [ ] Metadata checked
- [ ] Cache/revalidation checked

### Media optimization

- [ ] Original use and crop understood
- [ ] Correct output format selected
- [ ] Render dimensions appropriate
- [ ] Visual comparison performed
- [ ] Delivered size measured
- [ ] First load and refresh checked
- [ ] Layout stability checked
- [ ] Mobile checked

### Route or navigation change

- [ ] Information architecture approval confirmed
- [ ] Desktop header checked
- [ ] Mobile menu checked
- [ ] Active state checked
- [ ] Footer links checked
- [ ] Sitemap/robots/canonical implications checked
- [ ] Direct URL and not-found behavior checked
- [ ] Projects visibility rule preserved unless explicitly changed

### Database or schema change

- [ ] Current schema and migration history inspected
- [ ] Data impact reviewed
- [ ] Migration reviewed and tested
- [ ] Generated types updated
- [ ] Admin behavior checked
- [ ] Public behavior checked
- [ ] Backup/recovery verified when needed
- [ ] Deployment order planned

## Final definition of done

A vonporat.com task is done only when all relevant statements below are true:

1. **Outcome** — the user's requested result exists and works.
2. **Scope** — unrelated areas and user changes are preserved.
3. **Identity** — the result fits the personal, editorial Obsidian Noir system.
4. **Content** — public claims and terminology are accurate.
5. **Responsive** — affected UI works on desktop and mobile.
6. **Accessible** — affected interactions and content meet relevant accessibility checks.
7. **CMS** — draft, published, admin, and media behavior work when affected.
8. **SEO** — metadata and indexing behavior remain correct when affected.
9. **Performance** — no unjustified user-visible regression is introduced.
10. **Security** — no secret, private content, or access boundary is exposed or weakened.
11. **Code** — relevant checks pass and the diff is clean.
12. **Data** — schema and migrations are safe and verified when affected.
13. **Deployment** — the target environment is verified when deployment is in scope.
14. **Documentation** — durable changes are recorded.
15. **Handoff** — verification and remaining risk are stated truthfully.

## Handoff template

Use this compact format after implementation:

```md
## Outcome

What changed and what now works.

## Main files

- Relevant file or area

## Verification

- Commands actually run
- Manual routes and states actually checked
- Environment checked: local, preview, or production

## Data and deployment

- Migration impact, if any
- Deployment state

## Remaining risk

- Concrete unresolved issue, or “None identified within the verified scope.”
```

Do not add a remaining-risk section filled with generic possibilities. Report only concrete limits of the performed verification.

## Maintenance of this document

Update these standards when:

- A new recurring acceptance criterion is established.
- A repeated defect reveals a missing gate.
- Architecture changes require a new verification path.
- Accessibility, performance, publishing, or security expectations change.
- A new route or content type needs page-specific criteria.
- Deployment or migration workflow changes materially.

Do not lower a standard merely because a task is inconvenient to verify. If a check cannot be performed, report the limitation rather than redefining completion.
