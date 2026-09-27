"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { adminApi, type AdminUser } from "@/lib/api";

type AdminAuthState = {
  admin: AdminUser | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthState | null>(null);

/**
 * Client-side gate for every /admin/(protected) page. The frontend and
 * backend are separate deployables, so the HttpOnly session cookie lives
 * on the backend's origin — a Next.js server component here has no way to
 * read it. Real enforcement is the backend's requireAdminAuth middleware
 * (every admin API call re-checks the cookie); this guard's job is purely
 * UX — show a loading state, then either the page or a redirect, instead
 * of a flash of protected content or a broken screen.
 */
export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const result = await adminApi.me();
      if (cancelled) return;
      if (result.success) {
        setAdmin(result.data.admin);
        setLoading(false);
      } else {
        router.replace("/admin/login");
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function logout() {
    await adminApi.logout();
    setAdmin(null);
    router.replace("/admin/login");
  }

  if (loading || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505]">
        <p className="text-sm text-[#a1a1aa]">Checking your session…</p>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used within AdminAuthGuard");
  }
  return ctx;
}
