type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
  stepLabel?: string;
};

export function StepProgress({
  currentStep,
  totalSteps,
  stepLabel,
}: StepProgressProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          Step {currentStep} of {totalSteps}
        </p>
        {stepLabel ? (
          <p className="text-xs text-muted">{stepLabel}</p>
        ) : null}
      </div>
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Business Health Checkup progress: step ${currentStep} of ${totalSteps}`}
        className="mt-3 h-1.5 w-full overflow-hidden bg-[#0a0a0a]"
      >
        <div
          className="h-full bg-gold transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
