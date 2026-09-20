import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CheckIcon, LeafIcon } from "@/components/icons";

/**
 * Hero-concept 4 — "Glas-en-hout lagen".
 * Gelaagde compositie: hoofdfoto + zwevende glasmorphism-prijskaart +
 * hout-gekaderd mini-beeld + lime/forest-accenten op een zachte gradient.
 */
export function HeroLayers({
  image = "/hero/hero-2.jpg",
  inset = "/hero/hero-3.jpg",
}: {
  image?: string;
  inset?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-paper via-paper to-paper-soft">
      {/* hout/lime accenten */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 size-[32rem] rounded-full bg-wood/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-lime/10 blur-3xl" />

      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-28">
        {/* Tekst */}
        <div>
          <Eyebrow>Premium kozijnen, eerlijk geprijsd</Eyebrow>
          <h1 className="mt-5 text-display-sm font-semibold tracking-tight text-ink sm:text-display lg:text-display-lg">
            Glas, hout en aluminium.{" "}
            <span className="text-forest">Zonder ruis.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/65">
            Stel uw kozijn samen, zie direct de montagekosten incl. btw en
            laat alles — van montage tot bouwkundig werk — in één hand regelen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/configurator" size="lg">Start de configurator</Button>
            <Button href="/offerte-aanvragen" variant="secondary" size="lg">Offerte aanvragen</Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/70">
            {["Transparante prijzen", "Vanaf ± 8 weken levertijd", "1 partner: kozijn + bouw"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-lime/20">
                  <CheckIcon className="size-3 text-forest" />
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Gelaagd beeld */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* hoofdfoto */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-soft ring-1 ring-ink/5">
            <Image
              src={image}
              alt="Lichte woonkamer met grote kozijnen"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* hout-gekaderd mini-beeld, rechtsboven */}
          <div className="absolute -right-3 -top-6 hidden h-28 w-36 overflow-hidden rounded-2xl border-4 border-wood/30 bg-paper shadow-soft sm:block">
            <Image src={inset} alt="Detail van een kozijn" fill sizes="160px" className="object-cover" />
          </div>

          {/* zwevende glas-prijskaart, linksonder */}
          <div className="absolute -bottom-6 -left-3 rounded-2xl border border-white/40 bg-white/80 p-4 shadow-soft backdrop-blur-md sm:-left-6 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-forest/10">
                <LeafIcon className="size-5 text-forest" />
              </span>
              <div>
                <p className="text-xs text-ink/55">HR++ · wit · incl. montage</p>
                <p className="font-display text-xl font-semibold text-ink">
                  Prijs <span className="text-forest">op aanvraag</span>
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 border-t border-mist pt-3 text-xs text-ink/55">
              <span aria-hidden className="size-1.5 rounded-full bg-lime" />
              Mogelijk ISDE-subsidie bij HR++ of triple glas
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
