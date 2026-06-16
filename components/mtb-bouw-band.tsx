import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, WrenchIcon, HomeIcon } from "@/components/icons";
import { MTB_URL, mtbFeaturedServices } from "@/data/mtb-bouw";

type Tone = "paper" | "soft" | "ink";

const serviceIcons = [WrenchIcon, HomeIcon];

/**
 * Herbruikbaar 'MTB Bouw'-blok — positioneert MTB Bouw als moederbedrijf én
 * betrouwbare bouwpartner. Wordt op kernpagina's geplaatst (home, montage,
 * bouwkundige aanpassingen). `tone` past de achtergrond aan de pagina aan.
 */
export function MtbBouwBand({ tone = "soft" }: { tone?: Tone }) {
  const dark = tone === "ink";

  return (
    <Section tone={tone}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow className={dark ? "text-paper/50" : undefined}>
            Moederbedrijf · MTB Bouw
          </Eyebrow>
          <h2 className={`mt-4 text-2xl sm:text-3xl ${dark ? "text-paper" : "text-ink"}`}>
            Méér dan kozijnen — een complete bouwpartner
          </h2>
          <p className={`mt-4 leading-relaxed ${dark ? "text-paper/70" : "text-ink/65"}`}>
            De Kozijnstudio is onderdeel van <strong>MTB Bouw</strong>, een
            ervaren bouwbedrijf uit de regio. Dat betekent dat we niet stoppen
            bij het kozijn: voor renovaties, verbouwingen en aanbouw staat een
            volwaardige bouwpartner voor u klaar — met dezelfde transparante
            werkwijze.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/mtb-bouw" variant={dark ? "primary" : "primary"}>
              Over het partnerschap
            </Button>
            <Button
              href={MTB_URL}
              variant="secondary"
              className={dark ? "border-paper/25 bg-transparent text-paper hover:bg-paper/10" : undefined}
            >
              <span>Bezoek mtbbouw.com</span>
              <ArrowUpRightIcon className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {mtbFeaturedServices.map((service, i) => {
            const Icon = serviceIcons[i] ?? WrenchIcon;
            return (
              <div
                key={service.title}
                className={`rounded-card border p-5 ${
                  dark ? "border-paper/15 bg-paper/5" : "border-mist bg-paper"
                }`}
              >
                <div
                  className={`mb-3 flex size-10 items-center justify-center rounded-xl ${
                    dark ? "bg-lime/15" : "bg-forest/8"
                  }`}
                >
                  <Icon className={`size-5 ${dark ? "text-lime" : "text-forest"}`} />
                </div>
                <h3 className={`font-display font-semibold ${dark ? "text-paper" : "text-ink"}`}>
                  {service.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-paper/65" : "text-ink/60"}`}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
