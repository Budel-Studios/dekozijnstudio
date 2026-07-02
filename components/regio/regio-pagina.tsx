import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { FeatureList } from "@/components/ui/feature-list";
import { FAQ } from "@/components/ui/faq";
import { Placeholder } from "@/components/ui/placeholder";
import { MateriaalSectie } from "@/components/kozijnen/materiaal-sectie";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { breadcrumbSchema, organizationSchema, faqPageSchema, jsonLd } from "@/lib/jsonld";
import type { RegioPagina } from "@/data/regio";

const MATERIALEN = [
  {
    eyebrow: "Onderhoudsarm",
    titel: "Kunststof kozijnen",
    tekst: "De meest gekozen optie: uitstekende isolatie, nauwelijks onderhoud en leverbaar in vrijwel elke kleur. Profielen van Schüco en Gealan.",
    href: "/kunststof-kozijnen",
  },
  {
    eyebrow: "Natuurlijk & klassiek",
    titel: "Houten kozijnen",
    tekst: "Mahonie hardhout met een warme, tijdloze uitstraling — ideaal voor karakteristieke en vooroorlogse woningen.",
    href: "/houten-kozijnen",
  },
  {
    eyebrow: "Slank & modern",
    titel: "Aluminium kozijnen",
    tekst: "Slanke profielen (Reynaers, Aluprof) met veel glas en een hoogwaardige afwerking, vrijwel onderhoudsvrij.",
    href: "/aluminium-kozijnen",
  },
];

/**
 * Gedeelde template voor lokale SEO-landingspagina's (/kozijnen-<plaats>).
 * Rendert JSON-LD (breadcrumb + organisatie + FAQ), hero, lokale USP's,
 * werkgebied, materialen, lokale context, FAQ en CTA — alles uit data/regio.ts.
 */
export function RegioPaginaTemplate({ data }: { data: RegioPagina }) {
  const inNaam = `in ${data.naam}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: `Kozijnen ${data.naam}`, href: `/${data.slug}` },
            ]),
            organizationSchema(),
            faqPageSchema(data.faq),
          ),
        }}
      />

      <PageHero
        eyebrow={`Kozijnen ${data.naam}`}
        title={data.heroTitel}
        lead={data.heroLead}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Kozijnen", href: "/kozijnen" },
          { label: data.naam },
        ]}
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/prijzen" variant="secondary">Bekijk prijzen</Button>
          </>
        }
        media={<Placeholder label={`Projectfoto ${data.naam} volgt`} className="min-h-72 lg:min-h-80" />}
      />

      {/* Lokale USP's + werkgebied */}
      <MateriaalSectie
        eyebrow="Waarom De Kozijnstudio"
        titel={`Uw kozijnspecialist ${inNaam}`}
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <FeatureList items={data.lokaleUsps} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-wood">
              Werkgebied
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.plaatsen.map((plaats) => (
                <span
                  key={plaats}
                  className="border border-mist bg-paper px-3 py-1.5 text-sm text-ink/70"
                >
                  {plaats}
                </span>
              ))}
            </div>
          </div>
        </div>
      </MateriaalSectie>

      {/* Materialen */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Materialen"
        titel="Kunststof, hout of aluminium"
        intro={`Elk materiaal heeft eigen voordelen qua uitstraling, onderhoud en isolatie. Wij leveren en monteren alle drie ${inNaam} — en helpen u kiezen wat bij uw woning past.`}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {MATERIALEN.map((m) => (
            <Card key={m.titel}>
              <CardEyebrow>{m.eyebrow}</CardEyebrow>
              <CardTitle>{m.titel}</CardTitle>
              <CardBody>{m.tekst}</CardBody>
              <div className="mt-4">
                <Button href={m.href} variant="ghost" size="sm">
                  Lees meer →
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/kozijnen" variant="secondary">Vergelijk alle kozijnen</Button>
          <Button href="/producten" variant="secondary">Bekijk alle producten</Button>
        </div>
      </MateriaalSectie>

      {/* Lokale context */}
      <MateriaalSectie
        eyebrow="Lokaal maatwerk"
        titel={`Kozijnen die passen bij de woningen ${inNaam}`}
      >
        <div className="max-w-3xl space-y-4">
          {data.lokaleContext.map((alinea, i) => (
            <p key={i} className="leading-relaxed text-ink/65">{alinea}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/montage" variant="secondary" size="sm">Over de montage</Button>
          <Button href="/isde-subsidie" variant="secondary" size="sm">ISDE-subsidie</Button>
        </div>
      </MateriaalSectie>

      {/* FAQ */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Veelgestelde vragen"
        titel={`Vragen over kozijnen ${inNaam}`}
      >
        <FAQ items={data.faq} />
      </MateriaalSectie>

      {/* CTA */}
      <CtaBlok
        titel={`Nieuwe kozijnen ${inNaam}?`}
        lead="Vraag een vrijblijvende offerte aan of plan de inmeetservice (€ 49, volledig verrekend bij doorgang). U ontvangt een offerte waarin elk onderdeel apart en incl. btw is gespecificeerd."
        actions={
          <>
            <Button href="/offerte-aanvragen">Offerte aanvragen</Button>
            <Button href="/contact" variant="secondary">Plan een inmeetafspraak</Button>
          </>
        }
      />
    </>
  );
}
