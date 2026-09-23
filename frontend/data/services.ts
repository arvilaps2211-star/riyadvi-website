import type { Service } from "@/types/service";
import {
  Box,
  Globe,
  Megaphone,
  Palette,
  Smartphone,
  View,
} from "lucide-react";

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "High-performance websites and web platforms built for reliability, speed, and scale.",
    description:
      "Custom web development tailored to your business goals, from marketing sites to complex web applications.",
    icon: Globe,
    href: "/services/web-development",
  },
  {
    slug: "app-development",
    title: "App Development",
    shortDescription:
      "Mobile and cross-platform applications designed for intuitive user experiences.",
    description:
      "End-to-end app development focused on usability, performance, and long-term maintainability.",
    icon: Smartphone,
    href: "/services/app-development",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Digital strategies that connect your brand with the right audience across channels.",
    description:
      "Campaign planning, content direction, and digital presence support aligned with business growth.",
    icon: Megaphone,
    href: "/services/digital-marketing",
  },
  {
    slug: "ar-vr",
    title: "AR / VR",
    shortDescription:
      "Immersive augmented and virtual experiences for product storytelling and engagement.",
    description:
      "Interactive AR and VR solutions for training, demos, and next-generation customer experiences.",
    icon: View,
    href: "/services/ar-vr",
  },
  {
    slug: "3d-modeling",
    title: "3D Modeling",
    shortDescription:
      "Detailed 3D assets and visualizations for products, environments, and digital experiences.",
    description:
      "Precision 3D modeling to support web, app, and immersive project requirements.",
    icon: Box,
    href: "/services/3d-modeling",
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "Research-led interfaces that balance clarity, aesthetics, and business outcomes.",
    description:
      "User experience and interface design from discovery through polished, development-ready systems.",
    icon: Palette,
    href: "/services/ui-ux-design",
  },
];
