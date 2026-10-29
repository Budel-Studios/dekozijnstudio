import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { CtaBlok } from "@/components/kozijnen/cta-blok";
import { Button } from "@/components/ui/button";
import { PROJECTEN } from "@/data/projecten";
import { pageMetadata } from "@/lib/seo";

/**
 * Project overview. Renders only when data/projecten.ts holds real cases;
 * until then this route is a real 404 (no empty or placeholder overview).
 */
export const metadata = pageMetadata({
  title: "Kozijnprojecten in Enschede en Twente",
  description:
    "Bekijk echte kozijnprojecten, de gemaakte materiaalkeuzes en de afwerking. Ontdek wat relevant kan zijn voor jouw eigen woning.",
  path: "/projecten",
});

export default function ProjectenPage() {
  if (PROJECTEN.length === 0) notFound();

  return (
    <>
      <PageHero
        eyebrow="Projecten"
        title="Bekijk onze kozijnprojecten"
        lead="Echte woningen, de keuzes die we samen maakten en hoe het werk is afgewerkt."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projecten" }]}
      />
      <Section>
        <Container className="grid gap-6 md:grid-cols-2">
          {PROJECTEN.map((p) => {
            const foto = p.fotos.find((f) => f.soort === "buiten") ?? p.fotos[0];
            return (
              <Link
                key={p.slug}
                href={`/projecten/${p.slug}`}
                className="group overflow-hidden rounded-card border border-mist bg-paper"
              >
                {foto && (
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-wood">
                    {p.plaats} · {p.woningtype}
                  </p>
                  <h2 className="mt-2 text-xl text-ink group-hover:text-forest">{p.titel}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.klantvraag}</p>
                </div>
              </Link>
            );
          })}
        </Container>
      </Section>
      <CtaBlok
        titel="Een vergelijkbare woning?"
        lead="Vertel ons wat je wilt veranderen. Foto's van je huidige kozijnen helpen al veel."
        actions={<Button href="/offerte">Vraag een voorstel</Button>}
      />
    </>
  );
}
