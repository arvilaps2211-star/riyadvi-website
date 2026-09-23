export type ServiceIconId =
  | "globe"
  | "smartphone"
  | "megaphone"
  | "view"
  | "box"
  | "palette";

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  iconId: ServiceIconId;
  href: string;
  problem: string;
  solution: string;
  features: string[];
  industries: string[];
  technologies: string[];
  process: string[];
  relatedPortfolioSlugs: string[];
};

export function getServiceBySlug(slug: string, catalog: Service[]) {
  return catalog.find((service) => service.slug === slug);
}
