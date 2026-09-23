import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "High-performance websites and web platforms built for reliability, speed, and scale.",
    description:
      "Custom web development tailored to your business goals, from marketing sites to complex web applications.",
    iconId: "globe",
    href: "/services/web-development",
    problem:
      "Many businesses rely on outdated sites, fragmented tools, or templates that cannot support growth, SEO, or complex workflows.",
    solution:
      "Riyadvi designs and engineers web platforms that are fast, maintainable, and aligned with how your team and customers actually work.",
    features: [
      "Custom marketing and product websites",
      "Web applications and dashboards",
      "Performance and Core Web Vitals focus",
      "CMS and content workflows",
      "Secure, scalable architecture",
      "Ongoing iteration support",
    ],
    industries: [
      "Professional services",
      "Healthcare",
      "Real estate",
      "Retail & e-commerce",
      "Education",
      "Manufacturing",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "WordPress",
      "PostgreSQL",
    ],
    process: [
      "Discovery & requirements",
      "Information architecture",
      "UI design collaboration",
      "Development & QA",
      "Launch & monitoring",
      "Iteration & growth",
    ],
    relatedPortfolioSlugs: ["puratap", "pearl-housing", "studio11"],
  },
  {
    slug: "app-development",
    title: "App Development",
    shortDescription:
      "Mobile and cross-platform applications designed for intuitive user experiences.",
    description:
      "End-to-end app development focused on usability, performance, and long-term maintainability.",
    iconId: "smartphone",
    href: "/services/app-development",
    problem:
      "Product ideas stall when teams lack a clear path from concept to a reliable, user-friendly application.",
    solution:
      "We build apps with clear product scope, thoughtful UX, and engineering practices that support releases and future features.",
    features: [
      "iOS, Android, and cross-platform apps",
      "Product discovery and MVP scoping",
      "API and backend integration",
      "Push notifications & offline patterns",
      "App Store / Play Store readiness",
      "Post-launch maintenance",
    ],
    industries: [
      "Healthcare technology",
      "Consumer services",
      "Field operations",
      "Education",
      "Lifestyle & wellness",
    ],
    technologies: [
      "React Native",
      "React",
      "Node.js",
      "TypeScript",
      "REST / GraphQL APIs",
    ],
    process: [
      "Product discovery",
      "UX flows & prototypes",
      "Architecture planning",
      "Sprint-based development",
      "QA & device testing",
      "Release & support",
    ],
    relatedPortfolioSlugs: ["laxmi-astro-ai", "visdoc", "cube-dental"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Digital strategies that connect your brand with the right audience across channels.",
    description:
      "Campaign planning, content direction, and digital presence support aligned with business growth.",
    iconId: "megaphone",
    href: "/services/digital-marketing",
    problem:
      "Brands often spend on channels without a coherent message, conversion path, or measurable digital strategy.",
    solution:
      "Riyadvi helps align brand storytelling, web presence, and campaign direction so marketing supports real business outcomes.",
    features: [
      "Digital presence audits",
      "Content and messaging direction",
      "Landing page strategy",
      "Campaign structure guidance",
      "Analytics and funnel review",
      "Brand-consistent creative direction",
    ],
    industries: [
      "Retail & lifestyle",
      "Professional services",
      "Healthcare",
      "Hospitality",
      "Local businesses",
    ],
    technologies: [
      "Google Analytics",
      "Meta Ads",
      "SEO foundations",
      "CRM integrations",
      "Landing page platforms",
    ],
    process: [
      "Audience & offer clarity",
      "Channel prioritization",
      "Creative direction",
      "Launch support",
      "Measurement review",
      "Optimization recommendations",
    ],
    relatedPortfolioSlugs: ["wanaromah-perfumers", "tony-guy", "puratap"],
  },
  {
    slug: "ar-vr",
    title: "AR / VR",
    shortDescription:
      "Immersive augmented and virtual experiences for product storytelling and engagement.",
    description:
      "Interactive AR and VR solutions for training, demos, and next-generation customer experiences.",
    iconId: "view",
    href: "/services/ar-vr",
    problem:
      "Complex products and spaces are hard to explain with static media alone, especially for demos, training, or remote selling.",
    solution:
      "We create immersive experiences that help audiences understand products, environments, and processes in context.",
    features: [
      "Product visualization in AR",
      "Training and simulation experiences",
      "Virtual showrooms and walkthroughs",
      "Web-based immersive demos",
      "Device and browser targeting advice",
      "Integration with existing digital channels",
    ],
    industries: [
      "Real estate",
      "Manufacturing",
      "Education & training",
      "Retail",
      "Healthcare education",
    ],
    technologies: [
      "Three.js",
      "React Three Fiber",
      "WebXR",
      "Blender / 3D pipelines",
      "Unity (project-dependent)",
    ],
    process: [
      "Use-case definition",
      "Experience storyboarding",
      "Asset & interaction design",
      "Prototype build",
      "Device testing",
      "Deployment & iteration",
    ],
    relatedPortfolioSlugs: ["studio11", "pearl-housing", "nugenica-biotech-lab"],
  },
  {
    slug: "3d-modeling",
    title: "3D Modeling",
    shortDescription:
      "Detailed 3D assets and visualizations for products, environments, and digital experiences.",
    description:
      "Precision 3D modeling to support web, app, and immersive project requirements.",
    iconId: "box",
    href: "/services/3d-modeling",
    problem:
      "Teams need production-ready 3D assets that look premium without breaking performance budgets on web and mobile.",
    solution:
      "Riyadvi produces optimized 3D models and visuals that fit real product, marketing, and interactive use cases.",
    features: [
      "Product and packaging models",
      "Environment and set pieces",
      "Optimized assets for real-time engines",
      "Render-ready marketing visuals",
      "Topology and UV best practices",
      "Pipeline handoff to development",
    ],
    industries: [
      "Consumer products",
      "Architecture & interiors",
      "Healthcare equipment",
      "Education",
      "E-commerce",
    ],
    technologies: [
      "Blender",
      "glTF / GLB",
      "Three.js",
      "Substance workflows",
      "PBR materials",
    ],
    process: [
      "Reference gathering",
      "Blockout & proportions",
      "Detail modeling",
      "Texturing & materials",
      "Optimization",
      "Delivery & integration support",
    ],
    relatedPortfolioSlugs: ["wanaromah-perfumers", "studio11", "cube-dental"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "Research-led interfaces that balance clarity, aesthetics, and business outcomes.",
    description:
      "User experience and interface design from discovery through polished, development-ready systems.",
    iconId: "palette",
    href: "/services/ui-ux-design",
    problem:
      "Products fail when interfaces look polished but confuse users, ignore workflows, or fight the brand.",
    solution:
      "We design experiences rooted in user goals and business constraints — then deliver systems developers can implement cleanly.",
    features: [
      "UX research & journey mapping",
      "Wireframes and interactive prototypes",
      "Visual design systems",
      "Accessibility-minded UI",
      "Design-to-dev handoff",
      "Usability review cycles",
    ],
    industries: [
      "SaaS & digital products",
      "Healthcare",
      "Finance & professional services",
      "E-commerce",
      "Education",
    ],
    technologies: [
      "Figma",
      "Design systems",
      "Prototyping tools",
      "Accessibility checklists",
      "Handoff for React / Next.js",
    ],
    process: [
      "Discovery workshops",
      "User flows",
      "Wireframing",
      "Visual design",
      "Prototype validation",
      "Developer collaboration",
    ],
    relatedPortfolioSlugs: ["visdoc", "laxmi-astro-ai", "sivam-physio-care"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
