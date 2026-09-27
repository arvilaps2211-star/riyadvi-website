# Riyadvi Software Technologies — Website

A premium, dynamic corporate website with a real Express + PostgreSQL
backend for lead generation.

```
riyadvi-website/
├── frontend/   Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
├── backend/    Express 4, TypeScript, PostgreSQL (pg)
└── CLAUDE_PROJECT_CONTEXT.md   Full stage-by-stage development history
```

For the frontend's own framework notes (bootstrapped via `create-next-app`),
see `frontend/README.md`. This file covers the whole project.

---

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL 14+ running locally (or a connection string to a hosted instance)

---

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/riyadvi_dev
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Create the database and apply the schema

```bash
createdb riyadvi_dev
psql -d riyadvi_dev -f database/schema.sql
```

(Adjust the connection flags — `-h`, `-U`, etc. — to match your local
PostgreSQL setup.)

### Run the backend

```bash
npm run dev     # ts-node-dev, auto-restarts on change
# or
npm run build && npm run start   # compiled production run
```

The API listens on `http://localhost:5000` by default.

### Backend scripts

| Script | What it does |
|---|---|
| `npm run dev` | Runs the API with `ts-node-dev` (auto-restart) |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm run start` | Runs the compiled `dist/server.js` |
| `npm run typecheck` / `npm run lint` | `tsc --noEmit` (no separate ESLint config exists yet) |

---

## 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env.local
```

`.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

`NEXT_PUBLIC_API_URL` is the **only** environment variable the frontend
should ever read for backend configuration — never put secrets in a
`NEXT_PUBLIC_*` variable, since those are compiled into the client bundle.

```bash
npm run dev
```

The site runs on `http://localhost:3000` by default.

### Frontend scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

---

## 3. Run both together

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```

Visit `http://localhost:3000`. Forms on `/contact`,
`/business-health-checkup`, and `/software-project-planning-guide` submit
to the backend at `http://localhost:5000`.

---

## API reference

All responses are JSON with a consistent shape:

```jsonc
// success
{ "success": true, "message": "...", "data": { "id": "..." } }

// validation error (per-field)
{ "success": false, "message": "...", "errors": { "email": "Enter a valid email address." } }

// server error
{ "success": false, "message": "We could not process your request right now. Please try again later." }
```

### `GET /api/health`

Returns API and database connectivity status.

```json
{ "success": true, "message": "Riyadvi API is running", "api": "ok", "database": "connected" }
```

### `POST /api/contact`

```jsonc
{
  "name": "Jane Doe",
  "company": "Acme Corp",
  "email": "jane@example.com",
  "phone": "+1 555 123 4567",
  "projectType": "Web Development",   // must match a real service title, or "Something else"
  "budget": "$5,000 – $15,000",       // optional
  "timeline": "1–3 months",           // optional
  "message": "We need a corporate website redesign."
}
```

### `POST /api/consultation`

Same shape as `/api/contact` plus an optional `preferredTimeslot`.
**Phase 10D:** now connected on the frontend — see below.

### `POST /api/health-checkup`

```jsonc
{
  "name": "...", "company": "...", "email": "...", "phone": "...",
  "businessStage": "growing-business", // new-business | growing-business | established-business | digital-transformation
  "digitalPresence": { "website": "...", "mobileExperience": "...", "digitalMarketing": "...", "customerJourney": "..." },
  "technologyReadiness": { "existingSoftware": "...", "integrations": "...", "data": "...", "technicalChallenges": "..." },
  "growthPriorities": ["Website", "Digital marketing"],
  "goals": { "primaryChallenge": "...", "desiredOutcome": "..." },
  "timeline": "...",
  "additionalInformation": ""
}
```

Structured fields (`digitalPresence`, `technologyReadiness`, `goals`, and
the `growthPriorities` array) are stored as PostgreSQL `JSONB`. There is no
automated scoring — the checkup reflects what the person shares, not an
algorithmic assessment.

### `POST /api/lead-magnet`

```jsonc
{ "name": "...", "company": "...", "email": "...", "phone": "...", "resource": "software-project-planning-guide" }
```

