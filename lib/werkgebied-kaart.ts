import { twenteMap } from "@/lib/twente-map-data";
import { PLAATS_PAGINAS, regioPad } from "@/data/regio";
import { MODULES } from "@/lib/site";

/**
 * Places on the Twente map.
 *
 * - Enschede is our base and is served by the homepage ("kozijnen Enschede"),
 *   so it links to "/" — on the homepage itself to its Enschede section.
 * - Municipalities with a place page (data/regio.ts) link to that page.
 * - All other Twente municipalities link to the werkgebied hub: no thin page
 *   per municipality (SEO strategy h10, doorway rule).
 */
export type MapPlace = {
  slug: string;
  name: string;
  href: string;
  /** Short line under the name (tooltip and list). */
  tagline: string;
  /** Own page (or the homepage for Enschede)? Only those are in the list and the tour. */
  hasPage: boolean;
  /** Dot position in viewBox coordinates. */
  town: [number, number];
};

export const ENSCHEDE_SLUG = "enschede";
/** Anchor of the Enschede section on the homepage. */
export const ENSCHEDE_ANCHOR = "kozijnen-enschede";

export function mapPlaces({ onHome = false }: { onHome?: boolean } = {}): MapPlace[] {
  const pages = MODULES.plaatspaginas ? PLAATS_PAGINAS : [];
  const places = twenteMap.municipalities.map((m) => {
    if (m.slug === ENSCHEDE_SLUG) {
      return {
        slug: m.slug,
        name: m.name,
        href: onHome ? `#${ENSCHEDE_ANCHOR}` : "/",
        tagline: "Onze thuisbasis",
        hasPage: true,
        town: m.town,
      };
    }
    const page = pages.find((p) => p.slug === m.slug);
    return {
      slug: m.slug,
      name: m.name,
      href: page ? regioPad(page) : "/werkgebied",
      tagline: page?.kaartRegel ?? "Werkgebied Twente",
      hasPage: Boolean(page),
      town: m.town,
    };
  });
  // Enschede first, then the other pages in map order.
  return places.sort((a, b) => Number(b.slug === ENSCHEDE_SLUG) - Number(a.slug === ENSCHEDE_SLUG));
}
