import { pool } from "../config/database";
import type { LeadStatus } from "./leadAdmin";

export type ApplicationListParams = {
  page: number;
  limit: number;
  search?: string;
  status?: LeadStatus;
};

export type ApplicationRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  job_slug: string;
  job_title: string;
  resume_reference: string | null;
  cover_message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ApplicationListResult = {
  data: ApplicationRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export async function listApplications(
  params: ApplicationListParams,
): Promise<ApplicationListResult> {
  const conditions: string[] = [];
  const values: unknown[] = [];

  if (params.search && params.search.trim().length > 0) {
    values.push(`%${params.search.trim()}%`);
    const idx = values.length;
    conditions.push(
      `(name ILIKE $${idx} OR email ILIKE $${idx} OR job_title ILIKE $${idx})`,
    );
  }

  if (params.status) {
    values.push(params.status);
    conditions.push(`status = $${values.length}`);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countResult = await pool.query<{ count: string }>(
    `SELECT COUNT(*)::text AS count FROM applications ${whereClause}`,
    values,
  );
  const total = Number(countResult.rows[0]?.count ?? "0");

  const limitIdx = values.length + 1;
  const offsetIdx = values.length + 2;
  const offset = (params.page - 1) * params.limit;

  const dataResult = await pool.query<ApplicationRow>(
    `SELECT id, name, email, phone, job_slug, job_title, resume_reference,
            cover_message, status, created_at, updated_at
       FROM applications
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${limitIdx} OFFSET $${offsetIdx}`,
    [...values, params.limit, offset],
  );

  return {
    data: dataResult.rows,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / params.limit)),
    },
  };
}

export async function getApplicationById(
  id: string,
): Promise<ApplicationRow | null> {
  const result = await pool.query<ApplicationRow>(
    `SELECT id, name, email, phone, job_slug, job_title, resume_reference,
            cover_message, status, created_at, updated_at
       FROM applications WHERE id = $1`,
    [id],
  );
  return result.rows[0] ?? null;
}

export async function updateApplicationStatusById(
  id: string,
  status: LeadStatus,
): Promise<ApplicationRow | null> {
  const result = await pool.query<ApplicationRow>(
    `UPDATE applications SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, name, email, phone, job_slug, job_title, resume_reference,
               cover_message, status, created_at, updated_at`,
    [status, id],
  );
  return result.rows[0] ?? null;
}
