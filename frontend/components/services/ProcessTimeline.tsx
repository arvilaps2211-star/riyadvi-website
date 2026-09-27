type ProcessTimelineProps = {
  steps: string[];
  className?: string;
};

/**
 * Reusable visual timeline for a sequence of process/approach steps.
 * Used by both the individual service detail template (per-service process)
 * and the services listing page (the overarching strategy → growth journey),
 * so the step markup only exists in one place.
 */
export function ProcessTimeline({ steps, className = "" }: ProcessTimelineProps) {
  return (
    <ol
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}
    >
      {steps.map((step, index) => (
        <li
          key={step}
          className="group relative border border-border bg-[#0a0a0a] p-5 transition-colors hover:border-border-gold"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Step {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 text-sm font-medium text-white">{step}</p>
          {index < steps.length - 1 ? (
            <span
              aria-hidden
              className="pointer-events-none absolute top-1/2 -right-2.5 hidden h-px w-5 -translate-y-1/2 bg-border-gold/40 lg:block"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
