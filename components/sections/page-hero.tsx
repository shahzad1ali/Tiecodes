import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "surface-slate relative overflow-hidden border-b border-primary/15 py-16 text-navy-foreground md:py-20",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #2eb7e5 1px, transparent 1px), linear-gradient(to bottom, #2eb7e5 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
