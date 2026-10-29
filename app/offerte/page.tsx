import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FeatureList } from "@/components/ui/feature-list";
import { Button } from "@/components/ui/button";
import { VoorstelForm } from "@/components/offerte/voorstel-form";
import { ContactLink } from "@/components/contact-link";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { company } from "@/data/company";
import { feit } from "@/data/feiten";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Voorstel voor nieuwe kozijnen aanvragen",
  description:
    "Vraag een voorstel aan voor jouw kozijnen. Deel je woonplaats, wensen en eventueel foto's, zodat we gericht naar je situatie kunnen kijken.",
  path: "/offerte",
});

const naAanvraag = [
  "We bekijken je wensen, foto's en situatie.",
  "We nemen contact met je op, op de manier die je kiest.",
  "Voordat er iets besteld wordt, meten we bij je thuis in en bespreken we de keuzes.",
  "Je krijgt een voorstel waarin kozijn, glas, montage en eventueel bouwkundig werk apart staan.",
];

export default function OffertePage() {
  const inmeten = feit("inmeetservice");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbSchema([{ label: "Home", href: "/" }, { label: "Vraag een voorstel", href: "/offerte" }])),
        }}
      />
      <PageHero
        eyebrow="Vraag een voorstel"
        title="Vertel ons over jouw kozijnen"
        lead="Drie korte stappen: je wens, je situatie en hoe we je kunnen bereiken. Foto's en maten zijn niet verplicht. Een aanvraag is vrijblijvend."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Vraag een voorstel" }]}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <VoorstelForm />
          </div>

          <aside className="lg:sticky lg:top-32">
            <Eyebrow>Wat er daarna gebeurt</Eyebrow>
            <h2 className="mb-6 mt-4 text-xl font-semibold text-ink">Na je aanvraag</h2>
            <FeatureList items={inmeten ? [...naAanvraag, inmeten] : naAanvraag} />

            <div className="mt-8 rounded-card border border-mist bg-paper-soft p-6">
              <p className="font-semibold text-ink">Liever direct contact?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Bel{" "}
                <ContactLink kind="phone" location="offerte" className="font-medium text-forest underline underline-offset-2">
                  {company.telefoon}
                </ContactLink>{" "}
                of stuur een{" "}
                <ContactLink kind="whatsapp" location="offerte" className="font-medium text-forest underline underline-offset-2">
                  WhatsApp-bericht
                </ContactLink>
                .
              </p>
            </div>

            {MODULES.configurator && (
              <div className="mt-4 rounded-card border border-mist bg-paper-soft p-6">
                <p className="font-semibold text-ink">Weet je al precies wat je wilt?</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  Stel je kozijn zelf samen in de configurator en stuur je project in één keer door.
                </p>
                <Button href="/configurator" variant="secondary" size="sm" className="mt-4">
                  Naar de configurator
                </Button>
              </div>
            )}

            <p className="mt-4 text-xs leading-relaxed text-ink/55">
              Je gegevens en foto&apos;s gaan per e-mail naar ons en worden niet gepubliceerd. Lees de{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                privacyverklaring
              </Link>
              .
            </p>
          </aside>
        </Container>
      </Section>
    </>
  );
}
