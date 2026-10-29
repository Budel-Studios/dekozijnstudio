"use server";

import { checkoutContactSchema, type ProjectLineItem } from "@/lib/checkout";
import { sendProjectEmail } from "@/lib/email";

export type CheckoutResult = { ok: true } | { ok: false; error: string };

type ProjectPayload = {
  items: unknown;
  contact: unknown;
  pdfBase64?: string | null;
};

/**
 * Verwerkt de project-aanvraag ('Jouw project'): valideert de contactgegevens,
 * herberekent het prijsoverzicht server-side uit alle kozijnen en mailt de
 * volledige specificatie naar De Kozijnstudio. Niets wordt opgeslagen.
 */
export async function submitProject(payload: ProjectPayload): Promise<CheckoutResult> {
  const parsed = checkoutContactSchema.safeParse(payload.contact);
  if (!parsed.success) {
    return { ok: false, error: "Controleer je contactgegevens en probeer het opnieuw." };
  }

  // Honeypot
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  // Items opschonen + begrenzen
  const rawItems = Array.isArray(payload.items) ? payload.items : [];
  const items: ProjectLineItem[] = rawItems
    .slice(0, 50)
    .filter((it): it is { config: unknown; montageChecked?: unknown } => !!it && typeof it === "object")
    .map((it) => ({
      config: (it.config ?? null) as ProjectLineItem["config"],
      montageChecked: Array.isArray(it.montageChecked)
        ? it.montageChecked.filter((x): x is string => typeof x === "string")
        : [],
    }))
    .filter((it) => it.config !== null);

  if (items.length === 0) {
    return { ok: false, error: "Je project bevat nog geen kozijnen." };
  }

  const pdfBase64 =
    typeof payload.pdfBase64 === "string" && payload.pdfBase64.length > 0
      ? payload.pdfBase64
      : null;

  const result = await sendProjectEmail({ items, contact: parsed.data, pdfBase64 });

  if (!result.ok) {
    return {
      ok: false,
      error:
        "Het versturen is helaas mislukt. Probeer het later opnieuw of neem telefonisch contact met ons op.",
    };
  }
  return { ok: true };
}
