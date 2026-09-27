"use client";

import { useId, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import {
  hasErrors,
  validateEmail,
  validatePhone,
  validateRequiredText,
  type FieldError,
} from "@/lib/validation";
import { LEAD_MAGNET_DEFAULTS, type LeadMagnetPayload, type SubmissionStatus } from "@/types/forms";

type LeadMagnetErrors = Partial<Record<keyof LeadMagnetPayload, FieldError>>;

export function LeadMagnetForm() {
  const formId = useId();
  const [values, setValues] = useState<LeadMagnetPayload>(LEAD_MAGNET_DEFAULTS);
  const [errors, setErrors] = useState<LeadMagnetErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string | undefined>();

  function setField<K extends keyof LeadMagnetPayload>(key: K, value: LeadMagnetPayload[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validateAll(): LeadMagnetErrors {
    return {
      name: validateRequiredText(values.name, "Name"),
      company: validateRequiredText(values.company, "Company", { min: 2, max: 120 }),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone, true),
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setServerMessage(undefined);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const payload: LeadMagnetPayload = { ...values };
    const result = await api.leadMagnet(payload);

    if (result.success) {
      // Honest per spec Step 22: only the server's own wording is shown —
      // it explicitly does not claim a file was delivered when none exists.
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
    setValues(LEAD_MAGNET_DEFAULTS);
    setErrors({});
    setServerMessage(undefined);
    setStatus("idle");
  }

  const isSubmitting = status === "submitting";
  const isReady = status === "ready";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-status`}
      className="border border-border-gold/30 bg-[#0a0a0a] p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-white">Get the Guide</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Share a few details so we know who to prepare access for.
      </p>

      <fieldset disabled={isSubmitting || isReady} className="mt-6 space-y-5">
        <FormField
          id="lead-magnet-name"
          label="Name"
          required
          autoComplete="name"
          value={values.name}
          onChange={(v) => setField("name", v)}
          onBlur={() => setErrors((prev) => ({ ...prev, name: validateRequiredText(values.name, "Name") }))}
          error={errors.name}
        />
        <FormField
          id="lead-magnet-company"
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
        <FormField
          id="lead-magnet-email"
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
          id="lead-magnet-phone"
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
      </fieldset>

      <div id={`${formId}-status`} className="mt-6">
        <FormStatus status={status} readyDetail={serverMessage} errorDetail={serverMessage} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={isSubmitting || isReady} className="w-full sm:w-auto">
          {isSubmitting ? "Submitting…" : "Request Access"}
        </Button>
        {isReady ? (
          <Button type="button" variant="outline" onClick={handleReset}>
            Request as Someone Else
          </Button>
        ) : null}
      </div>
    </form>
  );
}
