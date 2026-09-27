"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/**
 * The admin dashboard (Phase 9) uses its own layout (sidebar + header,
 * defined in app/admin/(protected)/layout.tsx) rather than the public
 * marketing site's Navbar/Footer. Since Next.js always renders the root
 * layout for every route, this client-side check is how a single root
 * layout can serve both without duplicating <html>/<body>.
 *
 * Phase 10A: SmoothScrollProvider (Lenis) wraps only this public branch —
 * admin pages never get smooth-scroll behavior, keeping table scrolling,
 * sticky headers, and keyboard navigation in the dashboard exactly as
 * native as before.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <SmoothScrollProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
