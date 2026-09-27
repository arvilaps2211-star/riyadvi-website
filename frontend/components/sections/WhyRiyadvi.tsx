import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const journeyPhases = [
  {
    label: "2021",
    title: "Foundation",
    description:
      "Riyadvi has been operating since 2021, building digital solutions with a business-first mindset.",
  },
  {
    label: "Strategy",
    title: "Understanding the Business",
    description:
      "Projects begin with context — goals, users, constraints, and the outcomes that matter.",
  },
  {
    label: "Design",
    title: "Creating Experiences",
    description:
      "Interfaces and journeys are shaped for clarity, trust, and usability across devices.",
  },
  {
    label: "Technology",
    title: "Building Solutions",
    description:
      "Engineering turns strategy and design into reliable software and digital products.",
  },
  {
    label: "Growth",
    title: "Supporting Long-Term Digital Growth",
    description:
      "Beyond launch, Riyadvi supports iteration and ongoing digital improvement over time.",
  },
] as const;

export function WhyRiyadvi() {
  return (
    <section
      aria-labelledby="why-riyadvi-heading"
      className="border-b border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Why Riyadvi"
          title="A Partner Focused on Business Outcomes"
          description="From foundation to growth, Riyadvi approaches digital work as a continuous partnership — not a one-off delivery."
          className="max-w-2xl"
          titleId="why-riyadvi-heading"
        />

        <div className="mt-12 border-l border-border-gold/40 pl-6 sm:pl-8">
          <ol className="space-y-8">
            {journeyPhases.map((phase) => (
              <li key={phase.title} className="relative">
                <span
                  className="absolute -left-[calc(1.5rem+5px)] top-2 h-2.5 w-2.5 rounded-full border border-gold bg-gold sm:-left-[calc(2rem+5px)]"
                  aria-hidden
                />
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {phase.label}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {phase.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {phase.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
