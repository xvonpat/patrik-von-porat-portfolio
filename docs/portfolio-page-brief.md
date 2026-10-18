# Brief for Antigravity: update the "DMAIC Companion" page on vonporat.com

**Task:** Update the existing page `/projects/dmaic-companion` with the latest state of the app
(as of 2026-10-18). Keep the page's current layout, components, styling and section order. Replace
the text with the content below, add one new section (**Labs**, section 6) and add the images listed
in "Images". Do **not** change any other page.

## Rules
- Reuse the page's existing components and CSS. No new design, no new libraries.
- Never write the name of my employer anywhere. Say "a company Lean Six Sigma course" if needed.
- No links to the GitHub repository (it is private). No journal/article link (none exists yet).
- Keep "Back to Selected Work", "Back to All Projects" and "How I Work →" as they are.
- Use the tool names **exactly** as listed in section 8 – the current page lists tools the app
  does not have (e.g. "SOP", "Training Matrix", "Multi-Vari Analysis"). Replace that list completely.
- The current "Zero Cloud" card is no longer true (the app now has an online sign-in). Replace it
  with the card in section 3.
- English, same tone as now: short, factual, first person sparingly.
- Every image needs its alt text (given below). Images must scale down and work at phone width.
- Show me the result in the local preview before publishing anything.

---

## Images
All images are **1600 × 1000 px PNG (sRGB)**, in my app repo under `docs/images/site/`. I will
provide the files. Suggested placement in brackets.

| File | Placement | Alt text |
|---|---|---|
| `01-hero-promo.png` | Hero showcase image (replaces the current one) and the card in the Projects list | DMAIC Companion – "Every Lean Six Sigma tool. One guided flow." with a wall of real tool screens: Cause & Effect Tree, Pareto, control chart, capability, Fishbone, boxplot and more |
| `02-home.png` | Section 5 (Three ways in) | The Home page: the D-M-A-I-C phase band and "continue where you left off" |
| `03-cause-effect-tree.png` | Section 5 (Method built in) | A Cause & Effect Tree with actions, conditions, evidence codes, root causes and stop signs |
| `04-tool-library.png` | Section 8 (37 tools) | The Tool library, every tool grouped by DMAIC phase |
| `05-learn-library.png` | Section 7 (Learn) | The Learn page with guides, learning paths, "Which tool when?" and a glossary |
| `06-labs.png` | Section 6 (Labs), first image | The Labs page: seven interactive labs, each with a small picture of its chart |
| `07-lab-capability.png` | Section 6 (Labs), gallery | The Process capability lab: a histogram against the customer's limits, with Cp and Cpk |
| `08-lab-process-flow.png` | Section 6 (Labs), gallery | The Process flow lab: orders moving through Picking, Packing and Shipping, with lead time and the bottleneck |
| `09-phone.png` | Section 4 (Architecture) or Status | DMAIC Companion on a phone: the Learn page, a control chart and a lab |

`02`–`09` are shown in the app's own **vonporat.com theme**, so they match the site. `01` uses the
app's Aurora theme on purpose (it stands out as the hero). If the page has room for only a few
images, use `01`, `03`, `06`, `07` and `09`.

---

## 1. Hero

- **Tags:** `WEB · IMPROVEMENT TOOLS` and `LIVE · INVITE ONLY`
- **H1:** DMAIC Companion
- **Summary:** A guided web app for Lean Six Sigma improvement work and Apollo root cause
  analysis. It teaches the method while you use it – with guides, interactive labs and gentle
  checks – and replaces PowerPoint and Excel/Minitab templates with guided workflows that end in a
  PowerPoint report.
- **Metadata fields:**
  - **Status:** Live at dmaic.vonporat.com (invite only) – all 37 tools built; self-testing and
    first colleague invites
  - **Category:** Web / Improvement Tools
  - **Role:** Product idea, method design, specification and testing – built through
    AI-assisted development (Claude Code)
  - **Architecture:** Local-first web app (client-side), installable, with an optional online
    sign-in
  - **Persistence:** Projects stay on the user's computer: browser autosave + `.dmaic.json`
    project files. Online only: sign-in and user list
  - **Stack:** Vite, React, TypeScript, Tailwind CSS, React Flow, pptxgenjs, Supabase, Vercel, Vitest
