import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "digital-transformation-roadmap-for-growing-businesses",
    title: "A Practical Digital Transformation Roadmap for Growing Businesses",
    excerpt:
      "How to move from fragmented tools and outdated websites to a focused digital plan that supports real growth.",
    category: "Strategy",
    date: "2025-11-12",
    author: "Riyadvi Team",
    tags: ["digital transformation", "strategy", "growth"],
    featured: true,
    content: [
      "Digital transformation is not a single project. For most growing businesses, it is a sequence of practical decisions about websites, products, data, and customer experience.",
      "Start with the business challenge. Clarify who you serve, what outcomes matter, and which digital gaps create the most friction — outdated websites, unclear offers, slow processes, or missing measurement.",
      "Next, prioritize. Not every idea deserves investment at once. A focused roadmap usually begins with foundations: a reliable web presence, clear conversion paths, and systems your team can maintain.",
      "Design and technology should follow strategy. When experience design and engineering are aligned to business goals, launches create momentum instead of ongoing rework.",
      "Finally, treat growth as continuous. Measure what matters, iterate on what customers struggle with, and expand capabilities when the foundation is stable.",
    ],
  },
  {
    slug: "why-custom-software-beats-templates-at-scale",
    title: "Why Custom Software Beats Templates at Scale",
    excerpt:
      "Templates are useful for speed. Custom software becomes essential when your workflows, brand, and growth goals outgrow one-size-fits-all tools.",
    category: "Software",
    date: "2025-10-03",
    author: "Riyadvi Team",
    tags: ["custom software", "web development", "architecture"],
    content: [
      "Templates help teams launch quickly. They struggle when business rules, integrations, and brand requirements become specific.",
      "Custom software is not about building everything from scratch for its own sake. It is about shaping systems around how your organization actually operates.",
      "At scale, the costs of workarounds — manual exports, brittle plugins, inconsistent UX — often exceed the investment in a maintainable custom foundation.",
      "Riyadvi approaches custom builds with pragmatism: reuse proven platforms where they fit, and engineer bespoke layers where differentiation and reliability matter.",
    ],
  },
  {
    slug: "ui-ux-principles-for-business-websites",
    title: "UI/UX Principles That Make Business Websites Convert",
    excerpt:
      "Premium design is more than aesthetics. Clarity, hierarchy, and trust determine whether visitors take the next step.",
    category: "Design",
    date: "2025-09-18",
    author: "Riyadvi Team",
    tags: ["ui/ux", "conversion", "design"],
    content: [
      "Visitors decide quickly whether a business website feels credible. Typography, spacing, and visual hierarchy do more than decorate — they communicate competence.",
      "Every important page needs one primary action. When CTAs compete, conversion suffers.",
      "Mobile behavior should shape layout decisions early. A desktop-first composition that collapses awkwardly rarely recovers trust on smaller screens.",
      "Good UX also means honest content. Clear offers and realistic expectations outperform exaggerated claims every time.",
    ],
  },
  {
    slug: "preparing-your-business-for-3d-and-immersive-web",
    title: "Preparing Your Business for 3D and Immersive Web Experiences",
    excerpt:
      "Interactive 3D can elevate product storytelling — when performance, purpose, and audience are considered first.",
    category: "Innovation",
    date: "2025-08-21",
    author: "Riyadvi Team",
    tags: ["3d", "three.js", "immersive"],
    content: [
      "Immersive web experiences are most effective when they solve a communication problem: complex products, spatial understanding, or premium brand presence.",
      "Performance budgets matter. Beautiful scenes that stall on mobile undermine the brand they were meant to elevate.",
      "Start with a clear storyboard: what should users understand after interacting for 10–20 seconds?",
      "When purpose and constraints are defined early, tools like Three.js and React Three Fiber become strategic — not decorative.",
    ],
  },
  {
    slug: "how-to-brief-a-software-partner",
    title: "How to Brief a Software Partner Effectively",
    excerpt:
      "A strong brief saves time, budget, and misalignment. Here is what growing teams should include before development starts.",
    category: "Partnership",
    date: "2025-07-09",
    author: "Riyadvi Team",
    tags: ["project planning", "collaboration", "discovery"],
    content: [
      "Share the business context first: audience, competitors, constraints, and what success looks like in practical terms.",
      "Describe current pain points honestly. Screenshots, process notes, and examples of what is broken are more useful than vague wish lists.",
      "Define must-haves versus later-phase ideas. Clear prioritization protects both timeline and quality.",
      "Agree on decision-makers and communication cadence early. Projects move faster when ownership is explicit.",
    ],
  },
];

export const featuredBlogPost = blogPosts.find((post) => post.featured) ?? blogPosts[0];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
);
