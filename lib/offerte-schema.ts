import { z } from "zod";

/**
 * "Vraag een voorstel" — request schema shared by the client form and the
 * server action (SEO-strategie 2026-10 (privé projectdocument), h13: three short steps —
 * wens, situatie, contact).
 *
 * AVG/GDPR: only what is needed to respond. Photos and exact measurements are
 * optional. E-mail OR phone is enough to be contacted.
 */

// ─── Option lists (also used to render the form and the e-mail) ─────────────

export const WAT_OPTIONS = [
  { value: "kozijnen", label: "Kozijnen en ramen" },
  { value: "schuifpui", label: "Schuifpui" },
  { value: "deur", label: "Voordeur, achterdeur of tuindeuren" },
] as const;

export const SITUATIE_OPTIONS = [
  { value: "vervangen", label: "Bestaande kozijnen vervangen" },
  { value: "nieuwe-opening", label: "Nieuwe of grotere opening" },
  { value: "onbekend", label: "Weet ik nog niet" },
] as const;

export const MATERIAAL_OPTIONS = [
  { value: "kunststof", label: "Kunststof" },
  { value: "hout", label: "Hout" },
  { value: "aluminium", label: "Aluminium" },
  { value: "onbekend", label: "Weet ik nog niet" },
] as const;

export const AANTAL_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2-3", label: "2 tot 3" },
  { value: "4-6", label: "4 tot 6" },
  { value: "7-10", label: "7 tot 10" },
  { value: "10+", label: "Meer dan 10" },
  { value: "onbekend", label: "Weet ik nog niet" },
] as const;

export const CONTACTVOORKEUR_OPTIONS = [
  { value: "geen", label: "Geen voorkeur" },
  { value: "telefoon", label: "Bellen" },
  { value: "email", label: "E-mail" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export const PERIODE_OPTIONS = [
  { value: "", label: "Geen voorkeur" },
  { value: "snel", label: "Zo snel mogelijk" },
  { value: "3-maanden", label: "Binnen 3 maanden" },
  { value: "3-6-maanden", label: "Over 3 tot 6 maanden" },
  { value: "orienterend", label: "Later, ik oriënteer me nog" },
] as const;

/** sessionStorage key read by /bedankt to show what was sent (no contact data). */
export const BEVESTIGING_KEY = "voorstel-bevestiging";

/** Photo limits — client compresses to JPEG first; the server re-checks. */
export const FOTO_LIMIETEN = {
  maxAantal: 6,
  maxBytesPerFoto: 2 * 1024 * 1024,
  maxBytesTotaal: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp"] as readonly string[],
};

const valuesOf = <T extends readonly { value: string }[]>(opts: T) =>
  opts.map((o) => o.value) as [string, ...string[]];

// ─── Per-step schemas ───────────────────────────────────────────────────────

export const wensSchema = z.object({
  wat: z.array(z.enum(valuesOf(WAT_OPTIONS))).min(1, "Kies waar je vraag over gaat."),
  situatie: z.enum(valuesOf(SITUATIE_OPTIONS), { message: "Kies wat het beste past." }),
  materiaal: z.enum(valuesOf(MATERIAAL_OPTIONS), { message: "Kies een materiaal of 'weet ik nog niet'." }),
});

export const situatieSchema = z.object({
  locatie: z
    .string()
    .trim()
    .min(2, "Vul je woonplaats of postcode in.")
    .max(80, "Dat is te lang voor een woonplaats of postcode."),
  aantal: z.enum(valuesOf(AANTAL_OPTIONS), { message: "Kies een globaal aantal." }),
  toelichting: z.string().trim().max(2000, "Maximaal 2000 tekens.").optional().default(""),
});

export const contactSchema = z
  .object({
    naam: z.string().trim().min(2, "Vul je naam in.").max(120),
    email: z
      .string()
      .trim()
      .max(160)
      .optional()
      .default("")
      .refine((v) => v === "" || z.email().safeParse(v).success, "Vul een geldig e-mailadres in."),
    telefoon: z
      .string()
      .trim()
      .max(25, "Dat telefoonnummer is te lang.")
      .optional()
      .default("")
      .refine((v) => v === "" || /^[0-9+()\s-]{8,}$/.test(v), "Vul een geldig telefoonnummer in."),
    contactvoorkeur: z.enum(valuesOf(CONTACTVOORKEUR_OPTIONS)).default("geen"),
    periode: z.enum(valuesOf(PERIODE_OPTIONS)).optional().default(""),
    privacyAkkoord: z.literal(true, { message: "Ga akkoord met de privacyverklaring om te versturen." }),
    // Honeypot — must stay empty. Real visitors never see this field.
    website: z.string().max(0).optional().default(""),
  })
  .refine((d) => d.email !== "" || d.telefoon !== "", {
    message: "Vul een e-mailadres of telefoonnummer in, zodat we je kunnen bereiken.",
    path: ["email"],
  });

export const voorstelSchema = z.object({
  ...wensSchema.shape,
  ...situatieSchema.shape,
  contact: contactSchema,
});

export type VoorstelData = z.infer<typeof voorstelSchema>;

export function labelFor(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

/** Plain-language summary of a request — shown on /bedankt and in the e-mail. */
export function summarize(d: Pick<VoorstelData, "wat" | "situatie" | "materiaal" | "locatie" | "aantal">) {
  return [
    ["Waarover", d.wat.map((w) => labelFor(WAT_OPTIONS, w)).join(", ")],
    ["Situatie", labelFor(SITUATIE_OPTIONS, d.situatie)],
    ["Materiaal", labelFor(MATERIAAL_OPTIONS, d.materiaal)],
    ["Woonplaats of postcode", d.locatie],
    ["Globaal aantal", labelFor(AANTAL_OPTIONS, d.aantal)],
  ] as Array<[string, string]>;
}
