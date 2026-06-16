import type { ReactNode } from "react";

export type Step = {
  title: string;
  description: ReactNode;
};

/**
 * Numbered process/timeline component.
 * Used on montage, DIY, offerte and over-ons pages.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-0">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <li key={index} className="relative flex gap-5">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-lime bg-lime/10 font-display text-sm font-semibold text-ink">
                {index + 1}
              </div>
              {!isLast && (
                <div className="mt-1 w-px flex-1 bg-mist" style={{ minHeight: "2rem" }} />
              )}
            </div>
            <div className={`pb-10 pt-1.5 ${isLast ? "" : ""}`}>
              <p className="font-semibold text-ink">{step.title}</p>
              <div className="mt-1.5 text-sm leading-relaxed text-ink/65">
                {step.description}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
