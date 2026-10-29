import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Pagina niet gevonden (404)",
  robots: { index: false, follow: true },
};

const suggesties = [
  { label: "Kunststof kozijnen", href: "/kunststof-kozijnen", note: "Keuzes, glas en onderhoud" },
  { label: "Kozijnen vervangen", href: "/kozijnen-vervangen", note: "Zo gaat het in je woning" },
  { label: "Kosten", href: "/kosten", note: "Waar de prijs van afhangt" },
  { label: "Montage", href: "/montage", note: "Wat bij het monteren hoort" },
  { label: "Kennis", href: "/kennis", note: "Uitleg over kozijnen en glas" },
  { label: "Contact", href: "/contact", note: "We helpen je verder" },
];

export default function NotFound() {
  return (
    <section className="bg-paper-soft py-20 sm:py-28">
      <Container className="text-center">
        {/* Speels kozijn-raam met '404' als 'uitzicht' */}
        <div className="mx-auto mb-8 w-full max-w-xs">
          <div className="relative rounded-[1.5rem] border-[10px] border-paper bg-gradient-to-b from-[#dbe7ee] to-[#c4d9e3] p-6 shadow-soft ring-1 ring-wood/30">
            {/* raamkruis */}
            <div aria-hidden className="absolute inset-6 grid grid-cols-2 grid-rows-2">
              <span className="border-b border-r border-white/50" />
              <span className="border-b border-white/50" />
              <span className="border-r border-white/50" />
              <span />
            </div>
            <p className="relative font-display text-6xl font-semibold text-ink/80">404</p>
            <p className="relative mt-1 text-sm text-ink/55">geen uitzicht hier…</p>
          </div>
        </div>

        <h1 className="text-display-sm font-semibold tracking-tight text-ink sm:text-display">
          Dit raam kijkt uit op niets.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/65">
          De pagina die je zoekt bestaat niet (meer). Kies hieronder waar je
          naartoe wilt, of ga terug naar de homepage.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">Terug naar home</Button>
          <Button href="/offerte" variant="secondary" size="lg">Vraag een voorstel</Button>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {suggesties.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-between gap-3 rounded-card border border-mist bg-paper px-4 py-3 text-left transition-shadow hover:shadow-soft"
            >
              <span>
                <span className="block text-sm font-medium text-ink group-hover:text-forest">{s.label}</span>
                <span className="block text-xs text-ink/55">{s.note}</span>
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-forest" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
