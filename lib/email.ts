import "server-only";
import { deliverMail, LEAD_MAILBOX } from "@/lib/mail-transport";
import type { VoorstelData } from "@/lib/offerte-schema";
import {
  CONTACTVOORKEUR_OPTIONS,
  PERIODE_OPTIONS,
  labelFor,
  summarize,
} from "@/lib/offerte-schema";
import {
  computeProject,
  type CheckoutContact,
  type ProjectLineItem,
} from "@/lib/checkout";
import { formatEuro } from "@/lib/configurator-price";
import { MONTAGE } from "@/lib/montage";
import { buildHandoff } from "@/lib/configurator-handoff";

/**
 * E-mail content for the site's forms. Delivery (Resend or SMTP) lives in
 * lib/mail-transport.ts; leads go to the MTB Bouw mailbox for now.
 */

// ─── "Vraag een voorstel" (aanvraagformulier /offerte) ──────────────────────

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type VoorstelFoto = { filename: string; contentType: string; content: Buffer };

function voorstelFields(data: VoorstelData, fotoCount: number): Array<[string, string]> {
  const c = data.contact;
  return [
    ...summarize(data),
    ["Toelichting / globale maten", data.toelichting?.trim() || "—"],
    ["Foto's", fotoCount > 0 ? `${fotoCount} als bijlage` : "Geen"],
    ["Naam", c.naam],
    ["E-mail", c.email || "—"],
    ["Telefoon", c.telefoon || "—"],
    ["Contactvoorkeur", labelFor(CONTACTVOORKEUR_OPTIONS, c.contactvoorkeur)],
    ["Gewenste periode", c.periode ? labelFor(PERIODE_OPTIONS, c.periode) : "Geen voorkeur"],
  ];
}

function voorstelHtml(fields: Array<[string, string]>, replyHint: string): string {
  const rows = fields
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e7e5e0;font-weight:600;color:#23272a;width:200px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e7e5e0;color:#23272a;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");
  return `<!doctype html>
<html lang="nl">
<body style="margin:0;background:#f7f6f3;font-family:Arial,Helvetica,sans-serif;color:#23272a;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#23272a;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <p style="margin:0;font-size:18px;font-weight:700;">Nieuwe aanvraag: voorstel</p>
      <p style="margin:6px 0 0;font-size:13px;color:#abe000;">De Kozijnstudio &middot; via website</p>
    </div>
    <div style="background:#fff;border:1px solid #e7e5e0;border-top:none;border-radius:0 0 12px 12px;padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}
      </table>
    </div>
    <p style="font-size:12px;color:#6b6b6b;margin-top:16px;">${escapeHtml(replyHint)}</p>
  </div>
</body>
</html>`;
}

/**
 * Sends a "Vraag een voorstel" request to the De Kozijnstudio mailbox.
 * Photos travel as e-mail attachments only — they are never stored or
 * published by the website. Resolves ok only after the SMTP server accepted
 * the message, so the visitor never sees a false success.
 */
export async function sendVoorstelEmail(
  data: VoorstelData,
  fotos: VoorstelFoto[],
): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const c = data.contact;
  const fields = voorstelFields(data, fotos.length);
  const replyHint = c.email
    ? `Antwoorden op deze e-mail gaat rechtstreeks naar ${c.email}.`
    : `Geen e-mailadres opgegeven — bel of app ${c.telefoon}.`;

  // 1. The lead — this is what counts.
  const lead = await deliverMail({
    to: LEAD_MAILBOX,
    fromName: "De Kozijnstudio — website",
    ...(c.email ? { replyTo: `"${c.naam}" <${c.email}>` } : {}),
    subject: `Kozijnstudio-aanvraag — ${c.naam} (${data.locatie})`,
    text: `Nieuwe aanvraag via De Kozijnstudio\n\n${fields
      .map(([l, v]) => `${l}: ${v}`)
      .join("\n")}\n\n${replyHint}\n`,
    html: voorstelHtml(fields, replyHint),
    attachments: fotos.map((f) => ({ filename: f.filename, content: f.content, contentType: f.contentType })),
  });
  if (!lead.ok) return lead;

  // 2. Confirmation to the visitor (only with an e-mail address). A failed
  //    confirmation never fails the request — we will contact them anyway.
  if (c.email) {
    const recap = summarize(data);
    const confirm = await deliverMail({
      to: c.email,
      fromName: "De Kozijnstudio",
      replyTo: LEAD_MAILBOX,
      subject: "Je aanvraag bij De Kozijnstudio is binnen",
      text: [
        `Hoi ${c.naam},`,
        "",
        "Bedankt voor je aanvraag. We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken.",
        "",
        "Dit heb je ons gestuurd:",
        ...recap.map(([l, v]) => `- ${l}: ${v}`),
        "",
        "Groet,",
        "De Kozijnstudio",
      ].join("\n"),
      html: confirmationHtml(c.naam, recap),
    });
    if (!confirm.ok) console.error("[voorstel] bevestigingsmail naar klant mislukt");
  }
  return { ok: true };
}

