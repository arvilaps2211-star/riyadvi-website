import type { Response } from "express";

/**
 * Consistent JSON response shapes across every route. Never exposes SQL
 * errors, stack traces, credentials, or internal paths.
 */

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
): void {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
  });
}

export function sendValidationError(
  res: Response,
  errors: Record<string, string>,
  message = "Please correct the highlighted fields.",
): void {
  res.status(400).json({
    success: false,
    message,
    errors,
  });
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
): void {
  res.status(statusCode).json({
    success: false,
    message,
  });
}
