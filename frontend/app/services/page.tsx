import { services } from "@/data/services";
import { serviceIcons } from "@/lib/service-icons";
import { ECOSYSTEM_TECH } from "@/components/3d/scene-config";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Metadata } from "next";
import Link from "next/link";

const APPROACH_STEPS = [
  "Strategy",
  "Design",
  "Development",
  "Marketing",
  "Optimization",
  "Growth",
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Riyadvi services including web development, app development, digital marketing, AR/VR, 3D modeling, and UI/UX design.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital Solutions Built for Growth"
        description="Six core capabilities to help your business design, build, and grow modern digital experiences."
        actions={
          <Button href="/contact" variant="primary">
            Get a Quote
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.iconId];
              return (
                <li key={service.slug} id={service.slug}>
                  <article className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-border-gold">
                    <div className="flex h-11 w-11 items-center justify-center border border-border-gold/40 text-gold">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-white">
                      {service.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex text-sm font-semibold text-gold transition-colors hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      View service
                      <span aria-hidden className="ml-1">
                        →
                      </span>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="services-technology-heading"
        className="border-b border-border bg-surface py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <SectionHeading
            eyebrow="Technology"
            title="A Modern, Proven Stack"
            description="The same technology ecosystem powering our homepage experience underpins every service below."
            alignment="center"
            className="max-w-3xl"
            titleId="services-technology-heading"
          />
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {ECOSYSTEM_TECH.map((tech) => (
              <li
                key={tech}
                className="border border-border-gold/40 bg-[#0a0a0a] px-4 py-2 text-xs font-medium tracking-wide text-gold sm:text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="services-approach-heading"
        className="border-b border-border bg-background py-14 sm:py-16 lg:py-20"
      >
        <Container>
          <SectionHeading
            eyebrow="Our Approach"
            title="From Strategy to Sustained Growth"
            description="Every engagement follows the same disciplined progression, adapted to the service and scope of your project."
            alignment="center"
            className="max-w-3xl"
            titleId="services-approach-heading"
          />
          <ProcessTimeline steps={APPROACH_STEPS} className="mt-10" />
        </Container>
      </section>

      <PageCta
        title="Need help choosing the right service?"
        description="Tell us about your goals and constraints. We'll recommend a practical next step."
        label="Book a Free Consultation"
      />
    </>
  );
}
