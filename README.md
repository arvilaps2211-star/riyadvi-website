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

Same shape as `/api/contact` plus an optional `preferredTimeslot`. Prepared
infrastructure — the current frontend does not yet submit to this endpoint
separately from `/api/contact`.

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

No guide PDF exists in this repository yet. The response never fabricates
a download link — `data.downloadUrl` is always `null` until an actual file
is wired up.

### `POST /api/applications`

Prepared infrastructure for career applications. The careers page currently
links "Apply / Inquire" to `/contact` and explicitly states application
forms are a later stage — nothing on the frontend calls this endpoint yet.
`resumeReference` is a free-text field (a link or note), not a file upload,
since no file-storage system exists.

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

## Project history

See `CLAUDE_PROJECT_CONTEXT.md` for the full stage-by-stage development
record (Stage 1 through the current stage).
