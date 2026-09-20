import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Callout } from "@/components/ui/callout";
import { FeatureList } from "@/components/ui/feature-list";
import { ProcessSteps } from "@/components/ui/process-steps";
import { Placeholder } from "@/components/ui/placeholder";
import { FAQ } from "@/components/ui/faq";
import { MtbBouwBand } from "@/components/mtb-bouw-band";
import { inmeetservice } from "@/data/prices";
import { isdeInfo } from "@/data/subsidie";
import { serviceSchema, faqPageSchema, jsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Kozijnen vervangen in Twente",
  description:
    "Kozijnen vervangen in Enschede, Hengelo en heel Twente: wanneer het loont, hoe het werkt, wat de montage kost en hoe lang het duurt. Eén partij voor kozijn, montage en bouwkundig werk.",
  alternates: { canonical: "/kozijnen-vervangen" },
  openGraph: {
    title: "Kozijnen vervangen — De Kozijnstudio",
    description:
      "Van inmeten tot oplevering: zo verloopt het vervangen van uw kozijnen in Twente en Oost-Nederland.",
  },
};

const signalen = [
  "Tocht langs de aanslag of condens tussen het glas",
  "Houtrot bij de onderdorpel of klemmende ramen",
  "Enkel glas of oud dubbel glas zonder coating",
  "Sluitwerk dat niet meer aan de inbraakeisen voldoet",
  "Schilderwerk dat elke paar jaar terugkomt",
  "Een verbouwing waarbij de gevelopening toch al opengaat",
];

const stappen = [
  {
    title: "Kennismaken en adviseren",
    description:
      "We bekijken samen wat er speelt: comfort, onderhoud, isolatie of uitstraling. U hoort eerlijk wanneer vervangen niet nodig is en renovatie of alleen glas volstaat.",
  },
  {
    title: "Inmeten",
    description: `Wij nemen de exacte maten op en beoordelen de situatie: aansluitingen, latei, metselwerk en binnenafwerking. Kosten: ${inmeetservice.price}. ${inmeetservice.note}`,
  },
  {
    title: "Voorstel",
    description:
      "U krijgt een voorstel waarin kozijn, montage en eventueel bouwkundig werk apart staan, incl. btw. Meerwerk bespreken we vooraf, nooit achteraf.",
  },
  {
    title: "Productie en planning",
    description:
      "Maatwerk heeft een levertijd vanaf ± 8 weken. U hoort tijdig wanneer de monteurs komen en wat u die dagen kunt verwachten.",
  },
  {
    title: "Vervangen en afwerken",
    description:
      "Oude kozijnen eruit, nieuwe erin, dezelfde dag wind- en waterdicht. We plaatsen zoveel mogelijk kozijnen per dag om de overlast te beperken.",
  },
  {
    title: "Opleveren",
    description:
      "We lopen de oplevering samen door en voeren het oude materiaal af. Montage wordt achteraf gefactureerd.",
  },
];

const kostenfactoren = [
  "Afmetingen en het aantal kozijnen",
  "Materiaal: kunststof, hout of aluminium",
  "Type glas: HR++ of triple",
  "Bereikbaarheid: begane grond, verdieping of steiger",
  "Bouwkundig werk: opening vergroten, latei, metselwerk of binnenafwerking",
  "Afwerking binnen: stucwerk, vensterbanken en dorpels",
];

// Bewust zonder FaqItem-annotatie: zo blijven de antwoorden `string` en kan
// dezelfde lijst zowel de FAQ-component als het FAQPage-schema voeden.
const faqItems = [
  {
    question: "Hoe lang duurt het vervangen van kozijnen?",
    answer:
      "De montage zelf duurt bij een doorsnee woning doorgaans één week; vaak plaatsen we meerdere kozijnen per dag. Reken daarvóór op een levertijd vanaf ± 8 weken, omdat alles op maat wordt gemaakt.",
  },
  {
    question: "Kan ik in huis blijven wonen tijdens de werkzaamheden?",
    answer:
      "Ja. We werken per gevel of per ruimte en zorgen dat uw woning aan het eind van elke werkdag wind- en waterdicht is.",
  },
  {
    question: "Moet het hele kozijn eruit, of kan alleen het glas vervangen worden?",
    answer:
      "Als het kozijn zelf nog gezond is, kan alleen het glas vervangen worden — dat zeggen we ook gewoon. Bij houtrot, tocht langs de aanslag of verouderd sluitwerk is een nieuw kozijn doorgaans verstandiger.",
  },
  {
    question: "Heb ik een vergunning nodig?",
    answer:
      "Bij gelijkblijvende maatvoering en indeling is vervangen meestal vergunningsvrij. Verandert de gevelopening, of staat uw woning in beschermd stadsgezicht of is het een monument, dan checken we dit vooraf met u.",
  },
  {
    question: "Kunnen jullie ook de muuropening vergroten?",
    answer:
      "Ja. Via MTB Bouw doen we het bouwkundige werk: opening vergroten, latei plaatsen, metselwerk aanpassen en de binnenafwerking verzorgen. Eén partij, één planning.",
  },
  {
    question: "Krijg ik subsidie op het vervangen van kozijnen?",
    answer: `Voor isolerend glas is ISDE-subsidie mogelijk. De voorwaarden en bedragen wijzigen jaarlijks; wij helpen u ze te begrijpen en verwijzen altijd naar de actuele informatie van RVO (stand: ${isdeInfo.lastUpdated}).`,
  },
  {
    question: "Wat kost het vervangen van kozijnen?",
    answer:
      "De montagetarieven staan open en bloot op onze pagina Montage & kosten, incl. btw. De kozijnprijs zelf is maatwerk: die hangt af van maat, materiaal, glas en de situatie in uw woning, en stellen we vast na het inmeten.",
  },
];

