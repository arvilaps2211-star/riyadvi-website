import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET;
const SESSION_EXPIRES_IN = process.env.ADMIN_SESSION_EXPIRES_IN || "8h";
const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";

if (!JWT_SECRET) {
  // Fail loudly at startup, same pattern as config/database.ts — an admin
  // session mechanism silently running with `undefined` as its secret would
  // be a critical, hard-to-notice security bug.
  // eslint-disable-next-line no-console
  console.error(
    "[auth] ADMIN_JWT_SECRET is not set. Copy .env.example to .env and fill it in.",
  );
}

export const ADMIN_COOKIE_NAME = "riyadvi_admin_session";

export type AdminJwtPayload = {
  sub: string; // admin_users.id
  email: string;
};

export async function hashPassword(plain: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(plain, saltRounds);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signAdminToken(payload: AdminJwtPayload): string {
  if (!JWT_SECRET) {
    throw new Error("ADMIN_JWT_SECRET is not configured");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SESSION_EXPIRES_IN } as jwt.SignOptions);
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  if (!JWT_SECRET) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
  } catch {
    return null;
  }
}

/**
 * Cookie options shared by both the "set" (login) and "clear" (logout)
 * calls — they must match exactly, or the browser will not clear the
 * cookie set with the original options.
 *
 * SameSite=None is required for the cookie to be sent on cross-site
 * requests (the frontend and backend are separate deployables — Vercel +
 * Render/Railway — which browsers treat as different sites), but
 * SameSite=None is only honored by browsers when Secure is also set. In
 * local development (COOKIE_SECURE=false) frontend and backend are both on
 * `localhost`, which browsers treat as same-site even across ports, so
 * SameSite=Lax + non-Secure works over plain HTTP.
 */
export function adminCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite: COOKIE_SECURE ? "none" : "lax",
    path: "/",
    maxAge: parseExpiryToMs(SESSION_EXPIRES_IN),
  };
}

function parseExpiryToMs(expiresIn: string): number {
  const match = /^(\d+)([smhd])$/.exec(expiresIn.trim());
  if (!match) return 8 * 60 * 60 * 1000; // default 8h
  const value = Number(match[1]);
  const unit = match[2] ?? "h";
  const unitMs: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };
  return value * (unitMs[unit] ?? unitMs.h ?? 3_600_000);
}
