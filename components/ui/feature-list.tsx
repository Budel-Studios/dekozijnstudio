import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Unordered list with lime check-bullets.
 * Used for feature highlights, USPs and benefit lists throughout the site.
 */
export function FeatureList({
  items,
  className,
}: {
  items: Array<ReactNode | string>;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-sm text-ink/75 leading-relaxed">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/15">
            <CheckIcon className="size-3 text-forest" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