- **Showcase image:** `01-hero-promo.png`.
- Optional (my choice, ask me): a small link "Open the app →" to `https://dmaic.vonporat.com`.
  It opens a sign-in page; only invited people can get in.

## 2. Context & Purpose

**Learning by Building.** As a Lean Six Sigma Green Belt learning the Apollo root cause analysis
method, my course material came as slide decks and Excel templates: good for reading, slow for
doing. I wanted a tool that walks through the method step by step and explains *why* each step
exists.

**From One Method to a Toolbox.** It started as the *Apollo RCA Guide* – 12 guided steps from
problem definition to lessons learned, structured by DMAIC. It grew into DMAIC Companion: full
DMAIC improvement projects, Apollo RCAs and single Lean Six Sigma tools in one format – and then
into a place to learn: a library of 50 guides and seven hands-on labs.

**Personal Project.** An ongoing personal project and learning vehicle – not a commercial product
or SaaS. Built without a formal coding background: I write the requirements, test every step, and
let an AI coding assistant write the code under a written method guide and strict working rules.
Since October 2026 it is online for invited colleagues.

## 3. Local-First Principles
(Same three-card layout as now.)

- **Projects Never Leave Your Machine:** Improvement work often holds confidential information,
  so project data is never sent to a server – not even when the app runs online. The server only
  knows who may sign in (names, e-mails, roles), feedback messages and which tools are released.
  On a laptop the app also runs fully offline, without sign-in.
- **Files Are the Real Save:** Every change is autosaved in the browser as a safety net. The real
  save is a versioned `.dmaic.json` project file that can be kept, backed up and shared. Older
  files – including the original RCA files – still open.
