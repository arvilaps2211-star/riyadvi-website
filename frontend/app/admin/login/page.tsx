"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { adminApi } from "@/lib/api";

type Status = "idle" | "loading" | "error";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const result = await adminApi.login(email, password);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.message);
      return;
    }

    router.replace("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            Riyadvi Software Technologies
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Admin Sign In</h1>
          <p className="mt-1 text-sm text-[#a1a1aa]">
            Sign in to manage leads and applications.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#ffffff14] bg-[#0d0d0d] p-6 shadow-[0_0_0_1px_rgba(212,175,55,0.06)]"
        >
          <div className="mb-4">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#ffffff1f] bg-[#050505] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#d4af37]"
              placeholder="admin@riyadvi.com"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[#ffffff1f] bg-[#050505] px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#d4af37]"
              placeholder="••••••••"
            />
          </div>

          {status === "error" && errorMessage && (
            <div
              role="alert"
              className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-md bg-[#d4af37] px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-[#e0bc4a] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
