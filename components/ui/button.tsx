import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-paper hover:bg-forest-hover",
  secondary: "border border-ink/15 bg-paper text-ink hover:bg-paper-soft",
  ghost: "text-ink hover:bg-paper-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (SharedProps & ComponentProps<"button"> & { href?: undefined })
  | (SharedProps &
      Omit<ComponentProps<typeof Link>, "href"> & { href: string });

/**
 * Polymorphic button: renders a Next.js <Link> when `href` is set,
 * otherwise a native <button>.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    // Externe links openen automatisch in een nieuw tabblad.
    const isExternal = /^https?:\/\//.test(props.href);
    const externalAttrs = isExternal
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};
    return <Link className={classes} {...externalAttrs} {...props} />;
  }

  return <button className={classes} {...(props as ComponentProps<"button">)} />;
}
