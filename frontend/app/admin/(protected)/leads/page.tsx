"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { adminApi, type LeadStatus, type LeadType, type NormalizedLead, type Pagination } from "@/lib/api";
import { StatusBadge, STATUS_OPTIONS } from "@/components/admin/StatusBadge";
import { LoadingState, EmptyState, ErrorState } from "@/components/admin/DataStates";
import { PaginationControls } from "@/components/admin/PaginationControls";

type LoadState = "loading" | "loaded" | "error";

const TYPE_OPTIONS: { value: LeadType; label: string }[] = [
  { value: "contact", label: "Contact" },
  { value: "consultation", label: "Consultation" },
  { value: "health_checkup", label: "Health Checkup" },
  { value: "lead_magnet", label: "Lead Magnet" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<NormalizedLead[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [type, setType] = useState<LeadType | "">("");
  const [page, setPage] = useState(1);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const result = await adminApi.getLeads({ page, limit: 20, search, status, type });
      if (cancelled) return;
      if (result.success) {
        setLeads(result.data);
        setPagination(result.pagination);
        setState("loaded");
      } else {
        setErrorMessage(result.message);
        setState("error");
      }
    }

    // Resetting to "loading" when the effect re-runs (page/search/filter
    // change) is a standard, intentional UI reset — not an unintended
    // cascading update. The experimental set-state-in-effect rule flags any
    // synchronous setState in an effect regardless of intent; disabled here
    // with that context rather than removing the loading indicator.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("loading");
    run();
    return () => {
      cancelled = true;
    };
  }, [page, search, status, type, reloadToken]);

  function handleRefresh() {
    setReloadToken((t) => t + 1);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Leads</h1>
          <p className="mt-1 text-sm text-[#a1a1aa]">
            Contact, consultation, health checkup and lead magnet submissions.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="rounded-md border border-[#ffffff14] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#d4af37]/40"
        >
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, email, company…"
            className="w-56 rounded-md border border-[#ffffff1f] bg-[#0d0d0d] px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]"
          />
          <button
            type="submit"
            className="rounded-md border border-[#ffffff14] px-3 py-2 text-xs font-medium text-white hover:border-[#d4af37]/40"
          >
            Search
          </button>
        </form>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value as LeadStatus | "");
          }}
          className="rounded-md border border-[#ffffff1f] bg-[#0d0d0d] px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value as LeadType | "");
          }}
          className="rounded-md border border-[#ffffff1f] bg-[#0d0d0d] px-3 py-2 text-sm text-white outline-none focus:border-[#d4af37]"
        >
          <option value="">All types</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        {state === "loading" && <LoadingState label="Loading leads…" />}
        {state === "error" && (
          <ErrorState label={errorMessage || "Unable to load leads. Please try again."} onRetry={handleRefresh} />
        )}
        {state === "loaded" && leads.length === 0 && <EmptyState label="No leads found." />}
        {state === "loaded" && leads.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-[#ffffff14] bg-[#0d0d0d]">
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ffffff14] text-left text-xs uppercase tracking-wider text-[#a1a1aa]">
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-[#ffffff0a] last:border-0">
                      <td className="px-4 py-3 text-[#a1a1aa]">{lead.source}</td>
                      <td className="px-4 py-3 text-white">{lead.name}</td>
                      <td className="px-4 py-3 text-[#a1a1aa]">{lead.email}</td>
                      <td className="px-4 py-3 text-[#a1a1aa]">{lead.company ?? "—"}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={lead.status} />
                      </td>
                      <td className="px-4 py-3 text-[#a1a1aa]">{formatDate(lead.createdAt)}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/leads/${lead.id}`}
                          className="text-xs font-medium text-[#d4af37] hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile stacked cards */}
            <div className="divide-y divide-[#ffffff0a] md:hidden">
              {leads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block p-4 hover:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-white">{lead.name}</p>
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="mt-1 text-xs text-[#a1a1aa]">{lead.source}</p>
                  <p className="mt-1 text-xs text-[#a1a1aa]">{lead.email}</p>
                  <p className="mt-1 text-xs text-[#a1a1aa]">{formatDate(lead.createdAt)}</p>
                </Link>
              ))}
            </div>

            {pagination && <PaginationControls pagination={pagination} onPageChange={setPage} />}
          </div>
        )}
      </div>
    </div>
  );
}
