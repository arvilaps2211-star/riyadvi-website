import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
      <body className="flex min-h-full flex-col antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
