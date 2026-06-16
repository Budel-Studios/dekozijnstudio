import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Placeholder } from "@/components/ui/placeholder";

/**
 * Hero SHELL (fase 1) — layout with empty text/media slots.
 * Real copy and imagery arrive in fase 2.
 */
export function Hero({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <section className="bg-paper-soft">
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          {eyebrow && <div className="mb-5">{eyebrow}</div>}
          <h1 className="text-display-sm sm:text-display lg:text-display-lg text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              {subtitle}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>
          )}
        </div>
        <div>{media ?? <Placeholder label="Hero-beeld" className="min-h-72 lg:min-h-96" />}</div>
      </Container>
    </section>
  );
}
