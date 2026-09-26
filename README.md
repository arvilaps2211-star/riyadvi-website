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
  interpolation into SQL, anywhere.
- Every field is validated server-side (Zod schemas) — client-side
  validation is a UX layer only, never trusted as the security boundary.
- CORS is restricted to `FRONTEND_URL` — not `*`.
- Error responses never leak SQL errors, stack traces, credentials, or
  internal paths.
- Public lead endpoints are rate-limited.
- `.env` is git-ignored on both frontend and backend; only `.env.example`
  (placeholders) is committed.

---

## Deployment preparation

**Backend (Render / Railway):**
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Environment variables to set: `PORT` (usually provided by the platform),
  `DATABASE_URL` (the platform's managed PostgreSQL connection string),
  `NODE_ENV=production`, `FRONTEND_URL` (the deployed Vercel URL).
- Run `database/schema.sql` against the provisioned database once, the
  same way it's applied locally.

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
