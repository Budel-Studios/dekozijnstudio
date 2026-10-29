import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Callout } from "@/components/ui/callout";
import { LEGAL_LAST_UPDATED } from "@/data/company";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

/**
 * Shared layout for legal pages: hero + concept disclaimer + prose.
 * The disclaimer makes clear these texts are drafts that still need a legal
 * check — we never present invented legal text as final.
 *
 * `path` adds BreadcrumbList JSON-LD. `lastUpdated` overrides the shared
 * LEGAL_LAST_UPDATED date for a page that was revised on its own.
 */
export function LegalLayout({
  title,
  intro,
  path,
  lastUpdated = LEGAL_LAST_UPDATED,
  children,
}: {
  title: string;
  intro?: string;
  path?: string;
  lastUpdated?: string;
  children: ReactNode;
}) {
  return (
    <>
      {path && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: title, href: path }])),
          }}
        />
      )}
      <div className="border-b border-mist bg-paper-soft py-12 sm:py-16">
        <Container width="narrow">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
          </div>
          <Eyebrow>Juridisch</Eyebrow>
          <h1 className="mt-4 text-display-sm text-ink sm:text-display">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/60">{intro}</p>}
          <p className="mt-5 text-sm text-ink/40">Laatst bijgewerkt: {lastUpdated}</p>
        </Container>
      </div>

      <div className="py-12 sm:py-16">
        <Container width="narrow">
          <Callout variant="disclaimer" title="Concept, nog juridisch te toetsen" className="mb-10">
            <p>
              Deze tekst is een concept en wordt nog door een jurist gecontroleerd.
              Heb je een vraag over deze tekst? Neem dan gerust contact met ons op.
            </p>
          </Callout>

          <div className="prose prose-base max-w-none">{children}</div>
        </Container>
      </div>
    </>
  );
}
