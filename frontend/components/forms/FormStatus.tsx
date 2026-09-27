"use client";

import type { SubmissionStatus } from "@/types/forms";

type FormStatusProps = {
  status: SubmissionStatus;
  /**
   * Shown in the "ready" state. Stage 8: this should be the real message
   * returned by the backend after a successful submission, not a
   * hardcoded string — the UI never claims success on its own authority.
   */
  readyDetail?: string;
  /**
   * Shown in the "error" state. Stage 8: prefer the real message returned
   * by the backend when available; falls back to a generic message for
   * client-side-only validation failures.
   */
  errorDetail?: string;
  className?: string;
};

/**
 * Honest, server-driven status feedback.
 *
 * Stage 8: the backend is real. This component only ever displays a
 * "ready" (success) state when the caller has an actual server response
 * confirming it — it never fabricates success on its own.
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
        Submitting…
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
          {readyDetail ?? "Thank you — your submission was received."}
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
