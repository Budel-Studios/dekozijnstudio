import type { Metadata } from "next";
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
import { ArticleToc } from "@/components/kennisbank/article-toc";
import { RelatedArticles } from "@/components/kennisbank/related-articles";
import { getAllSlugs, getArticle, getRelatedArticles } from "@/lib/content";
import { extractToc } from "@/lib/toc";
import { articleSchema, jsonLd } from "@/lib/jsonld";

// Custom MDX components — injects brand components into article prose.
// Externe links openen automatisch in een nieuw tabblad.
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

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/kennisbank/${slug}` },
    openGraph: {
      title: `${article.title} — De Kozijnstudio`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.dateModified ?? article.date,
    },
  };
}

export default async function KennisbankArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const toc = extractToc(article.content);
  const related = getRelatedArticles(article.related);

  const publishedFormatted = new Date(article.date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
                { label: "Kennisbank", href: "/kennisbank" },
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
          <p className="mt-5 text-sm text-ink/40">
            Gepubliceerd op {publishedFormatted} &middot; {article.readTime} min leestijd
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
            <article>
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
                  Benieuwd wat dit voor uw woning betekent?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  Vraag een vrijblijvende offerte aan. Na de inmeetservice (€ 49,
                  verrekend bij doorgang) ontvangt u een volledig gespecificeerde
                  offerte — geen verborgen kosten.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button href="/offerte-aanvragen" size="sm">
                    Offerte aanvragen
                  </Button>
                  <Button href="/prijzen" variant="secondary" size="sm">
                    Bekijk montagekosten
                  </Button>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Button href="/kennisbank" variant="ghost" size="sm">
                  ← Terug naar de kennisbank
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
