# Riyadvi Software Technologies — AI Development Context & Project History

> **Purpose:** This document is the persistent context file for Claude, Cursor, and other AI coding agents working on the Riyadvi Software Technologies full-stack interview assignment.
>
> **Rule:** Read this file before modifying the project. Inspect the actual source code before trusting any status written here. This document describes project intent, architecture, completed stages, decisions, constraints, and the planned development sequence.

---

# 1. PROJECT IDENTITY

**Project:** Riyadvi Software Technologies — Premium Full-Stack Corporate Website

**Assignment type:**
- Dynamic multi-page corporate website
- Premium UI/UX
- 3D interactive experience
- Animation and scroll storytelling
- Full-stack frontend + backend
- Database-backed lead management
- Dynamic services, portfolio, blog and careers
- AI-assisted development
- Responsive and performance-conscious implementation
- Live deployment

**Business goal:**

The website should present Riyadvi Software Technologies as a technology and digital solutions partner rather than as a simple static company landing page.

The final website should communicate:
- Technology expertise
- Digital transformation
- Business understanding
- Design quality
- Innovation
- Professionalism
- Partnership
- Growth

The final result should feel like a real premium corporate website that could be presented to a client.

---

# 2. ORIGINAL ASSIGNMENT REQUIREMENTS

The assignment requires a complete dynamic corporate website, not a single landing page.

Required major routes:

```text
/
 /services
   /services/web-development
   /services/app-development
   /services/digital-marketing
   /services/ar-vr
   /services/3d-modeling
   /services/ui-ux-design

 /portfolio
   /portfolio/[slug]

 /about

 /blog
   /blog/[slug]

 /careers
   /careers/[job-slug]

 /contact

 /business-health-checkup

 /software-project-planning-guide
```

Required service architecture:

```text
Service Data
     ↓
Reusable Service Template
     ↓
/services/[slug]
```

Required portfolio architecture:

```text
Portfolio Data
     ↓
Reusable Case Study Template
     ↓
/portfolio/[slug]
```

Required careers architecture:

```text
Job Data
     ↓
Reusable Job Template
     ↓
/careers/[job-slug]
```

Required blog architecture:

```text
Blog Data
     ↓
Reusable Blog Template
     ↓
/blog/[slug]
```

The assignment also requires functional backend APIs and database support for:
- Contact enquiries
- Consultation requests
- Business health checkup leads
- Lead-magnet leads
- Career applications

The preferred backend architecture is Node.js + Express with PostgreSQL/MongoDB/MySQL as acceptable databases.

---

# 3. BRAND / DESIGN SYSTEM

Primary brand direction:

```text
Gold:        #D4AF37
Black:       #000000
Dark:        #050505
Dark surface #0D0D0D
Typography:  Inter
```

Design personality:

- Premium
- Futuristic
- Professional
- Corporate
- Technology-focused
- Innovative
- Trustworthy

Avoid:
- childish UI
- game-like 3D
- excessive neon
- generic template appearance
- excessive rounded-card repetition
- random animations
- visual clutter

The design should use:
- strong typography
- premium spacing
- dark surfaces
- gold accents
- subtle gradients
- depth
- glass/metallic visual language where appropriate
- restrained micro-interactions

---

# 4. TECHNOLOGY DIRECTION

The current active implementation uses a modern React/Next.js architecture for the website.

Expected frontend direction:

- Next.js
- React
- TypeScript
- CSS/Tailwind-style design system as already established
- Three.js
- React Three Fiber
- @react-three/drei

Planned animation technologies:

- GSAP
- GSAP ScrollTrigger
- Lenis
- CSS transitions/micro-interactions

These animation technologies should be added deliberately in later stages, not repeatedly rewritten.

Backend direction:

- Node.js
- Express
- TypeScript where appropriate
- PostgreSQL preferred for the final database
- Zod or equivalent validation where useful

Deployment direction:

