import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { ArrowUpRightIcon } from "@/components/icons";
import { mapPlaces } from "@/lib/werkgebied-kaart";

/**
 * Local section for commercial pages whose title targets Enschede
 * (kunststof, vervangen). The text is written per page (never shared, doorway
 * rule); the links to Enschede (homepage), the place pages and the hub are
 * shared and come from the map data.
 */
export function LokaalBlok({ titel, children }: { titel: string; children: ReactNode }) {
  const plaatsen = mapPlaces().filter((p) => p.hasPage);

  return (
    <Section className="border-t border-mist">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Eyebrow>Enschede en Twente</Eyebrow>
          <h2 className="mt-4 text-2xl text-ink sm:text-3xl">{titel}</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-ink/70">{children}</div>
        </div>
        <nav aria-label="Kozijnen per plaats" className="self-end">
          <p className="label-mono text-ink/55">Kozijnen per plaats</p>
          <ul className="mt-3 border-t border-mist">
            {plaatsen.map((p) => (
              <li key={p.slug} className="border-b border-mist">
                <Link
                  href={p.href}
                  className="group flex items-center justify-between gap-4 py-3 text-ink transition-colors hover:text-forest"
                >
                  <span>
                    Kozijnen in {p.name}
                    <span className="ml-2 text-sm text-ink/50">{p.tagline}</span>
                  </span>
                  <ArrowUpRightIcon className="size-4 shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
            <li className="border-b border-mist">
              <Link
                href="/werkgebied"
                className="group flex items-center justify-between gap-4 py-3 text-ink transition-colors hover:text-forest"
              >
                <span>Heel Twente</span>
                <ArrowUpRightIcon className="size-4 shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
