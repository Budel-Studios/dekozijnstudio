import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Callout } from "@/components/ui/callout";
import { FAQ, type FaqItem } from "@/components/ui/faq";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { MateriaalVergelijking } from "@/components/prijzen/materiaal-vergelijking";
import { MontageTarieven } from "@/components/prijzen/montage-tarieven";
import { PRIJSVOORBEELDEN } from "@/data/prijsvoorbeelden";
import { isVerified } from "@/data/feiten";
import { formatEuro } from "@/lib/configurator-price";
import { MODULES, SHOW_PRODUCT_PRICES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Wat kosten nieuwe kozijnen met montage?",
  description:
    "Wat kosten nieuwe kozijnen inclusief montage? Bekijk welke keuzes de prijs bepalen en hoe je offertes met dezelfde uitgangspunten vergelijkt.",
  path: "/kosten",
});

const link = "font-medium text-forest underline underline-offset-2";

/** The parts of a complete price, in the order they appear in a proposal. */
const opbouw = [
  {
    post: "Kozijn",
    wat: "Het kozijn zelf, met draaiende delen, hang- en sluitwerk en eventuele extra's.",
    hangtAfVan: "Materiaal, profiel, maat, indeling, kleur binnen en buiten",
  },
  {
    post: "Glas",
    wat: "Het glas in het kozijn, soms al in de kozijnprijs inbegrepen.",
    hangtAfVan: "HR++ of triple, oppervlak, extra eigenschappen zoals geluidwerend of veiligheidsglas",
  },
  {
    post: "Levering",
    wat: "Transport naar je adres en het lossen.",
    hangtAfVan: "Bereikbaarheid, gewicht en afmetingen",
  },
  {
    post: "Demontage en afvoer",
    wat: "Het verwijderen van de oude kozijnen en het afvoeren van het materiaal.",
    hangtAfVan: "Aantal kozijnen, oud materiaal, verdieping",
  },
  {
    post: "Montage",
    wat: "Stellen, bevestigen, isoleren en afdichten van de aansluiting op de muur.",
    hangtAfVan: "Aantal en grootte, bereikbaarheid, werken op hoogte",
  },
  {
    post: "Afwerking",
    wat: "Aftimmering en afwerking binnen en buiten, eventueel vensterbanken en stucwerk.",
    hangtAfVan: "Wat er bij het verwijderen vrijkomt en welke afwerking je wilt",
  },
  {
    post: "Bouwkundig werk",
    wat: "Bijvoorbeeld een opening vergroten, een nieuwe latei of metselwerk herstellen.",
    hangtAfVan: "De bouwkundige staat en je wensen. Alleen als het nodig is",
  },
];

const vergelijken = [
  "Gaan de offertes uit van dezelfde maten, hetzelfde aantal en dezelfde indeling?",
  "Is het hetzelfde materiaal en profiel, en dezelfde kleur binnen en buiten?",
  "Is het glas gelijk: HR++ of triple, en met dezelfde extra eigenschappen?",
  "Zitten demontage en afvoer van de oude kozijnen erin?",
  "Welke afwerking binnen en buiten is inbegrepen, en wat niet?",
  "Staat er bouwkundig werk in, of komt dat later apart?",
  "Zijn alle bedragen inclusief btw, en staat de btw apart?",
  "Is het een indicatie of een offerte na inmeten? Hoe lang is de prijs geldig?",
];

