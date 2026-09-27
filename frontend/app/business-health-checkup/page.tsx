import { HealthCheckupForm } from "@/components/forms/HealthCheckupForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Health Checkup",
  description:
    "A short, structured checkup covering digital presence, technology readiness, and growth priorities.",
};

const focusAreas = [
  "Digital presence and website clarity",
  "Technology readiness and maintainability",
  "Customer journey and conversion paths",
  "Growth priorities across web, app, and digital marketing",
  "A clear next step based on what you share",
];

export default function BusinessHealthCheckupPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Health Checkup"
        title="Is Your Business Ready for Its Next Digital Growth Stage?"
        description="Answer a few short questions about your digital presence, technology, and priorities. It takes a few minutes and helps frame a useful first conversation."
        actions={
          <Button href="/contact" variant="outline">
            Prefer to talk first? Book a consultation
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="border border-border bg-surface p-6 sm:p-8 lg:self-start">
              <h2 className="text-xl font-semibold text-white">What this covers</h2>
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
                This checkup reflects what you share with us — it is not an
                automated scoring engine. A member of the Riyadvi team
                reviews responses before any follow-up.
              </p>
            </div>

            <HealthCheckupForm />
          </div>
        </Container>
      </section>
    </>
  );
}
