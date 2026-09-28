"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Icon } from "@/components/brand/icon";
import { HoverLift } from "@/components/motion/hover-lift";
import { Reveal } from "@/components/motion/reveal";
import {
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/sections/section-heading";
import { capabilities } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 280;
const CARD_GAP = 16;
const SCROLL_SPEED = 0.90;

export function CapabilitiesSection() {
  const items = capabilities.slice(0, 6);
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const loopWidth = items.length * (CARD_WIDTH + CARD_GAP);

  const applyOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const width = loopWidth || 1;
    const normalized = ((offsetRef.current % width) + width) % width;
    offsetRef.current = normalized;
    track.style.transform = `translate3d(${-normalized}px, 0, 0)`;
  }, [loopWidth]);

  useEffect(() => {
    if (reduce) return;

    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current += SCROLL_SPEED;
        applyOffset();
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [applyOffset, reduce]);

  function pause() {
    pausedRef.current = true;
  }

  function resume() {
    pausedRef.current = false;
  }

  function scrollByCards(direction: -1 | 1) {
    pause();
    offsetRef.current += direction * (CARD_WIDTH + CARD_GAP);
    applyOffset();
  }

  function onZoneMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const ratio = x / bounds.width;
    if (ratio < 0.28) setHoverSide("left");
    else if (ratio > 0.72) setHoverSide("right");
    else setHoverSide(null);
  }

  const cards = reduce ? items : [...items, ...items];

  return (
    <section data-section="solutions" className="relative overflow-hidden py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--accent)]/40 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionEyebrow>Software house</SectionEyebrow>
          <SectionHeading>What we build for ambitious teams</SectionHeading>
          <SectionLead>
            TieCodes builds custom business software for fleet operations,
            service marketplaces, booking systems, and digital workflows — with
            the clarity of a modern product team and the depth of a logistics
            specialist.
          </SectionLead>
        </Reveal>

        <div
          className="relative mt-12"
          onMouseEnter={pause}
          onMouseLeave={() => {
            setHoverSide(null);
            resume();
          }}
          onMouseMove={onZoneMove}
        >
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className={cn(
                "flex items-stretch gap-4",
                reduce && "flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-3"
              )}
              style={reduce ? undefined : { width: "max-content" }}
            >
              {cards.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={cn(
                    "flex",
                    reduce ? "w-full" : "w-[280px] shrink-0"
                  )}
                >
                  <HoverLift className="flex h-full w-full">
                    <div className="panel-glass group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 transition-[border-color,box-shadow] hover:border-[color:var(--btn-hover)]/45 hover:shadow-[0_22px_50px_-30px_color-mix(in_srgb,var(--c-cyan)_55%,transparent)]">
                      <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                      <div className="icon-well relative flex size-12 items-center justify-center rounded-xl">
                        <Icon name={item.icon} className="size-5" />
                      </div>
                      <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </HoverLift>
                </div>
              ))}
            </div>
          </div>

          {!reduce ? (
            <>
              <button
                type="button"
                aria-label="Scroll cards left"
                onClick={() => scrollByCards(-1)}
                className={cn(
                  "absolute top-1/2 left-2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-md transition-all",
                  hoverSide === "left"
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                )}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Scroll cards right"
                onClick={() => scrollByCards(1)}
                className={cn(
                  "absolute top-1/2 right-2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-md transition-all",
                  hoverSide === "right"
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                )}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          ) : null}
        </div>

        <Reveal className="mt-10 flex justify-center sm:justify-start">
          <ButtonLink
            href="/services"
            size="lg"
            variant="outline"
            className="h-11 border-foreground/20 bg-transparent px-5 text-base text-foreground hover:bg-blue-500 hover:text-white"
          >
            View all services
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
