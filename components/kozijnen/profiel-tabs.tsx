"use client";

import { Children, useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProfielTab = {
  id: string;
  titel: string;
  /** Weergavelabel voor de materiaal-badge (Hout / Kunststof / Aluminium). */
  materiaal: string;
};

/**
 * Tab-selector voor de profielen op /kozijnen. De panelen (children) worden
 * server-side gerenderd en als children doorgegeven; alle panelen blijven in
 * de DOM (verborgen via `hidden`) zodat de inhoud crawlbaar blijft voor SEO.
 */
export function ProfielTabs({
  tabs,
  children,
}: {
  tabs: ProfielTab[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const panels = Children.toArray(children);

  return (
    <div>
      {/* Tablijst */}
      <div
        role="tablist"
        aria-label="Kies een profiel"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {tabs.map((tab, i) => {
          const selected = i === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActive((active + 1) % tabs.length);
                if (e.key === "ArrowLeft") setActive((active - 1 + tabs.length) % tabs.length);
              }}
              className={cn(
                "flex shrink-0 flex-col items-start gap-1 border px-4 py-3 text-left transition-colors",
                selected
                  ? "border-forest bg-forest/5 ring-1 ring-forest/20"
                  : "border-mist bg-paper hover:bg-paper-soft",
              )}
            >
              <span className="text-sm font-medium text-ink">{tab.titel}</span>
              <span
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-wide",
                  selected ? "text-forest" : "text-ink/45",
                )}
              >
                {tab.materiaal}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panelen — alle in de DOM, alleen het actieve zichtbaar */}
      <div className="mt-6">
        {panels.map((panel, i) => (
          <div
            key={tabs[i]?.id ?? i}
            role="tabpanel"
            id={`${baseId}-panel-${i}`}
            aria-labelledby={`${baseId}-tab-${i}`}
            hidden={i !== active}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
