import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Riyadvi Software Technologies has been operating since 2021 as a technology and digital solutions partner.",
};

const values = [
  {
    title: "Business first",
    description:
      "Technology decisions start from outcomes, constraints, and the people who will use the product.",
  },
  {
    title: "Craft & clarity",
    description:
      "Premium interfaces and maintainable engineering matter as much as shipping on time.",
  },
  {
    title: "Partnership",
    description:
      "We aim for long-term digital growth support — not one-off handoffs without context.",
  },
  {
    title: "Honest scope",
    description:
      "We prioritize what is practical, measurable, and sustainable for your team.",
  },
];

const milestones = [
  {
    label: "2021",
    title: "Foundation",
    description:
      "Riyadvi began operating as a technology and digital solutions partner.",
  },
  {
    label: "Strategy",
    title: "Understanding the business",
    description:
      "Engagements start with context: goals, users, constraints, and success criteria.",
  },
  {
    label: "Design",
    title: "Creating experiences",
    description:
      "Interfaces and journeys are shaped for clarity, trust, and usability.",
  },
  {
    label: "Technology",
    title: "Building solutions",
    description:
      "Engineering turns strategy and design into reliable software and digital products.",
  },
  {
    label: "Growth",
    title: "Supporting long-term digital growth",
    description:
      "Beyond launch, we support iteration and ongoing improvement over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Riyadvi"
        title="Technology & Digital Solutions Partner"
        description="Riyadvi Software Technologies has been operating since 2021, helping businesses design, build, and grow digital products and experiences."
        actions={
          <Button href="/contact" variant="primary">
            Work With Us
          </Button>
        }
      />

      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-white">Vision</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                To be a trusted partner for businesses that want digital products
                and experiences that feel premium, perform reliably, and support
                measurable growth.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Mission</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                Deliver custom software, web and app development, UI/UX design,
                and digital solutions with clear strategy, disciplined execution,
                and long-term partnership.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-white">Values</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <li
                key={value.title}
                className="border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-white">Our Approach</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            From business challenge to strategy, design, technology, launch, and
            growth — Riyadvi follows a structured path so digital investments
            stay aligned with outcomes.
          </p>
          <ol className="mt-10 space-y-8 border-l border-border-gold/40 pl-6 sm:pl-8">
            {milestones.map((item) => (
              <li key={item.title} className="relative">
                <span
                  className="absolute -left-[calc(1.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full border border-gold bg-gold sm:-left-[calc(2rem+5px)]"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {item.label}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <PageCta
        title="Let's talk about your next digital step."
        description="Share your goals and constraints — we'll help define a practical path forward."
      />
    </>
  );
}
