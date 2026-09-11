import { AiIntelligenceSection } from "@/components/sections/ai-intelligence";
import { CapabilitiesSection } from "@/components/sections/capabilities";
import { CtaBand } from "@/components/sections/cta-band";
import { HeroSection } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { ProductsSection } from "@/components/sections/products";
import { TechStackSection } from "@/components/sections/tech-stack";
import { WhyUsSection } from "@/components/sections/why-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
      <ProductsSection />
      <AiIntelligenceSection />
      <ProcessSection />
      <TechStackSection />
      <WhyUsSection />
      <CtaBand />
    </>
  );
}