function confirmationHtml(naam: string, recap: Array<[string, string]>): string {
  const rows = recap
    .map(
      ([l, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e7e5e0;color:#6b6b6b;width:180px;">${escapeHtml(l)}</td><td style="padding:8px 12px;border-bottom:1px solid #e7e5e0;color:#23272a;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html lang="nl"><body style="margin:0;background:#f7f6f3;font-family:Arial,Helvetica,sans-serif;color:#23272a;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#23272a;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <p style="margin:0;font-size:18px;font-weight:700;">Je aanvraag is binnen</p>
      <p style="margin:6px 0 0;font-size:13px;color:#abe000;">De Kozijnstudio</p>
    </div>
    <div style="background:#fff;border:1px solid #e7e5e0;border-top:none;border-radius:0 0 12px 12px;padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;">Hoi ${escapeHtml(naam)},</p>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Bedankt voor je aanvraag. We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken.</p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;">Dit heb je ons gestuurd</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
      <p style="margin:20px 0 0;font-size:15px;">Groet,<br><strong>De Kozijnstudio</strong></p>
    </div>
  </div>
</body></html>`;
}

// ─── Project-offerte (mandje met meerdere kozijnen) ──────────────────────────

export async function sendProjectEmail(input: {
  items: ProjectLineItem[];
  contact: CheckoutContact;
  pdfBase64?: string | null;
}): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const project = computeProject(input.items);
  const t = project.total;
  const c = input.contact;

  const itemsHtml = input.items
    .map((it, idx) => {
      const summary = buildHandoff(it.config, it.montageChecked).summary;
      const pi = project.perItem[idx];
      return `<div style="margin:14px 0;border:1px solid #e7e5e0;">
        <p style="margin:0;padding:8px 12px;background:#23272a;color:#abe000;font-weight:700;font-size:13px;">Kozijn ${idx + 1} — ${escapeHtml(formatEuro(pi.brutoInclBtw))} incl. btw</p>
        <pre style="margin:0;padding:10px 12px;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#333;">${escapeHtml(summary)}</pre>
      </div>`;
    })
    .join("");

  const isdeRow =
    t.isde.subsidie > 0
      ? `<tr><td colspan="2" style="padding:6px 12px;">ISDE-subsidie (indicatief, via RVO)</td><td style="padding:6px 12px;text-align:right;color:#1e4a3c;">− ${formatEuro(t.isde.subsidie)}</td></tr>
         <tr><td colspan="2" style="padding:6px 12px;font-weight:600;">Netto investering (na ISDE)</td><td style="padding:6px 12px;text-align:right;font-weight:600;">${formatEuro(t.nettoInvestering)}</td></tr>`
      : "";

  const html = `<!doctype html><html lang="nl"><body style="margin:0;background:#f7f6f3;font-family:Arial,Helvetica,sans-serif;color:#23272a;">
  <div style="max-width:680px;margin:0 auto;padding:24px;">
    <div style="background:#23272a;color:#fff;padding:20px 24px;">
      <p style="margin:0;font-size:18px;font-weight:700;">Nieuwe projectaanvraag — ${project.itemCount} kozijn(en)</p>
      <p style="margin:6px 0 0;font-size:13px;color:#abe000;">De Kozijnstudio · via website</p>
    </div>
    <div style="background:#fff;border:1px solid #e3dfd6;border-top:none;padding:16px 24px;">
      <h3 style="margin:8px 0;font-size:15px;">Klant</h3>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        ${escapeHtml(c.naam)}<br>${escapeHtml(c.email)} · ${escapeHtml(c.telefoon)}<br>
        ${escapeHtml(c.postcode.toUpperCase())} ${escapeHtml(c.plaats)}
        ${c.opmerkingen ? `<br><br><strong>Opmerkingen:</strong><br>${escapeHtml(c.opmerkingen)}` : ""}
      </p>

      <h3 style="margin:18px 0 4px;font-size:15px;">Kozijnen in dit project</h3>
      ${itemsHtml}

      <h3 style="margin:18px 0 8px;font-size:15px;">Projectoverzicht</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td colspan="2" style="padding:6px 12px;">Kozijnen (incl. btw)</td><td style="padding:6px 12px;text-align:right;">${formatEuro(t.productInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;">Montage & werk (incl. btw)</td><td style="padding:6px 12px;text-align:right;">${formatEuro(t.montage.subtotaalInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:8px 12px;border-top:1px solid #e3dfd6;font-weight:700;">Bruto (incl. btw)</td><td style="padding:8px 12px;text-align:right;border-top:1px solid #e3dfd6;font-weight:700;">${formatEuro(t.brutoInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:2px 12px;font-size:12px;color:#777;">waarvan btw (${MONTAGE.btwPercentage}%)</td><td style="padding:2px 12px;text-align:right;font-size:12px;color:#777;">${formatEuro(t.btwBedrag)}</td></tr>
        ${isdeRow}
        <tr><td colspan="3" style="padding:10px 12px 2px;font-size:12px;color:#abe000;background:#23272a;">BETALING</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;">Aanbetaling bij opdracht</td><td style="padding:6px 12px;text-align:right;">${formatEuro(t.aanbetaling)}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;">Restant bij oplevering</td><td style="padding:6px 12px;text-align:right;">${formatEuro(t.restantBijOplevering)}</td></tr>
      </table>
      <p style="margin:12px 0 0;font-size:12px;color:#777;">Richtprijs — niet bindend. Definitieve prijs na inmeetservice. Totaal indicatieve montage-uren: ${t.montage.totaalUren} u.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `Nieuwe projectaanvraag — ${project.itemCount} kozijn(en) — De Kozijnstudio`,
    ``,
    `Klant: ${c.naam} · ${c.email} · ${c.telefoon} · ${c.postcode.toUpperCase()} ${c.plaats}`,
    c.opmerkingen ? `Opmerkingen: ${c.opmerkingen}` : ``,
    ``,
    ...input.items.flatMap((it, idx) => [
      `── Kozijn ${idx + 1} (${formatEuro(project.perItem[idx].brutoInclBtw)} incl. btw) ──`,
      buildHandoff(it.config, it.montageChecked).summary,
      ``,
    ]),
    `Kozijnen: ${formatEuro(t.productInclBtw)}`,
    `Montage: ${formatEuro(t.montage.subtotaalInclBtw)}`,
    `Bruto incl. btw: ${formatEuro(t.brutoInclBtw)} (waarvan btw ${formatEuro(t.btwBedrag)})`,
    t.isde.subsidie > 0 ? `ISDE-subsidie (indicatief): -${formatEuro(t.isde.subsidie)}` : ``,
    t.isde.subsidie > 0 ? `Netto investering: ${formatEuro(t.nettoInvestering)}` : ``,
    `Aanbetaling bij opdracht: ${formatEuro(t.aanbetaling)}`,
    `Restant bij oplevering: ${formatEuro(t.restantBijOplevering)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const attachments =
    input.pdfBase64 && input.pdfBase64.length > 0
      ? [
          {
            filename: "projectaanvraag-dekozijnstudio.pdf",
            content: Buffer.from(input.pdfBase64, "base64"),
            contentType: "application/pdf",
          },
        ]
      : undefined;

  return deliverMail({
    to: LEAD_MAILBOX,
    fromName: "De Kozijnstudio — website",
    replyTo: `"${c.naam}" <${c.email}>`,
    subject: `Kozijnstudio-project — ${c.naam} (${c.plaats}) — ${project.itemCount} kozijn(en)`,
    text,
    html,
    attachments,
  });
}
