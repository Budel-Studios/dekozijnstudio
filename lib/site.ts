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
