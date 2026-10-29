"use client";

import type { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

/**
 * Sticky table-of-contents sidebar for kennis articles.
 * Client component so it can highlight the active section as the user scrolls
 * (scroll-tracking added in a future iteration — for now: static list).
 */
export function ArticleToc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Inhoudsopgave" className="hidden lg:block">
      <div className="sticky top-32">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink/40">
          Inhoudsopgave
        </p>
        <ol className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-sm leading-snug transition-colors hover:text-forest",
                  item.level === 3 ? "pl-3 text-ink/50" : "text-ink/70",
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
