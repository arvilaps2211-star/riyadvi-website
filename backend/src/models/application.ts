import { pool } from "../config/database";
import type { ApplicationInput } from "../validators/leadValidators";

export type ApplicationRecord = {
  id: string;
  created_at: string;
};

export async function insertApplication(
  input: ApplicationInput,
): Promise<ApplicationRecord> {
  const result = await pool.query<ApplicationRecord>(
    `INSERT INTO applications
       (name, email, phone, job_slug, job_title, resume_reference, cover_message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, created_at`,
    [
      input.name,
      input.email,
      input.phone,
      input.jobSlug,
      input.jobTitle,
      input.resumeReference || null,
      input.coverMessage || null,
    ],
  );

  const record = result.rows[0];
  if (!record) {
    throw new Error("Insert returned no rows");
  }
  return record;
}
