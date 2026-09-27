import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { flattenZodError } from "../validators/leadValidators";
import { sendValidationError } from "../utils/response";

/**
 * Express middleware factory: validates req.body against a zod schema.
 * On success, replaces req.body with the parsed (trimmed/normalized) data
 * so downstream handlers never touch raw, unvalidated input.
 */
export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        sendValidationError(res, flattenZodError(error));
        return;
      }
      next(error);
    }
  };
}
