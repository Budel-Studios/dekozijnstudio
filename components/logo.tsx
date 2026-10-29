import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Brand mark "hoekprofiel": a frame corner with its rebate (sponning).
 * Outer profile inherits currentColor; inner profile is always brand lime.
 * Geometry is shared with app/icon.svg and public/brand/*.svg — keep in sync.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      focusable="false"
      className={cn("size-8 shrink-0", className)}
    >
      <path d="M5 38V5H38" fill="none" stroke="currentColor" strokeWidth="6" />
      <path d="M17 38V17H38" fill="none" stroke="var(--color-lime)" strokeWidth="6" />
    </svg>
  );
}

/** @deprecated Use LogoMark. Kept so older imports keep working. */
export const WindowMark = LogoMark;

/** Wordmark + mark. `inverse` for dark backgrounds. */
export function Logo({
  inverse = false,
  className,
}: {
  inverse?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="De Kozijnstudio, naar de homepage"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-md",
        inverse ? "text-paper" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      <span className="whitespace-nowrap font-display text-xl leading-none tracking-[-0.03em] sm:text-[1.375rem]">
        <span className="font-medium">de </span>
        <span className="font-extrabold">kozijn</span>
        <span className="font-medium">studio</span>
      </span>
    </Link>
  );
}
