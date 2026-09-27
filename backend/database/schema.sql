-- Riyadvi Software Technologies — Database Schema
-- Run this against a fresh PostgreSQL database to create all tables
-- required by the backend, e.g.:
--
--   createdb riyadvi_dev
--   psql "$DATABASE_URL" -f database/schema.sql
--
-- Safe to re-run: every statement is idempotent (CREATE ... IF NOT EXISTS).

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- contact_leads — POST /api/contact
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads (email);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads (created_at);

-- ---------------------------------------------------------------------------
-- consultation_requests — POST /api/consultation
--
-- Prepared per Stage 8 Step 7: the current frontend does not yet submit a
-- request that is distinct from the contact form, so this table/route exist
-- as ready infrastructure rather than a wired-up UI flow. Same shape as
-- contact_leads plus an optional preferred-timeslot field, since a
-- consultation request is meaningfully about scheduling.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  project_type TEXT NOT NULL,
  preferred_timeslot TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consultation_requests_email ON consultation_requests (email);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON consultation_requests (created_at);

-- ---------------------------------------------------------------------------
-- health_checkups — POST /api/health-checkup
--
-- Structured, per-step assessment fields are stored as JSONB since their
-- shape (frontend/types/forms.ts: DigitalPresence, TechnologyReadiness,
-- string[] growthPriorities, HealthCheckupGoals) is a nested object/array,
-- not a flat scalar. No scoring columns exist because no scoring logic
-- exists — this stores exactly what the person submitted.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS health_checkups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_stage TEXT NOT NULL,
  digital_presence JSONB NOT NULL,
  technology_readiness JSONB NOT NULL,
  growth_priorities JSONB NOT NULL,
  goals JSONB NOT NULL,
  timeline TEXT NOT NULL,
  additional_information TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_health_checkups_email ON health_checkups (email);
CREATE INDEX IF NOT EXISTS idx_health_checkups_created_at ON health_checkups (created_at);

-- ---------------------------------------------------------------------------
-- lead_magnet_leads — POST /api/lead-magnet
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lead_magnet_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resource TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_magnet_leads_email ON lead_magnet_leads (email);
CREATE INDEX IF NOT EXISTS idx_lead_magnet_leads_created_at ON lead_magnet_leads (created_at);

-- ---------------------------------------------------------------------------
-- applications — POST /api/applications
--
-- Backend-ready per Stage 8 Step 10/23. The careers page (frontend) does not
-- yet have its own application form — "Apply / Inquire" currently links to
-- /contact and states application forms will follow in a later stage — so
-- this table/route are infrastructure ahead of that frontend work, not yet
-- wired to a UI. `resume_reference` is a free-text field (a link or note),
-- not a file upload column, since no file-storage system exists yet.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  job_slug TEXT NOT NULL,
  job_title TEXT NOT NULL,
  resume_reference TEXT,
  cover_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_email ON applications (email);
CREATE INDEX IF NOT EXISTS idx_applications_job_slug ON applications (job_slug);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications (created_at);
