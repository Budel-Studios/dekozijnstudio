import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small uppercase label with a lime accent bar — the recurring MTB Bouw
 * brand signature. Lime is used as a solid shape (not as the text colour),
 * keeping it accessible on light backgrounds.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-ink/60",
        className,
      )}
    >
      <span aria-hidden className="h-3.5 w-1 rounded-full bg-lime" />
      {children}
    </p>
  );
}
