"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

/**
 * The admin dashboard (Phase 9) uses its own layout (sidebar + header,
 * defined in app/admin/(protected)/layout.tsx) rather than the public
 * marketing site's Navbar/Footer. Since Next.js always renders the root
 * layout for every route, this client-side check is how a single root
 * layout can serve both without duplicating <html>/<body>.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
