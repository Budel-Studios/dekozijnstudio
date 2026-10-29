import "server-only";
import nodemailer from "nodemailer";
import { company } from "@/data/company";

/**
 * One mail transport for every form on the site.
 *
 * Preferred: Resend, the same service and sender domain the MTB Bouw website
 * uses (RESEND_API_KEY + a verified mtbbouw.com sender). Fallback: plain SMTP
 * via Nodemailer (SMTP_HOST/SMTP_USER/SMTP_PASS). Without either, sending
 * fails loudly so a visitor never sees a false success.
 *
 * Leads go to OFFERTE_TO_EMAIL, or — for now — to the MTB Bouw mailbox
 * (company.email, info@mtbbouw.com).
 */

export type OutgoingMail = {
  /** Defaults to the lead mailbox (OFFERTE_TO_EMAIL or company.email). */
  to?: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  fromName?: string;
  attachments?: Array<{ filename: string; content: Buffer; contentType: string }>;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

export const LEAD_MAILBOX = process.env.OFFERTE_TO_EMAIL || company.email;

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT ?? "587");
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    from: process.env.OFFERTE_FROM_EMAIL || process.env.MAIL_FROM || user,
  };
}

export function mailTransportName(): "resend" | "smtp" | null {
  if (process.env.RESEND_API_KEY) return "resend";
  if (smtpConfig()) return "smtp";
  return null;
}

async function viaResend(mail: OutgoingMail, apiKey: string): Promise<DeliveryResult> {
  const from = process.env.MAIL_FROM || process.env.OFFERTE_FROM_EMAIL || "website@mtbbouw.com";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `${mail.fromName ?? "De Kozijnstudio"} <${from}>`,
        to: [mail.to ?? LEAD_MAILBOX],
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
        ...(mail.attachments?.length
          ? {
              attachments: mail.attachments.map((a) => ({
                filename: a.filename,
                content: a.content.toString("base64"),
                content_type: a.contentType,
              })),
            }
          : {}),
      }),
    });
    if (!res.ok) {
      console.error("[mail] Resend afgewezen", res.status, await res.text().catch(() => ""), {
        subject: mail.subject,
      });
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[mail] Resend netwerkfout", error, { subject: mail.subject });
    return { ok: false, reason: "send_failed" };
  }
}

async function viaSmtp(mail: OutgoingMail, cfg: NonNullable<ReturnType<typeof smtpConfig>>): Promise<DeliveryResult> {
  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    await transporter.sendMail({
      from: `"${mail.fromName ?? "De Kozijnstudio"}" <${cfg.from}>`,
      to: mail.to ?? LEAD_MAILBOX,
      ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      attachments: mail.attachments,
    });
    return { ok: true };
  } catch (error) {
    console.error("[mail] SMTP mislukt", error, { subject: mail.subject });
    return { ok: false, reason: "send_failed" };
  }
}

export async function deliverMail(mail: OutgoingMail): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) return viaResend(mail, apiKey);
  const smtp = smtpConfig();
  if (smtp) return viaSmtp(mail, smtp);
  console.error(
    "[mail] Geen mailtransport ingesteld. Zet RESEND_API_KEY (zoals op de MTB Bouw-site) of SMTP_HOST/SMTP_USER/SMTP_PASS.",
  );
  return { ok: false, reason: "not_configured" };
}
