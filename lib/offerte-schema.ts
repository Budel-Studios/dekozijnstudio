import { z } from "zod";

/**
 * Offerte (quote request) schema — shared between the client wizard and the
 * server action so validation rules live in one place.
 *
 * AVG/GDPR: we only collect what's needed to make an offer and contact the
 * customer. A privacy consent checkbox is required before submitting.
 */

// ─── Option lists (also used to render the wizard choices) ───────────────────

export const MATERIAAL_OPTIONS = [
  { value: "kunststof", label: "Kunststof kozijnen" },
  { value: "hout", label: "Houten kozijnen" },
  { value: "aluminium", label: "Aluminium kozijnen" },
  { value: "onbekend", label: "Weet ik nog niet / advies gewenst" },
] as const;

export const PRODUCTTYPE_OPTIONS = [
  { value: "vaste-ramen", label: "Vaste ramen" },
  { value: "draaikiepramen", label: "Draaikiepramen" },
  { value: "voordeur", label: "Voordeur" },
  { value: "achterdeur", label: "Achterdeur" },
  { value: "schuifpui", label: "Schuifpui / vouwwand" },
  { value: "beglazing", label: "Complete beglazing" },
] as const;

export const UITVOERING_OPTIONS = [
  { value: "montage", label: "Inclusief montage", description: "Wij plaatsen de kozijnen vakkundig." },
  { value: "levering", label: "Alleen levering (DIY)", description: "U plaatst zelf, wij leveren aan huis." },
  { value: "onbekend", label: "Weet ik nog niet", description: "Ik laat me graag adviseren." },
] as const;

export const BOUWKUNDIG_OPTIONS = [
  { value: "nee", label: "Nee", description: "Openingen blijven gelijk." },
  { value: "ja", label: "Ja", description: "Bijv. opening vergroten of latei." },
  { value: "misschien", label: "Misschien / weet ik niet", description: "Graag advies hierover." },
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const valuesOf = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]];

// ─── Schema ──────────────────────────────────────────────────────────────────

export const offerteSchema = z.object({
  // Step 1 — product
  materiaal: z.enum(valuesOf(MATERIAAL_OPTIONS), {
    message: "Kies een materiaal of 'advies gewenst'.",
  }),
  producttypes: z
    .array(z.enum(valuesOf(PRODUCTTYPE_OPTIONS)))
    .min(1, "Selecteer minimaal één producttype."),

  // Step 2 — size & quantity
  aantal: z
    .number({ message: "Vul een aantal in." })
    .int("Vul een heel getal in.")
    .min(1, "Minimaal 1 kozijn.")
    .max(200, "Voor zeer grote projecten: neem direct contact op."),
  afmetingen: z
    .string()
    .max(1000, "Maximaal 1000 tekens.")
    .optional()
    .or(z.literal("")),

  // Step 3 — execution
  uitvoering: z.enum(valuesOf(UITVOERING_OPTIONS), {
    message: "Maak een keuze.",
  }),

  // Step 4 — structural work
  bouwkundig: z.enum(valuesOf(BOUWKUNDIG_OPTIONS), {
    message: "Maak een keuze.",
  }),
  bouwkundigToelichting: z
    .string()
    .max(1000, "Maximaal 1000 tekens.")
    .optional()
    .or(z.literal("")),

  // Step 5 — contact details
  naam: z.string().min(2, "Vul uw naam in.").max(120),
  email: z.string().email("Vul een geldig e-mailadres in.").max(160),
  telefoon: z
    .string()
    .min(8, "Vul een geldig telefoonnummer in.")
    .max(25, "Telefoonnummer is te lang.")
    .regex(/^[0-9+()\s-]+$/, "Alleen cijfers en + ( ) - zijn toegestaan."),
  postcode: z
    .string()
    .regex(/^\d{4}\s?[A-Za-z]{2}$/, "Vul een geldige postcode in (bijv. 7500 AA).")
    .max(8),
  plaats: z.string().min(2, "Vul uw plaats in.").max(120),
  opmerkingen: z
    .string()
    .max(2000, "Maximaal 2000 tekens.")
    .optional()
    .or(z.literal("")),

  // Step 6 — consent (AVG)
  privacyAkkoord: z.literal(true, {
    message: "U dient akkoord te gaan met de privacyverklaring.",
  }),

  // Optional: configuration summary handed over from the configurator (fase 5).
  configuratie: z.string().max(4000).optional().or(z.literal("")),

  // Honeypot — must stay empty (anti-spam). Real users never see this field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type OfferteData = z.infer<typeof offerteSchema>;

// Label lookups for rendering the summary and email
export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
