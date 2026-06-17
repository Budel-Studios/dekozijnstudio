import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Callout } from "@/components/ui/callout";
import { LEGAL_LAST_UPDATED } from "@/data/company";

/**
 * Gedeelde lay-out voor juridische pagina's: hero + concept-disclaimer + prose.
 * De disclaimer maakt duidelijk dat dit concepten zijn die juridisch getoetst
 * moeten worden — we presenteren geen verzonnen juridische tekst als definitief.
 */
export function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="border-b border-mist bg-paper-soft py-12 sm:py-16">
        <Container width="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
          </div>
          <Eyebrow>Juridisch</Eyebrow>
          <h1 className="mt-4 text-display-sm text-ink sm:text-display">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/60">{intro}</p>}
          <p className="mt-5 text-sm text-ink/40">Laatst bijgewerkt: {LEGAL_LAST_UPDATED}</p>
        </Container>
      </div>

      <div className="py-12 sm:py-16">
        <Container width="narrow">
          <Callout variant="disclaimer" title="Concept — juridisch te toetsen" className="mb-10">
            <p>
              Dit document is een concept ter invulling. Bedrijfsspecifieke gegevens
              (zoals KvK-nummer en adres) en de definitieve formuleringen dienen te
              worden gecontroleerd en aangevuld. Laat juridische documenten vóór
              publicatie controleren door een jurist.
            </p>
          </Callout>

          <div className="prose prose-base max-w-none">{children}</div>
        </Container>
      </div>
    </>
  );
}
