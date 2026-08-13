# vonporat.com — Execution Plans

Last reviewed: 2026-08-14

## Purpose

This document defines when and how to create an execution plan for significant work on vonporat.com.

Most focused tasks do not need a formal plan. Use a plan when work spans several systems, contains meaningful risk, needs staged verification, or could create costly rework if assumptions remain unresolved.

A plan is a working control document, not a long essay or substitute for implementation.

## When a plan is required

Create a plan before implementation for work such as:

- Broad homepage or multi-page redesign
- Navigation or route restructuring
- New public section with shared components
- Moving static content into Payload CMS
- Adding a new Payload collection or global
- Database schema change or migration
- Authentication, authorization, or access-rule change
- Storage-adapter or media-URL redesign
- Major mobile-performance program
- Framework or CMS upgrade
- Significant dependency or architecture change
- Search, sitemap, canonical, or redirect restructuring
- Production data transformation
- Work with multiple deployment stages or a meaningful rollback need

## When a formal plan is usually unnecessary

A short direct workflow is normally enough for:

- Small copy edit
- One image replacement
- Focused styling correction
- Broken link fix
- Isolated accessibility fix
- Small component bug with a clear cause
- Adding one verified blog post
- Updating documentation to match an already-completed decision

If a seemingly small task reveals broader risk during inspection, pause and create a plan before expanding scope.

## Planning principles

### Inspect before planning

A plan based only on assumptions is not useful.

Before drafting:

1. Read `AGENTS.md` and relevant `docs/ai/` files.
2. Inspect the relevant routes, components, styles, content, schemas, and tests.
3. Read repository scripts and configuration.
4. Check Git status and preserve unrelated work.
5. Identify established decisions and current constraints.
6. Separate verified facts from unknowns.

### Plan toward an outcome

Define what becomes true for the visitor, editor, or system. Do not define success only as “files changed” or “component created.”

### Keep scope explicit

State what the plan includes and what it deliberately excludes.

### Reduce risk early

Resolve high-impact uncertainty before cosmetic implementation. Examples include data ownership, migration safety, route visibility, access control, and media URL behavior.

### Make verification executable

Every significant step should have a concrete validation method.

### Keep the plan alive

Update the plan when inspection invalidates an assumption, scope changes, a risk materializes, or a decision is made.

## Plan status model

Use these statuses:

- `pending`
- `in_progress`
- `completed`
- `blocked`
- `cancelled`

Only one major implementation step should normally be `in_progress` at a time.

## Standard plan template

Copy this template into a task-specific plan file or working document.

```md
# Plan — <Short task name>

Status: Draft | Approved | In progress | Blocked | Completed
Owner: <Person or agent>
Created: YYYY-MM-DD
Updated: YYYY-MM-DD

## Goal

Describe the user-visible or system outcome.

## Why now

Explain the observed problem, need, or decision behind the work.

## Success criteria

- Observable result
- Relevant quality requirement
- Required verification

## Current state

Summarize verified implementation and behavior.

## Sources inspected

- Relevant routes and components
- Configuration and schemas
- Content and design references
- Existing tests and scripts

## Constraints and decisions

- Applicable decision from `DECISIONS.md`
- Security, CMS, performance, content, or visual constraint

## Scope

### Included

- Included work

### Excluded

- Explicitly out-of-scope work

## Assumptions and unknowns

| Item | State | Resolution |
| --- | --- | --- |
| Assumption or unknown | Verified / Unverified / Blocked | How it will be confirmed |

## Proposed approach

Describe the chosen approach and why it fits the current system.

## Alternatives considered

| Option | Benefit | Cost or risk | Decision |
| --- | --- | --- | --- |
| Option A | Benefit | Tradeoff | Chosen / Rejected |

## Affected areas

- Routes
- Components
- CMS collections or globals
- Database or migrations
- Media
- Metadata and SEO
- Accessibility
- Performance
- Deployment

## Implementation steps

1. [pending] Focused step
   - Expected result
   - Verification
2. [pending] Focused step
   - Expected result
   - Verification

## Test and verification plan

### Automated

- Repository command or suite after verification from project scripts

### Manual

- Route, viewport, state, and interaction

### Data and CMS

- Draft/published, media, schema, migration, or admin checks

### Deployment

- Local, preview, and production checks required by scope

## Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Concrete risk | Low / Medium / High | Low / Medium / High | Preventive or recovery action |

## Rollback or recovery

Describe how code, deployment, content, schema, and media changes can be restored.

## Approval gates

- Decision or authority required before a risky step

## Progress log

- YYYY-MM-DD — Verified fact, completed step, scope change, or decision

## Final verification

- [ ] Goal achieved
- [ ] Relevant checks passed
- [ ] Desktop/mobile checked when applicable
- [ ] Accessibility checked when applicable
- [ ] CMS/data behavior checked when applicable
- [ ] SEO and metadata checked when applicable
- [ ] Performance checked when applicable
- [ ] Security boundaries preserved
- [ ] Deployment verified when applicable
- [ ] Documentation updated

## Handoff

Summarize outcome, main files, verification, deployment state, and concrete remaining risk.
```

## Plan size

Match the plan to the risk.

### Small significant plan

