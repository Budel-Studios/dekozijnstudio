import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { FeatureList } from "@/components/ui/feature-list";
import { Button } from "@/components/ui/button";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { PROJECTEN, projectBySlug } from "@/data/projecten";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTEN.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.titel} in ${p.plaats}`,
    description: `${p.klantvraag} Bekijk de keuzes, de montage en het resultaat.`.slice(0, 160),
    path: `/projecten/${p.slug}`,
  });
}

/** Fixed project format from the strategy (h8): question → situation → choices → result. */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const blok = (titel: string, tekst: string) => (
    <div>
      <h2 className="text-xl text-ink">{titel}</h2>
      <p className="mt-2 leading-relaxed text-ink/70">{tekst}</p>
    </div>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema([
              { label: "Home", href: "/" },
              { label: "Projecten", href: "/projecten" },
              { label: p.titel, href: `/projecten/${p.slug}` },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow={`${p.plaats} · ${p.woningtype}`}
        title={p.titel}
        lead={p.klantvraag}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projecten", href: "/projecten" }, { label: p.titel }]}
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            {blok("Uitgangssituatie", p.uitgangssituatie)}
            <div>
              <h2 className="text-xl text-ink">Gemaakte keuzes</h2>
              <FeatureList className="mt-3" items={p.keuzes} />
            </div>
            {blok("De lastigste keuze", p.lastigeKeuze)}
            {blok("Geleverd product", p.product)}
            {blok("Montage", p.montage)}
            {blok("Afwerking", p.afwerking)}
            {blok("Resultaat", p.resultaat)}
            {p.klantreactie && (
              <blockquote className="border-l-4 border-lime pl-5 italic text-ink/75">{p.klantreactie}</blockquote>
            )}
            {p.prijsToelichting && blok("Wat het kostte", p.prijsToelichting)}
            <p className="text-xs text-ink/55">Uitgevoerd door {p.uitvoerendePartij}.</p>
          </div>
          <div className="grid content-start gap-4">
            {p.fotos.map((f) => (
              <Image
                key={f.src}
                src={f.src}
                alt={f.alt}
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="w-full rounded-card object-cover"
              />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBlok
        titel="Iets vergelijkbaars voor jouw woning?"
        actions={
          <>
            <Button href="/offerte">Vraag een voorstel</Button>
            <Button href="/kosten" variant="light">
              Waar de prijs van afhangt
            </Button>
          </>
        }
      />
    </>
  );
}
