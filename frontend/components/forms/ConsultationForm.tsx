"use client";

import { useId, useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { api } from "@/lib/api";
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
  type FieldError,
} from "@/lib/validation";
import {
  CONSULTATION_PAYLOAD_DEFAULTS,
  PREFERRED_TIMESLOT_OPTIONS,
  type ConsultationPayload,
  type SubmissionStatus,
} from "@/types/forms";

const PROJECT_TYPE_OPTIONS = [...services.map((service) => service.title), "Something else"];

type ConsultationErrors = Partial<Record<keyof ConsultationPayload, FieldError>>;

export function ConsultationForm() {
  const formId = useId();
  const [values, setValues] = useState<ConsultationPayload>(CONSULTATION_PAYLOAD_DEFAULTS);
  const [errors, setErrors] = useState<ConsultationErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string | undefined>();

  function setField<K extends keyof ConsultationPayload>(key: K, value: ConsultationPayload[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validateAll(): ConsultationErrors {
    return {
      name: validateRequiredText(values.name, "Name"),
      company: validateRequiredText(values.company, "Company", { min: 2, max: 120 }),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone, true),
      projectType: validateSelect(values.projectType, "Service"),
      preferredTimeslot: validateOptionalText(values.preferredTimeslot, "Preferred time"),
      message: validateOptionalText(values.message, "Message", { max: 2000 }),
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

    const payload: ConsultationPayload = { ...values };
    const result = await api.consultation(payload);

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
    setValues(CONSULTATION_PAYLOAD_DEFAULTS);
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
      className="border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-white">Book a Free Consultation</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Tell us a bit about your project and when suits you. We&apos;ll follow up to confirm a time.
      </p>

      <fieldset disabled={isSubmitting || isReady} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="consultation-name"
            label="Name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(v) => setField("name", v)}
            onBlur={() => setErrors((prev) => ({ ...prev, name: validateRequiredText(values.name, "Name") }))}
            error={errors.name}
          />
          <FormField
            id="consultation-company"
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
            id="consultation-email"
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
            id="consultation-phone"
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
          id="consultation-project-type"
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

        <SelectField
          id="consultation-timeslot"
          label="Preferred time"
          options={PREFERRED_TIMESLOT_OPTIONS}
          value={values.preferredTimeslot}
          onChange={(v) => setField("preferredTimeslot", v)}
          error={errors.preferredTimeslot}
        />

        <TextareaField
          id="consultation-message"
          label="Anything we should know beforehand?"
          rows={4}
          maxLength={2000}
          value={values.message}
          onChange={(v) => setField("message", v)}
          error={errors.message}
        />
      </fieldset>

      <div id={`${formId}-status`} className="mt-6">
        <FormStatus status={status} readyDetail={serverMessage} errorDetail={serverMessage} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={isSubmitting || isReady}>
          {isSubmitting ? "Submitting…" : "Request Consultation"}
        </Button>
        {isReady ? (
          <Button type="button" variant="outline" onClick={handleReset}>
            Book Another Consultation
          </Button>
        ) : null}
      </div>
    </form>
  );
}
