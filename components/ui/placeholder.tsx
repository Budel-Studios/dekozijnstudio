import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A clearly-marked placeholder block for wireframes.
 * Dashed border + label make it obvious this is not final content
 * (CLAUDE.md: missing photos/figures must be marked as placeholders).
 */
export function Placeholder({
  label = "Beeld volgt",
  className,
  children,
}: {
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder — ${label}`}
      className={cn(
        "flex min-h-40 items-center justify-center rounded-card border border-dashed border-ink/20 bg-mint/60 p-6 text-center",
        className,
      )}
    >
      <span className="text-sm font-medium uppercase tracking-widest text-ink/45">
        {children ?? label}
      </span>
    </div>
  );
}

/** Small inline tag that flags placeholder/wireframe content. */
export function PlaceholderTag({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill border border-dashed border-wood/60 bg-wood/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-wood">
      <span aria-hidden className="size-1.5 rounded-full bg-wood" />
      {children ?? "Wireframe · placeholder"}
    </span>
  );
}
