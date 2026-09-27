import { z } from "zod";
import { LEAD_STATUS_VALUES, LEAD_TYPE_VALUES } from "../models/leadAdmin";

export const adminLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email({ message: "Enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }).max(200),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const leadStatusUpdateSchema = z.object({
  status: z.enum(LEAD_STATUS_VALUES, {
    message: "Status must be one of: new, contacted, in_progress, completed, archived.",
  }),
});

export const leadListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  search: z.string().trim().max(200).optional(),
  status: z.enum(LEAD_STATUS_VALUES).optional(),
  type: z.enum(LEAD_TYPE_VALUES).optional(),
});

export const applicationListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(100000).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  search: z.string().trim().max(200).optional(),
  status: z.enum(LEAD_STATUS_VALUES).optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid({ message: "Invalid id." }),
});
