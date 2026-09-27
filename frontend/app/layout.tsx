import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