const vragen: FaqItem[] = [
  {
    question: "Waarom staat er geen prijs per kozijn op de site?",
    answer:
      "Een kozijn is maatwerk. Twee ramen van dezelfde maat kunnen flink in prijs verschillen door het profiel, het glas, de kleur of het werk eromheen. Een los bedrag zonder die uitgangspunten zou je eerder op het verkeerde been zetten dan helpen.",
  },
  {
    question: "Hoe kom ik aan een prijs voor mijn woning?",
    answer: (
      <>
        <Link href="/offerte" className={link}>
          Vraag een voorstel aan
        </Link>{" "}
        met je wensen en eventueel foto&apos;s. Na het inmeten krijg je een voorstel waarin elk onderdeel apart en inclusief
        btw staat.
        {MODULES.configurator && (
          <>
            {" "}
            Wil je vooraf zelf kijken? In de{" "}
            <Link href="/configurator" className={link}>
              configurator
            </Link>{" "}
            stel je een kozijn samen.
          </>
        )}
      </>
    ),
  },
  {
    question: "Wordt de subsidie van de prijs afgetrokken?",
    answer: (
      <>
        Nee. De ISDE vraag je zelf aan bij RVO en krijg je, als je aan de voorwaarden voldoet, achteraf van RVO. In je
        voorstel staat de prijs die je aan ons betaalt. Lees{" "}
        <Link href="/subsidie" className={link}>
          waar je op let bij subsidie
        </Link>
        .
      </>
    ),
  },
  {
    question: "Hoe zit het met betalen?",
    answer:
      "Bij maatwerk vragen we een aanbetaling voor de productie. Het restant betaal je na de montage. De bedragen en voorwaarden staan in je voorstel.",
  },
];

