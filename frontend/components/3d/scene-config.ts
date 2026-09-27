export const GOLD = "#D4AF37";
export const SCENE_BG = "#050505";

export const HERO_NODES = [
  { id: "web", label: "Web" },
  { id: "apps", label: "Apps" },
  { id: "ai", label: "AI" },
  { id: "cloud", label: "Cloud" },
  { id: "data", label: "Data" },
  { id: "design", label: "Design" },
  { id: "three-d", label: "3D" },
  { id: "growth", label: "Digital Growth" },
] as const;

export type HeroNodeId = (typeof HERO_NODES)[number]["id"];

export const ECOSYSTEM_TECH = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "MySQL",
  "JavaScript",
  "Three.js",
  "React Three Fiber",
  "WordPress",
] as const;

export type EcosystemTech = (typeof ECOSYSTEM_TECH)[number];

export const ECOSYSTEM_RINGS: {
  radius: number;
  speed: number;
  y: number;
  items: readonly EcosystemTech[];
}[] = [
  {
    radius: 1.55,
    speed: 0.14,
    y: 0.42,
    items: ["React", "Next.js", "JavaScript"],
  },
  {
    radius: 2.2,
    speed: -0.09,
    y: 0.02,
    items: ["Node.js", "Three.js", "React Three Fiber"],
  },
  {
    radius: 2.85,
    speed: 0.07,
    y: -0.38,
    items: ["MongoDB", "MySQL", "WordPress"],
  },
];

export function heroNodePosition(
  index: number,
  total: number,
  radius: number,
): [number, number, number] {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const y = Math.sin(index * 1.15) * 0.42;
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
}
