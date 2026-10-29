import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { getAllArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

export const metadata = pageMetadata({
  title: "Kennis over kozijnen",
  description:
    "Uitleg over kozijnen: wat ze kosten, welk materiaal en glas bij je woning past, hoe montage en subsidie werken en hoe je kozijnen onderhoudt.",
  path: "/kennis",
});

/** Display order of the categories; unknown categories follow alphabetically. */
const CATEGORY_ORDER = [
  "Prijzen",
  "Materialen",
  "Beglazing",
  "Subsidie",
  "Montage",
  "Bouwkundig",
  "Regelgeving",
  "Onderhoud",
];

function categoryRank(category: string) {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Kennis", href: "/kennis" },
];

export default function KennisPage() {
  const articles = getAllArticles();
  const categories = [...new Set(articles.map((a) => a.category))].sort(
    (a, b) => categoryRank(a) - categoryRank(b) || a.localeCompare(b, "nl"),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema(breadcrumbs)) }}
      />

      <PageHero
        eyebrow="Kennis"
        title="Kennis over kozijnen, helder uitgelegd"
        lead="Wat kosten nieuwe kozijnen, welk materiaal en glas passen bij je woning en hoe verloopt de montage? Hier lees je waar je op let, zodat je weet wat je kiest."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Kennis" }]}
      />

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
                        <h2 className="mt-2 font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-forest">
                          {article.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-ink/60">
                          {article.description}
                        </p>
                      </div>
                      <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-forest">
                        Lees het artikel
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

      <Section tone="soft">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Jouw woning</Eyebrow>
            <h2 className="mt-4 text-2xl text-ink sm:text-3xl">
              Wil je weten wat nieuwe kozijnen voor jouw woning betekenen?
            </h2>
            <p className="mt-4 leading-relaxed text-ink/65">
              Vertel ons wat je wilt veranderen. Na het inmeten krijg je een voorstel waarin
              kozijn, glas en montage apart staan.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/offerte">Vraag een voorstel</Button>
              <Button href="/kosten" variant="secondary">
                Bekijk de prijsopbouw
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
