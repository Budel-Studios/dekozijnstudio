import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardEyebrow, CardTitle, CardBody } from "@/components/ui/card";
import { FeatureList } from "@/components/ui/feature-list";
import { FAQ } from "@/components/ui/faq";
import { MateriaalSectie } from "@/components/kozijnen/materiaal-sectie";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { REGIO_PAGINAS, regioPad, type RegioPagina } from "@/data/regio";

/** Material cards: trade-offs, no brand promises or performance claims. */
const MATERIALEN = [
  {
    eyebrow: "Weinig onderhoud",
    titel: "Kunststof kozijnen",
    tekst:
      "Veel gekozen bij vervanging: goed te combineren met isolerend glas en in veel kleuren leverbaar, ook met houtnerf. Schilderen is niet nodig. Het profiel is wel breder dan bij aluminium, en van dichtbij zie je dat een houtlook geen hout is.",
    href: "/kunststof-kozijnen",
  },
  {
    eyebrow: "Natuurlijk en klassiek",
    titel: "Houten kozijnen",
    tekst:
      "Warm van uitstraling en goed te profileren zoals het oorspronkelijke kozijn, wat past bij karakteristieke en vooroorlogse woningen. Daar staat tegenover dat hout periodiek geschilderd moet worden. Reken dat onderhoud mee in je keuze.",
    href: "/houten-kozijnen",
  },
  {
    eyebrow: "Slank en strak",
    titel: "Aluminium kozijnen",
    tekst:
      "Slanke profielen met veel glas, geschikt voor grote ramen en schuifpuien. Schilderen is niet nodig. Aluminium is meestal duurder in aanschaf, en de strakke uitstraling past niet bij elke gevel.",
    href: "/aluminium-kozijnen",
  },
];

const chipClass = "border border-mist bg-paper px-3 py-1.5 text-sm text-ink/70";

/**
 * Shared template for the werkgebied pages: the regio hub (/werkgebied) and
 * the place pages (/werkgebied/<plaats>). Renders breadcrumb JSON-LD, hero,
 * local points of attention, service area chips, materials, local context,
 * a visible FAQ (no FAQPage schema) and a CTA — all content from data/regio.ts.
 * The organization schema lives in the root layout, not here.
 */
export function RegioPaginaTemplate({ data }: { data: RegioPagina }) {
  const isHub = data.soort === "regio";
  const inNaam = `in ${data.naam}`;
  const hubPad = regioPad({ slug: "twente", soort: "regio" });
  const pad = regioPad(data);

  const crumbs = isHub
    ? [
        { label: "Home", href: "/" },
        { label: "Werkgebied", href: pad },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Werkgebied", href: hubPad },
        { label: data.naam, href: pad },
      ];

  // Chips that have their own page become internal links
  // (e.g. "Hengelo" on the hub → /werkgebied/hengelo).
  const paginaPad = new Map(
    REGIO_PAGINAS.filter((r) => r.slug !== data.slug).map((r) => [r.naam, regioPad(r)]),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(crumbs)) }}
      />

      <PageHero
        eyebrow={isHub ? "Werkgebied" : "Werkgebied vanuit Enschede"}
        title={data.heroTitel}
        lead={data.heroLead}
        breadcrumbs={crumbs.map((c, i) =>
          i === crumbs.length - 1 ? { label: c.label } : c,
        )}
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="secondary">
              Bekijk wat het kost
            </Button>
          </>
        }
      />

      {/* Points of attention + service area */}
      <MateriaalSectie
        eyebrow={isHub ? "Hoe we werken" : "Waar we op letten"}
        titel={
          isHub
            ? "Wat je van ons kunt verwachten in Twente"
            : `Kozijnen ${inNaam}: waar we op letten`
        }
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <FeatureList items={data.lokaleUsps} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-wood">
              {isHub ? "Plaatsen in ons werkgebied" : "Wijken en plaatsen"}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.plaatsen.map((plaats) => {
                const href = paginaPad.get(plaats);
                return (
                  <li key={plaats}>
                    {href ? (
                      <Link
                        href={href}
                        className={`${chipClass} inline-block underline decoration-mist underline-offset-4 transition-colors hover:border-forest hover:text-forest`}
                      >
                        {plaats}
                      </Link>
                    ) : (
                      <span className={`${chipClass} inline-block`}>{plaats}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {!isHub && (
              <p className="mt-6 text-sm leading-relaxed text-ink/65">
                {data.naam} is geen vestiging maar hoort bij ons werkgebied.{" "}
                <Link
                  href={hubPad}
                  className="font-medium text-forest underline underline-offset-2"
                >
                  Bekijk het hele werkgebied
                </Link>
              </p>
            )}
          </div>
        </div>
      </MateriaalSectie>

      {/* Materials */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Materialen"
        titel="Kunststof, hout of aluminium"
        intro={`Elk materiaal heeft eigen voor- en nadelen in uitstraling, onderhoud en prijs. We leveren alle drie ${inNaam} en helpen je kiezen wat bij jouw woning past.`}
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {MATERIALEN.map((m) => (
            <Card key={m.titel}>
              <CardEyebrow>{m.eyebrow}</CardEyebrow>
              <CardTitle>{m.titel}</CardTitle>
              <CardBody>{m.tekst}</CardBody>
              <div className="mt-4">
                <Button href={m.href} variant="ghost" size="sm">
                  Lees meer over {m.titel.toLowerCase()} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/kozijnen" variant="secondary">
            Vergelijk de materialen
          </Button>
        </div>
      </MateriaalSectie>

      {/* Local context */}
      <MateriaalSectie
        eyebrow={isHub ? "De regio" : "Lokaal"}
        titel={
          isHub
            ? "Veel verschillende woningen in één regio"
            : `Wat opvalt aan de woningen ${inNaam}`
        }
      >
        <div className="max-w-3xl space-y-4">
          {data.lokaleContext.map((alinea, i) => (
            <p key={i} className="leading-relaxed text-ink/65">
              {alinea}
            </p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/kozijnen-vervangen" variant="secondary" size="sm">
            Zo gaat kozijnen vervangen
          </Button>
          <Button href="/montage" variant="secondary" size="sm">
            Wat bij de montage hoort
          </Button>
          <Button href="/subsidie" variant="secondary" size="sm">
            Lees over subsidie
          </Button>
        </div>
      </MateriaalSectie>

      {/* FAQ (visible only — no FAQPage schema) */}
      <MateriaalSectie
        tone="soft"
        eyebrow="Veelgestelde vragen"
        titel={isHub ? "Vragen over ons werkgebied" : `Vragen over kozijnen ${inNaam}`}
      >
        <FAQ items={data.faq} />
      </MateriaalSectie>

      {/* CTA */}
      <CtaBlok
        titel={`Nieuwe kozijnen ${inNaam}?`}
        lead="Vertel ons over je woning en je wensen; foto's helpen, maar zijn niet verplicht. We nemen contact met je op om de volgende stap te bespreken."
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="secondary">
              Bekijk wat het kost
            </Button>
          </>
        }
      />
    </>
  );
}
