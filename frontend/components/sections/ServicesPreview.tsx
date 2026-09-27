import { services } from "@/data/services";
import { serviceIcons } from "@/lib/service-icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export function ServicesPreview() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title="Digital Solutions Built for Growth"
            description="Six core capabilities designed to support product, brand, and technology goals across the digital lifecycle."
            className="max-w-2xl"
            titleId="services-heading"
          />
          <Button href="/services" variant="ghost" className="self-start lg:self-auto">
            View All Services
          </Button>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.iconId];
            return (
              <li key={service.slug}>
                <article className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-gold">
                  <div className="flex h-11 w-11 items-center justify-center border border-border-gold/40 bg-[#0a0a0a] text-gold transition-colors group-hover:border-gold/60">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex text-sm font-semibold text-gold transition-colors hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    Learn more
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
  );
}
