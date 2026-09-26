"use client";

import { useId, useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { SelectField } from "@/components/forms/SelectField";
import { TextareaField } from "@/components/forms/TextareaField";
import {
  hasErrors,
  validateEmail,
  validateOptionalText,
  validatePhone,
  validateRequiredText,
  validateSelect,
  validateTextarea,
  type FieldError,
} from "@/lib/validation";
import {
  BUDGET_OPTIONS,
  CONTACT_PAYLOAD_DEFAULTS,
  TIMELINE_OPTIONS,
  type ContactPayload,
  type SubmissionStatus,
} from "@/types/forms";

const PROJECT_TYPE_OPTIONS = [...services.map((service) => service.title), "Something else"];

type ContactErrors = Partial<Record<keyof ContactPayload, FieldError>>;

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<ContactPayload>(CONTACT_PAYLOAD_DEFAULTS);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  function setField<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validateAll(): ContactErrors {
    const next: ContactErrors = {
      name: validateRequiredText(values.name, "Name"),
      company: validateRequiredText(values.company, "Company", { min: 2, max: 120 }),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone, true),
      projectType: validateSelect(values.projectType, "Service"),
      budget: validateOptionalText(values.budget, "Budget"),
      timeline: validateOptionalText(values.timeline, "Timeline"),
      message: validateTextarea(values.message, "Message", { min: 20, max: 2000 }),
    };
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // prevent duplicate submission

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // Payload is fully assembled and typed for Stage 8:
    // POST /api/contact — not called yet, per Stage 7 scope.
    const payload: ContactPayload = { ...values };
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] ready for Stage 8 POST /api/contact", payload);
    }

    // Simulated local delay only — no network request is made.
    window.setTimeout(() => setStatus("ready"), 500);
  }

  function handleReset() {
    setValues(CONTACT_PAYLOAD_DEFAULTS);
    setErrors({});
    setStatus("idle");
  }

  const isSubmitting = status === "submitting";
  const isReady = status === "ready";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-status`}
      className="border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-white">Project Enquiry</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Tell us about your project. We&apos;ll use this to prepare the
        consultation.
      </p>

      <fieldset disabled={isSubmitting || isReady} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="contact-name"
            label="Name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(v) => setField("name", v)}
            onBlur={() => setErrors((prev) => ({ ...prev, name: validateRequiredText(values.name, "Name") }))}
            error={errors.name}
          />
          <FormField
            id="contact-company"
            label="Company"
            required
            autoComplete="organization"
            value={values.company}
            onChange={(v) => setField("company", v)}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                company: validateRequiredText(values.company, "Company", { min: 2, max: 120 }),
              }))
            }
            error={errors.company}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="contact-email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(v) => setField("email", v)}
            onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(values.email) }))}
            error={errors.email}
          />
          <FormField
            id="contact-phone"
            label="Phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(v) => setField("phone", v)}
            onBlur={() => setErrors((prev) => ({ ...prev, phone: validatePhone(values.phone, true) }))}
            error={errors.phone}
          />
        </div>

        <SelectField
          id="contact-project-type"
          label="Service / Project Type"
          required
          options={PROJECT_TYPE_OPTIONS}
          value={values.projectType}
          onChange={(v) => setField("projectType", v)}
          onBlur={() =>
            setErrors((prev) => ({ ...prev, projectType: validateSelect(values.projectType, "Service") }))
          }
          error={errors.projectType}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id="contact-budget"
            label="Budget Range"
            options={BUDGET_OPTIONS}
            value={values.budget}
            onChange={(v) => setField("budget", v)}
            error={errors.budget}
          />
          <SelectField
            id="contact-timeline"
            label="Timeline"
            options={TIMELINE_OPTIONS}
            value={values.timeline}
            onChange={(v) => setField("timeline", v)}
            error={errors.timeline}
          />
        </div>

        <TextareaField
          id="contact-message"
          label="Message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Share your goals, constraints, and anything else that helps us understand your project."
          value={values.message}
          onChange={(v) => setField("message", v)}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              message: validateTextarea(values.message, "Message", { min: 20, max: 2000 }),
            }))
          }
          error={errors.message}
        />
      </fieldset>

      <div id={`${formId}-status`} className="mt-6">
        <FormStatus status={status} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={isSubmitting || isReady}>
          {isSubmitting ? "Preparing…" : "Send Enquiry"}
        </Button>
        {isReady ? (
          <Button type="button" variant="outline" onClick={handleReset}>
            Submit Another Enquiry
          </Button>
        ) : null}
      </div>
    </form>
  );
}