- Frontend: Vercel
- Backend: Render or Railway
- PostgreSQL: suitable managed PostgreSQL provider

---

# 5. IMPORTANT AI DEVELOPMENT RULES

AI agents must behave as coding partners, not as blind code generators.

Before every major task:

1. Inspect the existing project.
2. Understand the current architecture.
3. Identify what is already implemented.
4. Identify what is missing.
5. Modify only what is necessary.
6. Preserve working code.
7. Run lint.
8. Run build.
9. Test the affected routes/features.
10. Report exactly what changed.

Never:
- rebuild the whole project unnecessarily
- delete working features
- replace working architecture just because another approach looks easier
- create duplicate components
- create duplicate data models
- invent fake functionality
- claim a feature is complete without testing it

When uncertain, inspect the source code first.

---

# 6. DEVELOPMENT HISTORY

## Stage 1 — Project Foundation

Status: **COMPLETE**

Initial project structure was established for the Riyadvi website.

Objectives:
- establish frontend/backend structure
- prepare reusable component architecture
- establish development conventions
- prepare project for iterative AI-assisted development

---

# 7. STAGE 2A — PREMIUM DESIGN SYSTEM

Status: **COMPLETE**

The premium visual foundation was created.

Major work included:

- global dark/gold visual language
- Inter typography
- premium navbar
- responsive navigation
- footer
- reusable Button
- reusable Container
- reusable SectionHeading
- global styling foundation
- responsive design foundation

Important correction made during this stage:

The homepage originally contained nested `<main>` elements because the layout already owned the main element.

The inner homepage `<main>` was changed to a `<div>`.

This was a real HTML architecture correction.

`Button.tsx` also received a small lint cleanup.

---

# 8. HYDRATION WARNING INVESTIGATION

Status: **RESOLVED / EXTERNAL WARNING IDENTIFIED**

A hydration warning appeared involving:

```text
crxlauncher=""
crxlauncher-bridged=""
```

Investigation found:

- the application source did not contain these attributes
- server HTML did not contain these attributes
- the attributes came from a Chrome extension content script
- the stack referenced a `chrome-extension://...` script

Conclusion:

The reported `<html>` attribute mismatch was caused by an external browser extension, not by application code.

Important decision:

Do NOT add:

```text
suppressHydrationWarning
```

just to hide the warning.

A clean browser/incognito environment should be used when verifying true application hydration behavior.

---

# 9. STAGE 3 — PREMIUM HOMEPAGE FOUNDATION

Status: **COMPLETE**

The homepage was upgraded from the basic scaffold into the premium Riyadvi homepage foundation.

Expected major sections:

- Hero
- Digital Transformation
- Services Preview
- Technology Ecosystem
- Why Riyadvi
- Portfolio Preview
- Business Health Checkup CTA
- Final CTA

Reusable UI components were used instead of hardcoded repeated structures.

Initial 3D placeholder architecture was introduced before the real 3D implementation.

---

# 10. STAGE 4 — REAL 3D + ROUTING

Status: **COMPLETE AND VERIFIED**

Stage 4 was the major interactive experience stage.

Required technologies:

- Three.js
- React Three Fiber
- @react-three/drei

## Hero 3D Experience

Concept:

**Riyadvi Digital Technology Ecosystem**

The hero contains:

- central technology core
- connected technology nodes
- Web
- Apps
- AI
- Cloud
- Data
- Design
- 3D
- Digital Growth
- connecting lines
- particles
- depth
- subtle motion
- mouse interaction
- hover interaction
- premium gold/black visual language

The hero uses client-side 3D isolation and lazy/dynamic loading where appropriate.

## Technology Ecosystem 3D Experience

A second distinct 3D experience was created.

It is intentionally different from the hero.

It communicates the technology ecosystem with:

- Technology core
- orbital visual structure
- React
- Next.js
- Node.js
- MongoDB
- MySQL
- JavaScript
- Three.js
- React Three Fiber
- WordPress

