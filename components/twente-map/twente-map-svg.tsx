import type { CSSProperties } from "react";
import { twenteMap } from "@/lib/twente-map-data";
import type { MapPlace } from "@/lib/werkgebied-kaart";

/**
 * The Twente map as a static SVG (same map as on mtbbouw.com). Server
 * component: the map paths are in the HTML, not in the JavaScript bundle.
 * Hover, focus and the tour live in TwenteMapFigure (client), which works via
 * the data-slug attributes. Every municipality is a real <a href> link.
 *
 * Source: CBS/PDOK gemeentegrenzen 2024 and OpenStreetMap (ODbL).
 */
export function TwenteMapSvg({
  places,
  activeSlug = null,
  currentHref,
}: {
  places: MapPlace[];
  activeSlug?: string | null;
  /** Path of the current page: that municipality gets aria-current="page". */
  currentHref?: string;
}) {
  const { viewBox, width, height, outline, municipalities } = twenteMap;
  const placeFor = (slug: string) => places.find((p) => p.slug === slug);

  return (
    <svg
      viewBox={viewBox}
      className="twente-map block h-auto w-full"
      data-has-active={activeSlug !== null}
      role="group"
      aria-label="Kaart van Twente met alle gemeenten"
    >
      {/* Each municipality border is defined once; region and dashed border reuse it. */}
      <defs>
        {municipalities.map((m) => (
          <path key={m.slug} id={`tm-${m.slug}`} d={m.d} />
        ))}
      </defs>
      <g className="map-land-in">
        <path d={outline} className="map-outline" />
        {municipalities.map((m) => {
          const place = placeFor(m.slug);
          const href = place?.href ?? "/werkgebied";
          const label = place?.hasPage ? `Kozijnen in ${m.name}` : `Werkgebied Twente: ${m.name}`;
          return (
            <a
              key={m.slug}
              href={href}
              aria-label={label}
              aria-current={currentHref && href === currentHref ? "page" : undefined}
              data-slug={m.slug}
              className="map-link"
            >
              <use
                href={`#tm-${m.slug}`}
                className="map-region"
                data-slug={m.slug}
                data-active={m.slug === activeSlug}
              />
            </a>
          );
        })}
        {municipalities.map((m) => (
          <use key={`b-${m.slug}`} href={`#tm-${m.slug}`} className="map-border" />
        ))}
      </g>

      {/* Roads as a separate cached file; TwenteMapFigure loads it once the map
          scrolls into view, then it draws itself. */}
      <image
        className="map-roads"
        x={0}
        y={0}
        width={width}
        height={height}
        data-src="/images/twente-wegen.svg"
        aria-hidden="true"
      />

      {municipalities.map((m, i) => (
        <g key={`t-${m.slug}`}>
          {/* Square markers: a kozijn is always square. */}
          <rect
            x={m.town[0] - 7}
            y={m.town[1] - 7}
            width={14}
            height={14}
            className="map-ping"
            data-slug={m.slug}
            data-active={m.slug === activeSlug}
          />
          <rect
            x={m.town[0] - 5}
            y={m.town[1] - 5}
            width={10}
            height={10}
            className="map-dot"
            data-slug={m.slug}
            data-active={m.slug === activeSlug}
            data-page={placeFor(m.slug)?.hasPage ?? false}
            style={{ "--i": i } as CSSProperties}
          />
        </g>
      ))}
    </svg>
  );
}
