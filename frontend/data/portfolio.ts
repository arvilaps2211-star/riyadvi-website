import type { PortfolioProject } from "@/types/portfolio";

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "puratap",
    name: "Puratap",
    industry: "Water & Filtration",
    shortDescription:
      "Digital presence for a trusted water filtration brand focused on clarity and customer trust.",
    featuredOnHomepage: true,
  },
  {
    slug: "wanaromah-perfumers",
    name: "Wanaromah Perfumers",
    industry: "Luxury Fragrance",
    shortDescription:
      "Brand-forward web experience for a perfumery focused on craft, story, and product discovery.",
    featuredOnHomepage: true,
  },
  {
    slug: "laxmi-astro-ai",
    name: "Laxmi Astro AI",
    industry: "AI & Astrology",
    shortDescription:
      "Product experience combining guided digital journeys with an AI-assisted consultation flow.",
    featuredOnHomepage: true,
  },
  {
    slug: "tony-guy",
    name: "Tony & Guy",
    industry: "Salon & Lifestyle",
    shortDescription:
      "Salon brand digital experience highlighting services, style, and booking pathways.",
  },
  {
    slug: "studio11",
    name: "Studio11",
    industry: "Creative Studio",
    shortDescription:
      "Portfolio-led website architecture for a creative studio showcasing work and capabilities.",
  },
  {
    slug: "sivam-physio-care",
    name: "Sivam Physio Care",
    industry: "Healthcare",
    shortDescription:
      "Patient-focused healthcare website emphasizing services, trust, and accessible information.",
  },
  {
    slug: "pearl-housing",
    name: "Pearl Housing",
    industry: "Real Estate",
    shortDescription:
      "Property-focused digital platform structure for listings, inquiries, and brand credibility.",
  },
  {
    slug: "nugenica-biotech-lab",
    name: "Nugenica Biotech Lab",
    industry: "Biotechnology",
    shortDescription:
      "Professional laboratory web presence communicating research focus and institutional credibility.",
  },
  {
    slug: "visdoc",
    name: "VisDoc",
    industry: "Healthcare Technology",
    shortDescription:
      "Healthcare technology product website oriented around clarity, workflow, and user guidance.",
  },
  {
    slug: "cube-dental",
    name: "Cube Dental",
    industry: "Dental Care",
    shortDescription:
      "Dental practice digital experience supporting patient education and appointment engagement.",
  },
];

export const featuredPortfolioProjects = portfolioProjects.filter(
  (project) => project.featuredOnHomepage,
);
