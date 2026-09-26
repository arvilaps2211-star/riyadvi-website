"use client";

import { useId, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { CheckboxField } from "@/components/forms/CheckboxField";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { SelectField } from "@/components/forms/SelectField";
import { StepProgress } from "@/components/forms/StepProgress";
import { TextareaField } from "@/components/forms/TextareaField";
import {
  hasErrors,
  validateChecklist,
  validateEmail,
  validateOptionalText,
  validatePhone,
  validateRequiredText,
  validateSelect,
  validateTextarea,
  type FieldError,
} from "@/lib/validation";
import {
  BUSINESS_STAGE_OPTIONS,
  GROWTH_PRIORITY_OPTIONS,
  HEALTH_CHECKUP_DEFAULTS,
  TIMELINE_OPTIONS,
  type BusinessStage,
  type HealthCheckupPayload,
  type SubmissionStatus,
} from "@/types/forms";

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  "Business Information",
  "Business Stage",
  "Digital Presence",
  "Technology Readiness",
  "Growth Priorities",
  "Goals & Next Steps",
];

const WEBSITE_OPTIONS = [
  "No website yet",
  "Basic website",
  "Website needs improvement",
  "Modern, well-optimized website",
];
const MOBILE_OPTIONS = [
  "Not mobile-friendly",
  "Partially mobile-friendly",
  "Fully responsive",
  "Dedicated mobile app",
];
const MARKETING_OPTIONS = [
  "No active marketing",
  "Occasional social posts",
  "Regular content & ads",
  "Structured multi-channel strategy",
];
const JOURNEY_OPTIONS = [
  "Unclear customer journey",
  "Basic inquiry path",
  "Defined journey with some gaps",
  "Clear, optimized journey",
];
const SOFTWARE_OPTIONS = [
  "No dedicated software",
  "Off-the-shelf tools only",
  "Mix of custom and off-the-shelf",
  "Custom-built systems",
];
const INTEGRATIONS_OPTIONS = [
  "No integrations",
  "A few manual integrations",
  "Some automated integrations",
  "Well-integrated systems",
];
const DATA_OPTIONS = [
  "Data is scattered",
  "Data lives in a few tools",
  "Data is mostly centralized",
  "Data is centralized and used for decisions",
];
const TECH_CHALLENGE_OPTIONS = [
  "Frequent technical issues",
  "Occasional technical issues",
  "Rare technical issues",
  "No significant technical issues",
];

type FieldErrors = Record<string, FieldError>;