**Phase 10E:** the guide PDF now genuinely exists at
`frontend/public/guides/software-project-planning-guide.pdf`, served by
Next.js. On success, `data.downloadUrl` is the real relative path to that
file (`/guides/software-project-planning-guide.pdf`) — never a fabricated
link. If a future resource has no file yet, the same endpoint returns
`downloadUrl: null` with honest copy rather than a broken link.

### `POST /api/applications`

**Phase 10B:** connected to a real form on each career detail page
(`/careers/[slug]`, `ApplicationForm.tsx`) via the existing
`frontend/lib/api.ts` client. `resumeReference` is a free-text field (a
link or note), not a file upload, since no file-storage system exists.
Submitted applications appear in `/admin/applications`.

### `POST /api/consultation`

**Phase 10D:** connected via a "Book a Consultation" tab on `/contact`
(`ConsultationForm.tsx`), alongside the original "Project Enquiry" tab
that still posts to `/api/contact`. Submitted consultations appear in
`/admin/leads` with `type: "consultation"`.

---

## Admin Dashboard (Phase 9)

A protected admin area for managing every lead and application in the
database, backed by real PostgreSQL data (no mock statistics anywhere).

**Frontend routes:** `/admin` (redirects to `/admin/dashboard`),
`/admin/login`, `/admin/dashboard`, `/admin/leads`, `/admin/leads/[id]`,
`/admin/applications`, `/admin/applications/[id]`.

**Backend API:**

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/admin/auth/login` | — | Sign in, sets HttpOnly session cookie |
| POST | `/api/admin/auth/logout` | — | Clears the session cookie |
| GET | `/api/admin/auth/me` | required | Current admin's profile |
| GET | `/api/admin/dashboard/stats` | required | Real-time counts across every lead table + applications |
| GET | `/api/admin/leads` | required | Normalized, paginated list across contact/consultation/health-checkup/lead-magnet — supports `?page&limit&search&status&type` |
| GET | `/api/admin/leads/:id` | required | Full detail for one lead |
| PATCH | `/api/admin/leads/:id/status` | required | Update status (`new`/`contacted`/`in_progress`/`completed`/`archived`) |
| GET | `/api/admin/applications` | required | Paginated application list — supports `?page&limit&search&status` |
| GET | `/api/admin/applications/:id` | required | Full detail for one application |
| PATCH | `/api/admin/applications/:id/status` | required | Update application status |

### Setting up the admin database + your first admin user

```bash
cd backend
# 1. Apply the Phase 9 migration (safe to re-run; adds admin_users + status
#    columns without touching any existing table or row)
psql "$DATABASE_URL" -f database/migrations/001_phase9_admin_dashboard.sql

# 2. Add ADMIN_JWT_SECRET (and optionally ADMIN_SESSION_EXPIRES_IN,
#    COOKIE_SECURE) to backend/.env — see .env.example.

# 3. Create an admin account (interactive prompts, or pass env vars)
ADMIN_EMAIL=admin@yourcompany.com ADMIN_PASSWORD='a-strong-password' \
  npm run create-admin
