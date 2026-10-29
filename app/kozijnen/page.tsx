import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FAQ } from "@/components/ui/faq";
import { MateriaalSectie } from "@/components/kozijnen/materiaal-sectie";
import { ProductSpecs } from "@/components/kozijnen/product-specs";
import { ProfielTabs } from "@/components/kozijnen/profiel-tabs";
import { KozijnVergelijkTabel } from "@/components/kozijnen/kozijn-vergelijk-tabel";
import { Keuzehulp } from "@/components/kozijnen/keuzehulp";
import { LeveranciersSectie } from "@/components/kozijnen/leveranciers";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import {
  HOUT_PRODUCTEN,
  KUNSTSTOF_PRODUCTEN,
  ALUMINIUM_PRODUCTEN,
  FAQ_ITEMS,
} from "@/data/kozijnen-gids";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Kozijnmaterialen vergelijken: hout, kunststof en aluminium",
  description:
    "Hout, kunststof of aluminium? Vergelijk uitstraling, onderhoud, opbouw en prijsklasse van de materialen en profielen en kies wat bij jouw woning past.",
  path: "/kozijnen",
});

const link = "font-medium text-forest underline underline-offset-2";

const MATERIAAL_META: Record<string, { label: string; href: string }> = {
  hout: { label: "Hout", href: "/houten-kozijnen" },
  kunststof: { label: "Kunststof", href: "/kunststof-kozijnen" },
  aluminium: { label: "Aluminium", href: "/aluminium-kozijnen" },
};

/** Short, factual summary per material for the intro cards. */
const MATERIALEN = [
  {
    key: "kunststof",
    titel: "Kunststof",
    tekst: "Weinig onderhoud, veel kleuren en houtnerffolies. Vaak de keuze als het budget zwaar weegt.",
  },
  {
    key: "hout",
    titel: "Hout",
    tekst: "Warm en natuurlijk, en precies te profileren. Vraagt periodiek schilder- of beitswerk.",
  },
  {
    key: "aluminium",
    titel: "Aluminium",
    tekst: "Slanke profielen en veel glas. Strak en modern, meestal in een hogere prijsklasse.",
  },
];

const ALLE_PROFIELEN = [
  ...HOUT_PRODUCTEN,
  ...KUNSTSTOF_PRODUCTEN,
  ...ALUMINIUM_PRODUCTEN,
];

