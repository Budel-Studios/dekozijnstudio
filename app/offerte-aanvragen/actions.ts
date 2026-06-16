"use server";

import { offerteSchema } from "@/lib/offerte-schema";
import { sendOfferteEmail } from "@/lib/email";

export type OfferteResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Server action: validates the offerte payload and emails it to De Kozijnstudio.
 * No data is persisted — the email IS the record (the user invoices separately
 * via their accounting system).
 */
export async function submitOfferte(payload: unknown): Promise<OfferteResult> {
  const parsed = offerteSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      ok: false,
      error: "De ingevulde gegevens zijn niet compleet of ongeldig. Controleer het formulier.",
    };
  }

  // Honeypot triggered — pretend success, drop silently (anti-spam).
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  const result = await sendOfferteEmail(parsed.data);

  if (!result.ok) {
    return {
      ok: false,
      error:
        "Het versturen is helaas mislukt. Probeer het later opnieuw of neem telefonisch contact met ons op.",
    };
  }

  return { ok: true };
}
