/**
 * Analytics-laag (SEO-plan §2 en §12).
 *
 * Google Analytics 4 laadt alleen na expliciete toestemming van de bezoeker.
 * Zonder `NEXT_PUBLIC_GA_ID` gebeurt er niets: de site werkt dan volledig
 * zonder tracking en zonder cookiebanner.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Sleutel waaronder de keuze van de bezoeker wordt bewaard. */
export const CONSENT_KEY = "kozijnstudio-consent";

export type ConsentValue = "granted" | "denied";

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["consent", "default" | "update", Record<string, string>];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* privémodus of geblokkeerde opslag — dan geldt de keuze alleen nu */
  }
}

/**
 * Conversie-event. Stil wanneer GA niet geladen is (geen toestemming of geen
 * meet-ID), zodat aanroepen overal veilig zijn.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
