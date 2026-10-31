"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import type { MapPlace } from "@/lib/werkgebied-kaart";
import { cn } from "@/lib/utils";

/**
 * Interactive layer around the server-rendered Twente map (same behaviour as
 * on mtbbouw.com). Tracks the active municipality (hover, focus, tour) and
 * sets it as data-active on the SVG elements. The map paths are not in this
 * bundle.
 */
const MAP_W = 1000;
const MAP_H = 829.1;
const TOUR_START_MS = 3400;
const TOUR_STEP_MS = 2200;

/** Calm tour along the places with a page, until the visitor does something. */
export function useMapTour(tourSlugs: string[], enabled: boolean) {
  const [index, setIndex] = useState<number | null>(null);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (!enabled || stopped || tourSlugs.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setIndex(0);
      interval = setInterval(() => setIndex((i) => ((i ?? 0) + 1) % tourSlugs.length), TOUR_STEP_MS);
    }, TOUR_START_MS);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [enabled, stopped, tourSlugs.length]);

  const current = enabled && !stopped && index !== null ? (tourSlugs[index] ?? null) : null;
  return { current, stop: () => setStopped(true) };
}

export function TwenteMapFigure({
  svg,
  places,
  activeSlug: controlledActive,
  onActiveChange,
  defaultActive = null,
  tour = false,
  tone = "paper",
  className,
}: {
  /** The server-rendered <TwenteMapSvg />. */
  svg: ReactNode;
  places: MapPlace[];
  /** Controlled: active municipality from outside (e.g. from the list). */
  activeSlug?: string | null;
  onActiveChange?: (slug: string | null) => void;
  /** Uncontrolled: municipality that lights up by default (place page). */
  defaultActive?: string | null;
  /** Tour along the places until the visitor interacts. */
  tour?: boolean;
  /** Frame colour: light card, or on a dark section. */
  tone?: "paper" | "ink";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const controlled = controlledActive !== undefined;
  const tourSlugs = places.filter((p) => p.hasPage).map((p) => p.slug);
  const { current: tourSlug, stop } = useMapTour(tourSlugs, tour && !controlled);

  const active = controlled ? controlledActive : (hovered ?? tourSlug ?? defaultActive);
  const activePlace = places.find((p) => p.slug === active) ?? null;

  const setActive = (slug: string | null) => {
    if (slug) stop();
    if (controlled) onActiveChange?.(slug);
    else setHovered(slug);
  };

  // Push the active municipality to the SVG elements.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.querySelectorAll<SVGElement>(".map-region, .map-dot, .map-ping").forEach((el) => {
      el.dataset.active = String(el.dataset.slug === active);
    });
    const svgEl = root.querySelector<SVGSVGElement>("svg.twente-map");
    if (svgEl) svgEl.dataset.hasActive = String(active !== null);
  }, [active]);

  // Start the intro animation (and load the roads) once the map is in view.
  useEffect(() => {
    const root = ref.current;
    const svgEl = root?.querySelector<SVGSVGElement>("svg.twente-map");
    if (!root || !svgEl) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          svgEl.dataset.inview = "true";
          const roads = svgEl.querySelector<SVGImageElement>("image.map-roads");
          const src = roads?.dataset.src;
          if (roads && src) roads.setAttribute("href", src);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const slugFrom = (target: EventTarget | null) =>
    target instanceof Element ? (target.closest("[data-slug]")?.getAttribute("data-slug") ?? null) : null;

  const dark = tone === "ink";

  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-2xl border px-5 pb-6 pt-6 sm:px-10 sm:pt-8",
        dark ? "border-paper/15 bg-paper text-ink" : "border-mist bg-paper text-ink",
        className,
      )}
    >
      <div className="label-mono flex items-center justify-between text-ink/45">
        <span>52.3° N — 6.8° O</span>
        <span>14 gemeenten</span>
      </div>
      <div
        ref={ref}
        className="relative mt-5"
        onMouseOver={(e) => {
          const slug = slugFrom(e.target);
          if (slug) setActive(slug);
        }}
        onMouseLeave={() => setActive(null)}
        onFocus={(e) => {
          const slug = slugFrom(e.target);
          if (slug) setActive(slug);
        }}
        onBlur={() => setActive(null)}
      >
        {svg}
        <div
          aria-hidden="true"
          className={cn("map-tooltip pointer-events-none absolute z-10", activePlace ? "opacity-100" : "opacity-0")}
          style={{
            left: `${((activePlace?.town[0] ?? MAP_W / 2) / MAP_W) * 100}%`,
            top: `${((activePlace?.town[1] ?? MAP_H / 2) / MAP_H) * 100}%`,
            transform: `translate(-50%, calc(-100% - ${activePlace ? 18 : 10}px))`,
          }}
        >
          <div className="flex items-stretch whitespace-nowrap border border-mist bg-paper text-ink shadow-soft">
            <div className="py-2 pl-3.5 pr-4 leading-tight">
              <div className="label-mono text-ink/50">{activePlace?.hasPage ? "Kozijnen in" : "Werkgebied"}</div>
              <div className="mt-0.5 font-display text-base font-semibold tracking-[-0.01em]">{activePlace?.name}</div>
            </div>
            <span className="grid w-10 place-items-center bg-lime text-ink">
              <ArrowUpRightIcon className="size-4" />
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-6 flex items-end justify-between gap-4">
        <span className="font-display text-3xl font-semibold uppercase tracking-[0.3em] sm:text-5xl">Twente</span>
        <span className="whitespace-nowrap text-right text-[0.625rem] leading-tight text-ink/45">
          Kaart: CBS/PDOK
          <br />© OpenStreetMap-bijdragers
        </span>
      </figcaption>
    </figure>
  );
}
