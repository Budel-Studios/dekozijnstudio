import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { FeatureList } from "@/components/ui/feature-list";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { ArrowUpRightIcon } from "@/components/icons";
import { company } from "@/data/company";
import {
  MTB_URL,
  mtbFeaturedServices,
  mtbAllServices,
  mtbBouwkundigWerk,
  mtbVoordelen,
} from "@/data/mtb-bouw";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "De Kozijnstudio en MTB Bouw",
  description:
    "De Kozijnstudio is een handelsnaam van MTB Bouw B.V. Lees hoe dat zit en wanneer MTB Bouw het bouwkundige werk rond je nieuwe kozijnen uitvoert.",
  path: "/mtb-bouw",
});

const link = "font-medium text-forest underline underline-offset-2 hover:no-underline";

export default function MtbBouwPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "MTB Bouw", href: "/mtb-bouw" }])),
        }}
      />
      <PageHero
        eyebrow="MTB Bouw"
        title="De Kozijnstudio en MTB Bouw"
        lead={`${company.naam} is een handelsnaam van ${company.entiteit}, een bouwbedrijf uit Enschede. Bij De Kozijnstudio draait het om je kozijnen. MTB Bouw doet het bouwkundige werk dat daar soms bij hoort.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "MTB Bouw" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href={MTB_URL} variant="secondary">
              <span>Naar mtbbouw.com</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
          </>
        }
      />

      {/* Relatie */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Hoe het zit</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Eén bedrijf, twee namen</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              {company.naam} is geen apart bedrijf, maar een handelsnaam van{" "}
              {company.entiteit} (KvK {company.kvk}). Vraag je bij ons een voorstel
              aan en ga je akkoord, dan sluit je de overeenkomst dus met{" "}
              {company.entiteit}.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Onder de naam MTB Bouw werkt hetzelfde bedrijf aan verbouwingen,
              renovaties en aan- en uitbouw. De Kozijnstudio richt zich op één
              onderwerp: kozijnen kiezen, met een voorstel waarin je per onderdeel
              ziet wat je krijgt.
            </p>
          </div>
          <div>
            <Eyebrow>Bouwkundig werk</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Wanneer MTB Bouw erbij komt</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Niet elk kozijn past zomaar in de bestaande opening. Is er
              bouwkundig werk nodig, dan voert MTB Bouw dat uit. Bijvoorbeeld:
            </p>
            <FeatureList items={mtbBouwkundigWerk} className="mt-5" />
            <p className="mt-5 leading-relaxed text-ink/70">
              Of dat bij jouw woning nodig is, bekijken we bij het inmeten. Het
              bouwkundige werk staat dan als apart onderdeel in je voorstel. Meer
              uitleg lees je bij{" "}
              <Link href="/bouwkundige-aanpassingen" className={link}>
                bouwkundige aanpassingen
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Diensten MTB Bouw */}
      <Section tone="soft">
        <Container>
          <Eyebrow>MTB Bouw</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Waarvoor je bij MTB Bouw terechtkunt
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {mtbFeaturedServices.map((service) => (
              <Card key={service.title}>
                <CardEyebrow>MTB Bouw</CardEyebrow>
                <CardTitle>{service.title}</CardTitle>
                <CardBody>{service.description}</CardBody>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-card border border-mist bg-paper p-6">
            <p className="text-sm font-medium text-ink">Daarnaast werkt MTB Bouw onder meer aan:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {mtbAllServices.map((service) => (
                <span
                  key={service}
                  className="rounded-pill border border-mist bg-paper-soft px-3 py-1.5 text-xs font-medium text-ink/70"
                >
                  {service}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink/60">
              Het volledige aanbod vind je op{" "}
              <a href={MTB_URL} target="_blank" rel="noopener noreferrer" className={link}>
                mtbbouw.com
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* Wat het voor je betekent */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Wat het voor je betekent</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Kozijnen en verbouwing op elkaar afgestemd</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Komen er bij je nieuwe kozijnen ook bouwkundige aanpassingen kijken,
            dan hoef je niet zelf een aannemer te zoeken en de planning met
            losse partijen af te stemmen.
          </p>
          <FeatureList items={mtbVoordelen} className="mt-6" />
          <p className="mt-6 text-sm text-ink/70">
            <Link href="/werkwijze" className={link}>
              Bekijk hoe een traject verloopt
            </Link>
          </p>
        </Container>
      </Section>

      <CtaBlok
        titel="Kozijnen, verbouwing of allebei?"
        lead="Vertel ons over je woning en je plannen. We bekijken wat er nodig is en zetten het overzichtelijk in één voorstel."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href={MTB_URL} variant="light">
              <span>Naar mtbbouw.com</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
          </>
        }
      />
    </>
  );
}
