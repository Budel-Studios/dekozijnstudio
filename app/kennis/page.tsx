import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { getAllArticles } from "@/lib/content";

const zelfPlaatsenStappen = [
  { n: "1", t: "Inmeten", d: "Exact opmeten van de bestaande situatie." },
  { n: "2", t: "Bestellen", d: "Maatwerk kozijn samenstellen en aanvragen." },
  { n: "3", t: "Voorbereiden", d: "Oude kozijn verwijderen, opening klaarmaken." },
  { n: "4", t: "Plaatsen & afmonteren", d: "Stellen, bevestigen, isoleren en afkitten." },
];

export const metadata: Metadata = {
  title: "Kennisbank — alles over kozijnen",
  description:
    "Eerlijke informatie over kozijnen: kosten, materialen, subsidie, montage en onderhoud. Geen verkooppraatje — feiten en advies.",
  alternates: { canonical: "/kennis" },
};

export default function KennisbankPage() {
  const articles = getAllArticles();
  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <>
      <PageHero
        eyebrow="Kennisbank"
        title="Alles over kozijnen — eerlijk uitgelegd."
        lead="Geen verkooppraatje, maar feitelijke informatie over kosten, materialen, subsidie en montage. Zodat u een weloverwogen beslissing kunt nemen."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kennisbank" }]}
      />

      {/* Uitgelicht: Zelf een kozijn plaatsen (kapstok — wordt later uitgewerkt) */}
      <Section tone="soft">
        <Container>
          <div className="rounded-card border border-mist bg-paper p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <Eyebrow>Zelf plaatsen</Eyebrow>
                <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
                  Zelf een kozijn plaatsen — van inmeten tot afmonteren
                </h2>
                <p className="mt-3 leading-relaxed text-ink/60">
                  Handig en wil je besparen? In deze stap-voor-stap gids leggen we
                  uit hoe je zelf kozijnen plaatst. De volledige uitwerking volgt
                  binnenkort.
                </p>
              </div>
              <Button href="/diy" variant="secondary">Over zelf plaatsen (DIY)</Button>
            </div>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {zelfPlaatsenStappen.map((s) => (
                <li key={s.n} className="rounded-xl border border-mist bg-paper-soft p-4">
                  <span className="flex size-8 items-center justify-center rounded-full border-2 border-lime bg-lime/10 font-display text-sm font-semibold text-ink">
                    {s.n}
                  </span>
                  <p className="mt-3 font-medium text-ink">{s.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/60">{s.d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-ink/45">
              Uitgebreide instructies, foto&apos;s en video volgen — dit onderdeel
              wordt later ingericht.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {categories.map((category) => {
            const categoryArticles = articles.filter((a) => a.category === category);
            return (
              <div key={category} className="mb-14 last:mb-0">
                <Eyebrow>{category}</Eyebrow>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/kennis/${article.slug}`}
                      className="group flex flex-col justify-between rounded-card border border-mist bg-paper p-5 transition-shadow hover:shadow-soft"
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-wood">
                          {article.category}
                        </p>
                        <h3 className="mt-2 font-display font-semibold leading-snug text-ink transition-colors group-hover:text-forest">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">
                          {article.description}
                        </p>
                      </div>
                      <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-forest">
                        Lees meer
                        <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </Section>
    </>
  );
}
