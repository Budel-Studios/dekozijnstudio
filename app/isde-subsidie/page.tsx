import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { FeatureList } from "@/components/ui/feature-list";
import { Callout } from "@/components/ui/callout";
import { ProcessSteps } from "@/components/ui/process-steps";
import { ArrowUpRightIcon } from "@/components/icons";
import { isdeInfo } from "@/data/subsidie";

export const metadata: Metadata = {
  title: "ISDE-subsidie voor kozijnen",
  description:
    "Profiteer van de ISDE-subsidie bij vervanging van uw kozijnen met HR++- of triple glas. Informatie over de regeling, voorwaarden en aanvraagprocedure.",
  alternates: { canonical: "/isde-subsidie" },
  openGraph: {
    title: "ISDE-subsidie — De Kozijnstudio",
    description: "Subsidie bij vervanging naar HR++ of triple glas. Actuele informatie, disclaimer en link naar RVO.",
  },
};

export default function IsdeSubsidiePage() {
  return (
    <>
      <PageHero
        eyebrow="ISDE-subsidie"
        title="Subsidie voor energiezuinige kozijnen."
        lead="Bij vervanging van uw kozijnen naar HR++- of triple glas kunt u in aanmerking komen voor de ISDE-subsidie. Wij informeren u over de mogelijkheden — zonder u te overbeloven."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "ISDE-subsidie" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href={isdeInfo.rvoUrl} variant="secondary">
              <span>{isdeInfo.rvoLabel}</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
          </>
        }
      />

      {/* Disclaimer prominent bovenaan */}
      <Section>
        <Container width="narrow">
          <Callout variant="disclaimer" title={`Informatie bijgewerkt: ${isdeInfo.lastUpdated}`}>
            <p>{isdeInfo.disclaimer}</p>
            <p className="mt-2">
              <a
                href={isdeInfo.rvoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-forest underline underline-offset-2 hover:no-underline"
              >
                {isdeInfo.rvoLabel} →
              </a>
            </p>
          </Callout>
        </Container>
      </Section>

      {/* Wat is ISDE */}
      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Wat is ISDE?</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Energiebesparing met een financiële tegemoetkoming
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              {isdeInfo.mechanismDescription}
            </p>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-ink">In aanmerking komende producten:</p>
              <FeatureList items={[...isdeInfo.eligibleProducts]} />
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">Voordelen:</p>
            <FeatureList items={[...isdeInfo.benefits]} />
          </div>
        </Container>
      </Section>

      {/* HR++ vs Triple */}
      <Section>
        <Container>
          <Eyebrow>Beglazing vergelijken</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            HR++ versus triple glas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardEyebrow>Meest gekozen</CardEyebrow>
              <CardTitle>HR++-glas</CardTitle>
              <CardBody>
                Twee glaslagen met een speciale coating en een spouwruimte met
                edelgas. Uitstekende isolatiewaarden voor de meeste bestaande
                woningen. Lichter dan triple glas en goed betaalbaar. Komt in
                aanmerking voor ISDE-subsidie.
              </CardBody>
            </Card>
            <Card>
              <CardEyebrow>Maximale isolatie</CardEyebrow>
              <CardTitle>Triple glas</CardTitle>
              <CardBody>
                Drie glaslagen met twee spouwruimten. Betere isolatiewaarden dan
                HR++ — interessant voor nieuwbouw, passief bouwen of bij hoge
                geluidseisen. Zwaarder en duurder dan HR++. Komt ook in
                aanmerking voor ISDE-subsidie.
              </CardBody>
            </Card>
          </div>
          <Callout variant="disclaimer" className="mt-6">
            <p>
              De exacte isolatiewaarden (Ug-waarden) worden vermeld in uw
              offerte per type glas en kozijn. Wij adviseren u welke keuze
              het best past bij uw woning en het huidige budget.
            </p>
          </Callout>
        </Container>
      </Section>

      {/* Aanvraagproces */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Aanvragen</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Zo vraagt u ISDE-subsidie aan
          </h2>
          <ProcessSteps
            steps={isdeInfo.applicationSteps.map((s, i) => ({
              title: `Stap ${i + 1}`,
              description: s,
            }))}
          />
          <div className="mt-6">
            <a
              href={isdeInfo.rvoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest underline underline-offset-2 hover:no-underline"
            >
              {isdeInfo.rvoLabel}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container className="text-center">
          <h2 className="text-2xl text-paper sm:text-3xl">
            Profiteer van ISDE én onze transparante prijzen
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-paper/65">
            In uw offerte tonen we de indicatieve ISDE-subsidie als aftrekpost
            op het investeringsoverzicht — zodat u direct ziet wat het netto
            kost.
          </p>
          <div className="mt-8">
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