The second experience is lazy-loaded as the user approaches the section.

---

# 11. IMPORTANT STAGE 4 BUG AND FIX

A serious React/R3F runtime error occurred.

Original error:

```text
Failed to execute 'removeChild' on 'Node':
The node to be removed is not a child of this node.
```

Also:

```text
Attempted to synchronously unmount a root while React was already rendering.
```

The error occurred in the 3D node label implementation.

## Root cause

The node labels used Drei `Html`.

Drei `Html` creates DOM/React roots associated with the 3D scene.

Under the current React lifecycle/Strict Mode behavior, combined with conditional hover/unmount behavior, these DOM portals could be mounted/unmounted at unsafe times.

This caused:
- `removeChild`
- synchronous unmount
- runtime crashes

## Final solution

The label implementation was changed from DOM-based Drei `Html` to:

```text
Billboard + Text
```

This keeps labels inside the WebGL/R3F scene.

Labels are hidden through visibility rather than repeatedly unmounting the DOM tree.

A Suspense boundary was also used where appropriate for font loading.

This preserved:
- node labels
- hover behavior
- 3D scene
- navigation
- React stability

Do NOT revert the labels back to Drei `Html` unless there is a proven technical reason and the lifecycle issue is solved.

---

# 12. STAGE 4 FINAL VERIFICATION

Stage 4 was tested against the live development application.

Verified:

### Hero

- Canvas renders
- no permanent loading
- central gold core
- wireframe shell
- surrounding nodes
- connecting lines
- particles
- labels
- mouse interaction
- hover interaction

### Technology Ecosystem

- second distinct canvas
- Technology core
- orbital rings
- technology categories
- lazy loading
- different visual concept from Hero

### Navigation

Verified route families:

```text
/
 /services
 /portfolio
 /about
 /blog
 /careers
 /contact
 /business-health-checkup
 /software-project-planning-guide
```

Dynamic examples were also verified for:
- services
- portfolio
- blog
- careers

Invalid dynamic slugs correctly return 404 using `notFound()`.

### Responsive

Desktop and mobile layouts were checked.

Mobile:
- hamburger navigation
- stacked hero
- responsive canvas
- no horizontal overflow
- ecosystem mounts when needed

### Validation

```text
npm run lint  → PASS
npm run build → PASS
```

The build produced approximately 36 routes at the time of verification.

---

# 13. REMAINING NON-BLOCKING STAGE 4 NOTES

Known notes:

### THREE.Clock warning

There is a Three.js/R3F upstream deprecation warning related to `THREE.Clock`.

Do not rewrite the whole 3D engine just because of this warning.

### WebGL context loss

Occasional context loss/restoration can occur when multiple WebGL canvases exist or on weak GPUs.

Current mitigation:
- Hero is present at the top
- Ecosystem is lazy-loaded
- offscreen/demand rendering is used where appropriate

Do not introduce a complicated shared WebGL architecture unless profiling proves it is necessary.

### Chrome extension hydration noise

The `crxlauncher` warning is external.

Do not use `suppressHydrationWarning` to conceal it.

---

# 14. STAGE 5 — CURRENT DEVELOPMENT TARGET

Status: **NEXT**

Goal:

## Dynamic Services System

Required services:

```text
Web Development
App Development
Digital Marketing
AR/VR
3D Modeling
UI/UX Design
```

Required architecture:

```text
frontend/data/services.ts
        ↓
Reusable service model
        ↓
app/services/[slug]/page.tsx
```

Do not create six independent service page implementations.

Every service page should dynamically support:

1. Interactive Hero
2. Problem
3. Solution
4. Features
5. Industry Use Cases
6. Technology Stack
7. Process
8. Related Portfolio
9. CTA

The services listing page should contain:
- premium hero
- six services
- visual treatment
- CTA
- responsive layout

Every service card must navigate to its real dynamic route.

