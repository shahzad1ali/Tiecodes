"use client";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { benefits, company } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="surface-dawn relative overflow-hidden border-y border-primary/10 py-20 text-foreground md:py-24">
      <div
        className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="panel-glass rounded-3xl p-8 sm:p-12">
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              Start a project
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build with a software house that understands logistics?
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Tell us about your drivers, vehicles, and workflows. We will help you
              ship a custom platform — not generic software.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {benefits.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg" className="h-11 px-5">
                Contact {company.name}
              </ButtonLink>
              <ButtonLink
                href={company.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
                className="h-11 border-primary/25 bg-white/80 px-5 text-foreground hover:bg-primary/5 hover:text-foreground"
              >
                Follow on LinkedIn
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
