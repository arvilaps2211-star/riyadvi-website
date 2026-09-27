"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminApi, type LeadStatus } from "@/lib/api";
import { StatusBadge, STATUS_OPTIONS } from "@/components/admin/StatusBadge";
import { LoadingState, ErrorState } from "@/components/admin/DataStates";

type LoadState = "loading" | "loaded" | "error" | "not_found";

const FIELD_LABELS: Record<string, string> = {
  project_type: "Project Type",
  budget: "Budget",
  timeline: "Timeline",
  message: "Message",
  preferred_timeslot: "Preferred Timeslot",
  business_stage: "Business Stage",
  digital_presence: "Digital Presence",
  technology_readiness: "Technology Readiness",
  growth_priorities: "Growth Priorities",
  goals: "Goals",
  additional_information: "Additional Information",
  resource: "Requested Resource",
};

const HIDDEN_FIELDS = new Set(["id", "type", "name", "company", "email", "phone", "status", "created_at", "updated_at"]);

function renderValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

export default function AdminLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Record<string, unknown> | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const result = await adminApi.getLead(params.id);
      if (cancelled) return;
      if (result.success) {
        setLead(result.data);
        setState("loaded");
      } else if (result.status === 404) {
        setState("not_found");
      } else {
        setErrorMessage(result.message);
        setState("error");
      }
    }

    // Resetting to "loading" on id/reload changes is an intentional UI
    // reset, not an unintended cascading update — see leads/page.tsx for
    // the same note.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("loading");
    run();
    return () => {
      cancelled = true;
    };
  }, [params.id, reloadToken]);

  function handleRetry() {
    setReloadToken((t) => t + 1);
  }

  async function handleStatusChange(newStatus: LeadStatus) {
    if (!lead) return;
    setUpdating(true);
    setUpdateError("");
    setConfirmation("");
    const previous = lead.status;
    const result = await adminApi.updateLeadStatus(params.id, newStatus);
    if (result.success) {
      setLead({ ...lead, status: newStatus });
      setConfirmation("Status updated.");
    } else {
      setLead({ ...lead, status: previous });
      setUpdateError(result.message);
    }
    setUpdating(false);
  }

  if (state === "loading") return <LoadingState label="Loading lead…" />;
  if (state === "not_found") {
    return (
      <div>
        <p className="text-sm text-[#a1a1aa]">Lead not found.</p>
        <button
          type="button"
          onClick={() => router.push("/admin/leads")}
          className="mt-3 text-sm font-medium text-[#d4af37] hover:underline"
        >
          Back to leads
        </button>
      </div>
    );
  }
  if (state === "error" || !lead) {
    return <ErrorState label={errorMessage || "Unable to load this lead."} onRetry={handleRetry} />;
  }

  const status = lead.status as LeadStatus;
  const extraFields = Object.entries(lead).filter(([key]) => !HIDDEN_FIELDS.has(key));

  return (
    <div className="max-w-2xl">
      <button
        type="button"
        onClick={() => router.push("/admin/leads")}
        className="mb-4 text-sm text-[#a1a1aa] hover:text-white"
      >
        ← Back to leads
      </button>

      <div className="rounded-lg border border-[#ffffff14] bg-[#0d0d0d] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#a1a1aa]">
              {String(lead.type).replace("_", " ")}
            </p>
            <h1 className="mt-1 text-xl font-semibold text-white">{String(lead.name)}</h1>
          </div>
          <StatusBadge status={status} />
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-[#a1a1aa]">Email</dt>
            <dd className="mt-0.5 text-sm text-white">{String(lead.email)}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#a1a1aa]">Phone</dt>
            <dd className="mt-0.5 text-sm text-white">{String(lead.phone)}</dd>
          </div>
          {lead.company !== undefined && (
            <div>
              <dt className="text-xs text-[#a1a1aa]">Company</dt>
              <dd className="mt-0.5 text-sm text-white">{renderValue(lead.company)}</dd>
            </div>
          )}
          <div>
            <dt className="text-xs text-[#a1a1aa]">Created</dt>
            <dd className="mt-0.5 text-sm text-white">
              {new Date(String(lead.created_at)).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#a1a1aa]">Last Updated</dt>
            <dd className="mt-0.5 text-sm text-white">
              {new Date(String(lead.updated_at)).toLocaleString()}
            </dd>
          </div>
        </dl>

        {extraFields.length > 0 && (
          <div className="mt-6 space-y-4 border-t border-[#ffffff14] pt-6">
            {extraFields.map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs text-[#a1a1aa]">{FIELD_LABELS[key] ?? key}</dt>
                <dd className="mt-0.5 whitespace-pre-wrap text-sm text-white">
                  {renderValue(value)}
                </dd>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 border-t border-[#ffffff14] pt-6">
          <label htmlFor="status" className="mb-1.5 block text-xs text-[#a1a1aa]">
            Update Status
          </label>
          <select
            id="status"
            value={status}
            disabled={updating}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            className="w-full max-w-xs rounded-md border border-[#ffffff1f] bg-[#050505] px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37] disabled:opacity-60 sm:w-auto"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {updateError && <p className="mt-2 text-xs text-red-300">{updateError}</p>}
          {confirmation && <p className="mt-2 text-xs text-emerald-300">{confirmation}</p>}
        </div>
      </div>
    </div>
  );
}
