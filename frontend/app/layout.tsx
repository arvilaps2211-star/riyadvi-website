import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

// Self-hosted, not next/font/google: the production build previously
// depended on reaching fonts.googleapis.com at build time (see Phase 11's
// README note — `next build` hard-failed on that network call, while
// `next dev` merely warned and fell back). This is the exact same Inter
// typeface, sourced from @fontsource-variable/inter (SIL OFL 1.1 licensed,
// the same license Google Fonts distributes Inter under) as a single
// variable-weight woff2 — no build-time network dependency, same
// --font-inter CSS variable, same visual typography.
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Riyadvi Software Technologies",
    template: "%s | Riyadvi Software Technologies",
  },
  description:
    "Technology & Digital Solutions Partner — premium web, app, and digital innovation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className={`flex min-h-full flex-col antialiased`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
