import { pool } from "../config/database";
import type { ContactInput } from "../validators/leadValidators";

export type ContactLeadRecord = {
  id: string;
  created_at: string;
};

export async function insertContactLead(
  input: ContactInput,
): Promise<ContactLeadRecord> {
  const result = await pool.query<ContactLeadRecord>(
    `INSERT INTO contact_leads
       (name, company, email, phone, project_type, budget, timeline, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, created_at`,
    [
      input.name,
      input.company,
      input.email,
      input.phone,
      input.projectType,
      input.budget || null,
      input.timeline || null,
      input.message,
    ],
  );

  const record = result.rows[0];
  if (!record) {
    throw new Error("Insert returned no rows");
  }
  return record;
}