Invalid service slugs must return 404.

---

# 15. STAGE 5 DESIGN PRINCIPLES

Each service should feel distinctive while remaining part of the same Riyadvi design system.

Examples:

### Web Development
Digital interfaces / connected UI / architecture

### App Development
Mobile/device ecosystem

### Digital Marketing
Growth/data/analytics

### AR/VR
Spatial/digital environment

### 3D Modeling
Premium 3D object/geometry

### UI/UX
Design system/interface visualization

Do not create six heavy WebGL scenes.

Reuse lightweight visual components wherever possible.

---

# 16. STAGE 5 CONTENT RULES

Do not invent:
- fake client statistics
- fake awards
- fake revenue
- fake testimonials
- fake case study results
- fake company claims

If information is not known, use neutral descriptive wording such as:
- "Potential use cases"
- "Industries we can support"
- "Example capabilities"

Existing assignment-provided client/project names may be used where appropriate.

---

# 17. PORTFOLIO RELATIONSHIPS

Services should link to existing portfolio data.

Preferred relationship:

```text
Service
   ↓
Related Portfolio
   ↓
Portfolio Case Study
```

Do not duplicate portfolio data inside service components.

Reuse the existing portfolio data source.

---

# 18. PLANNED DEVELOPMENT ROADMAP

After Stage 5:

```text
Stage 5
Dynamic Services
        ↓
Stage 6
Dynamic Portfolio / Case Studies
        ↓
Stage 7
Blog + Careers
        ↓
Stage 8
Backend Architecture
        ↓
Stage 9
PostgreSQL + APIs + Real Forms
        ↓
Stage 10
GSAP + ScrollTrigger + Lenis
        ↓
Stage 11
Performance + Accessibility + Mobile Polish
        ↓
Stage 12
Deployment + README + AI Documentation
        ↓
Final Interview Readiness
```

The exact stage boundaries may change after inspecting the code.

Always prioritize correctness over blindly following the stage number.

---

# 19. BACKEND PLAN

Backend work is intentionally later than the current frontend stages.

Expected API structure:

```text
POST /api/contact
POST /api/consultation
POST /api/health-checkup
POST /api/lead-magnet
POST /api/applications
```

Expected stored data:

```text
Contact enquiries
Consultation requests
Health checkup leads
Lead magnet requests
Career applications
```

Backend requirements:
- validation
- error handling
- environment variables
- predictable response structure
- database persistence
- production-safe configuration

Do not add fake API success responses when the backend/database is not actually connected.

---

# 20. DATABASE PLAN

Preferred database:

```text
PostgreSQL
```

Potential core entities:

```text
contacts
consultations
health_checkups
lead_magnets
career_applications
```

Optional dynamic content entities later:

```text
services
portfolio
blog_posts
jobs
```

Do not introduce a database prematurely if the current stage does not require it.

---

# 21. ADMIN DASHBOARD PLAN

The assignment strongly prefers a lightweight admin dashboard.

Potential dashboard information:

- total enquiries
- consultation requests
- health checkup leads
- lead magnet requests
- career applications

This is not intended to become a large enterprise CRM.

Implement only after the underlying APIs/database are stable.

---

# 22. ANIMATION PLAN

GSAP, ScrollTrigger and Lenis are planned for later.

Do not add them merely for decoration.

Use them for meaningful storytelling:

```text
Hero
↓
Digital transformation journey
↓
Services
↓
Technology
↓
Portfolio
↓
Why Riyadvi
↓
CTA
```

Animation should:
- improve hierarchy
- communicate progression
- preserve readability
- avoid excessive GPU load
- respect reduced-motion preferences

---

# 23. PERFORMANCE RULES

Always consider:

- lazy loading
- code splitting
- dynamic imports
- image optimization
- 3D asset optimization
- font loading
- texture size
- WebGL context usage
- mobile GPU limitations
- unnecessary React renders
- animation frame cost

