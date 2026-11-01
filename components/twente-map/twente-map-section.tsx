"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { TwenteMapFigure, useMapTour } from "@/components/twente-map/twente-map-figure";
import type { MapPlace } from "@/lib/werkgebied-kaart";
import { cn } from "@/lib/utils";

/**
 * Werkgebied section with the Twente map and the list of place pages (same
 * structure as on mtbbouw.com). List and map light up together. The list
 * holds real text links, so every page is reachable without the map.
 */
export function TwenteMapSection({
  svg,
  places,
  eyebrow = "Werkgebied",
  title,
  intro,
  id = "werkgebied",
}: {
  svg: ReactNode;
  places: MapPlace[];
  eyebrow?: string;
  title: string;
  intro: ReactNode;
  id?: string;
}) {
  const listed = places.filter((p) => p.hasPage);
  const [hovered, setHovered] = useState<string | null>(null);
  const { current: tourSlug, stop } = useMapTour(
    listed.map((p) => p.slug),
    true,
  );
  const active = hovered ?? tourSlug;

  const setActive = (slug: string | null) => {
    if (slug) stop();
    setHovered(slug);
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 overflow-hidden bg-ink text-paper">
      <Container width="wide" className="py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label-mono flex items-center gap-2.5 text-paper/60">
              <span aria-hidden className="size-2 bg-lime" />
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
          </div>
          <div className="max-w-md text-base leading-relaxed text-paper/70 lg:col-span-5 lg:justify-self-end">
            {intro}
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Kozijnen per plaats in Twente" className="order-2 lg:order-1 lg:col-span-5">
            <ul className="border-t border-paper/15">
              {listed.map((p, i) => {
                const isActive = p.slug === active;
                return (
                  <li key={p.slug} className="border-b border-paper/15">
                    <Link
                      href={p.href}
                      onMouseEnter={() => setActive(p.slug)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(p.slug)}
                      onBlur={() => setActive(null)}
                      className="group flex items-start gap-4 py-4 outline-none focus-visible:bg-paper/5"
                    >
                      <span
                        className={cn(
                          "label-num mt-0.5 w-7 transition-colors",
                          isActive ? "text-lime" : "text-paper/45",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-lg font-medium leading-snug transition-colors",
                            isActive ? "text-lime" : "text-paper",
                          )}
                        >
                          Kozijnen in {p.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-paper/55">{p.tagline}</span>
                      </span>
                      <ArrowUpRightIcon
                        className={cn(
                          "mt-1 size-4 shrink-0 transition-all duration-300",
                          isActive ? "translate-x-0 text-lime opacity-100" : "-translate-x-1 opacity-40",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/werkgebied"
              className="group mt-8 inline-flex h-12 items-stretch border border-paper/25 transition-colors hover:border-paper"
            >
              <span className="label-mono flex items-center px-5">Heel Twente — alle plaatsen</span>
              <span className="grid w-12 place-items-center bg-lime text-ink">
                <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </nav>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <TwenteMapFigure svg={svg} places={places} activeSlug={active} onActiveChange={setActive} tone="ink" />
          </div>
        </div>
      </Container>
    </section>
  );
}