export function HealthCheckupForm() {
  const formId = useId();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<HealthCheckupPayload>(HEALTH_CHECKUP_DEFAULTS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string | undefined>();

  const isSubmitting = status === "submitting";
  const isReady = status === "ready";
  const isLocked = isSubmitting || isReady;

  function setField<K extends keyof HealthCheckupPayload>(
    key: K,
    value: HealthCheckupPayload[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function setDigitalPresence<K extends keyof HealthCheckupPayload["digitalPresence"]>(
    key: K,
    value: string,
  ) {
    setValues((prev) => ({
      ...prev,
      digitalPresence: { ...prev.digitalPresence, [key]: value },
    }));
  }

  function setTechnologyReadiness<K extends keyof HealthCheckupPayload["technologyReadiness"]>(
    key: K,
    value: string,
  ) {
    setValues((prev) => ({
      ...prev,
      technologyReadiness: { ...prev.technologyReadiness, [key]: value },
    }));
  }

  function setGoals<K extends keyof HealthCheckupPayload["goals"]>(key: K, value: string) {
    setValues((prev) => ({ ...prev, goals: { ...prev.goals, [key]: value } }));
  }

  function setFieldError(key: string, error: FieldError) {
    setErrors((prev) => ({ ...prev, [key]: error }));
  }

  function validateStep(targetStep: number): FieldErrors {
    switch (targetStep) {
      case 1:
        return {
          name: validateRequiredText(values.name, "Name"),
          company: validateRequiredText(values.company, "Company", { min: 2, max: 120 }),
          email: validateEmail(values.email),
          phone: validatePhone(values.phone, true),
        };
      case 2:
        return {
          businessStage: validateSelect(values.businessStage, "Business Stage"),
        };
      case 3:
        return {
          website: validateSelect(values.digitalPresence.website, "Website Status"),
          mobileExperience: validateSelect(values.digitalPresence.mobileExperience, "Mobile Experience"),
          digitalMarketing: validateSelect(values.digitalPresence.digitalMarketing, "Digital Marketing"),
          customerJourney: validateSelect(values.digitalPresence.customerJourney, "Customer Journey"),
        };
      case 4:
        return {
          existingSoftware: validateSelect(values.technologyReadiness.existingSoftware, "Existing Software"),
          integrations: validateSelect(values.technologyReadiness.integrations, "Integrations"),
          data: validateSelect(values.technologyReadiness.data, "Data Readiness"),
          technicalChallenges: validateSelect(
            values.technologyReadiness.technicalChallenges,
            "Technical Challenges",
          ),
        };
      case 5:
        return {
          growthPriorities: validateChecklist(values.growthPriorities, "Priority", { required: true }),
        };
      case 6:
        return {
          primaryChallenge: validateTextarea(values.goals.primaryChallenge, "Primary Challenge", {
            min: 10,
            max: 1000,
          }),
          desiredOutcome: validateTextarea(values.goals.desiredOutcome, "Desired Outcome", {
            min: 10,
            max: 1000,
          }),
          timeline: validateSelect(values.timeline, "Timeline"),
          additionalInformation: validateOptionalText(values.additionalInformation, "Additional Information", {
            max: 1000,
          }),
        };
      default:
        return {};
    }
  }

  function goNext() {
    const stepErrors = validateStep(step);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    if (hasErrors(stepErrors)) return;
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }

  function goBack() {
    // Values are already preserved in state — going back never clears them.
    setStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLocked) return;

    const stepErrors = validateStep(6);
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    if (hasErrors(stepErrors)) {
      setServerMessage(undefined);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const payload: HealthCheckupPayload = { ...values };
    const result = await api.healthCheckup(payload);

    if (result.success) {
      setServerMessage(result.message);
      setStatus("ready");
      return;
    }

    if (result.errors) {
      setErrors((prev) => ({ ...prev, ...result.errors }));
    }
    setServerMessage(result.message);
    setStatus("error");
  }

  function handleReset() {
    setValues(HEALTH_CHECKUP_DEFAULTS);
    setErrors({});
    setServerMessage(undefined);
    setStatus("idle");
    setStep(1);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-status`}
      className="border border-border bg-surface p-6 sm:p-8"
    >
      <StepProgress currentStep={step} totalSteps={TOTAL_STEPS} stepLabel={STEP_LABELS[step - 1]} />

      <fieldset disabled={isLocked} className="mt-8 space-y-5">
        {step === 1 ? (
          <div className="space-y-5" aria-label="Step 1: Business Information">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="hc-name"
                label="Name"
                required
                autoComplete="name"
                value={values.name}
                onChange={(v) => setField("name", v)}
                onBlur={() => setFieldError("name", validateRequiredText(values.name, "Name"))}
                error={errors.name}
              />
              <FormField
                id="hc-company"
                label="Company"
                required
                autoComplete="organization"
                value={values.company}
                onChange={(v) => setField("company", v)}
                onBlur={() =>
                  setFieldError(
                    "company",
                    validateRequiredText(values.company, "Company", { min: 2, max: 120 }),
                  )
                }
                error={errors.company}
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="hc-email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={(v) => setField("email", v)}
                onBlur={() => setFieldError("email", validateEmail(values.email))}
                error={errors.email}
              />
              <FormField
                id="hc-phone"
                label="Phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                value={values.phone}
                onChange={(v) => setField("phone", v)}
                onBlur={() => setFieldError("phone", validatePhone(values.phone, true))}
                error={errors.phone}
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div aria-label="Step 2: Business Stage">
            <SelectField
              id="hc-business-stage"
              label="Which best describes your business right now?"
              required
              options={BUSINESS_STAGE_OPTIONS.map((opt) => opt.label)}
              value={
                BUSINESS_STAGE_OPTIONS.find((opt) => opt.value === values.businessStage)?.label ?? ""
              }
              onChange={(label) => {
                const match = BUSINESS_STAGE_OPTIONS.find((opt) => opt.label === label);
                setField("businessStage", (match?.value ?? "") as BusinessStage);
              }}
              error={errors.businessStage}
            />
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-5" aria-label="Step 3: Digital Presence">
            <SelectField
              id="hc-website"
              label="How would you describe your current website?"
              required
              options={WEBSITE_OPTIONS}
              value={values.digitalPresence.website}
              onChange={(v) => setDigitalPresence("website", v)}
              error={errors.website}
            />
            <SelectField
              id="hc-mobile"
              label="How does your business perform on mobile?"
              required
              options={MOBILE_OPTIONS}
              value={values.digitalPresence.mobileExperience}
              onChange={(v) => setDigitalPresence("mobileExperience", v)}
              error={errors.mobileExperience}
            />
            <SelectField
              id="hc-marketing"
              label="How would you describe your digital marketing?"
              required
              options={MARKETING_OPTIONS}
              value={values.digitalPresence.digitalMarketing}
              onChange={(v) => setDigitalPresence("digitalMarketing", v)}
              error={errors.digitalMarketing}
            />
            <SelectField
              id="hc-journey"
              label="How clear is your customer journey today?"
              required
              options={JOURNEY_OPTIONS}
              value={values.digitalPresence.customerJourney}
              onChange={(v) => setDigitalPresence("customerJourney", v)}
              error={errors.customerJourney}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="space-y-5" aria-label="Step 4: Technology Readiness">
            <SelectField
              id="hc-software"
              label="What best describes your current software?"
              required
              options={SOFTWARE_OPTIONS}
              value={values.technologyReadiness.existingSoftware}
              onChange={(v) => setTechnologyReadiness("existingSoftware", v)}
              error={errors.existingSoftware}
            />
            <SelectField
              id="hc-integrations"
              label="How well are your tools and systems integrated?"
              required
              options={INTEGRATIONS_OPTIONS}
              value={values.technologyReadiness.integrations}
              onChange={(v) => setTechnologyReadiness("integrations", v)}
              error={errors.integrations}
            />
            <SelectField
              id="hc-data"
              label="How organized is your business data?"
              required
              options={DATA_OPTIONS}
              value={values.technologyReadiness.data}
              onChange={(v) => setTechnologyReadiness("data", v)}
              error={errors.data}
            />
            <SelectField
              id="hc-technical-challenges"
              label="How often do technical issues affect your business?"
              required
              options={TECH_CHALLENGE_OPTIONS}
              value={values.technologyReadiness.technicalChallenges}
              onChange={(v) => setTechnologyReadiness("technicalChallenges", v)}
              error={errors.technicalChallenges}
            />
          </div>
        ) : null}

        {step === 5 ? (
          <div aria-label="Step 5: Growth Priorities">
            <CheckboxField
              legend="Which areas are your current growth priorities?"
              name="growthPriorities"
              required
              columns={3}
              options={GROWTH_PRIORITY_OPTIONS}
              values={values.growthPriorities}
              onChange={(v) => setField("growthPriorities", v)}
              error={errors.growthPriorities}
            />
          </div>
        ) : null}

        {step === 6 ? (
          <div className="space-y-5" aria-label="Step 6: Goals & Next Steps">
            <TextareaField
              id="hc-primary-challenge"
              label="What's the primary challenge you're facing?"
              required
              rows={3}
              maxLength={1000}
              value={values.goals.primaryChallenge}
              onChange={(v) => setGoals("primaryChallenge", v)}
              error={errors.primaryChallenge}
            />
            <TextareaField
              id="hc-desired-outcome"
              label="What outcome would make this worthwhile?"
              required
              rows={3}
              maxLength={1000}
              value={values.goals.desiredOutcome}
              onChange={(v) => setGoals("desiredOutcome", v)}
              error={errors.desiredOutcome}
            />
            <SelectField
              id="hc-timeline"
              label="What's your timeline?"
              required
              options={TIMELINE_OPTIONS}
              value={values.timeline}
              onChange={(v) => setField("timeline", v)}
              error={errors.timeline}
            />
            <TextareaField
              id="hc-additional-info"
              label="Anything else worth knowing?"
              rows={3}
              maxLength={1000}
              value={values.additionalInformation}
              onChange={(v) => setField("additionalInformation", v)}
              error={errors.additionalInformation}
            />
          </div>
        ) : null}
      </fieldset>

      <div id={`${formId}-status`} className="mt-6">
        <FormStatus status={status} readyDetail={serverMessage} errorDetail={serverMessage} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {step > 1 && !isLocked ? (
            <Button type="button" variant="outline" onClick={goBack}>
              Previous
            </Button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {step < TOTAL_STEPS && !isLocked ? (
            <Button type="button" variant="primary" onClick={goNext}>
              Next
            </Button>
          ) : null}
          {step === TOTAL_STEPS ? (
            <Button type="submit" variant="primary" disabled={isLocked}>
              {isSubmitting ? "Submitting…" : "Finish"}
            </Button>
          ) : null}
          {isReady ? (
            <Button type="button" variant="outline" onClick={handleReset}>
              Start a New Checkup
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
