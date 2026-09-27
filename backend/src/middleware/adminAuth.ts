import type { NextFunction, Request, Response } from "express";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "../services/authService";
import { sendError } from "../utils/response";

export type AdminAuthedRequest = Request & {
  admin?: { id: string; email: string };
};

/**
 * Protects every /api/admin/* route except login. Trusts nothing from the
 * client except the HttpOnly cookie itself — never a header the browser's
 * JS could set, never a body field.
 */
export function requireAdminAuth(
  req: AdminAuthedRequest,
  res: Response,
  next: NextFunction,
): void {
  const token = req.cookies?.[ADMIN_COOKIE_NAME];
  if (!token || typeof token !== "string") {
    sendError(res, "Authentication required.", 401);
    return;
  }

  const payload = verifyAdminToken(token);
  if (!payload) {
    sendError(res, "Your session has expired. Please log in again.", 401);
    return;
  }

  req.admin = { id: payload.sub, email: payload.email };
  next();
}
