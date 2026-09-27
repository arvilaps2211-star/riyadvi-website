import rateLimit from "express-rate-limit";
import { sendError } from "../utils/response";

/**
 * Lightweight abuse protection for public lead-submission endpoints
 * (Stage 8 Step 25). Deliberately generous so it never gets in the way of
 * normal local development or a real person filling out a form a few
 * times — this is aimed at obvious scripted abuse, not legitimate use.
 */
export const leadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // 60 submissions per IP per window across all lead endpoints
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(
      res,
      "Too many requests from this device. Please wait a few minutes and try again.",
      429,
    );
  },
});

/**
 * Admin login brute-force protection (Phase 9). Deliberately tighter than
 * the public lead-submission limiter: an admin login is a much higher-value
 * target than a contact form, so a much lower ceiling is appropriate. Keyed
 * by IP, same as the lead limiter.
 */
export const adminLoginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    sendError(
      res,
      "Too many login attempts. Please wait a few minutes and try again.",
      429,
    );
  },
});
