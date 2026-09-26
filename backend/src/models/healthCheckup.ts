import { pool } from "../config/database";
import type { HealthCheckupInput } from "../validators/leadValidators";

export type HealthCheckupRecord = {
  id: string;
  created_at: string;
};

export async function insertHealthCheckup(
  input: HealthCheckupInput,
): Promise<HealthCheckupRecord> {
  const result = await pool.query<HealthCheckupRecord>(
    `INSERT INTO health_checkups
       (name, company, email, phone, business_stage, digital_presence,
        technology_readiness, growth_priorities, goals, timeline,
        additional_information)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING id, created_at`,
    [
      input.name,
      input.company,
      input.email,
      input.phone,
      input.businessStage,
      JSON.stringify(input.digitalPresence),
      JSON.stringify(input.technologyReadiness),
      JSON.stringify(input.growthPriorities),
      JSON.stringify(input.goals),
      input.timeline,
      input.additionalInformation || null,
    ],
  );

  const record = result.rows[0];
  if (!record) {
    throw new Error("Insert returned no rows");
  }
  return record;
}
