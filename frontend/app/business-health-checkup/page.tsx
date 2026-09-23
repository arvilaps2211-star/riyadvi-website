import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Health Checkup",
  description:
    "Evaluate your digital presence, technology readiness, and growth opportunities with Riyadvi.",
};

const focusAreas = [
  "Digital presence and website clarity",
  "Technology readiness and maintainability",
  "Customer journey and conversion paths",
  "Content and brand consistency",
  "Opportunities for product or experience upgrades",
];

export default function BusinessHealthCheckupPage() {
  return (
    <>
      <PageHero
        eyebrow="Lead Magnet"
        title="Is Your Business Ready for Its Next Digital Growth Stage?"
        description="Riyadvi helps businesses evaluate digital presence, technology readiness, and growth opportunities — so you can prioritize the next steps with clarity."
        actions={
          <Button href="/contact" variant="primary">
            Book a Free Consultation
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">What we review</h2>
              <ul className="mt-6 space-y-3">
                {focusAreas.map((item) => (
                  <li
                    key={item}
                    className="border-l border-border-gold/50 pl-4 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-muted">
                The multi-step checkup form and lead capture backend will be
                implemented in a later stage. This page establishes the route and
                positioning so CTAs across the site navigate correctly.
              </p>
            </div>
            <div className="border border-border-gold/30 bg-[#0a0a0a] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Get started</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Prefer a conversation first? Book a free consultation and we will
                help you decide whether a structured checkup is the right next
                step.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary" className="w-full sm:w-auto">
                  Talk to Riyadvi
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