export default function KostenPage() {
  const toonTarieven = isVerified("prijslijstMontage");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Kosten", href: "/kosten" }])),
        }}
      />
      <PageHero
        eyebrow="Kosten"
        title="Wat kosten nieuwe kozijnen inclusief montage?"
        lead="Het eerlijke antwoord: dat hangt af van je woning en je keuzes. Hieronder zie je uit welke onderdelen een prijs bestaat, wat elk onderdeel duurder of goedkoper maakt, en hoe je offertes eerlijk naast elkaar legt."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kosten" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/montage" variant="secondary">
              Wat bij montage hoort
            </Button>
          </>
        }
      />

      <Section>
        <Container>
          <Eyebrow>Prijsopbouw</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl text-ink sm:text-3xl">Waar een kozijnprijs uit bestaat</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
            In je voorstel staan deze onderdelen apart, inclusief btw. Zo zie je wat je krijgt en waar een verschil met een
            andere offerte vandaan komt.
          </p>
          <div className="mt-8 overflow-x-auto rounded-card border border-mist bg-paper">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Onderdelen van de prijs van nieuwe kozijnen</caption>
              <thead>
                <tr className="border-b border-mist bg-paper-soft text-xs uppercase tracking-widest text-ink/60">
                  <th scope="col" className="px-5 py-3 font-semibold">Onderdeel</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Wat het is</th>
                  <th scope="col" className="px-5 py-3 font-semibold">Hangt af van</th>
                </tr>
              </thead>
              <tbody>
                {opbouw.map((r) => (
                  <tr key={r.post} className="border-b border-mist align-top last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-medium text-ink">{r.post}</th>
                    <td className="px-5 py-3.5 leading-relaxed text-ink/75">{r.wat}</td>
                    <td className="px-5 py-3.5 leading-relaxed text-ink/75">{r.hangtAfVan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ink/70">
            Let op dubbeltellingen: zit het glas al in de kozijnprijs, of de afvoer al in de montage, dan hoort het niet nog
            een keer op de offerte.
          </p>
        </Container>
      </Section>

      {PRIJSVOORBEELDEN.length > 0 && (
        <Section tone="soft">
          <Container>
            <Eyebrow>Voorbeelden</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Prijsvoorbeelden uit echte calculaties</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {PRIJSVOORBEELDEN.map((v) => (
                <article key={v.id} className="rounded-card border border-mist bg-paper p-6">
                  <h3 className="text-lg text-ink">{v.titel}</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    {(
                      [
                        ["Basis", v.basis],
                        ["Uitvoering", v.uitvoering],
                        ["Glas", v.glas],
                        ["Levering", v.levering],
                        ["Demontage", v.demontage],
                        ["Montage", v.montage],
                        ["Afwerking", v.afwerking],
                      ] as const
                    ).map(([k, val]) => (
                      <div key={k}>
                        <dt className="font-medium text-ink">{k}</dt>
                        <dd className="text-ink/70">{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <table className="mt-5 w-full text-sm">
                    <tbody>
                      {v.regels.map((r) => (
                        <tr key={r.omschrijving} className="border-t border-mist">
                          <td className="py-2 text-ink/75">{r.omschrijving}</td>
                          <td className="py-2 text-right font-medium text-ink">{formatEuro(r.bedragInclBtw)}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-ink/20">
                        <td className="py-2 font-semibold text-ink">Totaal incl. btw</td>
                        <td className="py-2 text-right font-semibold text-ink">{formatEuro(v.totaalInclBtw)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs leading-relaxed text-ink/60">
                    {v.status === "indicatie" ? "Indicatie" : "Productspecificatie"} · prijspeil {v.peildatum}. {v.voorwaarden}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone={PRIJSVOORBEELDEN.length > 0 ? "paper" : "soft"}>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Offertes vergelijken</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Vergelijk offertes met dezelfde uitgangspunten</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Een lagere prijs is pas goedkoper als hij voor hetzelfde werk is. Loop deze vragen langs voordat je twee
              offertes naast elkaar legt.
            </p>
          </div>
          <FeatureList items={vergelijken} />
        </Container>
      </Section>

      {toonTarieven && (
        <Section>
          <Container width="narrow">
            <Eyebrow>Montagetarieven</Eyebrow>
            <h2 className="mb-3 mt-4 text-2xl text-ink sm:text-3xl">Wat montage kost, inclusief btw</h2>
            <p className="mb-8 leading-relaxed text-ink/70">
              Dit zijn onze tarieven per werkzaamheid. Welke regels voor jouw woning gelden, hangt af van de situatie.
            </p>
            <MontageTarieven />
          </Container>
        </Section>
      )}

      {SHOW_PRODUCT_PRICES && (
        <Section tone="soft">
          <Container>
            <Eyebrow>Vergelijk materialen</Eyebrow>
            <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Kunststof, hout of aluminium: het prijsverschil</h2>
            <MateriaalVergelijking />
          </Container>
        </Section>
      )}

      <Section tone={toonTarieven ? "soft" : "paper"}>
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Per materiaal</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">Prijsfactoren per materiaal</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Kunststof is bij vergelijkbare maten meestal de voordeligste keuze. Hout en aluminium zitten doorgaans hoger,
              door het materiaal, de bewerking en bij hout het schilderwerk. Wat dat voor jouw woning betekent, lees je per
              materiaal:
            </p>
            <ul className="mt-5 space-y-2">
              <li>
                <Link href="/kunststof-kozijnen" className={link}>
                  Kunststof kozijnen
                </Link>
              </li>
              <li>
                <Link href="/houten-kozijnen" className={link}>
                  Houten kozijnen
                </Link>
              </li>
              <li>
                <Link href="/aluminium-kozijnen" className={link}>
                  Aluminium kozijnen
                </Link>
              </li>
            </ul>
          </div>
          <Callout variant="info" title="Subsidie staat los van de prijs">
            <p>
              Met HR++- of triple glas kom je mogelijk in aanmerking voor de ISDE. Die subsidie vraag je zelf aan bij RVO en
              trekken we niet af van de prijs in je voorstel.{" "}
              <Link href="/subsidie" className={link}>
                Lees waar je op let
              </Link>
              .
            </p>
          </Callout>
        </Container>
      </Section>

      <Section tone="soft">
        <Container width="narrow">
          <Eyebrow>Vragen</Eyebrow>
          <h2 className="mb-8 mt-4 text-2xl text-ink sm:text-3xl">Vragen over de kosten</h2>
          <FAQ items={vragen} />
        </Container>
      </Section>

      <CtaBlok
        titel="Wat kost het voor jouw woning?"
        lead="Vertel ons welke kozijnen je wilt vervangen. Je krijgt een voorstel waarin elk onderdeel apart staat."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kozijnen-vervangen" variant="light">
              Zo gaat vervangen
            </Button>
          </>
        }
      />
    </>
  );
}