export default function KozijnenVervangenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema({
              name: "Kozijnen vervangen",
              description:
                "Bestaande kozijnen vervangen door maatwerk kunststof, houten of aluminium kozijnen, inclusief bouwkundig werk, montage en afwerking in Twente en Oost-Nederland.",
              path: "/kozijnen-vervangen",
              serviceType: "Kozijnen vervangen",
            }),
            faqPageSchema(faqItems),
          ),
        }}
      />

      <PageHero
        eyebrow="Kozijnen vervangen"
        title="Kozijnen vervangen in Twente, van inmeten tot oplevering."
        lead="Tocht, condens of houtrot? Wij vertellen eerlijk wanneer vervangen loont en wanneer niet. Kozijn, montage en bouwkundig werk komen bij ons uit één hand — één planning, één aanspreekpunt."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen vervangen" }]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Plan een inmeting</Button>
            <Button href="/prijzen" variant="secondary">
              Bekijk montagekosten
            </Button>
          </>
        }
        media={<Placeholder label="Eigen projectfoto — voor en na" className="min-h-72" />}
      />

      {/* Wanneer vervangen */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Wanneer is vervangen verstandig?</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Herkent u een van deze signalen?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Kozijnen vervangen is geen kleine ingreep. Daarom kijken we eerst
              of het echt nodig is. Soms volstaat nieuw glas of goed onderhoud —
              dan zeggen we dat gewoon.
            </p>
            <FeatureList items={signalen} className="mt-6" />
          </div>
          <div className="space-y-4">
            <Callout variant="info" title="Vervangen of alleen glas?">
              <p>
                Is het kozijn nog gezond en stoort vooral de kou? Dan is
                isolerend glas in het bestaande kozijn vaak de verstandigste
                stap. Bij houtrot, klemmende ramen of verouderd sluitwerk levert
                een nieuw kozijn meer op — in comfort én onderhoud.
              </p>
            </Callout>
            <Callout variant="disclaimer">
              <p>
                Twijfelt u? Vraag een{" "}
                <Link href="/contact" className="font-medium underline underline-offset-2">
                  vrijblijvend adviesgesprek
                </Link>{" "}
                aan. We kijken mee zonder dat u ergens aan vastzit.
              </p>
            </Callout>
          </div>
        </Container>
      </Section>

      {/* Werkwijze */}
      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Zo verloopt het</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Van eerste gesprek tot opgeleverd werk
          </h2>
          <ProcessSteps steps={stappen} />
          <div className="mt-8">
            <Button href="/montage" variant="secondary">
              Meer over montage
            </Button>
          </div>
        </Container>
      </Section>

      {/* Waar hangt de prijs van af */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Kosten</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Waar hangt de prijs van af?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Een eerlijk bedrag kunnen we pas noemen als we uw situatie kennen.
              Deze factoren bepalen samen wat het vervangen van uw kozijnen
              kost:
            </p>
            <FeatureList items={kostenfactoren} className="mt-6" />
          </div>
          <div className="rounded-card border border-mist bg-paper-soft p-6 sm:p-8">
            <h3 className="text-xl text-ink">Wat u wél vooraf weet</h3>
            <p className="mt-3 leading-relaxed text-ink/65">
              Onze montagetarieven staan online, per werkzaamheid en incl. btw.
              De inmeetservice kost {inmeetservice.price} en wordt volledig
              verrekend zodra u doorgaat.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/prijzen">Bekijk montagekosten</Button>
              <Button href="/isde-subsidie" variant="secondary">
                ISDE-subsidie
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Werkgebied */}
      <Section tone="soft">
        <Container>
          <Eyebrow>Werkgebied</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
            Wij vervangen kozijnen in heel Twente
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/65">
            Onze monteurs werken dagelijks in de regio. Kies uw plaats voor
            lokale informatie:
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "Enschede", href: "/kozijnen-enschede" },
              { label: "Hengelo", href: "/kozijnen-hengelo" },
              { label: "Almelo", href: "/kozijnen-almelo" },
              { label: "Oldenzaal", href: "/kozijnen-oldenzaal" },
              { label: "Haaksbergen", href: "/kozijnen-haaksbergen" },
              { label: "Heel Twente", href: "/kozijnen-twente" },
            ].map((plaats) => (
              <li key={plaats.href}>
                <Link
                  href={plaats.href}
                  className="inline-flex rounded-pill border border-mist bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/30"
                >
                  {plaats.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <MtbBouwBand tone="ink" />

      {/* FAQ */}
      <Section>
        <Container width="narrow">
          <Eyebrow>Veelgestelde vragen</Eyebrow>
          <h2 className="mt-4 mb-8 text-2xl text-ink sm:text-3xl">
            Over kozijnen vervangen
          </h2>
          <FAQ items={faqItems} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="soft">
        <Container className="text-center">
          <h2 className="text-2xl text-ink sm:text-3xl">
            Zullen we eens komen kijken?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/65">
            Plan een inmeting of stel eerst uw vragen. U krijgt een eerlijk
            advies over wat er in uw woning verstandig is — ook als dat minder
            werk voor ons betekent.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/offerte-aanvragen">Plan een inmeting</Button>
            <Button href="/contact" variant="secondary">
              Stel een vraag
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
