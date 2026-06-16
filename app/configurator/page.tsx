import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Configurator } from "@/components/configurator/configurator";
import { CONFIG_PRODUCTTYPES } from "@/data/configurator";

export const metadata: Metadata = {
  title: "Kozijnconfigurator — stel uw kozijn samen",
  description:
    "Stel online uw kozijn samen: materiaal, profiel, type, afmetingen, glas en afwerking. Ontvang direct een indicatieve richtprijs incl. btw — vrijblijvend.",
  alternates: { canonical: "/configurator" },
  openGraph: {
    title: "Kozijnconfigurator — De Kozijnstudio",
    description: "Stel uw kozijn samen en ontvang direct een indicatieve richtprijs incl. btw.",
  },
};

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
        title="Stel uw kozijn samen."
        lead="Kies materiaal, type, afmetingen en afwerking — en zie direct een indicatieve richtprijs. Tevreden? Stuur uw configuratie mee met de offerteaanvraag."
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
