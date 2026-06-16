import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { OfferteWizard } from "@/components/offerte/offerte-wizard";
import { inmeetservice } from "@/data/prices";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag een vrijblijvende kozijnofferte aan via ons formulier. Na de inmeetservice ontvangt u een volledig gespecificeerde offerte incl. btw — geen verborgen kosten.",
  alternates: { canonical: "/offerte-aanvragen" },
};

const wat_u_krijgt = [
  `Inmeetservice ingepland (${inmeetservice.price} — verrekend bij doorgang)`,
  "Persoonlijke offerte met alle kostenposten apart",
  "Indicatie van ISDE-subsidie als aftrekpost",
  "Geen verplichtingen tot akkoord",
];

export default function OfferteAanvragenPage() {
  return (
    <>
      <PageHero
        eyebrow="Offerte aanvragen"
        title="Vrijblijvend. Volledig gespecificeerd. Zonder verborgen kosten."
        lead={`Vul het formulier in — het duurt twee minuten. Na uw aanvraag plannen we de inmeetservice in (${inmeetservice.price}, verrekend bij doorgang) en ontvangt u een gespecificeerde offerte.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Offerte aanvragen" }]}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Wizard */}
          <div>
            <OfferteWizard />
          </div>

          {/* Wat u kunt verwachten */}
          <aside className="lg:sticky lg:top-32">
            <Eyebrow>Wat u kunt verwachten</Eyebrow>
            <h2 className="mt-4 mb-6 text-xl font-semibold text-ink">Na uw aanvraag</h2>
            <FeatureList items={wat_u_krijgt} />

            <div className="mt-8 rounded-card border border-mist bg-paper-soft p-6">
              <p className="font-semibold text-ink">Inmeetservice</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Wij komen langs om de exacte maten op te nemen en uw situatie te
                beoordelen. Kosten: <strong>{inmeetservice.price}</strong>.{" "}
                {inmeetservice.note}
              </p>
            </div>

            <div className="mt-4 rounded-card border border-mist bg-paper-soft p-6">
              <p className="font-semibold text-ink">Betaling</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Kleine aanbetaling bij akkoord op de offerte (voor maatwerk),
                montage wordt achteraf gefactureerd.
              </p>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink/45">
              Uw gegevens worden uitsluitend gebruikt om uw offerte op te stellen
              en contact met u op te nemen — conform de AVG.
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}
