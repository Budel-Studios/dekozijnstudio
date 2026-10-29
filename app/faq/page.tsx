import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { ContactLink } from "@/components/contact-link";
import { company } from "@/data/company";
import { feit } from "@/data/feiten";
import { isdeInfo } from "@/data/subsidie";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Veelgestelde vragen over kozijnen",
  description:
    "Antwoorden op veelgestelde vragen over nieuwe kozijnen: kosten, inmeten, montage, levertijd, subsidie, werkgebied en hoe je contact met ons opneemt.",
  path: "/faq",
});

const link = "font-medium text-forest underline underline-offset-2 hover:no-underline";

/** Adds a register fact as an extra sentence once it is verified (data/feiten.ts). */
function zin(tekst: string | null): string {
  return tekst ? ` ${tekst}.` : "";
}

function faqGroups(): Array<{ title: string; items: FaqItem[] }> {
  const bezoek = feit("bezoekOpAfspraak");
  const inmeet = feit("inmeetservice");
  const levertijd = feit("levertijd");
  const montageduur = feit("montageduur");
  const offertetermijn = feit("offertetermijn");
  const reactietermijn = feit("reactietermijn");

  return [
    {
      title: "Kosten en voorstel",
      items: [
        {
          question: "Waar hangt de prijs van nieuwe kozijnen van af?",
          answer: (
            <>
              Van het materiaal, de maten en het aantal kozijnen, het glas, de kleur
              en het hang- en sluitwerk. Daarnaast tellen de montage en eventueel
              bouwkundig werk mee. Op de pagina over{" "}
              <Link href="/kosten" className={link}>
                kosten
              </Link>{" "}
              leggen we uit hoe de prijs is opgebouwd.
            </>
          ),
        },
        {
          question: "Zijn jullie prijzen inclusief btw?",
          answer:
            "Ja. Bedragen voor particulieren noemen we inclusief btw, zodat je in je voorstel ziet wat je uiteindelijk betaalt.",
        },
        {
          question: "Wat houdt het inmeten in?",
          answer: `Voordat er iets besteld wordt, meten we bij je thuis in. We nemen de exacte maten op en bekijken de situatie: de staat van de opening, de aansluitingen en of er bouwkundig werk nodig is.${
            inmeet ? zin(inmeet) : " Wat het inmeten kost, hoor je vooraf."
          }`,
        },
        {
          question: "Wanneer krijg ik mijn voorstel?",
          answer: `Na het inmeten werken we je voorstel uit.${
            offertetermijn ? zin(offertetermijn) : " We laten je weten wanneer je het kunt verwachten."
          } In het voorstel staan de kozijnen, de montage en eventueel bouwkundig werk als aparte onderdelen.`,
        },
        {
          question: "Kan het voorstel nog veranderen nadat ik akkoord heb gegeven?",
          answer:
            "Alleen als je zelf iets wilt aanpassen, of als er tijdens het werk iets naar boven komt dat vooraf niet te zien was, zoals verborgen houtrot of een constructief probleem. Extra werk bespreken we altijd eerst met je. Zonder jouw akkoord voeren we het niet uit.",
        },
        {
          question: "Hoe is de betaling geregeld?",
          answer:
            "Omdat kozijnen op maat worden gemaakt, vragen we bij de opdracht een aanbetaling voor de productie. Het restant betaal je bij de oplevering. Hoe de betaling precies is verdeeld, staat in je voorstel.",
        },
      ],
    },
    {
      title: "Materialen en glas",
      items: [
        {
          question: "Welke kozijnmaterialen kan ik kiezen?",
          answer: (
            <>
              Kunststof, hout en aluminium, op maat gemaakt. Welk materiaal past,
              hangt af van je woning, de uitstraling die je zoekt en hoeveel
              onderhoud je wilt doen. Bij{" "}
              <Link href="/kozijnen" className={link}>
                materialen vergelijken
              </Link>{" "}
              zetten we ze naast elkaar.
            </>
          ),
        },
        {
          question: "Wat is het verschil tussen HR++-glas en triple glas?",
          answer: (
            <>
              HR++-glas heeft twee glasbladen met een coating en een gasvulling
              ertussen. Triple glas heeft drie glasbladen en isoleert beter, maar is
              zwaarder en duurder, en vraagt om kozijnen die daarvoor geschikt zijn.
              Welke keuze verstandig is, hangt af van je woning en je wensen. Meer
              uitleg lees je in{" "}
              <Link href="/kennis/hr-plus-plus-triple-glas" className={link}>
                HR++ of triple glas
              </Link>
              .
            </>
          ),
        },
        {
          question: "In welke kleuren zijn de kozijnen er?",
          answer: (
            <>
              Welke kleuren mogelijk zijn, hangt af van het materiaal en het profiel.
              Kunststof is er in verschillende kleuren en houtstructuren, aluminium
              wordt in een kleur gecoat en hout wordt in de gekozen kleur
              afgewerkt.
              {MODULES.configurator && (
                <>
                  {" "}
                  In de{" "}
                  <Link href="/configurator" className={link}>
                    configurator
                  </Link>{" "}
                  zie je de kleuren die je nu kunt kiezen.
                </>
              )}
            </>
          ),
        },
      ],
    },
    {
      title: "Montage en planning",
      items: [
        {
          question: "Regelen jullie ook de montage?",
          answer: (
            <>
              Ja, we regelen de montage van je nieuwe kozijnen. Op de pagina over{" "}
              <Link href="/montage" className={link}>
                montage
              </Link>{" "}
              lees je welk werk daarbij kan horen, van het verwijderen van de oude
              kozijnen tot het afwerken.
            </>
          ),
        },
        {
          question: "Hoe lang duurt de levering?",
          answer: `Dat hangt af van product en planning; de verwachte levertijd staat in je voorstel.${zin(
            levertijd,
          )} Kozijnen worden op maat gemaakt, dus de productie begint pas na het inmeten en je akkoord.`,
        },
        {
          question: "Hoe lang duurt de montage?",
          answer: (
            <>
              Dat hangt af van het aantal kozijnen en de situatie in je woning.
              {zin(montageduur)} De planning stemmen we vooraf met je af, zodat je weet wanneer we komen
              en wat je kunt verwachten. Hoe een traject verloopt, lees je bij de{" "}
              <Link href="/werkwijze" className={link}>
                werkwijze
              </Link>
              .
            </>
          ),
        },
        {
          question: "Kunnen jullie ook de muuropening vergroten?",
          answer: (
            <>
              Ja. Is er bouwkundig werk nodig, zoals een grotere opening, een nieuwe
              latei of aangepast metselwerk, dan doet MTB Bouw dat werk. De
              Kozijnstudio is een handelsnaam van {company.entiteit}, dus het valt
              onder dezelfde planning. Lees meer over{" "}
              <Link href="/bouwkundige-aanpassingen" className={link}>
                bouwkundige aanpassingen
              </Link>
              .
            </>
          ),
        },
        {
          question: "Heb ik een vergunning nodig voor nieuwe kozijnen?",
          answer: (
            <>
              Vervang je kozijnen in dezelfde opening en blijft het uiterlijk
              vergelijkbaar, dan is dat meestal vergunningvrij. Verandert de
              gevelopening, of woon je in een monument of een beschermd stadsgezicht,
              dan kan een vergunning nodig zijn. Doe bij twijfel de vergunningcheck
              op het Omgevingsloket. Meer uitleg lees je in{" "}
              <Link href="/kennis/kozijnen-en-vergunningen" className={link}>
                kozijnen en vergunningen
              </Link>
              .
            </>
          ),
        },
        {
          question: "Kan ik kozijnen zelf plaatsen?",
          answer: (
            <>
              Dat kan, maar het vraagt ervaring: een kozijn moet haaks, waterpas en
              goed afgedicht in de opening komen en netjes aansluiten op de muur. In{" "}
              <Link href="/kennis/zelf-kozijnen-plaatsen" className={link}>
                zelf kozijnen plaatsen
              </Link>{" "}
              lees je waar je op moet letten. Let op: zelf plaatsen telt volgens RVO
              niet als uitvoering waarvoor je ISDE-subsidie kunt krijgen. Liever
              ontzorgd? Lees wat bij onze{" "}
              <Link href="/montage" className={link}>
                montage
              </Link>{" "}
              hoort.
            </>
          ),
        },
      ],
    },
    {
      title: "Subsidie",
      items: [
        {
          question: "Kom ik in aanmerking voor ISDE-subsidie?",
          answer: (
            <>
              Dat hangt af van je woning, het glastype, het oppervlak en wie het werk
              uitvoert. RVO stelt de voorwaarden vast en die veranderen regelmatig.
              Op onze pagina over{" "}
              <Link href="/subsidie" className={link}>
                subsidie
              </Link>{" "}
              zetten we de hoofdlijnen op een rij. De actuele voorwaarden staan
              altijd op{" "}
              <a href={isdeInfo.rvoUrl} target="_blank" rel="noopener noreferrer" className={link}>
                rvo.nl
              </a>
              .
            </>
          ),
        },
        {
          question: "Vragen jullie de subsidie voor mij aan?",
          answer:
            "Nee, de aanvraag doe je zelf bij RVO, als eigenaar van de woning. Wij leveren de gegevens die je daarvoor nodig hebt, zoals een factuur met het glastype en het oppervlak, en de meldcode van het glas.",
        },
      ],
    },
    {
      title: "Werkgebied en contact",
      items: [
        {
          question: "Waar werken jullie?",
          answer: (
            <>
              We werken vanuit Enschede, in de stad zelf en in de rest van Twente.
              Twijfel je of jouw adres erbij hoort? Bekijk ons{" "}
              <Link href="/werkgebied" className={link}>
                werkgebied
              </Link>{" "}
              of vraag het ons.
            </>
          ),
        },
        {
          question: "Hoe neem ik contact op?",
          answer: (
            <>
              Bel ons op{" "}
              <ContactLink kind="phone" location="faq" className={link}>
                {company.telefoon}
              </ContactLink>{" "}
              ({company.openingstijden}), stuur een bericht via{" "}
              <ContactLink kind="whatsapp" location="faq" className={link}>
                WhatsApp
              </ContactLink>{" "}
              of mail naar{" "}
              <a href={`mailto:${company.email}`} className={link}>
                {company.email}
              </a>
              . {reactietermijn ? `${reactietermijn}.` : "We nemen zo snel mogelijk contact met je op."} Alle gegevens staan
              ook op de{" "}
              <Link href="/contact" className={link}>
                contactpagina
              </Link>
              .
            </>
          ),
        },
        ...(bezoek
          ? [
              {
                question: "Kan ik bij jullie langskomen?",
                answer: `Ja, op afspraak. Ons adres is ${company.adres} in ${company.plaats}. Laat even weten wanneer je wilt komen, dan spreken we een moment af.`,
              },
            ]
          : []),
      ],
    },
  ];
}

export default function FaqPage() {
  const groups = faqGroups();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Veelgestelde vragen", href: "/faq" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Veelgestelde vragen"
        title="Veelgestelde vragen over kozijnen"
        lead="Antwoorden over kosten, inmeten, montage, subsidie en hoe we werken. Staat je vraag er niet bij? Neem gerust contact op."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Veelgestelde vragen" }]}
        actions={<Button href="/offerte">Vraag een voorstel</Button>}
      />

      <Section>
        <Container width="narrow">
          {groups.map((group) => (
            <div key={group.title} className="mb-12 last:mb-0">
              <Eyebrow>{group.title}</Eyebrow>
              <div className="mt-5">
                <FAQ items={group.items} />
              </div>
            </div>
          ))}

          <div className="mt-10 rounded-card border border-mist bg-paper-soft p-6 text-center">
            <p className="font-medium text-ink">Staat je vraag er niet bij?</p>
            <p className="mt-2 text-sm text-ink/65">
              Neem contact met ons op, dan helpen we je verder.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Button href="/contact" variant="secondary" size="sm">
                Stel je vraag
              </Button>
              <Button href="/offerte" size="sm">
                Vraag een voorstel
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
