import { BusinessHealthCheckupCTA } from "@/components/sections/BusinessHealthCheckupCTA";
import { DigitalTransformation } from "@/components/sections/DigitalTransformation";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TechnologyEcosystem } from "@/components/sections/TechnologyEcosystem";
import { WhyRiyadvi } from "@/components/sections/WhyRiyadvi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Riyadvi Software Technologies | Custom Software & Digital Solutions",
  description:
    "Riyadvi Software Technologies delivers custom software, web and app development, UI/UX design and digital solutions tailored to business growth.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <DigitalTransformation />
      <ServicesPreview />
      <TechnologyEcosystem />
      <WhyRiyadvi />
      <PortfolioPreview />
      <BusinessHealthCheckupCTA />
      <FinalCTA />
    </>
  );
}
