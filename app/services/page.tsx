import type { Metadata } from "next";
import { Icon } from "@/components/brand/icon";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { capabilities, services, techStack } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, mobile apps, web platforms, fleet systems, GPS tracking, ERP, and digital consultancy from TieCodes.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Software development that moves with your business"
        description="From logistics-heavy operations to everyday business apps, we turn complex challenges into simple, powerful software."
      />

      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionEyebrow>What we build</SectionEyebrow>
            <SectionHeading>Full-stack product engineering</SectionHeading>
            <SectionLead>
              A software house bench covering web, mobile, GPS, and operations
              systems — delivered as owned platforms.
            </SectionLead>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <HoverLift>
                  <div className="panel-glass h-full rounded-2xl p-6 transition-[border-color,box-shadow] hover:border-primary/45">
                    <div className="icon-well flex size-10 items-center justify-center rounded-lg">
                      <Icon name={service.icon} className="size-5" />
                    </div>
                    <h2 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="surface-dawn border-y border-primary/10 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionEyebrow>Core practice</SectionEyebrow>
            <SectionHeading>How our team engages</SectionHeading>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((item) => (
              <StaggerItem key={item.title}>
                <div className="panel-accent h-full rounded-2xl border-l-4 border-l-primary p-5">
                  <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="surface-ink py-16 text-navy-foreground md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <SectionEyebrow>Stack</SectionEyebrow>
            <SectionHeading className="text-navy-foreground">
              Tools we use to ship
            </SectionHeading>
          </Reveal>
          <Stagger className="mt-10 flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <StaggerItem key={tech}>
                <span className="chip-glow inline-flex rounded-full px-4 py-2 text-sm font-medium">
                  {tech}
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
