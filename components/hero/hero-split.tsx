import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CheckIcon, ShieldCheckIcon } from "@/components/icons";

const usps = [
  "Prijzen altijd incl. btw",
  "Vast, transparant montagetarief",
  "Compleet ontzorgd via MTB Bouw",
];

/**
 * Hero-concept 1 — "Split + foto".
 * Groot statement links (met lime-accent op één woord) + CTA's + USP's,
 * rechts een gekaderde foto met zwevende prijs-chip en trust-badge.
 */
export function HeroSplit({ image = "/hero/hero-1.jpg" }: { image?: string }) {
  return (
    <section className="relative overflow-hidden bg-paper-soft">
      {/* zachte achtergrond-accenten */}
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[28rem] rounded-full bg-lime/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-forest/5 blur-3xl" />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* Tekst */}
        <div>
          <Eyebrow>Transparant van A tot Z</Eyebrow>
          <h1 className="mt-5 text-display-sm font-semibold tracking-tight text-ink sm:text-display lg:text-display-lg">
            Nieuwe kozijnen zonder verborgen{" "}
            <span className="relative whitespace-nowrap text-forest">
              marges
              <span aria-hidden className="absolute -bottom-1 left-0 h-3 w-full rounded-full bg-lime/55" />
            </span>
            .
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Transparante prijzen incl. btw, vaste montagetarieven en complete
            bouwkundige begeleiding via MTB Bouw. Werkgebied: Twente &
            Oost-Nederland.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/configurator" size="lg">Stel uw kozijn samen</Button>
            <Button href="/prijzen" variant="secondary" size="lg">Bekijk montagekosten</Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {usps.map((u) => (
              <li key={u} className="flex items-center gap-2 text-sm text-ink/70">
                <span className="flex size-5 items-center justify-center rounded-full bg-lime/20">
                  <CheckIcon className="size-3 text-forest" />
                </span>
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* Beeld */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-paper bg-mist shadow-soft ring-1 ring-wood/30">
            <Image
              src={image}
              alt="Moderne woning met grote kozijnen en veel glas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Zwevende 'vanaf'-chip */}
          <div className="absolute -left-3 bottom-10 rounded-2xl border border-white/30 bg-white/85 px-5 py-3 shadow-soft backdrop-blur-md sm:-left-6">
            <p className="text-xs text-ink/55">Compleet, incl. montage</p>
            <p className="font-display text-2xl font-semibold text-ink">
              Prijs <span className="text-forest">op aanvraag</span>
            </p>
          </div>

          {/* Trust-badge */}
          <div className="absolute -right-2 top-6 flex items-center gap-2 rounded-pill border border-white/30 bg-ink/90 px-4 py-2 text-xs font-medium text-paper shadow-soft backdrop-blur sm:-right-4">
            <ShieldCheckIcon className="size-4 text-lime" />
            100% incl. btw
          </div>
        </div>
      </Container>
    </section>
  );
}
