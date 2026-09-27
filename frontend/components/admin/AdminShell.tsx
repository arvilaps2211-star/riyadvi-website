"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { useAdminAuth } from "./AdminAuthGuard";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/applications", label: "Applications" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#ffffff14] bg-[#050505]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md p-2 text-[#a1a1aa] hover:text-white md:hidden"
            onClick={() => setMobileNavOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2.5 5h15M2.5 10h15M2.5 15h15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="text-sm font-semibold tracking-wide text-[#d4af37]">
            Riyadvi Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[#a1a1aa] sm:inline">
            {admin?.email}
          </span>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-[#ffffff14] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#d4af37]/40 hover:text-[#d4af37]"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileNavOpen ? "block" : "hidden"
          } w-full border-b border-[#ffffff14] bg-[#0d0d0d] md:block md:w-56 md:min-h-[calc(100vh-57px)] md:border-b-0 md:border-r`}
        >
          <nav className="flex flex-col gap-1 p-3">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[#d4af37]/10 text-[#d4af37]"
                      : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Page content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