```

There is deliberately no HTTP endpoint to register an admin account —
accounts are provisioned via the `create-admin` script by whoever has
server/database access, keeping that decision out of the public API surface
entirely.

### How authentication works

- Passwords are hashed with bcrypt (`bcryptjs`, 12 salt rounds) — never
  stored or logged in plaintext.
- On successful login the backend signs a JWT and sets it as an **HttpOnly**
  cookie (`riyadvi_admin_session`) — it is never accessible to frontend
  JavaScript, never stored in `localStorage`.
- Every `/api/admin/*` route except login/logout re-verifies that cookie
  server-side (`requireAdminAuth` middleware) — the frontend's own
  route-level checks are a UX convenience, not the security boundary.
- `COOKIE_SECURE=true` (set this in production) makes the cookie
  `Secure; SameSite=None`, which is required for it to be sent across the
  frontend/backend's separate origins (e.g. Vercel + Render) over HTTPS.
  Locally (`COOKIE_SECURE=false`) it's `SameSite=Lax` over plain HTTP,
  which works because `localhost:3000` and `localhost:5000` are same-site.
- Admin login is rate-limited separately from public form submissions (10
  attempts / 15 minutes / IP) to slow down credential-stuffing attempts.

### What's normalized vs. type-specific

`/api/admin/leads` returns one common shape (`id, type, name, company,
email, phone, source, status, createdAt, updatedAt`) built from a `UNION
ALL` across the four lead-generation tables — this never duplicates rows
into a new table, it's a live SQL view assembled per-request.
`/api/admin/leads/:id` returns the full, type-specific record (e.g. budget
and timeline for a contact enquiry, or the structured JSONB fields for a
health checkup).

### Known limitation

`resume_reference` on the `applications` table is a free-text field (a link
or note) rather than a file upload — there is no file-storage system in
this project (by design; see "Not implemented" below). Both
`resume_reference` and `cover_message` are optional on `/api/applications`,
so they'll show as "—" in the admin UI for any application submitted
without them.

---

## Database schema

See `backend/database/schema.sql` for the authoritative source. Summary:

| Table | Purpose |
|---|---|
| `contact_leads` | `/api/contact` submissions |
| `consultation_requests` | `/api/consultation` submissions |
| `health_checkups` | `/api/health-checkup` submissions (JSONB for structured fields) |
| `lead_magnet_leads` | `/api/lead-magnet` submissions |
| `applications` | `/api/applications` submissions |

Every table uses a `UUID` primary key and `created_at` / `updated_at`
timestamps.

---

## Security notes

- All SQL uses parameterized queries (`$1`, `$2`, ...) — no string
  interpolation into SQL, anywhere, including the Phase 9 admin queries.
- Every field is validated server-side (Zod schemas) — client-side
  validation is a UX layer only, never trusted as the security boundary.
- Admin passwords are bcrypt-hashed (12 salt rounds); the admin session is a
  JWT in an HttpOnly cookie, never exposed to frontend JS or localStorage.
- CORS is restricted to `FRONTEND_URL` — not `*` — and only sets
  `credentials: true` (required for the admin cookie) alongside that
  specific allow-listed origin.
- Admin login is rate-limited (10 attempts / 15 min / IP), separately from
  the public lead-submission rate limiter. `app.set("trust proxy", 1)` is
  required (and set) for this to key on the real client IP rather than a
  reverse proxy's IP on PaaS deployments (Render/Railway/Vercel) — set this
  correctly for your actual proxy topology if it changes.
- Error responses never leak SQL errors, stack traces, credentials,
  `DATABASE_URL`, `ADMIN_JWT_SECRET`, or password hashes.
- Public lead endpoints are rate-limited.
- `.env` is git-ignored on both frontend and backend; only `.env.example`
  (placeholders) is committed. No real admin credentials appear anywhere in
  this repository or its documentation.

**Known residual risks (documented, not silently left out):**
- **No session revocation.** `requireAdminAuth` only verifies the JWT's
  signature and expiry — it does not re-check `admin_users.is_active` on
  every request (only `GET /api/admin/auth/me` does). Deactivating an
  admin does not invalidate their existing cookie until it naturally
  expires (`ADMIN_SESSION_EXPIRES_IN`, default 8h). Acceptable for a single
  trusted admin; if multi-admin access is ever added, add either a
  revocation check (e.g. a `token_version` column bumped on deactivation,
  checked per request) or shorten the session lifetime.
- **No explicit CSRF token.** Currently unexploitable because every
  state-changing request uses either a non-simple HTTP method (`PATCH`) or
  a JSON `Content-Type`, both of which force a CORS preflight that a
  non-allowlisted origin fails. This protection is implicit in the CORS
  config, not a dedicated CSRF defense — if a future change adds a
  state-changing `GET`/simple-`POST` endpoint or loosens CORS, this
  protection would silently stop applying.

Not implemented in this phase (explicitly out of scope): email
notifications, WhatsApp, CRM integration, Calendly, AI lead scoring,
payments, a CMS, multi-admin roles/permissions, cloud file storage, and
marketing/analytics integrations.

---

## Testing (Phase 9)

**What was actually run**, against a real local PostgreSQL 16 instance
(not mocked):

| Test | Result |
|---|---|
| Backend `tsc --noEmit` (typecheck) | ✅ Pass |
| Backend `tsc` (build) | ✅ Pass |
| Frontend `eslint .` | ✅ Pass (0 errors) |
| Frontend `tsc --noEmit` (typecheck) | ✅ Pass |
| Frontend `next build` | ⚠️ Not verified — see note below |
| Invalid admin login | ✅ Generic "Invalid email or password." (no user enumeration) |
| Unauthenticated access to protected route | ✅ 401 |
| Valid login sets HttpOnly cookie | ✅ Verified via curl cookie jar |
| `GET /api/admin/auth/me` | ✅ Returns admin profile, no password hash |
| Dashboard stats reflect real inserted rows | ✅ Verified before/after inserting real leads via the public APIs |
| Lead search | ✅ Verified (`?search=`) |
| Lead type filter | ✅ Verified (`?type=`) |
| Lead status filter | ✅ Verified (`?status=`), after a real status update |
| Pagination | ✅ Verified (`?limit=2&page=2` returns correct slice + totals) |
| Lead detail | ✅ Verified, type-specific fields returned |
| Lead status update (persisted) | ✅ Verified — value round-tripped and confirmed via a subsequent filtered list query |
| Invalid status value rejected | ✅ 400 with field-level error, no partial update |
| Applications list / detail / status update | ✅ Verified against a real submitted application |
| Logout clears cookie | ✅ Verified |
| Access after logout | ✅ 401 |
| SQL injection via `search` query param | ✅ Neutralized (returned 0 rows, not an error or data leak) |
| SQL injection via `status` PATCH body | ✅ Rejected by Zod enum validation before reaching SQL |
| Existing Stage 7 validation (`/api/contact`) still rejects invalid input | ✅ Verified, unchanged |
| Existing 404 handler | ✅ Verified, unchanged |
| Regression file diff against Stage 8 zip | ✅ Only additive files + 6 small, necessary edits (see below) — no Stage 1–8 file was rewritten |

**Regression edits to existing files** (all additive, nothing removed):
`backend/.env.example` (new admin env vars appended), `backend/package.json`
(new deps + scripts), `backend/src/middleware/rateLimiter.ts` (new admin
rate limiter added), `backend/src/server.ts` (cookie-parser + admin routes
wired in), `frontend/app/layout.tsx` (Navbar/Footer moved into a
path-aware `SiteChrome` component so `/admin` can use its own layout),
`frontend/lib/api.ts` (admin API client added, existing `api` export
untouched).

**Not verified / honest limitations:**
- `next build` could not be completed in the sandbox this was built in —
  the build's only failure was `next/font/google` being unable to reach
  `fonts.googleapis.com`, which this sandbox's network egress blocks
  (pre-existing since Stage 1–8, not introduced here). `eslint` and
  `tsc --noEmit` both pass cleanly, which cover everything a production
  `next build` additionally type/lint-checks; the remaining risk is
  specific to font-loading and CSS bundling, which a normal dev machine,
  CI runner, or Vercel deployment (all of which can reach Google Fonts)
  will not hit. This should be re-run once network access is available.
- Browser/hydration testing was **not** performed — there is no headless
  browser in this environment. All frontend verification above is
  typecheck/lint-level; UI behavior (auth guard redirect, form
  interactions, responsive layout) was written to match the patterns
  used elsewhere in the codebase but not visually verified.
- No automated test suite exists for the backend (`npm test` remains a
  placeholder, matching Stage 8) — all testing above was manual, via curl,
  against the real API and database.

---

## Testing (Phase 11)

Phase 11 re-ran everything above against the actual Phase 10 codebase
(same sandbox limitations apply — real local PostgreSQL 16, no headless
browser) and added the following, all genuinely executed:

| Test | Result |
|---|---|
| Frontend `npm run lint` | ✅ Pass (0 errors) |
| Frontend `npm run typecheck` (script added this phase) | ✅ Pass |
| Backend `npm run typecheck` | ✅ Pass |
| Backend `npm run build` | ✅ Pass |
| Frontend `npm run build` (`next build`) | ❌ Fails — see precise finding below |
| `next dev` serving every required public route (`/`, `/about`, `/services*`, `/portfolio*`, `/blog*`, `/careers*`, `/contact`, `/business-health-checkup`, `/software-project-planning-guide`, `/admin/login`) | ✅ All return HTTP 200 |
| HTML output sanity-checked for real errors (not just Next's inert error-boundary scaffolding) | ✅ None found |
| Blog listing search/category/tag filtering | ✅ Confirmed genuinely implemented and rendered (see Phase 10 audit correction) |
| Planning Guide PDF | ✅ Confirmed a real, valid 14-page PDF (`file` + page-count check), not a placeholder |
| Lead-magnet, consultation, career-application submission against real Postgres | ✅ All persist correctly |
| Empty-submission / invalid-email validation | ✅ Field-level errors returned, no partial writes |
| Duplicate-submit prevention | ✅ Confirmed idempotent — same email+resource returns the same row, HTTP 200 not 201, no duplicate DB row |
| Admin dashboard/leads/applications reflect newly-submitted real data | ✅ Verified before/after |
| Admin invalid-session / expired-token → 401 | ✅ Verified |
| Admin logout → subsequent 401 | ✅ Verified |
| Phase 9 fixes (`trust proxy`, frontend 401→login redirect, secure cookie config, rate limiting) | ✅ Confirmed still present and untouched |
| GSAP (`ScrollReveal`) — `gsap.context()` scoping, `.revert()` cleanup, reduced-motion bail-out | ✅ Confirmed correct by code inspection |
| Lenis (`SmoothScrollProvider`) — single driver via `gsap.ticker` (no second RAF loop), proper `lenis.destroy()` + ticker removal on unmount, never mounted on `/admin` | ✅ Confirmed correct by code inspection |
| Three.js (`SceneCanvas`) — WebGL detection, error boundary with deferred fallback swap, intersection-based frameloop pausing, mobile DPR/antialiasing tuning | ✅ Confirmed correct by code inspection |
| CSS reduced-motion (`prefers-reduced-motion: reduce`) | ✅ Confirmed disables the decorative orbit/service-visual keyframe animations |
| Focus visibility | ✅ Confirmed correct modern pattern: `:focus { outline: none }` paired with `:focus-visible { outline: ... }` (not outline suppressed entirely) |
| Form accessibility (labels, `aria-invalid`, `aria-describedby`) | ✅ Confirmed on every field type (`FormField`, `SelectField`, `TextareaField`, `CheckboxField`) and every form's status region |
| Public page metadata coverage | ✅ Every public route has its own `metadata`/`generateMetadata` export |
| Database schema — indexes, UUID PKs, timestamps | ✅ Reviewed; email/created_at/job_slug indexed appropriately; no foreign keys (correct — tables are independent lead types by design, not a gap) |

### Precise `next build` finding (not just "network blocked")

`next build` fails, but **`next dev` does not** — both hit the exact same
`fonts.googleapis.com` block in this sandbox, but they handle it
differently:

```
Received response with status 403 when requesting https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap
Warning: next/font: warning:
Failed to download Inter from Google Fonts. Using a fallback font instead.
If you are offline or behind a proxy, self-host the font with next/font/local, or set HTTP_PROXY/HTTPS_PROXY so Next.js can reach fonts.googleapis.com.
```
— these are `next dev`'s actual, verbatim log lines (from `/tmp/nextdev.log`
in this session); it substitutes a fallback and keeps serving. `next build`
treats the identical 403 as fatal and aborts instead.

This is pre-existing since Stage 1 (both phases use `next/font/google`),
not a Phase 10/11 regression, and there's already a `system-ui` fallback
in `globals.css`'s font stack, so the page would render correctly either
way. **Deliberately not fixed by switching to a self-hosted font** — that
would be an architecture change to a working system for a problem that
almost certainly won't occur on Vercel (which has normal internet access
during builds). Recorded here as a genuine, actionable recommendation
rather than silently worked around: if `next build` ever needs to run in
a network-restricted CI/build environment, self-hosting Inter (e.g. via
`@fontsource/inter` + `next/font/local`) would remove this dependency
entirely.

### Accessibility gaps found and fixed this phase

Both fixes are additive (new `sr-only` text + an `aria-hidden` attribute
on an already-existing element) — no 3D scene, GSAP animation, or Lenis
behavior was modified to make these:

- **`HeroScene` and `EcosystemScene` orbit/node labels were invisible to
  screen readers.** Both scenes draw their labels (`"Web"`, `"Apps"`,
  `"AI"`, `"Cloud"`, …, and the full tech stack list) using drei's WebGL
  `<Text>`, not real DOM text — a deliberate, well-reasoned choice
  documented in `scene-primitives.tsx` (drei's `Html` portal crashes under
  React 19 Strict Mode). The side effect — screen reader users got no
  equivalent content at all — wasn't compensated for. Fixed by adding a
  `sr-only` `<ul>` of the same label data next to each scene in
  `Hero.tsx` and `TechnologyEcosystem.tsx`, and marking the canvas itself
  `aria-hidden` (in `lazy-scenes.tsx`) since the sr-only list is now its
  accessible substitute. **Caught and corrected a self-introduced
  regression while fixing this:** an early version of the
  `EcosystemSceneLazy` fix put `aria-hidden` on the whole lazy-loading
  wrapper, which also hid `EcosystemScenePlaceholder`'s own,
  already-correct, already-visible tech-name list (shown before the 3D
  bundle loads). Corrected so `aria-hidden` only wraps the live
  `<EcosystemScene />` branch. Verified via `next dev` that all label text
  actually appears in the rendered HTML.
- **No `noindex` on `/admin/*`.** An admin login page appearing in search
  results is a real, common hygiene issue. Added
  `frontend/app/admin/layout.tsx` (new file, wraps the whole `/admin` tree
  without touching the redirect page, `/admin/login`, or the protected
  route group individually) exporting
  `metadata = { robots: { index: false, follow: false } }`. Verified via
  `next dev` that `<meta name="robots" content="noindex, nofollow">`
  actually renders on `/admin/login`.

### Not verified / honest limitations (Phase 11)

- No headless browser is available in this environment — nothing above
  is "browser tested" in the sense of an actual rendered browser with
  DevTools/accessibility-tree inspection. Verification was: (a) real HTTP
  requests against a running `next dev` server, (b) direct inspection of
  the server-rendered HTML/RSC payload for the specific attributes and
  text this phase added or checked, and (c) source-code review for
  patterns (cleanup, reduced-motion checks, ARIA attributes) that a
  runtime tool would otherwise need to confirm. This is real
  verification, but it is not equivalent to an actual browser or
  screen-reader session, and is reported as such rather than rounded up.
- No responsive-viewport testing was performed with real browser tooling
  (375×812, 390×844, 768×1024, 1440×900) — there is no headless browser
  with viewport emulation available here. The only responsive-relevant
  finding is a defensive `overflow-x: hidden` on `html`/`body` in
  `globals.css`, which is a safety net against a stray oversized element
  causing horizontal scroll, not a guarantee that no layout looks wrong
  at a given width. No responsive-layout issues were found or fixed this
  phase because no tool capable of finding them (viewport emulation) was
  available — this is different from "tested and found nothing," and is
  reported as the former.
- Lighthouse was not run — no Lighthouse/CLI tooling is available in this
  environment. No Lighthouse score of any kind is claimed anywhere in
  this document.
- Contrast ratios were not measured with a tool; the dark/gold palette
  (`#050505` background, `#D4AF37` gold, white body text) was visually
  reviewed against WCAG-adjacent expectations from the design tokens, not
  computed.

---

## Deployment preparation

**Backend (Render / Railway):**
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Environment variables to set: `PORT` (usually provided by the platform),
  `DATABASE_URL` (the platform's managed PostgreSQL connection string),
  `NODE_ENV=production`, `FRONTEND_URL` (the deployed Vercel URL),
  `ADMIN_JWT_SECRET` (a long random value — never reuse the local one),
  `ADMIN_SESSION_EXPIRES_IN` (e.g. `8h`), `COOKIE_SECURE=true` (required in
  production so the admin cookie works across the frontend/backend's
  separate origins).
- Run `database/schema.sql`, then `database/migrations/001_phase9_admin_dashboard.sql`,
  against the provisioned database once, the same way they're applied
  locally.
- Provision the first admin account with `npm run create-admin` against the
  production `DATABASE_URL` (see "Admin Dashboard" section above) — do this
  once, from a secure shell, never via a committed script argument.

**Frontend (Vercel):**
- Framework preset: Next.js (auto-detected).
- Environment variable: `NEXT_PUBLIC_API_URL` set to the deployed backend
  URL (e.g. `https://riyadvi-api.onrender.com`).

No deployment was performed as part of this stage — no hosting credentials
exist in this repository, and none should be added without an explicit,
separate decision to do so.

---

## Testing (Phase 12) — production build fix + deployment preparation

**The `next build` failure Phase 11 documented is now fixed.** Root
cause: `frontend/app/layout.tsx` used `next/font/google`'s `Inter`, which
makes `next build` require reaching `fonts.googleapis.com`. Replaced with
`next/font/local`, sourcing the identical Inter typeface from
`@fontsource-variable/inter` (npm, SIL Open Font License 1.1 — the same
license Google Fonts distributes Inter under) as a single variable-weight
`.woff2`. Same `--font-inter` CSS variable, same weight range (100–900),
same `display: "swap"` — no visual or typography change, verified by
diffing the rendered class names/variable wiring, not just by the build
passing.

Verified, from a clean install (`rm -rf node_modules .next && npm ci`):

| Command | Result |
|---|---|
| `npm ci` | ✅ 436 packages, 0 vulnerabilities |
| `npm run lint` | ✅ 0 errors |
| `npm run typecheck` | ✅ 0 errors |
| `npm run build` | ✅ **Passes** — 41 routes generated, "Compiled successfully" |

And for the backend, also from a clean install
(`rm -rf node_modules dist && npm ci`):

| Command | Result |
|---|---|
| `npm ci` | ✅ 183 packages, 0 vulnerabilities |
| `npm run typecheck` | ✅ 0 errors |
| `npm run build` | ✅ `dist/` produced, 0 errors |

**Honesty note:** backend's `npm run lint` is literally
`tsc --noEmit -p tsconfig.json` — the same command as `typecheck`, not a
real ESLint pass (there's no ESLint config for the backend). Stated
plainly rather than installing ESLint just to make this line look better;
unchanged from every prior phase.

**Confirmed the fix actually works, not just that the build exits 0:**
started `npm run start` against the production build and verified via
`curl` that the page references a font served from Next's own
`/_next/static/media/…woff2` path (self-hosted), that this file
downloads successfully (200, 48,256 bytes, confirmed a genuine WOFF2 with
`file`), and that the only remaining occurrence of the string
`fonts.googleapis.com` anywhere in `.next`'s build output is this
section's own explanatory code comment, embedded verbatim in a source
map — not a live reference.

**Frontend → backend wiring, proven locally (the closest verification
possible without cloud credentials — see below):** rebuilt the frontend
with `NEXT_PUBLIC_API_URL=http://localhost:5000` and confirmed via `grep`
that this exact URL is baked into multiple `.next/static/chunks/*.js`
files — the same mechanism a real Vercel build would use with the real
backend's URL. Separately ran the production-built backend
(`NODE_ENV=production`, `tsc` output, not `ts-node-dev`) against a real
local PostgreSQL 16 instance and confirmed `GET /api/health` reports
`"database":"connected"`.

**Actual cloud deployment: NOT EXECUTED.** This environment has no
Vercel/Render/Railway account, API token, or CLI session — only a small
outbound-domain allowlist (npm, GitHub, PyPI) that doesn't include any
hosting provider. Per this phase's own instruction, this is stated
plainly rather than a URL being invented. See
`PHASE_12_ASSIGNMENT_AUDIT.md` for the complete, itemized manual
deployment steps (provision → migrate → deploy backend → deploy frontend
→ set `FRONTEND_URL` → smoke test), each one reviewed against the actual
code, not copied from a generic template.

---

## AI Tools Used

Documented honestly, based on the actual visible development history of
this repository — no tool is listed unless there is direct evidence of it
being used.

**Tool:** Claude (Anthropic), used as an agentic coding assistant across
every phase of this project (Phase 1 through Phase 10), including at
least two separate Claude sessions/accounts (the account that completed
Phase 9's admin dashboard, and the account that completed Phase 10).

**Purpose:** end-to-end implementation — inspecting the existing
codebase before each phase, writing frontend (Next.js/React/TypeScript)
and backend (Express/TypeScript/PostgreSQL) code, running real
validation (`lint`, `tsc --noEmit`, `build`), starting the actual dev
servers and PostgreSQL to exercise APIs and verify database rows, fixing
bugs found during that verification, and writing/updating this
documentation.

**Example prompt (paraphrased from Phase 10):** "Implement Phase 10:
close the remaining gaps against the assignment — meaningful GSAP/
ScrollTrigger/Lenis animation, a real career application form wired to
the existing `/api/applications`, a consultation booking flow, and an
actual Software Project Planning Guide PDF. Preserve everything from
Phase 1–9. Actually run lint/typecheck/build and test the APIs against
real PostgreSQL before reporting anything as done."

**Generated output:** the reusable form/animation components
(`ContactForm`, `ConsultationForm`, `ApplicationForm`, `LeadMagnetForm`,
`HealthCheckupForm`, `ScrollReveal`, `SmoothScrollProvider`), the Express
routes/services/validators/models for every lead type, the admin
authentication and dashboard, the PostgreSQL schema and migrations, the
Software Project Planning Guide PDF (generated via a Python/ReportLab
script, `Riyadvi-authored content, not copied from any source`), and this
documentation.

**Manual changes / human review:** every phase's output was reviewed
against the actual repository state rather than accepted on description
alone; issues found during that review were corrected before being
reported as done — for example, a set of backend files that appeared in
the working copy without a clear provenance were read in full and
partially rebuilt (corrected `tsconfig.json`/dependency versions) before
being trusted, and a white-on-white PDF title bug was caught by rendering
the PDF to an image and visually inspecting it, not just generating it.

**Why selected:** the project was already being developed with Claude
across every prior phase; continuing with the same tool kept context,
conventions, and code style consistent rather than introducing a second
tool mid-project.

No other AI tool (ChatGPT, Cursor, Windsurf, Lovable, or similar) has any
evidence of use in this repository's actual files or history, so none are
claimed here.

---

## Third-Party Assets

- **Fonts:** Inter, via `next/font/google` (Google Fonts). No other
  custom or licensed fonts are used.
- **Icons:** [lucide-react](https://lucide.dev/) — open-source icon set,
  used throughout the UI (service icons, admin sidebar, form affordances).
- **3D/graphics libraries:** [Three.js](https://threejs.org/),
  [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber),
  [@react-three/drei](https://github.com/pmndrs/drei) — used for the
  homepage Hero and Technology Ecosystem scenes.
- **Animation libraries:** [GSAP](https://gsap.com/) (including
  ScrollTrigger) and [Lenis](https://github.com/darkroomengineering/lenis)
  (`@studio-freight/lenis`) — used for scroll-reveal animation and smooth
  scrolling on the public site.
- **PDF generation:** [ReportLab](https://www.reportlab.com/) (Python) —
  used only to generate the Software Project Planning Guide PDF at build
  time; it is not a runtime dependency of either the frontend or backend.
- **Images:** no third-party stock photography is used; all visual
  treatments (service/portfolio visuals, the interactive case study) are
  original inline SVG/CSS built for this project.
- **Backend libraries:** Express, `pg`, Zod, `bcryptjs`, `jsonwebtoken`,
  `cookie-parser`, `cors`, `express-rate-limit`, `dotenv` — all standard,
  widely-used open-source packages; no vendored or copied third-party
  source code.

No ownership is claimed over any of the above — they are used under
their respective open-source licenses.

## Project history

See `CLAUDE_PROJECT_CONTEXT.md` for the full stage-by-stage development
record (Stage 1 through the current stage).
