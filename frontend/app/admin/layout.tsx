import type { Metadata } from "next";

// Wraps every /admin/* route (the redirect page, /admin/login, and the
// whole (protected) group) without needing to touch any of those files
// individually — Next.js layouts nest automatically. The only thing this
// layout exists to do is keep the admin area out of search results: an
// admin login page showing up in a Google search is a real, common
// information-disclosure/hygiene issue (it tells anyone browsing search
// results that this admin panel exists and where it lives), not just a
// theoretical one.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
