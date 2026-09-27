import { pool } from "../config/database";

export type AdminUserRecord = {
  id: string;
  email: string;
  password_hash: string;
  name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
};

/**
 * Public shape of an admin user — never includes password_hash. Every route
 * handler must build this from an AdminUserRecord rather than spreading the
 * record directly, so the hash can never accidentally leak to the browser.
 */
export type AdminUserPublic = {
  id: string;
  email: string;
  name: string | null;
  lastLoginAt: string | null;
};

export function toPublicAdminUser(record: AdminUserRecord): AdminUserPublic {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    lastLoginAt: record.last_login_at,
  };
}

export async function findAdminUserByEmail(
  email: string,
): Promise<AdminUserRecord | null> {
  const result = await pool.query<AdminUserRecord>(
    `SELECT id, email, password_hash, name, is_active, created_at, updated_at, last_login_at
     FROM admin_users
     WHERE email = $1
     LIMIT 1`,
    [email],
  );
  return result.rows[0] ?? null;
}

export async function findAdminUserById(
  id: string,
): Promise<AdminUserRecord | null> {
  const result = await pool.query<AdminUserRecord>(
    `SELECT id, email, password_hash, name, is_active, created_at, updated_at, last_login_at
     FROM admin_users
     WHERE id = $1
     LIMIT 1`,
    [id],
  );
  return result.rows[0] ?? null;
}

export async function touchLastLogin(id: string): Promise<void> {
  await pool.query(
    `UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`,
    [id],
  );
}

/**
 * Used only by the standalone create-admin-user script (backend/scripts),
 * never by an HTTP route — there is no "register admin" API endpoint.
 */
export async function createAdminUser(input: {
  email: string;
  passwordHash: string;
  name?: string | null;
}): Promise<AdminUserRecord> {
  const result = await pool.query<AdminUserRecord>(
    `INSERT INTO admin_users (email, password_hash, name)
     VALUES ($1, $2, $3)
     RETURNING id, email, password_hash, name, is_active, created_at, updated_at, last_login_at`,
    [input.email, input.passwordHash, input.name ?? null],
  );
  const record = result.rows[0];
  if (!record) {
    throw new Error("Insert returned no rows");
  }
  return record;
}
