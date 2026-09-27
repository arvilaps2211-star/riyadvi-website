import { Pool } from "pg";

/**
 * PostgreSQL connection pool.
 *
 * Configuration comes entirely from environment variables — no
 * credentials, hosts, or connection strings are hardcoded here. See
 * .env.example for the variables this reads.
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Fail loudly at startup rather than silently trying to connect with an
  // undefined connection string later, deep inside a request handler.
  // eslint-disable-next-line no-console
  console.error(
    "[database] DATABASE_URL is not set. Copy .env.example to .env and fill it in.",
  );
}

// Hosted Postgres providers (Render, Railway, etc.) typically require SSL
// in production; a local dev database typically does not support it.
const useSsl = process.env.NODE_ENV === "production";

export const pool = new Pool({
  connectionString,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => {
  // A background connection error (e.g. the DB restarting) should not crash
  // the whole process — log and let the next query attempt reconnect.
  // eslint-disable-next-line no-console
  console.error("[database] Unexpected pool error:", err.message);
});

/**
 * Lightweight connectivity check for GET /api/health. Never throws —
 * callers get a boolean and can decide how to report it.
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
