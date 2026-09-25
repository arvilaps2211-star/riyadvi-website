import { featuredPortfolioProjects } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";

export function PortfolioPreview() {
  return (
    <section
      aria-labelledby="portfolio-preview-heading"
      className="border-b border-border bg-surface py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected Client Work"
            description="A preview of brands and products Riyadvi has supported across industries. Full case studies will expand in a later stage."
            className="max-w-2xl"
            titleId="portfolio-preview-heading"
          />
          <Button href="/portfolio" variant="ghost" className="self-start lg:self-auto">
            View Full Portfolio
          </Button>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredPortfolioProjects.map((project) => (
            <li key={project.slug}>
              <article className="group flex h-full flex-col border border-border bg-[#0a0a0a] p-6 transition-colors duration-200 hover:border-border-gold">
                <div className="aspect-[16/10] border border-border bg-[linear-gradient(135deg,rgba(212,175,55,0.08),transparent_55%)] transition-colors group-hover:border-border-gold/50">
                  <div className="flex h-full items-end p-4">
                    {project.industry ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                        {project.industry}
                      </span>
                    ) : null}
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {project.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {project.shortDescription}
                </p>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold text-gold transition-colors hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  View Case Study
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
