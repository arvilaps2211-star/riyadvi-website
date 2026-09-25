import {
  getPortfolioProject,
  portfolioProjects,
} from "@/data/portfolio";
import { services } from "@/data/services";
import { PortfolioOrbitShowcase } from "@/components/portfolio/PortfolioOrbitShowcase";
import { PortfolioVisual } from "@/components/portfolio/PortfolioVisual";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PortfolioDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return { title: "Case Study Not Found" };
  return {
    title: `${project.name} Case Study`,
    description: `${project.shortDescription} Industry: ${project.industry}.`,
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) notFound();

  const relatedServices = services.filter((service) =>
    project.relatedServiceSlugs.includes(service.slug),
  );
  const relatedProjects = portfolioProjects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        (item.industry === project.industry ||
          item.relatedServiceSlugs.some((s) =>
            project.relatedServiceSlugs.includes(s),
          )),
    )
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.industry}
        title={project.name}
        description={project.shortDescription}
        actions={
          <>
            <Button href="/contact" variant="primary">
              Discuss a Similar Project
            </Button>
            <Button href="/portfolio" variant="outline">
              Back to Portfolio
            </Button>
          </>
        }
      />

      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Client", value: project.client },
              { label: "Industry", value: project.industry },
              {
                label: "Related Services",
                value: `${relatedServices.length} capabilities`,
              },
              { label: "Focus", value: "Digital experience" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-border bg-[#0a0a0a] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="border border-border bg-[#0a0a0a] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Challenge</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {project.challenge}
              </p>
            </div>
            <div className="border border-border bg-[#0a0a0a] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white">Solution</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {project.solution}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {project.technologies.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-white">Technologies</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="border border-border-gold/40 bg-surface px-3 py-1.5 text-xs font-medium text-gold"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.results.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-white">Results</h2>
                <ul className="mt-5 space-y-3">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="border-l border-border-gold/50 pl-4 text-sm text-muted"
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white">
              Visual Showcase
            </h2>
            <div className="mt-5">
              {project.interactive ? (
                <PortfolioOrbitShowcase />
              ) : (
                <PortfolioVisual variant={project.visualType} className="aspect-[21/9]" />
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-16">
        <Container>
          {relatedServices.length > 0 ? (
            <>
              <h2 className="text-2xl font-semibold text-white">Related Services</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {relatedServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className="inline-flex border border-border bg-[#0a0a0a] px-4 py-2 text-sm text-white transition-colors hover:border-border-gold hover:text-gold"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {relatedProjects.length > 0 ? (
            <>
              <h2 className="mt-12 text-2xl font-semibold text-white">
                Related Portfolio
              </h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((item) => (
                  <li key={item.slug}>
                    <article className="flex h-full flex-col border border-border bg-[#0a0a0a] p-5">
                      <p className="text-xs uppercase tracking-[0.14em] text-gold">
                        {item.industry}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {item.name}
                      </h3>
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className="mt-4 text-sm font-semibold text-gold"
                      >
                        View Case Study →
                      </Link>
                    </article>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Container>
      </section>

      <PageCta
        title="Let's build what your business needs next."
        description="Share your goals and we'll outline a practical digital approach."
      />
    </>
  );
}