export default function KozijnenGidsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Kozijnen vergelijken", href: "/kozijnen" },
            ]),
          ),
        }}
      />

      <PageHero
        eyebrow="Materialen vergelijken"
        title="Hout, kunststof of aluminium: welk kozijn past bij jouw woning?"
        lead="Kort gezegd: kunststof vraagt het minste onderhoud, hout geeft de warmste en meest klassieke uitstraling, en aluminium maakt de slankste profielen mogelijk. Op deze pagina zet je de materialen en profielen naast elkaar, zodat je weet waar je op let."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen vergelijken" }]}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="secondary">Bekijk de prijsopbouw</Button>
          </>
        }
      />

      {/* 1. Drie materialen */}
      <MateriaalSectie
        eyebrow="Drie materialen"
        titel="De verschillen in het kort"
        intro="Geen materiaal is in alles het beste. Je kiest op uitstraling, onderhoud en budget, en op wat bij de bouwstijl van je woning past. Hoe goed een kozijn isoleert, hangt vooral af van de combinatie van profiel, glas en de aansluiting op de muur."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {MATERIALEN.map((m) => {
            const meta = MATERIAAL_META[m.key];
            return (
              <div key={m.key} className="flex flex-col rounded-card border border-mist bg-paper p-6">
                <h3 className="text-lg font-medium text-ink">{m.titel}</h3>
                <p className="mt-2 grow leading-relaxed text-ink/70">{m.tekst}</p>
                {meta && (
                  <p className="mt-4">
                    <Link href={meta.href} className={link}>
                      Meer over {meta.label.toLowerCase()} kozijnen
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </MateriaalSectie>

      {/* 2. Vergelijkingstabel */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Vergelijken"
        titel="Materialen en profielen naast elkaar"
        intro="Een vergelijking op uitstraling, onderhoud, opbouw en prijsklasse. De prijsklasse zegt iets over de verhouding tussen de materialen, niet over wat jouw kozijnen kosten."
      >
        <KozijnVergelijkTabel />
      </MateriaalSectie>

      {/* 3. Profielen — tab-selector per profiel */}
      <MateriaalSectie
        id="profielen"
        eyebrow="Profielen"
        titel="De profielen uit de configurator"
        intro={
          <>
            Dit zijn de profielen die je ook in de{" "}
            <Link href="/configurator" className={link}>
              configurator
            </Link>{" "}
            kunt kiezen, met de maten uit de gegevens van de fabrikant. Welk profiel bij jouw woning past, bespreken we
            bij je voorstel.
          </>
        }
      >
        <ProfielTabs
          tabs={ALLE_PROFIELEN.map((p) => ({
            id: p.id,
            titel: p.titel,
            materiaal: MATERIAAL_META[p.materiaal]?.label ?? p.materiaal,
          }))}
        >
          {ALLE_PROFIELEN.map((p) => {
            const meta = MATERIAAL_META[p.materiaal];
            return (
              <div key={p.id} className="space-y-6">
                <ProductSpecs product={p} />
                {meta && (
                  <div>
                    <Button href={meta.href} variant="secondary" size="sm">
                      Meer over {meta.label.toLowerCase()} kozijnen
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </ProfielTabs>
      </MateriaalSectie>

      {/* 4. Keuzehulp */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Keuzehulp"
        titel="Waar begin je?"
        intro="Twijfel je nog? Deze vuistregels helpen je op weg. Bij je voorstel kijken we samen naar je woning en je wensen."
      >
        <Keuzehulp />
      </MateriaalSectie>

      {/* 5. Glas, montage en kosten */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-xl text-ink">Glas en subsidie</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Elk materiaal kan met HR++ of triple glas. Vervang je bestaand glas, dan kom je misschien in aanmerking voor
              ISDE-subsidie.{" "}
              <Link href="/subsidie" className={link}>
                Lees waar je op let bij subsidie
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl text-ink">Montage en vervangen</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Een kozijn is zo goed als de aansluiting op de muur.{" "}
              <Link href="/montage" className={link}>
                Bekijk wat bij de montage hoort
              </Link>{" "}
              en{" "}
              <Link href="/kozijnen-vervangen" className={link}>
                hoe kozijnen vervangen in zijn werk gaat
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl text-ink">Kosten</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Materiaal is één van de factoren in de prijs. Maat, indeling, glas, kleur en montage tellen ook mee.{" "}
              <Link href="/kosten" className={link}>
                Bekijk hoe de prijs is opgebouwd
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* 6. Vragen */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Vragen"
        titel="Vragen over materialen en glas"
      >
        <div className="max-w-3xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </MateriaalSectie>

      {/* 7. Fabrikanten */}
      <MateriaalSectie
        eyebrow="Fabrikanten"
        titel="Meer weten over een profiel?"
        intro="Uitgebreide productinformatie vind je op de websites van de fabrikanten."
      >
        <LeveranciersSectie />
      </MateriaalSectie>

      {/* 8. Bronvermelding & auteursrechten */}
      <Section tone="soft">
        <Container>
          <Callout variant="disclaimer" title="Bronvermelding en auteursrechten">
            De profieldoorsneden en technische gegevens op deze pagina zijn gebaseerd op informatie van de fabrikanten.
            De rechten op deze afbeeldingen en merken liggen bij de fabrikant of rechthebbende. We gebruiken ze alleen om
            de producten uit te leggen. De actuele productinformatie staat op de websites van de fabrikanten.
          </Callout>
        </Container>
      </Section>

      {/* 9. CTA */}
      <CtaBlok
        titel="Wil je weten welk kozijn bij jouw woning past?"
        lead="Vertel ons wat je zoekt. Je krijgt een voorstel met het materiaal, het glas en de montage per onderdeel. Voordat er iets besteld wordt, meten we bij je thuis in."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="light">
              Bekijk de prijsopbouw
            </Button>
          </>
        }
      />
    </>
  );
}
