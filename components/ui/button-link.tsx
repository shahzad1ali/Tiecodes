import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";

type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, "className"> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  };

/** Link styled as a Button — sets nativeButton={false} for Base UI + Next Link. */
export function ButtonLink({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Button
      nativeButton={false}
      variant={variant}
      size={size}
      className={className}
      render={<Link {...props} />}
    >
      {children}
    </Button>
  );
}
