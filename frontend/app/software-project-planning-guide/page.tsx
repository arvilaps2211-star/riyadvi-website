import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Project Planning Guide",
  description:
    "A practical guide to briefing and planning software projects with Riyadvi Software Technologies.",
};

const guideSections = [
  {
    title: "Clarify the business outcome",
    body: "Define what success looks like in practical terms — revenue, efficiency, trust, or product adoption — before listing features.",
  },
  {
    title: "Document current pain points",
    body: "Capture what is broken today: slow processes, confusing UX, missing integrations, or unreliable tools.",
  },
  {
    title: "Separate must-haves from later ideas",
    body: "Protect timeline and quality by prioritizing an MVP scope and parking nice-to-haves for later phases.",
  },
  {
    title: "Identify decision-makers",
    body: "Agree who approves scope, design, and technical trade-offs so delivery does not stall.",
  },
  {
    title: "Prepare references and constraints",
    body: "Share competitor examples, brand guidelines, budget bands, and compliance needs early.",
  },
];

export default function SoftwareProjectPlanningGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Resource"
        title="Software Project Planning Guide"
        description="Use this guide to prepare a clear brief before you engage a software partner — including Riyadvi."
        actions={
          <Button href="/contact" variant="primary">
            Discuss Your Project
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-16">
        <Container>
          <ol className="space-y-5">
            {guideSections.map((section, index) => (
              <li
                key={section.title}
                className="border border-border bg-surface p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {section.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-sm text-muted">
            Downloadable PDF generation and lead-gated delivery will be added in
            a later stage. This route is live so resource CTAs and footer links
            navigate correctly today.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="outline">
              Get planning help from Riyadvi
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
