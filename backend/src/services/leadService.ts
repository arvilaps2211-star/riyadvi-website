import { pool } from "../config/database";
import { insertApplication, type ApplicationRecord } from "../models/application";
import { insertConsultation, type ConsultationRecord } from "../models/consultation";
import { insertContactLead, type ContactLeadRecord } from "../models/contactLead";
import { insertHealthCheckup, type HealthCheckupRecord } from "../models/healthCheckup";
import { insertLeadMagnetLead, type LeadMagnetRecord } from "../models/leadMagnet";
import type {
  ApplicationInput,
  ConsultationInput,
  ContactInput,
  HealthCheckupInput,
  LeadMagnetInput,
} from "../validators/leadValidators";

/**
 * Duplicate-submission window (Stage 8 Step 24).
 *
 * This protects against an accidental double-click or a retried request
 * from a flaky connection — NOT against someone genuinely enquiring twice.
 * A second submission from the same email, to the same table, more than
 * this many seconds after the first is treated as a new, legitimate
 * enquiry and inserted normally.
 */
const DUPLICATE_WINDOW_SECONDS = 30;

async function findRecentDuplicate(
  table: string,
  email: string,
): Promise<{ id: string; created_at: string } | null> {
  const result = await pool.query<{ id: string; created_at: string }>(
    `SELECT id, created_at FROM ${table}
     WHERE email = $1 AND created_at > NOW() - INTERVAL '${DUPLICATE_WINDOW_SECONDS} seconds'
     ORDER BY created_at DESC
     LIMIT 1`,
    [email],
  );
  return result.rows[0] ?? null;
}
// Note: `table` above is never user input — it is always one of the fixed
// string literals passed by this file's own functions below, so this is
// not a SQL-injection surface. All *values* (email, etc.) are still
// parameterized via $1.

export type LeadServiceResult<T> =
  | { duplicate: true; record: T }
  | { duplicate: false; record: T };

export async function submitContactLead(
  input: ContactInput,
): Promise<LeadServiceResult<ContactLeadRecord>> {
  const existing = await findRecentDuplicate("contact_leads", input.email);
  if (existing) {
    return { duplicate: true, record: existing };
  }
  const record = await insertContactLead(input);
  return { duplicate: false, record };
}

export async function submitConsultation(
  input: ConsultationInput,
): Promise<LeadServiceResult<ConsultationRecord>> {
  const existing = await findRecentDuplicate("consultation_requests", input.email);
  if (existing) {
    return { duplicate: true, record: existing };
  }
  const record = await insertConsultation(input);
  return { duplicate: false, record };
}

export async function submitHealthCheckup(
  input: HealthCheckupInput,
): Promise<LeadServiceResult<HealthCheckupRecord>> {
  const existing = await findRecentDuplicate("health_checkups", input.email);
  if (existing) {
    return { duplicate: true, record: existing };
  }
  const record = await insertHealthCheckup(input);
  return { duplicate: false, record };
}

export async function submitLeadMagnetLead(
  input: LeadMagnetInput,
): Promise<LeadServiceResult<LeadMagnetRecord>> {
  const existing = await findRecentDuplicate("lead_magnet_leads", input.email);
  if (existing) {
    return { duplicate: true, record: existing };
  }
  const record = await insertLeadMagnetLead(input);
  return { duplicate: false, record };
}

export async function submitApplication(
  input: ApplicationInput,
): Promise<LeadServiceResult<ApplicationRecord>> {
  const existing = await findRecentDuplicate("applications", input.email);
  if (existing) {
    return { duplicate: true, record: existing };
  }
  const record = await insertApplication(input);
  return { duplicate: false, record };
}
