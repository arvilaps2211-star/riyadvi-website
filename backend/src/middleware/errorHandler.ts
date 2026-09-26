import type { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/response";

/**
 * Throw this from route/service code when you want a specific, safe
 * status code and message surfaced to the client (e.g. a 409 conflict).
 * Anything else is treated as an unexpected server error.
 */
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

/**
 * Centralized error handler (Stage 8 Step 15/27).
 *
 * Never forwards err.message from unexpected errors to the client — that
 * is exactly how SQL error text, connection strings, or stack traces would
 * leak (e.g. "password authentication failed for user ...",
 * "ECONNREFUSED 127.0.0.1:5432"). Full detail is only logged server-side.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    // eslint-disable-next-line no-console
    console.error(`[error] ${req.method} ${req.originalUrl} ->`, err.message);
    sendError(res, err.message, err.statusCode);
    return;
  }

  const message = err instanceof Error ? err.message : String(err);
  // eslint-disable-next-line no-console
  console.error(`[error] ${req.method} ${req.originalUrl} -> unexpected:`, message);

  sendError(res, "We could not process your request right now. Please try again later.", 500);
}
