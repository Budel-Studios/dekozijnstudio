import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Configurator } from "@/components/configurator/configurator";
import { CONFIG_PRODUCTTYPES } from "@/data/configurator";
import { pageMetadata } from "@/lib/seo";

/** Canonical is always /configurator — ?type=… deep links point to the main version. */
export const metadata = pageMetadata({
  title: "Kozijnconfigurator: stel je kozijn samen",
  description:
    "Stel online je kozijn samen: materiaal, type, maten, glas en kleur. Je ziet direct welke montagewerkzaamheden erbij horen. Vrijblijvend.",
  path: "/configurator",
});

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  // Only accept a valid producttype as preselection (deep-link from catalog).
  const initialProducttype = CONFIG_PRODUCTTYPES.some((p) => p.value === type)
    ? type
    : undefined;

  return (
    <>
      <PageHero
        eyebrow="Configurator"
        title="Stel je kozijn samen"
        lead="Kies materiaal, type, maten, glas en kleur, en zie welke montagewerkzaamheden erbij horen. Voeg je kozijn toe aan je project en verstuur het als je klaar bent."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Configurator" }]}
      />

      <Section>
        <Container>
          <Configurator initialProducttype={initialProducttype} />
        </Container>
      </Section>
    </>
  );
}