Never sacrifice the entire site's usability just to make a visual effect more impressive.

---

# 24. RESPONSIVE REQUIREMENTS

The final website must work on:

- desktop
- laptop
- tablet
- mobile

Mobile is not just a smaller desktop.

For 3D:
- reduce complexity on small screens
- reduce particle counts if necessary
- avoid multiple expensive canvases running unnecessarily
- preserve the main visual idea
- allow reduced motion

---

# 25. ACCESSIBILITY REQUIREMENTS

Maintain:

- semantic HTML
- meaningful headings
- keyboard navigation
- focus states
- accessible links
- accessible buttons
- alt text for meaningful images
- reduced-motion consideration

Do not sacrifice accessibility for visual effects.

---

# 26. GIT / VERSION CONTROL

Do not commit automatically after every AI task.

Before a checkpoint commit:

1. Run `git status`
2. Review changed files
3. Review important diffs
4. Run lint
5. Run build
6. Verify browser
7. Commit with a meaningful message

Example checkpoint:

```text
feat: build dynamic services system
```

Never commit:
- `.env`
- API keys
- secrets
- node_modules
- `.next`
- build artifacts
- unnecessary generated files

---

# 27. AI TOOL USAGE

AI tools used/planned:

### ChatGPT
Purpose:
- architecture planning
- requirement analysis
- debugging strategy
- prompt engineering
- documentation
- stage planning

### Cursor
Purpose:
- repository inspection
- implementation
- debugging
- lint/build execution
- iterative refactoring
- browser verification

### Claude
Purpose:
- large-context project analysis
- architecture review
- implementation assistance
- code generation
- documentation
- refactoring

AI agents should be given this document as persistent project context.

---

# 28. HOW AI AGENTS SHOULD WORK ON THIS PROJECT

Preferred workflow:

```text
READ CONTEXT
    ↓
INSPECT SOURCE
    ↓
AUDIT CURRENT STATE
    ↓
IDENTIFY GAP
    ↓
IMPLEMENT ONLY REQUIRED CHANGE
    ↓
RUN LINT
    ↓
RUN BUILD
    ↓
RUN BROWSER CHECK
    ↓
REPORT EXACT RESULT
```

For large tasks, do not blindly generate everything in one step.

Use staged implementation.

---

# 29. IMPORTANT CURRENT-STATE WARNING

There may be multiple archives/copies of this project during development.

AI agents MUST NOT assume that a ZIP archive is automatically the latest source.

Before changing anything:

1. Inspect package.json.
2. Inspect the framework.
3. Inspect the current routes.
4. Inspect the current source tree.
5. Determine whether the provided files represent the current Next.js implementation or an older/different snapshot.

The CURRENT active implementation described by the latest development history is the Next.js/React implementation with:
- Stage 1–4 complete
- real R3F 3D scenes
- Billboard + Text labels
- dynamic route architecture
- approximately 36 generated routes at the Stage 4 checkpoint

If an archive instead contains a different architecture (for example Vite + React), do NOT silently merge or overwrite it. Stop and clearly report the mismatch before making destructive changes.

---

# 30. FINAL PRODUCT DEFINITION

The finished website should be:

```text
Premium
Dynamic
Interactive
3D
Responsive
Accessible
Fast
Full-stack
Database-backed
Production-minded
AI-assisted
Business-focused
```

It should NOT feel like:

```text
A template
A single landing page
A collection of unrelated AI-generated sections
A static mockup
A fake backend
A portfolio-only demo
A game-like 3D experiment
```

The final experience should communicate:

> Riyadvi Software Technologies is a technology and digital solutions partner capable of understanding a business problem, designing a solution, building the technology, launching it, and supporting growth.

---

# 31. MASTER RULE

**Preserve what works. Improve what is weak. Build what is missing.**

Never restart the project unless the existing architecture is genuinely unusable and the reason is demonstrated with evidence.

