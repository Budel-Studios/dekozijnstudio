import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { ContactLink } from "@/components/contact-link";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  absoluteTitle: "Over De Kozijnstudio in Enschede",
  description:
    "Maak kennis met De Kozijnstudio. Lees wie je adviseert, hoe we werken, hoe we samenhangen met MTB Bouw en wie jouw aanspreekpunt is.",
  path: "/over-ons",
});

const link = "font-medium text-forest underline underline-offset-2";

const uitgangspunten = [
  "Uitleg vóór verkoop: je begrijpt wat je kiest en waarom",
  "Een voorstel waarin elk onderdeel apart en inclusief btw staat",
  "Geen extra werk zonder dat we het vooraf met je bespreken",
  "Eén aanspreekpunt, ook als er bouwkundig werk bij komt",
];

export default function OverOnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Over ons", href: "/over-ons" }])),
        }}
      />
      <PageHero
        eyebrow="Over ons"
        title="De mensen achter De Kozijnstudio"
        lead="De Kozijnstudio is ontstaan vanuit MTB Bouw, een bouwbedrijf uit Enschede. We richten ons op één ding: mensen helpen de juiste kozijnen te kiezen, met een voorstel dat ze begrijpen."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Over ons" }]}
        actions={<Button href="/offerte">Vraag een voorstel</Button>}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Ons verhaal</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Ontstaan op de bouwplaats</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Bij verbouwingen van MTB Bouw zagen we het vaak: mensen met een kozijnofferte waar ze weinig van begrepen.
              Posten zonder omschrijving, montage die er later bij kwam, en geen idee of de prijs redelijk was.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              Daarom begonnen we De Kozijnstudio: kozijnen leveren en monteren met een voorstel waarin elk onderdeel apart
              staat. Zo zie je wat je krijgt, en kun je ons eerlijk vergelijken met een andere aanbieder.
            </p>
            {MODULES.aanbrengbonus && (
              <p className="mt-4 leading-relaxed text-ink/70">
                Liever dan geld uitgeven aan reclame, belonen we mensen die ons aanbevelen bij familie of buren. Hoe dat werkt,
                lees je bij de{" "}
                <Link href="/aanbrengbonus" className={link}>
                  aanbrengbonus
                </Link>
                .
              </p>
            )}
          </div>
          <div>
            <Eyebrow>Waar we voor staan</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Hoe we werken</h2>
            <FeatureList className="mt-6" items={uitgangspunten} />
            <p className="mt-6 text-sm text-ink/70">
              <Link href="/werkwijze" className={link}>
                Bekijk de werkwijze stap voor stap
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>MTB Bouw</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Hoe we samenhangen met MTB Bouw</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              De Kozijnstudio is een handelsnaam van {company.entiteit}. MTB Bouw is het bouwbedrijf voor verbouw, renovatie
              en aan- en uitbouw. Is er bij je nieuwe kozijnen bouwkundig werk nodig, zoals een grotere opening, een nieuwe
              latei of metselwerk, dan doet MTB Bouw dat werk, in dezelfde planning.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/mtb-bouw" variant="secondary">
                Meer over MTB Bouw
              </Button>
              <Button href="/bouwkundige-aanpassingen" variant="ghost">
                Bouwkundige aanpassingen
              </Button>
            </div>
          </div>
          <div className="rounded-card border border-mist bg-paper p-7">
            <h2 className="text-xl text-ink">Je aanspreekpunt</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-medium text-ink">Telefoon</dt>
                <dd>
                  <ContactLink kind="phone" location="over-ons" className={link}>
                    {company.telefoon}
                  </ContactLink>{" "}
                  <span className="text-ink/60">({company.openingstijden})</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink">E-mail</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className={link}>
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Adres</dt>
                <dd className="text-ink/75">
                  {company.adres}, {company.postcodePlaats}. Bezoek op afspraak.
                </dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Bedrijfsgegevens</dt>
                <dd className="text-ink/75">
                  {company.naam} is een handelsnaam van {company.entiteit}, KvK {company.kvk}.
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <Eyebrow>Werkgebied</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Vanuit Enschede, in Twente</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            We werken vanuit Enschede, in de stad zelf en in de rest van Twente. Twijfel je of jouw adres erbij hoort?{" "}
            <Link href="/werkgebied" className={link}>
              Bekijk ons werkgebied
            </Link>{" "}
            of vraag het ons.
          </p>
        </Container>
      </Section>

      <CtaBlok
        titel="Kennismaken?"
        lead="Vertel ons over je woning en je plannen. We denken graag met je mee."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/contact" variant="light">
              Neem contact op
            </Button>
          </>
        }
      />
    </>
  );
}
