import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showTagline?: boolean;
  href?: string | null;
  size?: "sm" | "md" | "lg" | "hero";
  variant?: "default" | "on-dark";
};

const sizeMap = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  hero: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
};

export function Logo({
  className,
  showTagline = false,
  href = "/",
  size = "md",
  variant = "default",
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex flex-col", className)}>
      <span
        className={cn(
          "font-heading font-bold tracking-tight text-primary",
          sizeMap[size]
        )}
      >
        TieCodes
      </span>
      {showTagline && (
        <span
          className={cn(
            "mt-1 text-[0.65em] font-medium tracking-[0.12em]",
            size === "hero" ? "text-sm sm:text-base md:text-lg" : "text-xs",
            variant === "on-dark" ? "text-navy-foreground/70" : "text-muted-foreground"
          )}
        >
          innovate.connect.inspire.
        </span>
      )}
    </span>
  );

  if (href == null) return content;
  return (
    <Link
      href={href}
      className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {content}
    </Link>
  );
}
