import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/brand/icon";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { HoverLift } from "@/components/motion/hover-lift";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { solutions } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Fleet management, GPS tracking, driver apps, taxi dispatch, and custom load boards from TieCodes.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Platforms for fleets, drivers, and brokers"
        description="Custom software for the logistics world — tracking, dispatch, registration, and white-label load boards you own."
      />

      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Stagger className="grid gap-5 md:grid-cols-2">
            {solutions.map((solution, i) => (
              <StaggerItem key={solution.slug}>
                <HoverLift>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className={`group flex h-full flex-col rounded-2xl p-7 transition-[border-color,box-shadow] hover:border-primary/45 ${
                      i === 0
                        ? "border border-primary/25 bg-gradient-to-br from-white via-[#f7fbff] to-[#e8f2ff] text-foreground shadow-[0_24px_50px_-34px_rgb(37_66_102_/_0.2)]"
                        : "panel-glass"
                    }`}
                  >
                    <div
                      className={`flex size-11 items-center justify-center rounded-xl ${
                        i === 0
                          ? "bg-primary/20 text-primary ring-1 ring-primary/30"
                          : "icon-well"
                      }`}
                    >
                      <Icon name={solution.icon} className="size-5" />
                    </div>
                    <h2
                      className={`mt-5 font-heading text-2xl font-semibold tracking-tight group-hover:text-primary ${
                        i === 0 ? "text-foreground" : ""
                      }`}
                    >
                      {solution.title}
                    </h2>
                    <p
                      className={`mt-3 flex-1 ${
                        i === 0 ? "text-muted-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {solution.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Explore {solution.shortTitle}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
        <ButtonLink href="/contact" size="lg">Talk to our team</ButtonLink>
      </div>

      <CtaBand />
    </>
  );
}
