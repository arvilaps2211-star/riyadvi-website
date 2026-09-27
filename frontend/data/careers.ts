import type { JobPosting } from "@/types/career";

export const jobs: JobPosting[] = [
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    location: "Hybrid / Remote-friendly",
    employmentType: "Full-time",
    experience: "2–5 years",
    description:
      "Build and maintain premium web applications for Riyadvi client projects using modern TypeScript, React, and Node.js stacks.",
    responsibilities: [
      "Develop frontend and backend features for client and internal products",
      "Collaborate with designers on implementation quality and accessibility",
      "Write maintainable TypeScript and participate in code reviews",
      "Support deployments, debugging, and iterative improvements",
    ],
    requirements: [
      "Strong experience with React and modern JavaScript/TypeScript",
      "Familiarity with Node.js APIs and relational or document databases",
      "Comfort working from product requirements to shipped features",
      "Clear written and verbal communication",
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Git"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Hybrid",
    employmentType: "Full-time",
    experience: "2–4 years",
    description:
      "Design clear, premium digital experiences for websites and products across Riyadvi’s client portfolio.",
    responsibilities: [
      "Lead discovery, wireframing, and high-fidelity UI design",
      "Create prototypes that communicate interaction and hierarchy",
      "Partner with engineers on feasible, polished implementation",
      "Maintain design consistency across projects",
    ],
    requirements: [
      "Portfolio demonstrating web/product UI/UX work",
      "Proficiency with Figma and modern design systems",
      "Understanding of responsive and accessible design",
      "Ability to translate business goals into user flows",
    ],
    skills: ["Figma", "Design systems", "Prototyping", "UI/UX research", "Accessibility"],
  },
  {
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    location: "On-site / Hybrid",
    employmentType: "Full-time",
    experience: "1–3 years",
    description:
      "Support campaign planning, content direction, and digital growth initiatives for Riyadvi clients and brand channels.",
    responsibilities: [
      "Contribute to channel strategy and campaign structure",
      "Coordinate landing page and content requirements with design/dev",
      "Track performance metrics and prepare clear reporting",
      "Support brand storytelling across digital touchpoints",
    ],
    requirements: [
      "Hands-on experience with digital campaigns or content marketing",
      "Comfortable with analytics dashboards and basic funnel metrics",
      "Strong writing and organizational skills",
      "Interest in technology and business brand storytelling",
    ],
    skills: [
      "Content strategy",
      "Campaign planning",
      "Analytics",
      "SEO foundations",
      "Stakeholder communication",
    ],
  },
];

export function getJob(slug: string) {
  return jobs.find((job) => job.slug === slug);
}
