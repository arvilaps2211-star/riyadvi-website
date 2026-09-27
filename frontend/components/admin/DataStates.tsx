export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center rounded-lg border border-[#ffffff14] bg-[#0d0d0d] py-16">
      <p className="text-sm text-[#a1a1aa]">{label}</p>
    </div>
  );
}

export function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#ffffff1f] bg-[#0d0d0d] py-16 text-center">
      <p className="text-sm text-[#a1a1aa]">{label}</p>
    </div>
  );
}

export function ErrorState({
  label,
  onRetry,
}: {
  label: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-500/20 bg-red-500/5 py-16 text-center">
      <p className="text-sm text-red-300">{label}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-md border border-[#d4af37]/60 px-4 py-2 text-sm font-medium text-[#d4af37] transition-colors hover:bg-[#d4af37]/10"
      >
        Retry
      </button>
    </div>
  );
}
