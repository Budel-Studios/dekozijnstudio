import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Checkout } from "@/components/offerte/checkout";
import { pageMetadata } from "@/lib/seo";

/** Project basket from the configurator — a flow page: noindex, not in the sitemap. */
export const metadata = pageMetadata({
  title: "Jouw project",
  description:
    "Je samengestelde kozijnen en de montage per onderdeel in één overzicht. Verstuur je project, dan nemen we contact met je op.",
  path: "/project",
  noindex: true,
});

export default function ProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="Jouw project"
        title="Alles van jouw project op één plek"
        lead="Je kozijnen en elke montagepost in één overzicht. Vul je gegevens in en verstuur je project; daarna nemen we contact met je op."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Jouw project" }]}
      />
      <Section>
        <Container>
          <Checkout />
        </Container>
      </Section>
    </>
  );
}
