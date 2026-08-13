# vonporat.com — Design System

Last reviewed: 2026-08-14

## Purpose

This document defines the intended visual language and design behavior of vonporat.com.

It describes how the site should feel, how visual elements should relate, and how an AI agent should evaluate design changes. It does not replace inspection of the existing implementation.

- `AGENTS.md` contains mandatory agent behavior and project constraints.
- `PROJECT_CONTEXT.md` explains Patrik, the audience, and the site's purpose.
- `SITE_ARCHITECTURE.md` defines routes, page responsibilities, and content ownership.
- This file defines the visual system.

The repository is authoritative for current CSS variables, fonts, breakpoints, component names, spacing tokens, and implementation details.

## Current visual direction

The approved direction is **Obsidian Noir**.

It should feel:

- Dark
- Premium
- Artistic
- Modern
- Editorial
- Personal
- Material
- Cinematic without becoming theatrical
- Technically refined without looking like a software product

The site should feel like a carefully assembled creative environment rather than a generic portfolio template.

## Superseded directions

Earlier concepts explored warm brown, copper, and bronze accents. These are not the current default direction.

Do not reintroduce copper, bronze, sepia, or warm-brown branding as a primary system unless Patrik explicitly approves a new direction.

Similarly, do not interpret “dark” as cyberpunk neon, bright blue SaaS glassmorphism, or black surfaces covered in glow.

## Design principles

### 1. Material depth over visual noise

Depth should come from layered surfaces, controlled transparency, texture, soft shadow, tonal separation, and careful composition.

Do not create depth by adding more borders, more gradients, more glowing objects, or more animated decoration.

### 2. Editorial hierarchy over dashboard density

The site should guide the eye like an editorial composition. Important content receives space, scale, contrast, and pacing.

Avoid layouts that resemble admin dashboards, SaaS pricing grids, or uniform component galleries.

### 3. Selected work over repeated cards

Use cards when they clarify destinations, categories, projects, or proof. Do not turn every paragraph or visual into a card.

Editorial variation is allowed and encouraged when it improves hierarchy.

### 4. Personal identity over template conventions

The layout may be asymmetrical, image-led, left-aligned, or deliberately restrained when that makes the site feel more personal.

Do not add fashionable sections merely because they are common on portfolio websites.

### 5. Restraint creates premium character

Accents should feel intentional because they are scarce. Glow, blur, animation, large display type, and bright color should be treated as emphasis tools rather than defaults.

### 6. Performance is part of the aesthetic

A design that feels slow, unstable, or difficult to use on mobile does not meet the intended premium standard.

## Color system

### Color roles

| Role | Direction | Use |
| --- | --- | --- |
| Canvas | Near-black obsidian | Main page background and deepest visual layer. |
| Canvas raised | Dark graphite | Large sections, panels, and separation from the base canvas. |
| Surface | Smoked graphite | Cards, navigation, drawers, and elevated content. |
| Surface strong | Lighter graphite | Hovered, selected, or visually important surfaces. |
| Text primary | Bone or warm off-white | Primary reading text and important headings. |
| Text secondary | Muted ash | Supporting text, metadata, and descriptions. |
| Text quiet | Low-contrast gray | Non-essential labels and inactive information. |
| Border subtle | Low-contrast graphite/ash | Structural separation without outlining every object. |
| Accent primary | Amethyst/purple | Primary interaction, selected state, focus, and signature emphasis. |
| Accent secondary | Controlled turquoise | Small contrast moments, secondary signals, and occasional metadata. |
| Success | Muted cool green | Confirmed states when needed. |
| Warning | Muted amber | Caution and non-critical warnings, used sparingly. |
| Error | Controlled red | Errors and destructive actions, not decoration. |

### Token policy

Before changing color values:

1. Find the current CSS variables or theme tokens.
2. Identify every semantic use of the token.
3. Preserve contrast and state behavior.
4. Change semantic tokens rather than scattering new hard-coded colors.
5. Verify light emitted by shadows, gradients, overlays, and images as well as flat color values.

