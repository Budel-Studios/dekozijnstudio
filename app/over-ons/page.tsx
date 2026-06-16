import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Placeholder } from "@/components/ui/placeholder";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "De Kozijnstudio is opgericht vanuit MTB Bouw om de kozijnenmarkt transparanter te maken. Werkgebied: Twente & Oost-Nederland.",
  alternates: { canonical: "/over-ons" },
};

const kernwaarden = [
  "Transparantie — alle kosten zichtbaar, niets verborgen",
  "Kwaliteit — toonaangevende profielen en gecertificeerde monteurs",
  "Eerlijkheid — we zeggen wat we doen, en doen wat we zeggen",
  "Brede dienstverlening — van levering tot complete verbouwbegeleiding",
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Over De Kozijnstudio"
        title="Opgericht om de kozijnenmarkt eerlijker te maken."
        lead="De Kozijnstudio is een initiatief van MTB Bouw. Onze missie: kozijnen leveren en plaatsen met volledige prijstransparantie, zonder verborgen marges of onduidelijke offertes."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Over ons" }]}
        actions={<Button href="/offerte-aanvragen">Offerte aanvragen</Button>}
        media={<Placeholder label="Team De Kozijnstudio" className="min-h-72 lg:min-h-80" />}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Ons verhaal</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Waarom De Kozijnstudio?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Als bouwbedrijf zagen we bij MTB Bouw hoe klanten keer op keer
              teleurgesteld werden door onduidelijke kozijnenoffertes:
              aanvangsprijzen die tijdens het project opliepen, materialen die
              niet aan verwachtingen voldeden en coördinatieproblemen tussen
              kozijnen­leverancier en aannemer.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              Daarom richtten we De Kozijnstudio op: een kozijnleverancier die
              van begin af aan helder communiceert over kosten, materialen en
              proces — en die via MTB Bouw ook de bouwkundige aanpassingen kan
              regelen. Eén aanspreekpunt voor het hele project.
            </p>
          </div>
          <Placeholder label="Werkplaats / showroom" className="min-h-64" />
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Placeholder label="MTB Bouw logo / gevel" className="min-h-56" />
          <div>
            <Eyebrow>MTB Bouw</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              De kracht van een bouwbedrijf achter ons
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Als onderdeel van MTB Bouw profiteren onze klanten van de kennis
              en capaciteit van een volledig bouwbedrijf. Bouwkundige
              aanpassingen, constructief werk, metselwerk en
              binnenafwerking — we regelen het zelf, zonder uitbesteding.
            </p>
            <p className="mt-4 leading-relaxed text-ink/65">
              Werkgebied: <strong>Twente & Oost-Nederland</strong>. We zijn
              gestart in onze eigen regio en groeien gestaag. Vraag gerust of
              uw adres binnen ons werkgebied valt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/mtb-bouw">Over het partnerschap</Button>
              <Button href="https://www.mtbbouw.com" variant="secondary">
                Bezoek mtbbouw.com
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Eyebrow>Kernwaarden</Eyebrow>
          <h2 className="mt-4 mb-6 text-2xl text-ink sm:text-3xl">
            Waar we voor staan
          </h2>
          <FeatureList items={kernwaarden} />
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Kennis maken?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Neem contact op of vraag direct een vrijblijvende offerte aan.
            We denken graag met u mee.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/contact" variant="secondary">Contact</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
