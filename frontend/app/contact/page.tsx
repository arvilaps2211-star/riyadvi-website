import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation with Riyadvi Software Technologies. Tell us about your project goals and constraints.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book a Free Consultation"
        description="Tell us what you're building. We'll help you explore the right software, design, and digital direction for your business."
      />

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">
                How to reach us
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Contact form submission and CRM integration will be connected in
                a later stage. For now, use the pathways below to prepare a
                strong project brief.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-muted">
                <li className="border-l border-border-gold/50 pl-4">
                  Describe your business challenge and desired outcome.
                </li>
                <li className="border-l border-border-gold/50 pl-4">
                  Note timelines, constraints, and any existing systems.
                </li>
                <li className="border-l border-border-gold/50 pl-4">
                  Share links to current websites or product references if
                  available.
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/business-health-checkup" variant="primary">
                  Start Business Health Checkup
                </Button>
                <Button
                  href="/software-project-planning-guide"
                  variant="outline"
                >
                  Project Planning Guide
                </Button>
              </div>
            </div>

            <div className="border border-border-gold/30 bg-[#0a0a0a] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">
                Useful next steps
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  { href: "/services", label: "Explore services" },
                  { href: "/portfolio", label: "Browse portfolio" },
                  { href: "/careers", label: "View careers" },
                  { href: "/about", label: "About Riyadvi" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-semibold text-gold hover:text-[#e0bc4a]"
                    >
                      {item.label} →
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-xs leading-relaxed text-muted">
                Phone, email, and office details will be published when
                confirmed. We do not invent contact details for this stage.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