Always inspect first.

Always validate after changes.

Always report actual results.

Do not fabricate completion.

---

# 32. STAGE 5 — COMPLETION RECORD (Dynamic Services)

**Status: COMPLETE AND VERIFIED.**

Stage 5 upgraded the existing dynamic Services system (which was already
substantially built — six services, one reusable `/services/[slug]`
template, `generateStaticParams`, `generateMetadata`, `notFound()`) rather
than rebuilding it.

**Data model (`types/service.ts`, `data/services.ts`):** added `id`,
`heroLabel`, and a structured `cta: { label, title, description }` to the
existing `Service` type. `iconId` was deliberately reused as the visual
variant key instead of adding a separate `visualId` field, to avoid a
second field that could drift out of sync.

**Files created:**
- `components/services/ServiceHeroVisual.tsx` — one reusable component,
  six SVG variants (browser/UI, device/app grid, growth bars, layered
  AR/VR frames, isometric 3D wireframe, UI/UX wireframe grid). CSS-only
  animation, no WebGL, no new canvases.
- `components/services/ProcessTimeline.tsx` — extracted from what was
  previously inline, duplicated-looking markup on the detail page; now
  shared by both `/services` and `/services/[slug]`.

**Files modified:** `app/services/page.tsx` (added a Technology section
reusing `ECOSYSTEM_TECH` from `components/3d/scene-config.ts`, and a
Process/Approach section using the new `ProcessTimeline`),
`app/services/[slug]/page.tsx` (wired in `ServiceHeroVisual`, `heroLabel`,
and `cta` data; replaced inline process markup with `ProcessTimeline`),
`app/globals.css` (added `.service-visual-*` keyframes/utilities,
guarded by `prefers-reduced-motion: reduce`, following the existing
`.hero-scene-orbit` convention).

**Validation:** `npm run lint` clean. `npx tsc --noEmit` clean.
`npm run build` succeeded — 36 routes, all 6 service slugs statically
generated. Dev server exercised: all 6 service routes + `/services` →
200, `/services/invalid-service` → 404 via `notFound()`. Homepage 3D
(`HeroScene`/`EcosystemScene`) confirmed untouched.

**Known note:** the sandbox used for this work blocks
`fonts.googleapis.com`, so `npm run build` needed a temporary local
stand-in for the `next/font/google` import to complete the verification
build; `app/layout.tsx` was reverted byte-for-byte immediately after
(confirmed via `diff`). This is an environment limitation, not a code
change — worth confirming your real dev/deploy environment has the
necessary network access.

---

# 33. STAGE 6 — COMPLETION RECORD (Dynamic Portfolio)

**Status: COMPLETE AND VERIFIED.**

Stage 6 upgraded the existing dynamic Portfolio system — all 10 required
projects, one reusable `/portfolio/[slug]` template, valid
service/portfolio relationships — rather than rebuilding it.

**Data model (`types/portfolio.ts`, `data/portfolio.ts`):** added `id`
and a `visualType` field (mirrors Stage 5's `iconId` → `ServiceHeroVisual`
pattern — one field drives the visual system rather than a separate
`visuals` structure), plus an `interactive?: boolean` flag used to mark
the single case study that gets the richer interactive showcase. All 10
projects preserved verbatim; no invented clients, stats, or awards.

`visualType` assignments: `puratap`/`wanaromah-perfumers` → `product`,
`laxmi-astro-ai` → `ai-data` (also `interactive: true`), `tony-guy` →
`interface`, `studio11` → `3d`, `sivam-physio-care`/`cube-dental` →
`healthcare`, `pearl-housing` → `architecture`, `nugenica-biotech-lab` →
`dashboard`, `visdoc` → `mobile`.

**Files created:**
- `components/portfolio/PortfolioVisual.tsx` — one reusable component,
  eight SVG variants (product, interface, mobile, dashboard, healthcare,
  architecture, ai-data, 3d). CSS-only animation reusing the
  `.service-visual-*` utilities from Stage 5, no WebGL.
