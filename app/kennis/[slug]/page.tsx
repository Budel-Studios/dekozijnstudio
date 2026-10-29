import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { FeatureList } from "@/components/ui/feature-list";
import { ArticleToc } from "@/components/kennis/article-toc";
import { RelatedArticles } from "@/components/kennis/related-articles";
import { getAllSlugs, getArticle, getRelatedArticles } from "@/lib/content";
import { extractToc } from "@/lib/toc";
import { articleSchema, breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

// Custom MDX components — injects brand components into article prose.
// External links open in a new tab.
const mdxComponents = {
  Callout,
  FeatureList,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = /^https?:\/\//.test(props.href ?? "");
    return isExternal ? (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ) : (
      <a {...props} />
    );
  },
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Niet gevonden" };

  const base = pageMetadata({
    title: article.title,
    description: article.description,
    path: `/kennis/${slug}`,
    type: "article",
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.dateModified ?? article.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function KennisArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = extractToc(article.content);
  const related = getRelatedArticles(article.related);

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Kennis", href: "/kennis" },
    { label: article.title, href: `/kennis/${slug}` },
  ];

  const updated =
    article.dateModified && article.dateModified !== article.date
      ? article.dateModified
      : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            articleSchema({
              slug: article.slug,
              title: article.title,
              description: article.description,
              datePublished: article.date,
              dateModified: article.dateModified,
            }),
            breadcrumbSchema(crumbs),
          ),
        }}
      />

      {/* Hero */}
      <div className="border-b border-mist bg-paper-soft py-12 sm:py-16">
        <Container>
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Kennis", href: "/kennis" },
                { label: article.title },
              ]}
            />
          </div>
          <Eyebrow>{article.category}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-display-sm text-ink sm:text-display">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/60">
            {article.description}
          </p>
          <p className="mt-5 text-sm text-ink/55">
            {updated ? (
              <>
                Bijgewerkt op <time dateTime={updated}>{formatDate(updated)}</time>
              </>
            ) : (
              <>
                Gepubliceerd op <time dateTime={article.date}>{formatDate(article.date)}</time>
              </>
            )}{" "}
            &middot; {article.readTime} min leestijd
          </p>
        </Container>
      </div>

      {/* Body — 3-col layout: TOC | content | related */}
      <div className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[220px_1fr_220px]">
            {/* Left: TOC */}
            <ArticleToc items={toc} />

            {/* Center: Article content */}
            <article className="min-w-0">
              <div className="prose prose-base max-w-none">
                <MDXRemote
                  source={article.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [
                          rehypeAutolinkHeadings,
                          { behavior: "wrap", properties: { className: ["anchor"] } },
                        ],
                      ],
                    },
                  }}
                />
              </div>

              {/* In-article CTA */}
              <div className="mt-12 rounded-card border border-forest/20 bg-forest/5 p-6">
                <p className="font-display font-semibold text-ink">
                  Wat betekent dit voor jouw woning?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  Na het inmeten krijg je een voorstel waarin kozijn, glas en montage apart
                  staan, zodat je precies ziet wat je kiest.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button href="/offerte" size="sm">
                    Vraag een voorstel
                  </Button>
                  <Link
                    href="/kosten"
                    className="text-sm font-medium text-forest underline underline-offset-2 hover:text-ink"
                  >
                    Bekijk waaruit de prijs bestaat
                  </Link>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Button href="/kennis" variant="ghost" size="sm">
                  ← Alle artikelen over kozijnen
                </Button>
              </div>
            </article>

            {/* Right: Related articles */}
            {related.length > 0 && (
              <div>
                <RelatedArticles articles={related} />
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
