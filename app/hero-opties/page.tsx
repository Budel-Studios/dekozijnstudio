import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SHOW_INTERNAL_PAGES } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { HeroSplit } from "@/components/hero/hero-split";
import { HeroLayers } from "@/components/hero/hero-layers";

export const metadata: Metadata = {
  title: "Hero-concepten vergelijken",
  robots: { index: false, follow: false },
};

function Label({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <div className="bg-ink py-5 text-paper">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-lime text-sm font-bold text-ink">
            {n}
          </span>
          <span className="font-display text-lg font-semibold">{title}</span>
        </div>
        <span className="text-sm text-paper/55">{note}</span>
      </Container>
    </div>
  );
}

export default function HeroOptiesPage() {
  if (!SHOW_INTERNAL_PAGES) notFound();
  return (
    <>
      <div className="border-b border-mist bg-paper-soft py-8">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-wood">Interne preview</p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink">Hero-concepten vergelijken</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">
            Twee richtingen voor de homepage-hero, met tijdelijke stockfoto&apos;s.
            Scroll en vergelijk. Laat me weten welke je wilt (eventueel met
            aanpassingen), dan zet ik &lsquo;m op de voorpagina. De echte homepage
            is nog niet gewijzigd.
          </p>
        </Container>
      </div>

      <Label n="1" title="Split + foto" note="Statement links · gekaderde foto + prijs-chip rechts" />
      <HeroSplit />

      <Label n="4" title="Glas-en-hout lagen" note="Gelaagde compositie · zwevende glaskaart + hout-frame" />
      <HeroLayers />

      <div className="bg-paper-soft py-12">
        <Container className="text-center">
          <p className="text-ink/70">
            Welke spreekt je aan? Zeg bijv. &ldquo;optie 1, maar donkerder&rdquo; of
            &ldquo;optie 4 met andere foto&rdquo; — dan werk ik &lsquo;m af en plaats
            ik &lsquo;m op de homepage.
          </p>
        </Container>
      </div>
    </>
  );
}
