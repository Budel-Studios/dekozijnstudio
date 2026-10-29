import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon, WrenchIcon, HomeIcon } from "@/components/icons";
import { MTB_URL, mtbFeaturedServices } from "@/data/mtb-bouw";
import { company } from "@/data/company";

type Tone = "paper" | "soft" | "ink";

const serviceIcons = [WrenchIcon, HomeIcon];

/**
 * Reusable MTB Bouw block — explains in plain words that De Kozijnstudio is a
 * trade name of MTB Bouw B.V. and that MTB Bouw does the building work around
 * kozijnen. Placed on home, montage and bouwkundige aanpassingen. `tone`
 * matches the page background.
 */
export function MtbBouwBand({ tone = "soft" }: { tone?: Tone }) {
  const dark = tone === "ink";

  return (
    <Section tone={tone}>
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow className={dark ? "text-paper/50" : undefined}>MTB Bouw</Eyebrow>
          <h2 className={`mt-4 text-2xl sm:text-3xl ${dark ? "text-paper" : "text-ink"}`}>
            Kozijnen en bouwkundig werk in één planning
          </h2>
          <p className={`mt-4 leading-relaxed ${dark ? "text-paper/70" : "text-ink/65"}`}>
            {company.naam} is een handelsnaam van {company.entiteit}. MTB Bouw is
            het bouwbedrijf voor verbouw, renovatie en aan- en uitbouw. Moet er
            voor je nieuwe kozijnen een opening groter, een latei vervangen of
            metselwerk aangepast worden? Dan doet MTB Bouw dat werk, afgestemd op
            de planning van je kozijnen.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/mtb-bouw">Meer over MTB Bouw</Button>
            <Button
              href={MTB_URL}
              variant="secondary"
              className={dark ? "border-paper/25 bg-transparent text-paper hover:bg-paper/10" : undefined}
            >
              <span>Naar mtbbouw.com</span>
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
