import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FAQ } from "@/components/ui/faq";
import { Placeholder } from "@/components/ui/placeholder";
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
import { breadcrumbSchema, organizationSchema, faqPageSchema, jsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Kozijnen in Twente: hout, kunststof & aluminium vergelijken",
  description:
    "Vergelijk houten (mahonie), kunststof (Gealan S9000 NL, Schüco) en aluminium (Reynaers SL 38, Aluprof MB-79N) kozijnen: specificaties, isolatie en advies. Twente & Oost-Nederland.",
  alternates: { canonical: "/kozijnen" },
  openGraph: {
    title: "Kozijnen vergelijken — hout, kunststof & aluminium | De Kozijnstudio",
    description:
      "Houten, kunststof en aluminium kozijnen naast elkaar: profielen, glas, isolatie en een keuzehulp. Levering en montage in Twente en Oost-Nederland.",
  },
};

const MATERIAAL_META: Record<string, { label: string; href: string }> = {
  hout: { label: "Hout", href: "/houten-kozijnen" },
  kunststof: { label: "Kunststof", href: "/kunststof-kozijnen" },
  aluminium: { label: "Aluminium", href: "/aluminium-kozijnen" },
};

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
              { label: "Kozijnen", href: "/kozijnen" },
            ]),
            organizationSchema(),
            faqPageSchema(FAQ_ITEMS),
          ),
        }}
      />

      <PageHero
        eyebrow="Kozijnen"
        title="Hout, kunststof of aluminium — welk kozijn past bij u?"
        lead="Wij leveren kozijnen in mahonie (hout), kunststof en aluminium. Elk materiaal heeft eigen voordelen qua uitstraling, onderhoud, isolatie, prijs en levensduur. Op deze pagina vergelijkt u de profielen die wij gebruiken — met levering en montage in heel Twente en Oost-Nederland."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kozijnen" }]}
        actions={
          <>
            <Button href="/offerte">Offerte aanvragen</Button>
            <Button href="/kosten" variant="secondary">Bekijk montagekosten</Button>
          </>
        }
        media={<Placeholder label="Kozijnen — sfeerfoto" className="min-h-72 lg:min-h-80" />}
      />

      {/* 1. Introductie */}
      <MateriaalSectie
        eyebrow="Introductie"
        titel="Drie materialen, één transparante aanpak"
        intro="Hout, kunststof en aluminium hebben elk hun sterke punten. Kort samengevat: hout (mahonie) is natuurlijk en klassiek, kunststof is onderhoudsarm en betaalbaar, en aluminium is strak en modern. Hieronder leest u per materiaal welke profielen wij voeren en wat ze technisch te bieden hebben — zodat u een weloverwogen keuze maakt."
      >
        <Keuzehulp />
      </MateriaalSectie>

      {/* 2. Profielen — tab-selector per profiel */}
      <MateriaalSectie
        id="profielen"
        tone="soft"
        eyebrow="Profielen"
        titel="Onze profielen — kies en vergelijk"
        intro="Wij leveren houten kozijnen in mahonie, kunststof kozijnen (Gealan S 9000 NL en Schüco) en aluminium kozijnen (Reynaers SL 38 en Aluprof MB-79N). Kies hieronder een profiel om de specificaties te bekijken."
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

      {/* 5. Vergelijkingstabel */}
      <MateriaalSectie
        eyebrow="Vergelijken"
        titel="Materialen en profielen in één oogopslag"
        intro="Een compacte vergelijking op uitstraling, onderhoud, isolatie, prijsklasse, levensduur en geschiktheid."
      >
        <KozijnVergelijkTabel />
      </MateriaalSectie>

      {/* 6. Keuzehulp */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Keuzehulp"
        titel="Welk kozijn past bij jouw woning?"
        intro="Twijfelt u nog? Deze richtlijnen helpen u op weg. Voor een advies op maat plant u een vrijblijvend gesprek of de inmeetservice."
      >
        <Keuzehulp />
      </MateriaalSectie>

      {/* 7. FAQ */}
      <MateriaalSectie
        eyebrow="Veelgestelde vragen"
        titel="Vragen over kozijnen, materialen en isolatie"
      >
        <FAQ items={FAQ_ITEMS} />
      </MateriaalSectie>

      {/* 8. Leveranciers */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Onze leveranciers"
        titel="Met wie wij werken"
        intro="Wij bouwen onze kozijnen op met systemen van gerenommeerde fabrikanten. Voor uitgebreide productinformatie verwijzen wij naar hun officiële websites."
      >
        <LeveranciersSectie />
      </MateriaalSectie>

      {/* 9. Bronvermelding & auteursrechten */}
      <Section>
        <Container>
          <Callout variant="disclaimer" title="Bronvermelding en auteursrechten">
            Een deel van de gebruikte productafbeeldingen, detailtekeningen en
            technische illustraties is afkomstig van onze leveranciers. Alle
            intellectuele eigendomsrechten, auteursrechten en merkrechten op deze
            afbeeldingen berusten bij de desbetreffende fabrikant of rechthebbende.
            Deze afbeeldingen worden uitsluitend gebruikt ter ondersteuning van de
            productinformatie. Voor aanvullende productinformatie verwijzen wij naar
            de officiële websites van de betreffende leveranciers.
          </Callout>
        </Container>
      </Section>

      {/* 10. CTA */}
      <CtaBlok
        titel="Wil je weten welk kozijn het beste past bij jouw woning?"
        lead="Vraag een vrijblijvende prijsindicatie aan of plan een inmeetafspraak. Na de inmeetservice (€ 49, verrekend bij doorgang) ontvangt u een volledig gespecificeerde offerte — in heel Twente en Oost-Nederland."
        actions={
          <>
            <Button href="/offerte">Offerte aanvragen</Button>
            <Button href="/contact" variant="secondary">Plan een inmeetafspraak</Button>
          </>
        }
      />
    </>
  );
}