Do not invent a parallel palette when the repository already has a token system.

If no semantic token system exists, propose one before performing a broad color refactor. Do not silently replace current values.

### Accent hierarchy

Purple is the primary accent. It may be used for:

- Primary interactive emphasis
- Active navigation state
- Focus indication
- Important labels
- Selected cards or filters
- Subtle edge light
- Controlled gradients

Turquoise is secondary and should normally occupy less visual area than purple. It may be used for:

- Small metadata signals
- Secondary active indicators
- Fine visual contrast
- Occasional links or supporting details
- Subtle dual-accent treatments

Do not give purple and turquoise equal visual dominance across every component.

### Contrast

- Body copy must remain comfortably readable against the canvas or surface.
- Muted text must not become decorative gray that disappears on common displays.
- Links must be identifiable by more than a barely visible color shift.
- Focus, hover, active, selected, disabled, warning, and error states must be distinguishable.
- Text over imagery requires a tested overlay, protected text region, or alternate layout.

## Background and atmosphere

The background may use layered visual atmosphere, but it should remain subordinate to content.

Suitable treatments:

- Subtle graphite or paper grain
- Very soft vignette
- Low-opacity radial light
- Controlled purple or turquoise atmospheric glow
- Tonal gradients that create depth
- Faint texture related to creative materiality

Avoid:

- Obvious repeating noise tiles
- Strong color clouds behind every section
- Animated background particles
- Bright aurora gradients
- High-frequency texture behind body text
- Effects that create banding, jank, or large paint cost

Texture should often be nearly invisible when viewed directly but contribute to the overall material feeling.

## Typography

### Typography goals

Typography should feel editorial, intentional, and contemporary. It should support both artistic expression and clear long-form reading.

The current repository defines the actual font families. Inspect existing font loading, weights, subsets, fallbacks, and variable-font settings before making changes.

### Type roles

| Role | Character | Use |
| --- | --- | --- |
| Display | Distinctive, controlled, spacious | Hero title and rare major statements. |
| Section heading | Strong editorial hierarchy | Primary page sections. |
| Card heading | Compact and direct | Projects, disciplines, articles, and destinations. |
| Body | Highly readable | Descriptions, articles, About, and supporting narrative. |
| Label | Restrained, optionally uppercase | Category, metadata, status, and small navigation cues. |
| Caption | Quiet but legible | Artwork, media, date, and supporting context. |

### Type behavior

- Use display typography sparingly.
- Keep paragraph measure comfortable rather than spanning the entire viewport.
- Use responsive type sizing without allowing mobile headings to dominate the screen.
- Preserve hierarchy through scale, weight, spacing, and contrast rather than color alone.
- Avoid excessive uppercase for body-length content.
- Avoid very wide letter-spacing in small text.
- Do not use low-contrast ultra-light font weights for important copy.
- Prevent single-word orphan lines in important hero or card headings when practical.

### Line length

Long-form body text should use a readable measure. Wider page containers may be used for grids, imagery, and tables, but body copy should not automatically inherit the full width.

Do not force narrow text columns when the copy is already short. The goal is natural reading and deliberate composition.

## Layout system

### Container behavior

The site should use a consistent content frame with intentional exceptions for full-width atmosphere, hero imagery, or gallery presentation.

Before changing container width or gutters, inspect:

- Header alignment
- Hero alignment
- Section headings
- Grid edges
- Article measure
- Footer alignment
- Mobile safe space

Avoid unrelated container widths that cause page sections to feel slightly misaligned.

### Section rhythm

Sections should be separated through meaningful vertical rhythm, not a border or card around every block.

Use larger spacing when the subject changes and tighter spacing for content that belongs together.

If the repository has an established spacing scale, use it. If it does not, propose a small consistent scale rather than introducing arbitrary values component by component.

### Grid behavior

