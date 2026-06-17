"use server";

import { checkoutContactSchema } from "@/lib/checkout";
import { sendCheckoutEmail } from "@/lib/email";
import type { KozijnConfig } from "@/lib/configurator-price";

export type CheckoutResult = { ok: true } | { ok: false; error: string };

type Payload = {
  config: KozijnConfig | null;
  montageChecked: string[];
  configSummary: string;
  contact: unknown;
};

/**
 * Verwerkt de checkout-offerte: valideert de contactgegevens, herberekent het
 * prijsoverzicht server-side (uit config + montage-aantallen) en mailt de
 * volledige specificatie naar De Kozijnstudio. Niets wordt opgeslagen.
 */
export async function submitCheckout(payload: Payload): Promise<CheckoutResult> {
  const parsed = checkoutContactSchema.safeParse(payload.contact);
  if (!parsed.success) {
    return { ok: false, error: "Controleer uw contactgegevens en probeer opnieuw." };
  }

  // Honeypot
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  const montageChecked = Array.isArray(payload.montageChecked)
    ? payload.montageChecked.filter((x): x is string => typeof x === "string")
    : [];

  const result = await sendCheckoutEmail({
    config: payload.config,
    montageChecked,
    configSummary: typeof payload.configSummary === "string" ? payload.configSummary : "",
    contact: parsed.data,
  });

  if (!result.ok) {
    return {
      ok: false,
      error:
        "Het versturen is helaas mislukt. Probeer het later opnieuw of neem telefonisch contact met ons op.",
    };
  }
  return { ok: true };
}
