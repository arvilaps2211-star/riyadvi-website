"use client";

import { useEffect, useState } from "react";
import { adminApi, type DashboardStats } from "@/lib/api";
import { LoadingState, ErrorState } from "@/components/admin/DataStates";

type LoadState = "loading" | "loaded" | "error";

const LEAD_CARDS: { key: keyof DashboardStats; label: string }[] = [
  { key: "totalLeads", label: "Total Leads" },
  { key: "contactLeads", label: "Contact Enquiries" },
  { key: "consultations", label: "Consultation Requests" },
  { key: "healthCheckups", label: "Health Checkups" },
  { key: "leadMagnets", label: "Lead Magnet Leads" },
  { key: "applications", label: "Applications" },
];

const STATUS_CARDS: { key: keyof DashboardStats; label: string }[] = [
  { key: "newLeads", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "inProgress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "archived", label: "Archived" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [state, setState] = useState<LoadState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const result = await adminApi.getDashboardStats();
      if (cancelled) return;
      if (result.success) {
        setStats(result.data);
        setState("loaded");
      } else {
        setErrorMessage(result.message);
        setState("error");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  function handleRetry() {
    setState("loading");
    setReloadToken((t) => t + 1);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-[#a1a1aa]">
        A live overview of leads and applications from PostgreSQL.
      </p>

      <div className="mt-6">
        {state === "loading" && <LoadingState label="Loading dashboard…" />}
        {state === "error" && <ErrorState label={errorMessage || "Unable to load dashboard stats. Please try again."} onRetry={handleRetry} />}
        {state === "loaded" && stats && (
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Leads Overview
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {LEAD_CARDS.map((card) => (
                  <div
                    key={card.key}
                    className="rounded-lg border border-[#ffffff14] bg-[#0d0d0d] p-4"
                  >
                    <p className="text-2xl font-semibold text-white">{stats[card.key]}</p>
                    <p className="mt-1 text-xs text-[#a1a1aa]">{card.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#a1a1aa]">
                Status Breakdown
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {STATUS_CARDS.map((card) => (
                  <div
                    key={card.key}
                    className="rounded-lg border border-[#ffffff14] bg-[#0d0d0d] p-4"
                  >
                    <p className="text-2xl font-semibold text-[#d4af37]">
                      {stats[card.key]}
                    </p>
                    <p className="mt-1 text-xs text-[#a1a1aa]">{card.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