- Use grids to compare items with similar importance.
- Use asymmetric layouts when one item deserves emphasis.
- Avoid forcing a final single item into an awkward empty multi-column row.
- Allow cards to stack naturally on narrow screens.
- Use minimum card widths that preserve readable content.
- Do not shrink complex desktop grids until text and controls become cramped.

### Alignment

Left alignment is generally preferred for reading, page introductions, and editorial hierarchy.

Centered alignment may be used for concise ceremonial statements, isolated CTAs, or intentionally symmetrical compositions, but should not become the default for every section.

## Navigation

The navigation should feel like a subtle, dark smoked-glass layer integrated with the page.

Desired qualities:

- Obsidian or smoked graphite surface
- Controlled transparency
- Restrained backdrop blur
- Low-contrast border or edge separation
- Clear active state
- Calm hover behavior
- Strong mobile usability

Avoid:

- Bright blue or white glass
- Heavy blur that obscures content or harms performance
- Thick glowing outlines
- Large pill containers around every link
- Navigation that visually dominates the hero
- Hiding essential navigation behind unclear icons on desktop

Projects must remain hidden from public navigation until approved, even if its route and styles exist.

## Surfaces and glass

Glass is a selective material, not the identity itself.

Appropriate uses:

- Main navigation
- A small number of elevated feature cards
- Modal or drawer surfaces
- Compact overlays where background context is useful

Less appropriate uses:

- Every text block
- Every gallery item
- Full-page stacked translucent panels
- Long-form article bodies
- Components where blur adds no hierarchy

### Glass composition

A successful glass surface may combine:

- A dark translucent fill
- Moderate backdrop blur
- A fine, low-contrast edge
- Soft internal highlight
- Subtle depth shadow

Do not compensate for poor contrast by increasing blur and glow indefinitely.

## Cards

Cards should have a clear job.

Valid card purposes include:

- Route to a major discipline
- Present a project
- Present an article
- Show selected work
- Summarize current focus
- Provide proof or a useful external destination

### Card anatomy

Use only fields relevant to the card type:

- Image, logo, or visual marker
- Category or status
- Title
- Short description
- Patrik's role when useful
- Proof, result, or current state
- Destination or clear action

### Card hierarchy

- The title should be obvious.
- Metadata should support rather than compete.
- Descriptions should remain concise.
- The clickable area and action should be understandable.
- Hover effects should communicate interactivity without making the card jump.
- Image cropping should remain intentional across breakpoints.

Avoid identical cards for content that has different importance or purpose.

## Buttons, links, and actions

### Primary actions

Use for the main next step on a page or section. Primary actions may use purple emphasis, but should remain visually consistent with the dark editorial system.

### Secondary actions

Use lower emphasis through outline, surface, or text treatment. They should not compete equally with the primary action.

### Text links

Use for contextual navigation and low-friction exploration. They require clear hover and focus states.

### Action rules

- Use specific labels such as “Explore music,” “View project,” or “Read article.”
- Avoid repeated generic “Learn more” labels when context is not obvious.
- Do not place several primary buttons beside each other.
- Maintain usable touch targets.
- Do not use color alone to indicate destructive action or active state.
- External destinations should be understandable before activation.

## Hero sections

The hero should create a strong first impression without trying to carry the entire site.

It may include:

- Patrik's name
- Canonical positioning
- One short supporting statement
- One primary action and, when useful, one secondary action
- A portrait, artwork, atmospheric visual, or controlled background treatment

### Hero principles

- Prefer a clear focal point.
- Protect text readability.
- Keep the primary action visible without scrolling on common screens when practical.
- Allow asymmetry and left alignment when they strengthen identity.
- Crop imagery deliberately for mobile.
- Avoid loading an unnecessarily large desktop asset on small screens.
- Avoid turning the hero into a rotating carousel.

### Personal signature

A signature or personal mark may be used selectively when it adds authorship. It is not a required element and should not compete with the name, positioning, navigation, or primary action.

Do not preserve or reintroduce a signature merely because an older design used one.

## Imagery

