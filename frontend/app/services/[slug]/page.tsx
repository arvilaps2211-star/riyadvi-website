import { portfolioProjects } from "@/data/portfolio";
import { getService, services } from "@/data/services";
import { serviceIcons } from "@/lib/service-icons";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { ServiceHeroVisual } from "@/components/services/ServiceHeroVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.iconId];
  const relatedProjects = portfolioProjects.filter((project) =>
    service.relatedPortfolioSlugs.includes(project.slug),
  );

  return (
    <>
      <PageHero
        eyebrow={service.heroLabel}
        title={service.title}
        description={service.description}
        actions={
          <>
            <Button href="/contact" variant="primary">
              {service.cta.label}
            </Button>
            <Button href="/services" variant="outline">
              All Services
            </Button>
          </>
        }
      />

      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <ServiceHeroVisual variant={service.iconId} />
            <div className="flex flex-col gap-8">
              <div className="flex h-12 w-12 items-center justify-center border border-border-gold/50 text-gold">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <div className="border border-border bg-[#0a0a0a] p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white">Problem</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {service.problem}
                </p>
              </div>
              <div className="border border-border bg-[#0a0a0a] p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-white">Solution</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {service.solution}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-white">Features</h2>
              <ul className="mt-5 space-y-3">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="border-l border-border-gold/50 pl-4 text-sm text-muted"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Industry Use Cases
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.industries.map((industry) => (
                  <li
                    key={industry}
                    className="border border-border bg-surface px-3 py-1.5 text-xs font-medium text-white"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
              <h2 className="mt-10 text-2xl font-semibold text-white">
                Technology Stack
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="border border-border-gold/40 bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-gold"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-white">Process</h2>
          <ProcessTimeline steps={service.process} className="mt-8" />
        </Container>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-b border-border bg-background py-14 sm:py-16">
          <Container>
            <h2 className="text-2xl font-semibold text-white">
              Related Portfolio
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <article className="flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-border-gold">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      {project.industry}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-muted">
                      {project.shortDescription}
                    </p>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="mt-5 text-sm font-semibold text-gold hover:text-[#e0bc4a]"
                    >
                      View Case Study →
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <PageCta
        title={service.cta.title}
        description={service.cta.description}
        label={service.cta.label}
      />
    </>
  );
}
