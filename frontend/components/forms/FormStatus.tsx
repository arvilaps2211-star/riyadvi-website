"use client";

import type { SubmissionStatus } from "@/types/forms";

type FormStatusProps = {
  status: SubmissionStatus;
  /** Shown in the "ready" state as a short summary of what happens next. */
  readyDetail?: string;
  /** Shown in the "error" state; defaults to a generic validation message. */
  errorDetail?: string;
  className?: string;
};

/**
 * Honest, non-fabricated status feedback.
 *
 * IMPORTANT (Stage 7 spec, Step 18): there is no backend yet. This
 * component must never claim a submission was received or saved — only
 * that the data is valid and staged for Stage 8's API integration.
 */
export function FormStatus({
  status,
  readyDetail,
  errorDetail,
  className = "",
}: FormStatusProps) {
  if (status === "idle") return null;

  if (status === "submitting") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`flex items-center gap-3 border border-border bg-[#0a0a0a] px-4 py-3 text-sm text-muted ${className}`}
      >
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-border-gold border-t-gold"
        />
        Preparing your submission…
      </div>
    );
  }

  if (status === "ready") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`border border-border-gold/50 bg-gold/5 px-4 py-4 ${className}`}
      >
        <p className="text-sm font-semibold text-gold">
          Your information is valid and ready for submission.
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {readyDetail ??
            "Backend delivery will be connected in Stage 8. Nothing has been sent to a server yet."}
        </p>
      </div>
    );
  }

  // status === "error"
  return (
    <div
      role="alert"
      className={`border border-[#f87171]/50 bg-[#f87171]/5 px-4 py-3 text-sm text-[#fca5a5] ${className}`}
    >
      {errorDetail ?? "Please fix the highlighted fields before continuing."}
    </div>
  );
}
