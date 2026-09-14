import type { Metadata } from "next";
import { FleetDemoDashboard } from "@/components/demo/fleet-demo-dashboard";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Live Demo",
  description: `Interactive fleet dashboard preview from ${company.name} — simulated tracking, filters, and route motion.`,
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Demo"
        title="Try a fleet overview experience"
        description="Filter vehicles, scan statuses, and watch a simulated route — a taste of the tracking products we build."
      />
      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <FleetDemoDashboard />
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" size="lg" className="h-11 px-5">
              Build this for your fleet
            </ButtonLink>
            <ButtonLink href="/solutions" variant="outline" size="lg" className="h-11 px-5">
              Browse solutions
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
