"use server";

import { FOTO_LIMIETEN, voorstelSchema } from "@/lib/offerte-schema";
import { sendVoorstelEmail, type VoorstelFoto } from "@/lib/email";

export type VoorstelResult = { ok: true } | { ok: false; error: string };

/**
 * Server action for "Vraag een voorstel". Receives FormData (fields as JSON in
 * `data`, optional photos in `fotos`), validates everything again on the
 * server and only reports success after the e-mail was accepted by the SMTP
 * server. Nothing is stored by the website.
 */
export async function submitVoorstel(formData: FormData): Promise<VoorstelResult> {
  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("data") ?? ""));
  } catch {
    return { ok: false, error: "Je aanvraag kon niet worden gelezen. Probeer het opnieuw." };
  }

  const parsed = voorstelSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Niet alle gegevens zijn compleet of geldig. Loop de stappen nog even na.",
    };
  }

  // Honeypot filled → pretend success, drop silently (spam).
  if (parsed.data.contact.website) return { ok: true };

  const files = formData.getAll("fotos").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > FOTO_LIMIETEN.maxAantal) {
    return { ok: false, error: `Je kunt maximaal ${FOTO_LIMIETEN.maxAantal} foto's meesturen.` };
  }
  let total = 0;
  const fotos: VoorstelFoto[] = [];
  for (const [i, file] of files.entries()) {
    if (!FOTO_LIMIETEN.types.includes(file.type)) {
      return { ok: false, error: "Alleen foto's in JPG, PNG of WebP kunnen mee." };
    }
    if (file.size > FOTO_LIMIETEN.maxBytesPerFoto) {
      return { ok: false, error: "Een van de foto's is te groot. Kies een kleinere foto." };
    }
    total += file.size;
    if (total > FOTO_LIMIETEN.maxBytesTotaal) {
      return { ok: false, error: "De foto's zijn samen te groot. Stuur er minder mee." };
    }
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    fotos.push({
      filename: `foto-${i + 1}.${ext}`,
      contentType: file.type,
      content: Buffer.from(await file.arrayBuffer()),
    });
  }

  const result = await sendVoorstelEmail(parsed.data, fotos);
  if (!result.ok) {
    return {
      ok: false,
      error:
        result.reason === "not_configured"
          ? "Het formulier is op dit moment niet aangesloten. Bel of mail ons, dan helpen we je direct."
          : "Versturen is niet gelukt. Probeer het later opnieuw of neem telefonisch contact met ons op.",
    };
  }
  return { ok: true };
}
