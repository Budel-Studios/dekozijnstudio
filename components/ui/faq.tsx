import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

/**
 * Accessible accordion built on native <details>/<summary> — keyboard and
 * screen-reader friendly with no client-side JS.
 */
export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-mist border-y border-mist">
      {items.map((item, index) => (
        <details key={index} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium text-ink [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDownIcon className="size-5 shrink-0 text-forest transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="pb-5 leading-relaxed text-ink/70">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
