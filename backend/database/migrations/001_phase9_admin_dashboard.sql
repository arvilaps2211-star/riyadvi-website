-- Riyadvi Software Technologies — Phase 9 migration
-- Admin Dashboard + Lead Management
--
-- Run this AFTER database/schema.sql, against the SAME database used by
-- Stage 1–8, e.g.:
--
--   psql "$DATABASE_URL" -f database/schema.sql
--   psql "$DATABASE_URL" -f database/migrations/001_phase9_admin_dashboard.sql
--
-- Safe to re-run: every statement is idempotent (IF NOT EXISTS / OR REPLACE)
-- and nothing here drops or truncates an existing table or column. Existing
-- rows in contact_leads, consultation_requests, health_checkups,
-- lead_magnet_leads and applications are left completely untouched other
-- than gaining a new `status` column that defaults every existing row to
-- 'new'.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- admin_users — backs POST /api/admin/auth/login
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);

-- ---------------------------------------------------------------------------
-- Lead status — added to every existing lead-generation table plus
-- applications. A CHECK constraint is the database-level guarantee that no
-- code path (including a future one) can ever write a status value outside
-- the five the spec defines; the API additionally validates this with Zod
-- before the query ever runs.
-- ---------------------------------------------------------------------------

ALTER TABLE contact_leads
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

ALTER TABLE consultation_requests
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

ALTER TABLE health_checkups
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

ALTER TABLE lead_magnet_leads
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

ALTER TABLE applications
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';

-- Add the CHECK constraint separately (and only if missing) so re-running
-- this file never errors with "constraint already exists".
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_leads_status_check'
  ) THEN
    ALTER TABLE contact_leads
      ADD CONSTRAINT contact_leads_status_check
      CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'consultation_requests_status_check'
  ) THEN
    ALTER TABLE consultation_requests
      ADD CONSTRAINT consultation_requests_status_check
      CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'health_checkups_status_check'
  ) THEN
    ALTER TABLE health_checkups
      ADD CONSTRAINT health_checkups_status_check
      CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'lead_magnet_leads_status_check'
  ) THEN
    ALTER TABLE lead_magnet_leads
      ADD CONSTRAINT lead_magnet_leads_status_check
      CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'applications_status_check'
  ) THEN
    ALTER TABLE applications
      ADD CONSTRAINT applications_status_check
      CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'archived'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads (status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests (status);
CREATE INDEX IF NOT EXISTS idx_health_checkups_status ON health_checkups (status);
CREATE INDEX IF NOT EXISTS idx_lead_magnet_leads_status ON lead_magnet_leads (status);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);
