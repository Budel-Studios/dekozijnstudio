/**
 * Measurement plan (SEO-strategie 2026-10 (privé projectdocument), h13).
 *
 * Events are pushed to `window.dataLayer` only. Nothing is sent anywhere until
 * an analytics tool is deliberately added (with a matching privacy/consent
 * setup) — this file adds no tracking scripts and no cookies by itself.
 *
 * Never pass personal data: no name, address, e-mail, phone number, postcode
 * or photos. Only the whitelisted, non-identifying fields below are allowed.
 */

export type TrackEvent =
  | "form_start" // first real interaction with the request form — interest, not a lead
  | "generate_lead" // backend confirmed a request — the primary online conversion
  | "click_phone" // contact intent, not a proven call
  | "click_whatsapp"; // contact intent, not a proven conversation

type SafeParams = {
  /** Which form or page element fired the event, e.g. "offerte" or "footer". */
  form?: "offerte" | "drawer" | "project";
  location?: string;
  /** Coarse, non-identifying request type, e.g. "kozijnen" or "schuifpui". */
  wens?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: TrackEvent, params: SafeParams = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event,
      form: params.form,
      location: params.location,
      wens: params.wens,
      page_path: window.location.pathname,
    });
  } catch {
    // Measurement must never break the page.
  }
}
