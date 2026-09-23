export type PortfolioProject = {
  slug: string;
  name: string;
  client: string;
  industry: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  relatedServiceSlugs: string[];
  featuredOnHomepage?: boolean;
};

export function getPortfolioBySlug(slug: string, catalog: PortfolioProject[]) {
  return catalog.find((project) => project.slug === slug);
}
