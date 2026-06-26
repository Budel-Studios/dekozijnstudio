import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/**
 * Herbruikbaar CTA-blok op de donkere (ink) achtergrond.
 */
export function CtaBlok({
  titel,
  lead,
  actions,
}: {
  titel: ReactNode;
  lead?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <Section tone="ink">
      <Container className="text-center">
        <h2 className="text-2xl text-paper sm:text-3xl">{titel}</h2>
        {lead && (
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">{lead}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
      </Container>
    </Section>
  );
}
