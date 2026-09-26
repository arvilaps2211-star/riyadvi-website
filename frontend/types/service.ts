export type ServiceIconId =
  | "globe"
  | "smartphone"
  | "megaphone"
  | "view"
  | "box"
  | "palette";

/**
 * The service hero visual reuses `iconId` as its variant key so the visual
 * language and the icon stay in sync without a second field to keep in
 * sync. See components/services/ServiceHeroVisual.tsx.
 */
export type ServiceCta = {
  /** Button label, e.g. "Get a Quote" or "Book a Free Consultation". */
  label: string;
  /** Heading shown on the closing CTA band for this service page. */
  title: string;
  /** Supporting copy shown beneath the CTA heading. */
  description: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  /** Short category label shown as the eyebrow above the service hero title. */
  heroLabel: string;
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
  cta: ServiceCta;
};

export function getServiceBySlug(slug: string, catalog: Service[]) {
  return catalog.find((service) => service.slug === slug);
}
