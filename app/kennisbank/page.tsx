import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowRightIcon } from "@/components/icons";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kennisbank — alles over kozijnen",
  description:
    "Eerlijke informatie over kozijnen: kosten, materialen, subsidie, montage en onderhoud. Geen verkooppraatje — feiten en advies.",
  alternates: { canonical: "/kennisbank" },
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
                      href={`/kennisbank/${article.slug}`}
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
