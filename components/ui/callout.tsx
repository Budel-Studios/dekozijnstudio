import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "disclaimer";

const styles: Record<CalloutVariant, string> = {
  info: "border-forest/20 bg-forest/5 text-forest",
  warning: "border-wood/30 bg-wood/8 text-ink",
  disclaimer:
    "border-mist bg-paper-soft text-ink/65 text-sm",
};

/**
 * Highlighted info / disclaimer box.
 * Used for ISDE disclaimers, pricing notes, and legal caveats.
 */
export function Callout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-card border px-5 py-4 leading-relaxed",
        styles[variant],
        className,
      )}
    >
      {title && <p className="mb-1.5 font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  );
}
