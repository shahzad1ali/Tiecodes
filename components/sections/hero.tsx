"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FleetNetworkArt } from "@/components/brand/fleet-network-art";
import { Logo } from "@/components/brand/logo";
import { MovingTruck } from "@/components/motion/moving-truck";
import { ButtonLink } from "@/components/ui/button-link";
import { company } from "@/lib/content";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-background text-foreground">
      <div className="hero-glow absolute inset-0" />
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Unique geometric network art — no stock / LinkedIn photos */}
      <FleetNetworkArt className="pointer-events-none absolute inset-y-0 right-[-4%] hidden w-[52%] max-w-none opacity-70 md:block" />

      <MovingTruck className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto hidden h-44 w-[min(92vw,820px)] opacity-90 md:block" />

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 md:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo
            href={null}
            size="hero"
            showTagline
            className="max-w-4xl"
          />
        </motion.div>

        <motion.h1
          className="mt-8 max-w-2xl font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {company.headline}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          Custom fleet systems, GPS tracking, web portals, mobile apps, and
          workflow software for teams that need jobs, approvals, assignments,
          and operational clarity in one place.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <ButtonLink href="/solutions" size="lg" className="h-11 px-5 text-base">
            Explore solutions
            <ArrowRight data-icon="inline-end" />
          </ButtonLink>
          <ButtonLink
            href="/contact"
            size="lg"
            variant="outline"
            className="h-11 border-foreground/20 bg-transparent px-5 text-base text-foreground hover:bg-primary/5 hover:text-foreground"
          >
            Start a project
          </ButtonLink>
        </motion.div>

        <motion.div
          className="mt-10 md:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <MovingTruck className="h-36 w-full opacity-90" />
        </motion.div>
      </div>
    </section>
  );
}
