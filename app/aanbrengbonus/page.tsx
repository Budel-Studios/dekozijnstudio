import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Callout } from "@/components/ui/callout";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps } from "@/components/ui/process-steps";

export const metadata: Metadata = {
  title: "Aanbrengbonus — verdien tot 25% terug",
  description:
    "Onze Aanbrengbonus: draag binnen een jaar na uw opdracht iemand aan en ontvang 3% van hun projectbedrag — oplopend tot 25% cashback op uw eigen project.",
  alternates: { canonical: "/aanbrengbonus" },
};

const aanbrengSteps = [
  {
    title: "U wordt klant",
    description: "U geeft akkoord op uw kozijnenproject. Vanaf dat moment loopt uw aanbrengjaar van 12 maanden.",
  },
  {
    title: "U draagt iemand aan",
    description:
      "Binnen dat jaar geeft u uw persoonlijke aanbrengcode door aan een vriend, buur of familielid die ook kozijnen wil.",
  },
  {
    title: "Zij worden klant",
    description: "De persoon die u aandroeg vraagt een offerte aan en plaatst een opdracht bij De Kozijnstudio.",
  },
  {
    title: "U ontvangt uw bonus",
    description:
      "Na oplevering van hun project ontvangt u 3% van hun projectbedrag (excl. btw) — als cashback of korting. Tot maximaal 25% van uw eigen projectwaarde.",
  },
];

export default function AanbrengbonusPage() {
  return (
    <>
      <PageHero
        eyebrow="Aanbrengbonus"
        title="Draag iemand aan binnen een jaar — en pak tot 25% terug."
        lead="Tevreden klanten zijn onze beste reclame, en dat belonen we royaal. Draag binnen 12 maanden na uw eigen opdracht iemand aan en ontvang 3% van hun projectbedrag — oplopend tot 25% cashback op uw eigen project."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Aanbrengbonus" }]}
        actions={
          <>
            <Button href="/configurator">Start uw project</Button>
            <Button href="/contact" variant="secondary">Stel een vraag</Button>
          </>
        }
      />

      {/* Kerncijfers */}
      <Section>
        <Container>
          <Eyebrow>Wat het oplevert</Eyebrow>
          <h2 className="mt-4 mb-10 text-2xl text-ink sm:text-3xl">
            Zo voordelig is aandragen
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="text-center">
              <p className="font-display text-4xl font-semibold text-forest">3%</p>
              <CardTitle>Per aangedragen klant</CardTitle>
              <CardBody>Van hun projectbedrag (excl. btw), voor elke persoon die u aandraagt en klant wordt.</CardBody>
            </Card>
            <Card className="text-center">
              <p className="font-display text-4xl font-semibold text-forest">25%</p>
              <CardTitle>Maximale cashback</CardTitle>
              <CardBody>De bonussen samen kunnen oplopen tot een kwart van de waarde van uw eigen project.</CardBody>
            </Card>
            <Card className="text-center">
              <p className="font-display text-4xl font-semibold text-forest">12 mnd</p>
              <CardTitle>Uw aanbrengjaar</CardTitle>
              <CardBody>U heeft een vol jaar na uw eigen opdracht de tijd om mensen aan te dragen.</CardBody>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Rekenvoorbeelden */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Rekenvoorbeelden</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Wat kunt u terugverdienen?
          </h2>
          <div className="space-y-4">
            <Callout variant="info" title="Eén buur aangedragen">
              <p>
                Uw buur laat voor een indicatief bedrag van <strong>€ 8.000</strong> (excl. btw)
                kozijnen plaatsen. U ontvangt <strong>3% = € 240</strong> terug.
              </p>
            </Callout>
            <Callout variant="info" title="Drie buurtgenoten in uw aanbrengjaar">
              <p>
                Drie projecten van gemiddeld € 7.000 leveren samen{" "}
                <strong>3 × 3% × € 7.000 = € 630</strong> op. Bij een eigen project van
                € 9.000 (excl. btw) is uw maximum 25% = € 2.250 — dus er is nog volop ruimte.
              </p>
            </Callout>
            <Callout variant="disclaimer">
              <p>
                Rekenvoorbeelden ter illustratie. De exacte uitkering hangt af van de
                definitieve projectbedragen (excl. btw) en de voorwaarden van de
                Aanbrengbonus (op aanvraag beschikbaar).
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Stappen */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Stappenplan</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Van aandragen tot cashback
          </h2>
          <ProcessSteps steps={aanbrengSteps} />
        </Container>
      </Section>

      {/* Voorwaarden */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Voorwaarden</Eyebrow>
          <h2 className="mt-4 mb-6 text-2xl text-ink sm:text-3xl">Eerlijk en duidelijk</h2>
          <FeatureList
            items={[
              "U heeft zelf een opdracht geplaatst bij De Kozijnstudio",
              "U draagt aan binnen 12 maanden na uw eigen opdracht",
              "De aandracht verloopt via uw persoonlijke aanbrengcode",
              "De bonus wordt uitgekeerd na oplevering van het aangedragen project",
              "Het programma is voor particulieren en niet overdraagbaar",
            ]}
          />
          <p className="mt-5 text-sm text-ink/55">
            Lees de{" "}
            <a href="/aanbrengbonus-voorwaarden" className="text-forest underline underline-offset-2 hover:no-underline">
              volledige voorwaarden van de Aanbrengbonus
            </a>
            .
          </p>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">Start uw project en uw aanbrengjaar</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            Stel uw kozijnen samen en vraag een offerte aan. Na akkoord ontvangt u
            automatisch uw persoonlijke aanbrengcode.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/configurator">Naar de configurator</Button>
            <Button href="/offerte-aanvragen" variant="secondary">Offerte aanvragen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
