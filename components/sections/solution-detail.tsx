import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/brand/icon";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import type { Solution } from "@/lib/content";

export function SolutionDetail({ solution }: { solution: Solution }) {
  return (
    <>
      <section className="surface-slate relative overflow-hidden border-b border-primary/15 py-16 text-navy-foreground md:py-20">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <Link
              href="/solutions"
              className="text-sm font-medium text-primary hover:underline"
            >
              ← All solutions
            </Link>
            <div className="mt-6 flex size-12 items-center justify-center rounded-xl bg-primary/20 text-primary ring-1 ring-primary/30">
              <Icon name={solution.icon} className="size-6" />
            </div>
            <h1 className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {solution.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-navy-foreground/70">
              {solution.problem}
            </p>
            <div className="mt-8">
              <ButtonLink href="/contact" size="lg" className="h-11 px-5">
                Discuss this solution
                <ArrowRight data-icon="inline-end" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="surface-mist py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              Capabilities
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              What we engineer into the platform
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Everything teams need to run {solution.title.toLowerCase()} with
              clarity — built around your workflows.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solution.features.map((feature) => (
              <StaggerItem key={feature}>
                <div className="panel-glass flex items-start gap-3 rounded-xl p-4 transition-[border-color] hover:border-primary/40">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="surface-dawn border-t border-primary/10 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              Audience
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Who benefits
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.whoBenefits.map((who) => (
              <StaggerItem key={who}>
                <div className="panel-accent rounded-2xl p-5">
                  <p className="font-heading font-semibold">{who}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
