import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm font-semibold tracking-[0.14em] text-primary uppercase",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}
