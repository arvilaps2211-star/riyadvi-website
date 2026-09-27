/**
 * Shared lead-generation types.
 *
 * These payload shapes intentionally match Stage 7 spec Step 13 so Stage 8
 * can POST them to /api/contact, /api/health-checkup, and /api/lead-magnet
 * without any UI rework.
 */

export type SubmissionStatus = "idle" | "submitting" | "ready" | "error";

// ---------------------------------------------------------------------------
// Contact / consultation form
// ---------------------------------------------------------------------------

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

export const CONTACT_PAYLOAD_DEFAULTS: ContactPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

export const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1–3 months",
  "3+ months",
  "Flexible",
];

// ---------------------------------------------------------------------------
// Business Health Checkup (multi-step)
// ---------------------------------------------------------------------------

export type BusinessStage =
  | "new-business"
  | "growing-business"
  | "established-business"
  | "digital-transformation"
  | "";

export const BUSINESS_STAGE_OPTIONS: { value: BusinessStage; label: string }[] = [
  { value: "new-business", label: "New business" },
  { value: "growing-business", label: "Growing business" },
  { value: "established-business", label: "Established business" },
  { value: "digital-transformation", label: "Digital transformation" },
];

export type DigitalPresence = {
  website: string;
  mobileExperience: string;
  digitalMarketing: string;
  customerJourney: string;
};

export const DIGITAL_PRESENCE_DEFAULTS: DigitalPresence = {
  website: "",
  mobileExperience: "",
  digitalMarketing: "",
  customerJourney: "",
};

export type TechnologyReadiness = {
  existingSoftware: string;
  integrations: string;
  data: string;
  technicalChallenges: string;
};

export const TECHNOLOGY_READINESS_DEFAULTS: TechnologyReadiness = {
  existingSoftware: "",
  integrations: "",
  data: "",
  technicalChallenges: "",
};

export const GROWTH_PRIORITY_OPTIONS = [
  "Website",
  "Web application",
  "Mobile application",
  "UI/UX",
  "Digital marketing",
  "Automation",
  "AI",
  "AR/VR",
  "3D",
];

export type HealthCheckupGoals = {
  primaryChallenge: string;
  desiredOutcome: string;
};

export const HEALTH_CHECKUP_GOALS_DEFAULTS: HealthCheckupGoals = {
  primaryChallenge: "",
  desiredOutcome: "",
};

export type HealthCheckupPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  businessStage: BusinessStage;
  digitalPresence: DigitalPresence;
  technologyReadiness: TechnologyReadiness;
  growthPriorities: string[];
  goals: HealthCheckupGoals;
  timeline: string;
  additionalInformation: string;
};

export const HEALTH_CHECKUP_DEFAULTS: HealthCheckupPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  businessStage: "",
  digitalPresence: DIGITAL_PRESENCE_DEFAULTS,
  technologyReadiness: TECHNOLOGY_READINESS_DEFAULTS,
  growthPriorities: [],
  goals: HEALTH_CHECKUP_GOALS_DEFAULTS,
  timeline: "",
  additionalInformation: "",
};

// ---------------------------------------------------------------------------
// Lead magnet (Software Project Planning Guide)
// ---------------------------------------------------------------------------

export type LeadMagnetPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  resource: string;
};

export const LEAD_MAGNET_DEFAULTS: LeadMagnetPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  resource: "software-project-planning-guide",
};
