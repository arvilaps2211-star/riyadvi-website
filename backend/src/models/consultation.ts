import { pool } from "../config/database";
import type { ConsultationInput } from "../validators/leadValidators";

export type ConsultationRecord = {
  id: string;
  created_at: string;
};

export async function insertConsultation(
  input: ConsultationInput,
): Promise<ConsultationRecord> {
  const result = await pool.query<ConsultationRecord>(
    `INSERT INTO consultation_requests
       (name, company, email, phone, project_type, preferred_timeslot, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, created_at`,
    [
      input.name,
      input.company,
      input.email,
      input.phone,
      input.projectType,
      input.preferredTimeslot || null,
      input.message || null,
    ],
  );

  const record = result.rows[0];
  if (!record) {
    throw new Error("Insert returned no rows");
  }
  return record;
}
