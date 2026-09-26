import { pool } from "../config/database";
import type { LeadMagnetInput } from "../validators/leadValidators";

export type LeadMagnetRecord = {
  id: string;
  created_at: string;
};

export async function insertLeadMagnetLead(
  input: LeadMagnetInput,
): Promise<LeadMagnetRecord> {
  const result = await pool.query<LeadMagnetRecord>(
    `INSERT INTO lead_magnet_leads (name, company, email, phone, resource)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, created_at`,
    [input.name, input.company, input.email, input.phone, input.resource],
  );

  const record = result.rows[0];
  if (!record) {
    throw new Error("Insert returned no rows");
  }
  return record;
}
