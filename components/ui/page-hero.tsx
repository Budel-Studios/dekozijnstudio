import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Placeholder } from "@/components/ui/placeholder";

/**
 * Shared hero for inner marketing pages.
 * Smaller than the homepage hero — consistent across all product/service/info pages.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  breadcrumbs,
  actions,
  media,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  media?: ReactNode;
}) {
  const hasMedia = media !== undefined;

  return (
    <section className="border-b border-mist bg-paper-soft">
      <Container
        className={`py-14 sm:py-18 lg:py-20 ${hasMedia ? "grid items-center gap-10 lg:grid-cols-2 lg:gap-16" : ""}`}
      >
        <div>
          {breadcrumbs && (
            <div className="mb-6">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <h1 className="text-display-sm sm:text-display text-ink tracking-tight">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">
              {lead}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
          )}
        </div>
        {hasMedia && (
          <div>
            {media ?? (
              <Placeholder label="Sfeerbeeld" className="min-h-72 lg:min-h-80" />
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
