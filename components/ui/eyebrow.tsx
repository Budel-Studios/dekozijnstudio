import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Small uppercase label with a lime accent dot — the recurring brand
 * signature. Lime is used as a solid shape (not as the text colour),
 * keeping it accessible on light backgrounds.
 */

// A caller-supplied text colour replaces the default (cn does not merge conflicts).
const hasTextColor = /(^|\s)text-(ink|paper|lime|forest|wood)/;

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
        "flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.12em]",
        !hasTextColor.test(className ?? "") && "text-ink/70",
        className,
      )}
    >
      <span aria-hidden className="size-2 rounded-full bg-lime" />
      {children}
    </p>
  );
}
