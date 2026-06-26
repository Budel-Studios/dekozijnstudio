import "server-only";
import nodemailer from "nodemailer";
import type { OfferteData } from "@/lib/offerte-schema";
import {
  MATERIAAL_OPTIONS,
  PRODUCTTYPE_OPTIONS,
  UITVOERING_OPTIONS,
  BOUWKUNDIG_OPTIONS,
  labelFor,
} from "@/lib/offerte-schema";
import {
  computeCheckout,
  computeProject,
  type CheckoutContact,
  type ProjectLineItem,
} from "@/lib/checkout";
import { formatEuro, type KozijnConfig } from "@/lib/configurator-price";
import { EENHEID_LABEL, MONTAGE } from "@/lib/montage";
import { buildHandoff } from "@/lib/configurator-handoff";

/**
 * SMTP email sending via Nodemailer.
 * Configuration comes entirely from environment variables (see .env.example).
 * Nothing is hardcoded; secrets live in .env.local (never committed).
 */

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

/** Reads + validates SMTP config from env. Returns null if not configured. */
function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.OFFERTE_TO_EMAIL;

  if (!host || !user || !pass || !to) return null;

  const port = Number(process.env.SMTP_PORT ?? "587");
  return {
    host,
    port,
    // Port 465 = implicit TLS. 587/25 = STARTTLS (secure:false). Allow override.
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    user,
    pass,
    to,
    from: process.env.OFFERTE_FROM_EMAIL ?? user,
  };
}

export function isEmailConfigured(): boolean {
  return readSmtpConfig() !== null;
}

// ─── Content rendering ───────────────────────────────────────────────────────

