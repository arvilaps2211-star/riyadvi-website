"use client";

import { useId, useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/forms/FormField";
import { FormStatus } from "@/components/forms/FormStatus";
import { TextareaField } from "@/components/forms/TextareaField";
import {
  hasErrors,
  validateEmail,
  validateOptionalText,
  validatePhone,
  validateRequiredText,
  type FieldError,
} from "@/lib/validation";
import {
  applicationDefaults,
  type ApplicationPayload,
  type SubmissionStatus,
} from "@/types/forms";
import type { JobPosting } from "@/types/career";

type ApplicationErrors = Partial<Record<keyof ApplicationPayload, FieldError>>;

export function ApplicationForm({ job }: { job: JobPosting }) {
  const formId = useId();
  const defaults = applicationDefaults(job);
  const [values, setValues] = useState<ApplicationPayload>(defaults);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string | undefined>();

  function setField<K extends keyof ApplicationPayload>(key: K, value: ApplicationPayload[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function validateAll(): ApplicationErrors {
    return {
      name: validateRequiredText(values.name, "Name"),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone, true),
      resumeReference: validateOptionalText(values.resumeReference, "Resume link", { max: 500 }),
      coverMessage: validateOptionalText(values.coverMessage, "Cover message", { max: 2000 }),
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return; // prevent duplicate submission

    const nextErrors = validateAll();
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setServerMessage(undefined);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const payload: ApplicationPayload = { ...values, jobSlug: job.slug, jobTitle: job.title };
    const result = await api.applications(payload);

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
    setValues(defaults);
    setErrors({});
    setServerMessage(undefined);
    setStatus("idle");
  }

  const isSubmitting = status === "submitting";
  const isReady = status === "ready";

  return (
    <form
      id="apply"
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={`${formId}-status`}
      className="border border-border bg-surface p-6 sm:p-8"
    >
      <h2 className="text-xl font-semibold text-white">Apply for {job.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Share a few details and we&apos;ll review your application.
      </p>

      <fieldset disabled={isSubmitting || isReady} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="application-name"
            label="Name"
            required
            autoComplete="name"
            value={values.name}
            onChange={(v) => setField("name", v)}
            onBlur={() => setErrors((prev) => ({ ...prev, name: validateRequiredText(values.name, "Name") }))}
            error={errors.name}
          />
          <FormField
            id="application-email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(v) => setField("email", v)}
            onBlur={() => setErrors((prev) => ({ ...prev, email: validateEmail(values.email) }))}
            error={errors.email}
          />
        </div>

        <FormField
          id="application-phone"
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

        <FormField
          id="application-resume"
          label="Resume link"
          placeholder="Link to your resume, portfolio, or LinkedIn"
          value={values.resumeReference}
          onChange={(v) => setField("resumeReference", v)}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              resumeReference: validateOptionalText(values.resumeReference, "Resume link", { max: 500 }),
            }))
          }
          error={errors.resumeReference}
        />

        <TextareaField
          id="application-cover-message"
          label="Cover message"
          rows={5}
          maxLength={2000}
          placeholder="Tell us why you're a good fit for this role."
          value={values.coverMessage}
          onChange={(v) => setField("coverMessage", v)}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              coverMessage: validateOptionalText(values.coverMessage, "Cover message", { max: 2000 }),
            }))
          }
          error={errors.coverMessage}
        />
      </fieldset>

      <div id={`${formId}-status`} className="mt-6">
        <FormStatus status={status} readyDetail={serverMessage} errorDetail={serverMessage} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={isSubmitting || isReady}>
          {isSubmitting ? "Submitting…" : "Submit Application"}
        </Button>
        {isReady ? (
          <Button type="button" variant="outline" onClick={handleReset}>
            Submit Another Application
          </Button>
        ) : null}
      </div>
    </form>
  );
}