- `components/portfolio/PortfolioOrbitShowcase.tsx` — the one required
  interactive/3D-inspired case-study experience (assignment requirement),
  used only for `laxmi-astro-ai`. A small client component (`"use client"`)
  with plain SVG + React state: hovering/focusing/tapping a node
  highlights its connection and label. Does not touch Stage 4's
  Three.js/R3F architecture and adds no new GPU canvas.

**Files modified:** `app/portfolio/page.tsx` (added a Featured Work
section using the previously-unused `featuredPortfolioProjects` export;
replaced the placeholder gradient card visual with `PortfolioVisual`),
`app/portfolio/[slug]/page.tsx` (replaced the placeholder "Visuals" box
with `PortfolioVisual` / `PortfolioOrbitShowcase` chosen via
`project.interactive`; added existence guards around Technologies,
Results, and Related Services so those sections only render when the
underlying data is non-empty; enriched `generateMetadata` to include
industry).

**Validation:** `npm run lint` clean. `npx tsc --noEmit` clean (after
confirming a transient `LayoutProps` error was purely due to `.next`
having been deleted — regenerated by running the dev server once, then
re-checked clean). `npm run build` succeeded — still 36 routes, all 10
portfolio slugs + 6 service slugs statically generated. Dev server
exercised: all 10 portfolio routes + `/portfolio` → 200,
`/portfolio/invalid-project` → 404 via `notFound()`, homepage and
`/services` re-confirmed unaffected. Interactive showcase verified
rendering with correct `aria-label`s on all 5 nodes and the diagram
itself; related-service and related-portfolio links spot-checked for
correctness (no project links to itself). `focus-visible` and
`prefers-reduced-motion` rules confirmed present in shipped CSS.

**Known note:** same Google Fonts sandbox limitation as Stage 5, handled
the same way (temporary local stand-in for the build only, reverted
byte-for-byte immediately after, confirmed via `diff`).

---

# 35. STAGE 7 — COMPLETION RECORD (Lead Generation & Conversion UX)

**Status: COMPLETE AND VERIFIED.**

Stage 7 replaced the placeholder messaging on `/contact`,
`/business-health-checkup`, and `/software-project-planning-guide` with
production-quality frontend lead-generation UX. No backend, API routes,
or database were touched — this is frontend-only, staged for Stage 8.

**Reusable form primitives created** (`components/forms/`):
- `FormField.tsx` — labeled text/email/tel input, real `<label htmlFor>`,
  `aria-invalid`/`aria-describedby`, exported `fieldClasses()` shared by
  the other field components for consistent styling.
