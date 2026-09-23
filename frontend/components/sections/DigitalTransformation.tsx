import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const journeySteps = [
  {
    title: "Business Challenge",
    description: "Understand the problem, audience, and business context.",
  },
  {
    title: "Strategy",
    description: "Define direction, priorities, and a practical digital roadmap.",
  },
  {
    title: "Design",
    description: "Shape user journeys, interfaces, and brand-aligned experiences.",
  },
  {
    title: "Technology",
    description: "Engineer reliable solutions with scalable architecture.",
  },
  {
    title: "Launch",
    description: "Deploy, validate, and refine for a confident go-live.",
  },
  {
    title: "Growth",
    description: "Support iteration, optimization, and long-term digital momentum.",
  },
] as const;

export function DigitalTransformation() {
  return (
    <section
      aria-labelledby="digital-transformation-heading"
      className="border-b border-border bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Digital Transformation"
          title="From Business Challenge to Digital Growth"
          description="A structured path from understanding your business to building technology that supports measurable progress."
          alignment="center"
          className="max-w-3xl"
          titleId="digital-transformation-heading"
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journeySteps.map((step, index) => (
            <li key={step.title}>
              <article className="group flex h-full flex-col border border-border bg-[#0a0a0a] p-6 transition-colors duration-200 hover:border-border-gold">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < journeySteps.length - 1 ? (
                    <span
                      className="hidden text-gold/50 lg:inline"
                      aria-hidden
                    >
                      ↓
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