Imagery should feel specific to Patrik's work and world.

Preferred sources:

- Original photography
- Graphite work
- Tattoo practice
- Project artwork
- Studio or instrument imagery
- Miniatures and physical objects
- Carefully selected generative visuals
- Website or project screenshots when proof is the purpose

Avoid:

- Generic stock imagery
- Unrelated dark-fantasy decoration
- AI imagery used only to fill empty space
- Several competing hero-level images in one viewport
- Repetitive mockups that obscure the actual work
- Images without a clear content or atmosphere role

### Image treatment

- Preserve important subject matter when cropping.
- Use consistent but not identical treatments across a collection.
- Control contrast so images sit within the obsidian environment.
- Avoid applying a heavy uniform filter that destroys the character of the original work.
- Use captions when they add medium, year, status, process, or project context.
- Provide useful alt text for content images.
- Treat decorative images as decorative in accessibility markup.

## Iconography

Icons should be visually consistent, simple, and secondary to labels.

- Prefer one icon family where practical.
- Use consistent stroke weight and optical size.
- Do not mix filled, outlined, illustrative, and platform-icon styles without purpose.
- Retain official platform marks when platform recognition is the point.
- Provide labels or accessible names for icon-only actions.
- Do not use icons as decoration in every heading.

## Motion and interaction

Motion should reinforce orientation, hierarchy, and feedback.

Suitable motion:

- Short opacity or position transitions
- Controlled hover feedback
- Gentle reveal of important content
- Smooth drawer or modal transitions
- Subtle active-state movement

Avoid:

- Continuous decorative loops
- Constant floating or pulsing cards
- Strong parallax on mobile
- Large-scale blur animation
- Scroll-jacking
- Long entrance sequences that delay access to content
- Applying animation to every item in a grid

### Motion behavior

- Respect `prefers-reduced-motion`.
- Keep interaction feedback immediate.
- Avoid layout-changing hover effects.
- Test animation on mid-range mobile hardware, not only desktop.
- Remove motion when it adds cost but no understanding.

## Responsive behavior

Mobile is not a compressed desktop layout. Each section should preserve its purpose at smaller widths.

### Mobile priorities

- Clear identity and first action
- Readable text without zooming
- Stable navigation
- Comfortable gutters
- Intentional image crops
- Large enough touch targets
- Logical content order
- Minimal initial media cost
- No horizontal overflow
- No critical information hidden behind hover

### Responsive decisions

- Stack layouts before they become cramped.
- Reorder decorative and content elements only when reading order remains correct.
- Reduce visual effects before reducing readability.
- Avoid fixed heights for text-heavy cards and sections.
- Do not truncate meaningful content to force identical card heights unless a clear continuation exists.
- Verify very narrow and common mobile widths as well as wide desktop layouts.

## Long-form content

Blog posts and longer About content should prioritize reading comfort over surface effects.

- Use a controlled reading measure.
- Provide clear heading hierarchy.
- Create generous separation around media and major sections.
- Style links, quotes, lists, captions, and code consistently.
- Avoid placing every paragraph inside a glass panel.
- Ensure rich-text content from Payload inherits intentional typography rather than browser defaults.
- Prevent embedded media from overflowing.

## Page-specific visual emphasis

### Home

Strongest overall brand impression, broadest range of disciplines, and clearest hierarchy. Avoid making every section equally dramatic.

### Music

Allow project-specific imagery and logos while retaining the personal site's container, typography, and navigation system.

### Art

Let the work dominate. Reduce decorative framing when it competes with graphite, tattoo, or generated imagery.

### Projects

Emphasize proof, role, process, and current state. Screenshots and artifacts should remain legible enough to support the claim.

### Blog

Prioritize scanning on the listing and reading on article pages. Featured imagery should support rather than overpower titles.

### About

Use editorial pacing, section variation, selected imagery, and proof. Avoid a long centered text wall.

### Contact

Keep the composition calm and minimal. One focal invitation is stronger than a dense grid of destinations.

