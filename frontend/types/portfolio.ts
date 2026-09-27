/**
 * Visual treatment used on the case-study hero and portfolio cards.
 * Mirrors the Service.iconId → ServiceHeroVisual pattern from Stage 5:
 * one field drives a lightweight, reusable SVG/CSS visual instead of a
 * separate "visuals" data structure that would need to be kept in sync.
 */
export type PortfolioVisualType =
  | "product"
  | "interface"
  | "mobile"
  | "dashboard"
  | "healthcare"
  | "architecture"
  | "ai-data"
  | "3d";

export type PortfolioProject = {
  id: string;
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
  visualType: PortfolioVisualType;
  featuredOnHomepage?: boolean;
  /**
   * Marks the single case study (per assignment requirement) that gets the
   * richer interactive showcase instead of the static visual. Data-driven
   * so the page component doesn't hardcode a slug check.
   */
  interactive?: boolean;
};

export function getPortfolioBySlug(slug: string, catalog: PortfolioProject[]) {
  return catalog.find((project) => project.slug === slug);
}
