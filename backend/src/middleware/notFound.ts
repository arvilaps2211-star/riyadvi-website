import type { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/response";

export function notFound(req: Request, res: Response, _next: NextFunction): void {
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}