## Accessibility

Accessibility is part of the visual system.

- Maintain sufficient text and control contrast.
- Provide visible keyboard focus.
- Preserve logical heading order.
- Do not communicate meaning through color alone.
- Make icon-only actions understandable.
- Use comfortable touch targets.
- Keep text readable at browser zoom.
- Ensure overlays and modals trap and restore focus correctly.
- Respect reduced motion.
- Use alt text appropriate to the purpose of the image.

Do not lower contrast or remove focus styles for aesthetic reasons.

## Performance-aware design

Visual review must consider implementation cost.

Potentially expensive treatments include:

- Large full-resolution hero media
- Multiple simultaneous backdrop blurs
- Large blurred shadows
- Continuous filters and transforms
- Full-page fixed backgrounds
- Several eager-loaded gallery images
- High-resolution transparent PNG assets

Prefer:

- Responsive media sources
- WebP or AVIF for suitable photographic content
- Purpose-sized thumbnails
- Static atmosphere where motion adds little
- A small number of intentional glass layers
- CSS effects with measured scope
- Progressive loading that does not cause layout shift

## Visual anti-patterns

Reject or revise designs that drift toward:

- Generic portfolio template
- Corporate consultant website
- SaaS landing page
- Bright iOS-style glassmorphism
- Cyberpunk neon dashboard
- Flat Linktree replacement
- Uniform card wall
- Excessively centered composition
- Placeholder-heavy content
- Decorative AI imagery without meaning
- Tool-logo showcase without proof
- Unreadable low-contrast minimalism
- Motion-heavy showcase that feels slow
- Dark design achieved only by making everything black

## Component decision test

Before adding a visual component, ask:

1. What information or action does it clarify?
2. Does an existing component already solve the need?
3. Does it strengthen the personal editorial identity?
4. Does it create unnecessary card, glass, glow, or animation repetition?
5. Does it work without hover?
6. Is it readable and usable on mobile?
7. What is its performance cost?
8. Can it use existing tokens and patterns?

If the component has no clear informational or interaction purpose, it probably does not belong.

## Design verification checklist

Before considering a visual change complete:

- [ ] Compare it with the existing page and neighboring sections.
- [ ] Verify the current semantic color and typography tokens.
- [ ] Check hierarchy at desktop and mobile widths.
- [ ] Check hover, focus, active, disabled, and error states as relevant.
- [ ] Confirm that text remains readable over surfaces and imagery.
- [ ] Verify images at their real loaded dimensions and crops.
- [ ] Check keyboard operation and visible focus.
- [ ] Check `prefers-reduced-motion` behavior when motion is involved.
- [ ] Check for overflow, layout shift, and cramped controls.
- [ ] Review blur, shadow, image, and animation cost.
- [ ] Confirm that the result still feels personal, editorial, and Obsidian Noir.
- [ ] Confirm that unrelated components were not restyled accidentally.

## Repository inspection checklist

Before a system-wide design change, locate and inspect:

- [ ] Global CSS and theme tokens
- [ ] Font loading and typography definitions
- [ ] Tailwind or other design configuration, if present
- [ ] Shared container and section primitives
- [ ] Header and mobile navigation
- [ ] Button and link variants
- [ ] Card variants
- [ ] Rich-text styles
- [ ] Image wrappers and aspect-ratio rules
- [ ] Animation utilities and reduced-motion handling
- [ ] Responsive breakpoints
- [ ] Existing accessibility patterns
- [ ] Page-specific overrides

## Design-system maintenance

Update this file when one of these changes materially:

- The approved visual direction changes.
- Primary or secondary accent roles change.
- Typography roles or font families change.
- Layout, spacing, container, or breakpoint strategy changes.
- Shared navigation, card, button, surface, or motion behavior changes.
- A recurring visual correction becomes a durable rule.
- Accessibility or performance requirements alter component design.

Do not update this file for one-off campaign artwork, an individual blog image, temporary experimentation, or minor component polish that does not change the system.
