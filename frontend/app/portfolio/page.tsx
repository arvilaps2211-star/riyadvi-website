import { portfolioProjects } from "@/data/portfolio";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageCta } from "@/components/ui/PageCta";
import { PageHero } from "@/components/ui/PageHero";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore selected Riyadvi client work across industries including healthcare, retail, real estate, and technology.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Selected Client Work"
        description="A selection of brands and products Riyadvi has supported. Each case study highlights challenge, solution, and related capabilities."
        actions={
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-16 lg:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <li key={project.slug}>
                <article className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-border-gold">
                  <div className="aspect-[16/10] border border-border bg-[linear-gradient(135deg,rgba(212,175,55,0.08),transparent_55%)]">
                    <div className="flex h-full items-end p-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                        {project.industry}
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-white">
                    {project.name}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {project.shortDescription}
                  </p>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-gold transition-colors hover:text-[#e0bc4a] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    View Case Study →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <PageCta
        title="Have a project in mind?"
        description="Tell us what you're building. We'll help define the right digital approach."
      />
    </>
  );
}
