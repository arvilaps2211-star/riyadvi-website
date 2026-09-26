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