- `TextareaField.tsx`, `SelectField.tsx` — same accessibility pattern for
  textareas and selects (placeholder is a real disabled `<option>`, so a
  select can't silently stay invalid).
- `CheckboxField.tsx` — multi-select checkbox group using a real
  `<fieldset>`/`<legend>` with per-option `<label>`/`<input>` pairs.
- `FormStatus.tsx` — submitting/ready/error banner. **Never claims a
  submission was received or saved** — the "ready" state says data is
  "valid and ready for submission" and that backend delivery connects in
  Stage 8, per the spec's explicit no-fake-backend-success rule.
- `StepProgress.tsx` — "Step X of N" indicator with `role="progressbar"`
  for the multi-step checkup.

No generic `LeadForm`/`MultiStepForm` abstraction was built — only one
form is genuinely multi-step, so a dedicated `HealthCheckupForm.tsx` was
simpler and clearer than a generic engine for a single consumer.

**Concrete forms created:**
- `ContactForm.tsx` — Name, Company, Email, Phone, Service/Project Type
  (options pulled live from `data/services.ts`, not duplicated), optional
  Budget/Timeline, Message. Full client-side validation, duplicate-submit
  prevention, "Submit Another Enquiry" reset after the ready state.
- `HealthCheckupForm.tsx` — the 6-step Business Health Checkup (Business
  Information → Business Stage → Digital Presence → Technology Readiness
  → Growth Priorities → Goals & Next Steps). Per-step validation gates
  "Next"; going back never clears entered values (single local
  `useState` object, no global state). Growth Priorities uses
  `CheckboxField`; every other question uses `SelectField` for
  consistency. Explicitly tells the user this reflects "what you share"
  rather than an automated scoring engine, per the spec's no-fake-scoring
  rule.
- `LeadMagnetForm.tsx` — Name, Company, Email, Phone for the planning
  guide. Explicitly states no file exists yet and nothing was downloaded
  — gated delivery connects in Stage 8. No fake PDF was invented.

**Shared types/validation:**
- `types/forms.ts` — `ContactPayload`, `HealthCheckupPayload`,
  `LeadMagnetPayload` match the spec's Step 13 payload shapes exactly, so
  Stage 8 can wire `POST /api/contact`, `/api/health-checkup`,
  `/api/lead-magnet` directly against existing state without UI rework.
  Option constants (`BUDGET_OPTIONS`, `TIMELINE_OPTIONS`,
  `GROWTH_PRIORITY_OPTIONS`, `BUSINESS_STAGE_OPTIONS`, etc.) live here
  too, alongside typed defaults for each payload.
- `lib/validation.ts` — dependency-free validators (`validateRequiredText`,
  `validateEmail`, `validatePhone`, `validateSelect`, `validateTextarea`,
  `validateChecklist`, `hasErrors`). Explicit code comment: client-side
  validation is UX only, not a security boundary — Stage 8 must
  re-validate server-side.

**Pages modified:** `app/contact/page.tsx`, `app/business-health-checkup/page.tsx`,
`app/software-project-planning-guide/page.tsx` — placeholder copy
replaced with the real forms; existing page structure (`PageHero`,
`Container`, black/gold styling) reused, not rebuilt.

**Validation:** `npm run lint` clean (after removing three unnecessary
`eslint-disable-next-line no-console` comments the project's config
didn't need). `npx tsc --noEmit` clean (one transient `LayoutProps`
error again traced to a deleted `.next` folder, resolved by regenerating
via the dev server, same as Stage 6). `npm run build` succeeded — still
36 routes. Dev server exercised: all three lead-gen routes → 200;
`/services/invalid-service` and `/portfolio/invalid-project` still 404;
homepage/`/services`/`/portfolio` re-confirmed unaffected. Step-1-only
server-render of the health checkup confirmed (steps 2–6 mount only
after client-side "Next"); `role="progressbar"` and per-step `aria-label`
regions confirmed present; `focus-visible`, `prefers-reduced-motion`,
`accent-color` (checkbox accent), and the submitting spinner's
`animate-spin` utility all confirmed present in the shipped CSS.
Existing CTAs (Navbar, Footer, homepage `BusinessHealthCheckupCTA`,
`PageCta` used across Services/Portfolio) re-confirmed still pointing at
`/contact` and `/business-health-checkup` correctly.

**Known note:** same Google Fonts sandbox limitation as Stages 5–6,
handled the same way.

**Remaining for Stage 8:** actual `POST` calls to `/api/contact`,
`/api/health-checkup`, `/api/lead-magnet`; server-side validation;
persisting leads; replacing each form's "ready" state with a real
server response; producing (or sourcing) an actual downloadable file for
the planning guide instead of the current honest "not available yet"
state.

---

# 36. MASTER RULE (REAFFIRMED)

**Preserve what works. Improve what is weak. Build what is missing.**

This held for Stage 5, Stage 6, and Stage 7: in each case the existing
architecture was inspected first, found substantially complete, and
extended rather than replaced. Always inspect first. Always validate
after changes. Always report actual results. Do not fabricate
completion.
