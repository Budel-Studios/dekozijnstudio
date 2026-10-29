/**
 * Canonieke site-URL — één bron voor metadata, sitemap, robots en JSON-LD.
 * Wordt gehost op Vercel. `NEXT_PUBLIC_SITE_URL` staat in Vercel →
 * Settings → Environment Variables en wijst naar www.kozijnstudio.com.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kozijnstudio.com"
).replace(/\/$/, "");

/**
 * Feature flag — kozijn-/productprijzen tonen ja/nee.
 *
 * Staat tijdelijk UIT: bezoekers zien geen kozijnprijzen, richtprijzen of
 * projecttotalen. Montagekosten, bouwkundige tarieven en de inmeetservice
 * (€ 49) blijven wél zichtbaar. Zet op `true` zodra de prijzen definitief zijn.
 */
export const SHOW_PRODUCT_PRICES = false;

/** Tekst die in plaats van een verborgen productprijs wordt getoond. */
export const PRICE_ON_REQUEST = "Prijs op aanvraag";

/**
 * Module switches — which optional parts of the site are public.
 * Decided by the owner on 2026-10-29 (docs/seo-strategie-2026-10.md, h2).
 * A module that is off is left out of navigation and sitemap and its routes
 * return a real 404, so it is not part of the public build.
 */
export const MODULES = {
  /** Configurator, productcatalogus (/producten) and the project basket. */
  configurator: true,
  /** Aanbrengbonus (referral) page + voorwaarden. */
  aanbrengbonus: true,
  /** Place pages under /werkgebied/<plaats>. */
  plaatspaginas: true,
  /** DIY / alleen levering — off until terms and responsibilities are fixed. */
  diy: false,
} as const;

/** Internal design pages (styleguide, hero options) are never public in production. */
export const SHOW_INTERNAL_PAGES = process.env.NODE_ENV !== "production";