- **Guidance, Not Blockers:** Every tool checks the input against the method (for example, "this
  looks like a cause – describe only what happened") and explains why. The user can always continue.

## 4. Complete Technology Architecture
(Three columns, like now. Keep the item style: a bold title and one line.)

**Runtime & Interface**
- **React 19 & Vite 8** – declarative interface, fast local builds.
- **TypeScript 7 (strict)** – typed models for all 37 tools, statistics, file schema and migrations.
- **Tailwind CSS 4 & 12 themes** – from calm "Cream paper" to a vonporat.com theme with the site's
  own fonts; colour meanings (action, condition, root cause) are the same in every theme.
- **React Flow, installable app, phone layout** – interactive charts (Cause & Effect Tree,
  Fishbone, Value Stream Map…) with full-screen mode; installs as an app; usable on a phone.

**Data & Statistics**
- **One JSON object per project** – schema version and backward-compatible migrations on open.
- **Modular tool registry** – every project is a list of tools, so any project can grow.
- **Statistics in plain TypeScript** – mean, standard deviation, histograms, normal/t/F
  distributions, normality test – no maths library.
- **Quality & process control** – capability (Cp/Cpk), control charts, hypothesis tests and ANOVA,
  regression and Gage R&R – no Minitab needed. Data is pasted straight from Excel.

**Online, Testing & Quality**
- **Vercel + Supabase** – hosted at dmaic.vonporat.com; invite-only sign-in with e-mail invites,
  user/admin roles, and an Admin panel for people, tool release and feedback. Tight database rules:
  each user can only read their own profile.
- **Vitest (678 tests in 79 files)** – including checks that every worked example passes every
  tool's checklist, and that every guide and glossary term is consistent.
- **Oxlint & PowerPoint export** – fast code checks; client-side PowerPoint report (pptxgenjs) for
  every project type.

## 5. Data Model & Mechanics
(Same two-card layout as now: "Three Ways In" and "Method Built In".)

**Three Ways In** – image `02-home.png`
1. **DMAIC improvement** – the full Lean Six Sigma flow, from Improvement Charter to Final report.
2. **Apollo RCA** – 12 guided steps: problem definition, evidence and timeline, Cause & Effect
   Tree, root causes, solutions, action plan and lessons learned.
3. **Single tool** – just one tool, e.g. a Fishbone, an FMEA or a capability study.

Any tool can be added to a project later without starting over.

**Method Built In** – image `03-cause-effect-tree.png`
- **Action & condition:** every effect needs at least one action and one condition; root causes
  are conditions.
- **Evidence driven:** every cause needs evidence – a cause without it is marked with a "?".
- **Blame free:** "Don't blame people – blame the process."
- **Worked examples:** 11 complete examples, small to large – from the Titanic and a hot-coffee
  burn to a full manufacturing DMAIC project with Gage R&R, ANOVA, regression, control charts and
  capability – including a practice case to solve yourself first.

## 6. NEW SECTION – Labs: Change Something, See What Happens
(Place it after "Data Model & Mechanics". Reuse an existing card/grid style. Images `06-labs.png`
first, then `07` and `08` as a small gallery.)

**Intro:** Learn is for reading; Labs is for trying. Seven interactive experiments with the charts
and numbers of improvement work. Drag a data point, change the process, draw a new sample – and
watch the chart and the numbers respond. Each lab has five challenges: guess what will happen, try
it, then see why it happened and what it means in a project. The data is made up – nothing touches
your projects.

**The seven labs** (a short line each):
1. **Center, spread and histograms** – drag the dots and watch the mean, median and histogram move.
2. **Sampling** – draw samples and see why bigger samples give more precise answers.
3. **Process capability** – slide the centre, the spread and the limits; watch Cp and Cpk respond.
4. **Control charts** – shift or drift the process and see when the chart notices, and by which rule.
5. **Boxplots** – three shifts as boxes, with the data points that make them.
6. **Correlation** – order size against packing time, and why correlation is not causation.
7. **Process flow** – orders flowing through a warehouse: throughput, lead time, work in progress,
   Little's law and the bottleneck.

## 7. Learn Library
(A short block – reuse a card style. Image `05-learn-library.png`.)

- **50 guides:** one per tool, plus *The method* (DMAIC, Apollo principles, actions and conditions,
  roles, which project to choose) and *Statistics basics*. Each guide: what it is, when to use it,
  how to do it, common mistakes and a short quiz.
- **Four learning paths**, **"Which tool when?"** and a **glossary of about 300 terms**.
- **Linked both ways:** every step's help panel links to its guide; guides link to the matching labs.
- **All guides as one PDF** – a printable book with cover and contents.

## 8. 37 Tools Across the DMAIC Framework
(Replace the current list completely. Image `04-tool-library.png`.)

- **Define – 7 tools:** Problem definition, Team & scope, Improvement Charter, Stakeholder
  analysis, Communication plan, Voice of the Customer, Define tollgate
- **Measure – 7 tools:** Evidence & timeline, SIPOC, Process map, Value Stream Map, CTQ tree,
  Data collection plan, MSA / Gage R&R
- **Analyze – 10 tools:** Analysis tools (5 Whys, Fishbone, Pareto), Cause & Effect Tree, Root
  causes, Basic statistics & histogram, Boxplot & stratification, Scatter plot & correlation,
  Hypothesis tests, Regression, FMEA, Affinity diagram
- **Improve – 7 tools:** Solutions, Action plan, Solution selection matrix, Poka-yoke, Minimal
  Viable Product (pilot), Six Thinking Hats, House of Change
- **Control – 6 tools:** Validate & sustain, Lessons learned, Control plan, Control charts (SPC),
  Capability before/after, Final report

## 9. Status & Future Development

**Completed (current state):**
- Apollo RCA Guide v1 – 12 guided steps, worked examples and PowerPoint export
- DMAIC Companion – all 37 tools built, no placeholders left; report and PowerPoint export for
  every project type
- Learn library – 50 guides, learning paths, glossary and a printable PDF book
- Labs – seven interactive labs with five challenges each
- Online – live at dmaic.vonporat.com with invite-only sign-in, roles, an Admin panel, tool
  release and in-app feedback
- 11 worked examples, 12 colour themes, installable, usable on a phone

**Roadmap (next):**
- Full self-test of the app with the written test guide
- Inviting the first colleagues and collecting their feedback
- PowerPoint export for colleagues (admin-only online until it has been checked)
- Phone layout, the next steps
- Swedish translation (all interface text is already kept in one place)

## 10. Footer
- Unchanged: "Back to All Projects" and "How I Work →". No journal link.

---

## Done when
- `/projects/dmaic-companion` shows the new text, the new Labs and Learn sections and the images.
- The tool list matches section 8 exactly (37 tools).
- The Projects list card uses `01-hero-promo.png`.
- No broken links, no employer name, no GitHub link; works at phone width.
- No other page is changed.