Use for a contained change with two to four dependent steps. Keep it to the essential sections:

- Goal
- Current state
- Scope
- Steps
- Verification
- Risks

### Full execution plan

Use for migrations, broad redesigns, architecture changes, auth, storage, or multi-environment delivery.

Include alternatives, approval gates, recovery, and a progress log.

Do not create a long plan merely to make a task appear rigorous.

## Planning by change type

### Redesign or multi-page work

The plan must address:

- Information hierarchy
- Existing design-system tokens and shared components
- Content ownership
- Responsive behavior
- Accessibility
- Media and performance
- Page-by-page rollout
- Regression scope
- Visual approval points

Preserve Obsidian Noir unless a design-direction change is itself approved.

### Navigation or route change

The plan must address:

- Approved information architecture
- Desktop and mobile navigation
- Active states
- Direct routes and redirects
- Footer and internal links
- Sitemap, robots, canonicals, and not-found behavior
- Projects visibility decision

### CMS collection or static-to-CMS migration

The plan must address:

- Observed maintenance problem
- Content owner and source of truth
- Actual Payload version and schema conventions
- Existing content inventory
- Collection or global design
- Access control
- Draft/published behavior
- Migration and generated types
- Frontend query and fallback
- Admin workflow
- Rollback and recovery

Do not treat planned Bands, Artwork, Projects, Site Settings, or Contact Links collections as pre-approved.

### Database migration

The plan must address:

- Verified target environment
- Current migration history
- Data-loss risk
- Backup availability
- Migration review
- Test environment
- Application compatibility
- Deployment order
- Rollback or forward-fix strategy

No destructive production migration proceeds on an unresolved target.

### Media or storage change

The plan must address:

- Current Media schema and storage adapter
- Existing record URL shape
- Public/private policy
- Next.js remote-host configuration
- First-load and refresh behavior
- Image variants and fallbacks
- Migration of existing media
- Cache and performance
- Recovery path

### Performance program

The plan must address:

- Baseline measurement
- Affected routes and devices
- Network, rendering, JavaScript, and layout stability
- Ranked opportunities by impact and effort
- Visual-quality constraints
- Before/after evidence
- Regression review

Do not optimize by broadly removing the established identity without approval.

### Authentication or access-control change

The plan must address:

- Threat and user model
- Current auth flow
- Payload access rules
- Server/client boundaries
- Cookies, sessions, and origins
- Admin and public routes
- Error behavior
- Test states
- Rollback

Never weaken security to satisfy a functional demo.

### Framework or dependency upgrade

The plan must address:

- Reason for upgrade
- Current and target versions
- Official migration guidance
- Breaking changes
- Payload/Next.js compatibility
- Generated artifacts
- Build, tests, CMS, and public-route verification
- Deployment and rollback

Do not hide a major upgrade inside unrelated feature work.

## Approval gates

Pause and obtain direction before:

- Replacing the visual identity
- Reordering public navigation
- Revealing Projects
- Moving static sections into CMS
- Adding production dependencies with architectural impact
- Running destructive migrations
- Changing authentication or access policy
- Making storage private/public in a new way
- Publishing or deploying when not authorized
- Deleting content or user data
- Rewriting Git history

Plans may describe these steps, but a plan does not grant authority to execute them.

## Risk assessment

Evaluate risk concretely.

### Likelihood

- **Low** — unlikely with established safeguards
- **Medium** — plausible and requires active mitigation
- **High** — likely without a design change or prior resolution

### Impact

- **Low** — local and quickly reversible
- **Medium** — user-visible or involves meaningful rework
- **High** — production outage, data loss, secret exposure, access failure, or major identity regression

Prioritize high-impact risks even when likelihood is low.

## Rollback thinking

Rollback is not always “revert the commit.” Consider separately:

- Source code
- Vercel deployment
- Database schema
- CMS content
- Media objects
- Environment variables
- DNS
- External integrations

Verify that a recovery method exists before describing it as available.

## Progress updates

Update the plan when:

- A step completes
- An assumption is verified or disproved
- Scope changes
- A blocker appears
- A decision is approved
- A risk materializes
- Verification changes the approach

Keep progress entries factual and concise. Do not turn the plan into a transcript of every command.

## Plan completion

A plan can be marked **Completed** only when:

- Its goal and success criteria are met
- Relevant implementation steps are complete
- Verification evidence is recorded
- Data and deployment state are clear
- Durable documentation is updated
- Concrete remaining risk is handed off

If implementation stops because the goal changed, mark the plan **Cancelled** or update it. Do not mark abandoned work complete.

## Where task-specific plans belong

Store long-lived task plans in a clearly named project planning location established by the repository. If no location exists, prefer:

```text
docs/plans/YYYY-MM-DD-short-task-name.md
```

Do not place every small task in `docs/plans/`. Create a durable plan file only when future contributors will benefit from the reasoning, sequence, risks, or recovery details.

## Maintenance of this document

Update this planning standard when:

- A recurring class of significant work needs a new planning section
- Approval boundaries change
- Deployment, migration, or recovery practices change materially
- Plans repeatedly fail to capture a consequential risk

Do not expand the template for rare edge cases unless they recur or carry severe impact.
