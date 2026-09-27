import type { LeadStatus } from "@/lib/api";

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_progress: "In Progress",
  completed: "Completed",
  archived: "Archived",
};

const STATUS_CLASSES: Record<LeadStatus, string> = {
  new: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  contacted: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  in_progress: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_CLASSES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = (
  Object.keys(STATUS_LABELS) as LeadStatus[]
).map((value) => ({ value, label: STATUS_LABELS[value] }));