function renderFields(data: OfferteData): Array<[string, string]> {
  const producttypes = data.producttypes
    .map((t) => labelFor(PRODUCTTYPE_OPTIONS, t))
    .join(", ");

  const fields: Array<[string, string]> = [
    ["Materiaal", labelFor(MATERIAAL_OPTIONS, data.materiaal)],
    ["Producttype(s)", producttypes],
    ["Aantal kozijnen", String(data.aantal)],
    ["Globale afmetingen", data.afmetingen?.trim() || "—"],
    ["Uitvoering", labelFor(UITVOERING_OPTIONS, data.uitvoering)],
    ["Bouwkundige aanpassingen", labelFor(BOUWKUNDIG_OPTIONS, data.bouwkundig)],
    ["Toelichting bouwkundig", data.bouwkundigToelichting?.trim() || "—"],
    ["Naam", data.naam],
    ["E-mail", data.email],
    ["Telefoon", data.telefoon],
    ["Postcode", data.postcode.toUpperCase()],
    ["Plaats", data.plaats],
    ["Opmerkingen", data.opmerkingen?.trim() || "—"],
  ];

  // Configurator handoff (fase 5) — only included when present.
  if (data.configuratie && data.configuratie.trim().length > 0) {
    fields.push(["Configurator", data.configuratie.trim()]);
  }

  return fields;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(data: OfferteData): string {
  const rows = renderFields(data)
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
      <p style="margin:0;font-size:18px;font-weight:700;">Nieuwe offerte-aanvraag</p>
      <p style="margin:6px 0 0;font-size:13px;color:#abe000;">De Kozijnstudio &middot; via website</p>
    </div>
    <div style="background:#fff;border:1px solid #e7e5e0;border-top:none;border-radius:0 0 12px 12px;padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows}
      </table>
    </div>
    <p style="font-size:12px;color:#6b6b6b;margin-top:16px;">
      Verzonden via het offerteformulier op de website. Antwoord op deze e-mail
      gaat rechtstreeks naar de klant (${escapeHtml(data.email)}).
    </p>
  </div>
</body>
</html>`;
}

function buildText(data: OfferteData): string {
  const lines = renderFields(data).map(([label, value]) => `${label}: ${value}`);
  return `Nieuwe offerte-aanvraag — De Kozijnstudio\n\n${lines.join("\n")}\n`;
}

// ─── Send ────────────────────────────────────────────────────────────────────

export async function sendOfferteEmail(
  data: OfferteData,
): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const config = readSmtpConfig();
  if (!config) {
    console.error(
      "[offerte] SMTP is niet geconfigureerd. Stel SMTP_HOST/SMTP_USER/SMTP_PASS/OFFERTE_TO_EMAIL in (.env.local).",
    );
    return { ok: false, reason: "not_configured" };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  try {
    await transporter.sendMail({
      from: `"De Kozijnstudio — website" <${config.from}>`,
      to: config.to,
      replyTo: `"${data.naam}" <${data.email}>`,
      subject: `Offerte-aanvraag — ${data.naam} (${data.plaats})`,
      text: buildText(data),
      html: buildHtml(data),
    });
    return { ok: true };
  } catch (error) {
    console.error("[offerte] Versturen mislukt:", error);
    return { ok: false, reason: "send_failed" };
  }
}

// ─── Checkout-offerte (met prijsoverzicht + montage + ISDE) ──────────────────

export async function sendCheckoutEmail(input: {
  config: KozijnConfig | null;
  montageChecked: string[];
  configSummary: string;
  contact: CheckoutContact;
}): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const smtp = readSmtpConfig();
  if (!smtp) {
    console.error("[checkout] SMTP is niet geconfigureerd (.env.local).");
    return { ok: false, reason: "not_configured" };
  }

  const totals = computeCheckout(input.config, input.montageChecked);
  const c = input.contact;

  const montageRows = totals.montage.lines
    .map(
      (l) =>
        `      <tr><td style="padding:6px 12px;border-bottom:1px solid #e7e5e0;">${escapeHtml(l.regel.label)}</td><td style="padding:6px 12px;border-bottom:1px solid #e7e5e0;text-align:right;">${l.aantal} ${EENHEID_LABEL[l.regel.eenheid]}</td><td style="padding:6px 12px;border-bottom:1px solid #e7e5e0;text-align:right;">${formatEuro(l.lineInclBtw)}</td></tr>`,
    )
    .join("");

  const isdeRow =
    totals.isde.subsidie > 0
      ? `<tr><td colspan="2" style="padding:6px 12px;">ISDE-subsidie (indicatief)</td><td style="padding:6px 12px;text-align:right;color:#2f4a3c;">− ${formatEuro(totals.isde.subsidie)}</td></tr>`
      : "";

  const html = `<!doctype html><html lang="nl"><body style="margin:0;background:#f7f6f3;font-family:Arial,Helvetica,sans-serif;color:#23272a;">
  <div style="max-width:680px;margin:0 auto;padding:24px;">
    <div style="background:#23272a;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
      <p style="margin:0;font-size:18px;font-weight:700;">Offerte-aanvraag (checkout)</p>
      <p style="margin:6px 0 0;font-size:13px;color:#abe000;">De Kozijnstudio · via website</p>
    </div>
    <div style="background:#fff;border:1px solid #e7e5e0;border-top:none;padding:16px 24px;">
      <h3 style="margin:8px 0;font-size:15px;">Klant</h3>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        ${escapeHtml(c.naam)}<br>${escapeHtml(c.email)} · ${escapeHtml(c.telefoon)}<br>
        ${escapeHtml(c.postcode.toUpperCase())} ${escapeHtml(c.plaats)}
        ${c.opmerkingen ? `<br><br><strong>Opmerkingen:</strong><br>${escapeHtml(c.opmerkingen)}` : ""}
      </p>

      <h3 style="margin:18px 0 8px;font-size:15px;">Configuratie</h3>
      <pre style="margin:0;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333;">${escapeHtml(input.configSummary || "— geen configuratie meegestuurd —")}</pre>

      <h3 style="margin:18px 0 8px;font-size:15px;">Montage & werkzaamheden (incl. btw)</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">${montageRows || `<tr><td style="padding:6px 12px;color:#888;">Geen montage-items geselecteerd</td></tr>`}</table>
      <p style="margin:6px 0 0;font-size:12px;color:#777;">Totaal montage-uren (indicatief): ${totals.montage.totaalUren} u</p>

      <h3 style="margin:18px 0 8px;font-size:15px;">Prijsoverzicht</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td colspan="2" style="padding:6px 12px;">Kozijn(en) (incl. btw)</td><td style="padding:6px 12px;text-align:right;">${formatEuro(totals.productInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;">Montage & werk (incl. btw)</td><td style="padding:6px 12px;text-align:right;">${formatEuro(totals.montage.subtotaalInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:8px 12px;border-top:1px solid #e7e5e0;font-weight:700;">Bruto (incl. btw)</td><td style="padding:8px 12px;text-align:right;border-top:1px solid #e7e5e0;font-weight:700;">${formatEuro(totals.brutoInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:2px 12px;font-size:12px;color:#777;">waarvan btw (${MONTAGE.btwPercentage}%)</td><td style="padding:2px 12px;text-align:right;font-size:12px;color:#777;">${formatEuro(totals.btwBedrag)}</td></tr>
        ${isdeRow}
        ${totals.isde.subsidie > 0 ? `<tr><td colspan="2" style="padding:6px 12px;font-weight:600;">Netto investering (na ISDE)</td><td style="padding:6px 12px;text-align:right;font-weight:600;">${formatEuro(totals.nettoInvestering)}</td></tr>` : ""}
        <tr><td colspan="3" style="padding:10px 12px 2px;font-size:12px;color:#abe000;background:#23272a;">BETALING</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;">Aanbetaling bij opdracht</td><td style="padding:6px 12px;text-align:right;">${formatEuro(totals.aanbetaling)}</td></tr>
        <tr><td colspan="2" style="padding:6px 12px;">Restant bij oplevering</td><td style="padding:6px 12px;text-align:right;">${formatEuro(totals.restantBijOplevering)}</td></tr>
      </table>
      <p style="margin:12px 0 0;font-size:12px;color:#777;">Richtprijs — niet bindend. Definitieve prijs na inmeetservice. Aanbetaling = maatwerkproductie kozijn (intern ≈ inkoopprijs); restant bij oplevering.</p>
    </div>
  </div>
</body></html>`;

  const text = [
    `Offerte-aanvraag (checkout) — De Kozijnstudio`,
    ``,
    `Klant: ${c.naam} · ${c.email} · ${c.telefoon} · ${c.postcode.toUpperCase()} ${c.plaats}`,
    c.opmerkingen ? `Opmerkingen: ${c.opmerkingen}` : ``,
    ``,
    `Configuratie:`,
    input.configSummary || "— geen —",
    ``,
    `Montage:`,
    ...totals.montage.lines.map((l) => `- ${l.regel.label}: ${l.aantal} ${EENHEID_LABEL[l.regel.eenheid]} = ${formatEuro(l.lineInclBtw)}`),
    `Montage-uren (indicatief): ${totals.montage.totaalUren}`,
    ``,
    `Kozijn(en): ${formatEuro(totals.productInclBtw)}`,
    `Montage: ${formatEuro(totals.montage.subtotaalInclBtw)}`,
    `Bruto incl. btw: ${formatEuro(totals.brutoInclBtw)} (waarvan btw ${formatEuro(totals.btwBedrag)})`,
    totals.isde.subsidie > 0 ? `ISDE-subsidie (indicatief, via RVO): -${formatEuro(totals.isde.subsidie)}` : ``,
    totals.isde.subsidie > 0 ? `Netto investering: ${formatEuro(totals.nettoInvestering)}` : ``,
    `Aanbetaling bij opdracht: ${formatEuro(totals.aanbetaling)}`,
    `Restant bij oplevering: ${formatEuro(totals.restantBijOplevering)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

  try {
    await transporter.sendMail({
      from: `"De Kozijnstudio — website" <${smtp.from}>`,
      to: smtp.to,
      replyTo: `"${c.naam}" <${c.email}>`,
      subject: `Offerte (checkout) — ${c.naam} (${c.plaats}) — ${formatEuro(totals.eindtotaalInclBtw)}`,
      text,
      html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[checkout] Versturen mislukt:", error);
    return { ok: false, reason: "send_failed" };
  }
}

// ─── Project-offerte (mandje met meerdere kozijnen) ──────────────────────────

export async function sendProjectEmail(input: {
  items: ProjectLineItem[];
  contact: CheckoutContact;
  pdfBase64?: string | null;
}): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const smtp = readSmtpConfig();
  if (!smtp) {
    console.error("[project] SMTP is niet geconfigureerd (.env.local).");
    return { ok: false, reason: "not_configured" };
  }

  const project = computeProject(input.items);
  const t = project.total;
  const c = input.contact;

  const itemsHtml = input.items
    .map((it, idx) => {
      const summary = buildHandoff(it.config, it.montageChecked).summary;
      const pi = project.perItem[idx];
      return `<div style="margin:14px 0;border:1px solid #e7e5e0;">
        <p style="margin:0;padding:8px 12px;background:#15302b;color:#abe000;font-weight:700;font-size:13px;">Kozijn ${idx + 1} — ${escapeHtml(formatEuro(pi.brutoInclBtw))} incl. btw</p>
        <pre style="margin:0;padding:10px 12px;white-space:pre-wrap;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#333;">${escapeHtml(summary)}</pre>
      </div>`;
    })
    .join("");

  const isdeRow =
    t.isde.subsidie > 0
      ? `<tr><td colspan="2" style="padding:6px 12px;">ISDE-subsidie (indicatief, via RVO)</td><td style="padding:6px 12px;text-align:right;color:#1e4a3c;">− ${formatEuro(t.isde.subsidie)}</td></tr>
         <tr><td colspan="2" style="padding:6px 12px;font-weight:600;">Netto investering (na ISDE)</td><td style="padding:6px 12px;text-align:right;font-weight:600;">${formatEuro(t.nettoInvestering)}</td></tr>`
      : "";

  const html = `<!doctype html><html lang="nl"><body style="margin:0;background:#e6f1e8;font-family:Arial,Helvetica,sans-serif;color:#15302b;">
  <div style="max-width:680px;margin:0 auto;padding:24px;">
    <div style="background:#15302b;color:#fff;padding:20px 24px;">
      <p style="margin:0;font-size:18px;font-weight:700;">Nieuwe projectaanvraag — ${project.itemCount} kozijn(en)</p>
      <p style="margin:6px 0 0;font-size:13px;color:#abe000;">De Kozijnstudio · via website</p>
    </div>
    <div style="background:#fff;border:1px solid #cbddd0;border-top:none;padding:16px 24px;">
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
        <tr><td colspan="2" style="padding:8px 12px;border-top:1px solid #cbddd0;font-weight:700;">Bruto (incl. btw)</td><td style="padding:8px 12px;text-align:right;border-top:1px solid #cbddd0;font-weight:700;">${formatEuro(t.brutoInclBtw)}</td></tr>
        <tr><td colspan="2" style="padding:2px 12px;font-size:12px;color:#777;">waarvan btw (${MONTAGE.btwPercentage}%)</td><td style="padding:2px 12px;text-align:right;font-size:12px;color:#777;">${formatEuro(t.btwBedrag)}</td></tr>
        ${isdeRow}
        <tr><td colspan="3" style="padding:10px 12px 2px;font-size:12px;color:#abe000;background:#15302b;">BETALING</td></tr>
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

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });

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

  try {
    await transporter.sendMail({
      from: `"De Kozijnstudio — website" <${smtp.from}>`,
      to: smtp.to,
      replyTo: `"${c.naam}" <${c.email}>`,
      subject: `Projectaanvraag — ${c.naam} (${c.plaats}) — ${project.itemCount} kozijn(en) — ${formatEuro(t.brutoInclBtw)}`,
      text,
      html,
      attachments,
    });
    return { ok: true };
  } catch (error) {
    console.error("[project] Versturen mislukt:", error);
    return { ok: false, reason: "send_failed" };
  }
}
