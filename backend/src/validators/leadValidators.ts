import { z, ZodError } from "zod";

/**
 * Server-side validation. Client-side validation (Stage 7) is a UX layer,
 * not a security boundary — every field is re-validated here regardless of
 * what the browser already checked.
 *
 * The enum allow-lists below intentionally mirror the option constants in
 * frontend/types/forms.ts. Frontend and backend are separate deployables
 * (Vercel / Render-or-Railway), so this is deliberate, documented
 * duplication across a service boundary — not duplication within one
 * codebase. If the frontend's option lists change, update these too.
 */

const trimmedString = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min, { message: `Must be at least ${min} characters.` })
    .max(max, { message: `Must be under ${max} characters.` });

const nameSchema = trimmedString(2, 120);
const companySchema = trimmedString(2, 120);

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, { message: "Email is too long." })
  .email({ message: "Enter a valid email address." });

// Loose, international-friendly phone check — mirrors the frontend's
// lib/validation.ts pattern.
const phoneSchema = z
  .string()
  .trim()
  .min(7, { message: "Enter a valid phone number." })
  .max(20, { message: "Enter a valid phone number." })
  .regex(/^\+?[0-9\s().-]{7,20}$/, { message: "Enter a valid phone number." });

const optionalTrimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: `Must be under ${max} characters.` })
    .optional()
    .or(z.literal(""));

// ---------------------------------------------------------------------------
// Contact / consultation
// ---------------------------------------------------------------------------

export const PROJECT_TYPE_VALUES = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "AR / VR",
  "3D Modeling",
  "UI/UX Design",
  "Something else",
] as const;

export const BUDGET_VALUES = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

export const TIMELINE_VALUES = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
] as const;

export const contactSchema = z.object({
  name: nameSchema,
  company: companySchema,
  email: emailSchema,
  phone: phoneSchema,
  projectType: z.enum(PROJECT_TYPE_VALUES, {
    message: "Select a valid service / project type.",
  }),
  budget: z.enum([...BUDGET_VALUES, ""]).optional(),
  timeline: z.enum([...TIMELINE_VALUES, ""]).optional(),
  message: trimmedString(20, 2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const consultationSchema = z.object({
  name: nameSchema,
  company: companySchema,
  email: emailSchema,
  phone: phoneSchema,
  projectType: z.enum(PROJECT_TYPE_VALUES, {
    message: "Select a valid service / project type.",
  }),
  preferredTimeslot: optionalTrimmed(120),
  message: optionalTrimmed(2000),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

// ---------------------------------------------------------------------------
// Business Health Checkup
// ---------------------------------------------------------------------------

export const BUSINESS_STAGE_VALUES = [
  "new-business",
  "growing-business",
  "established-business",
  "digital-transformation",
] as const;

export const GROWTH_PRIORITY_VALUES = [
  "Website",
  "Web application",
  "Mobile application",
  "UI/UX",
  "Digital marketing",
  "Automation",
  "AI",
  "AR/VR",
  "3D",
] as const;

const shortAnswer = trimmedString(2, 200);

const digitalPresenceSchema = z.object({
  website: shortAnswer,
  mobileExperience: shortAnswer,
  digitalMarketing: shortAnswer,
  customerJourney: shortAnswer,
});

const technologyReadinessSchema = z.object({
  existingSoftware: shortAnswer,
  integrations: shortAnswer,
  data: shortAnswer,
  technicalChallenges: shortAnswer,
});

const goalsSchema = z.object({
  primaryChallenge: trimmedString(10, 1000),
  desiredOutcome: trimmedString(10, 1000),
});

export const healthCheckupSchema = z.object({
  name: nameSchema,
  company: companySchema,
  email: emailSchema,
  phone: phoneSchema,
  businessStage: z.enum(BUSINESS_STAGE_VALUES, {
    message: "Select a valid business stage.",
  }),
  digitalPresence: digitalPresenceSchema,
  technologyReadiness: technologyReadinessSchema,
  growthPriorities: z
    .array(z.enum(GROWTH_PRIORITY_VALUES))
    .min(1, { message: "Select at least one growth priority." })
    .max(GROWTH_PRIORITY_VALUES.length),
  goals: goalsSchema,
  timeline: z.enum(TIMELINE_VALUES, { message: "Select a valid timeline." }),
  additionalInformation: optionalTrimmed(1000),
});

export type HealthCheckupInput = z.infer<typeof healthCheckupSchema>;

// ---------------------------------------------------------------------------
// Lead magnet
// ---------------------------------------------------------------------------

export const leadMagnetSchema = z.object({
  name: nameSchema,
  company: companySchema,
  email: emailSchema,
  phone: phoneSchema,
  resource: trimmedString(2, 120),
});

export type LeadMagnetInput = z.infer<typeof leadMagnetSchema>;

// ---------------------------------------------------------------------------
// Applications (careers) — backend-ready ahead of a frontend form; see
// database/schema.sql and routes/applications.ts for context.
// ---------------------------------------------------------------------------

export const applicationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  jobSlug: trimmedString(2, 160),
  jobTitle: trimmedString(2, 160),
  resumeReference: optionalTrimmed(500),
  coverMessage: optionalTrimmed(2000),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

// ---------------------------------------------------------------------------
// Shared helper: turn a ZodError into { field: message } for sendValidationError
// ---------------------------------------------------------------------------

export function flattenZodError(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) {
      out[key] = issue.message;
    }
  }
  return out;
}
