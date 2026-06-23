"use client";

import { jsPDF } from "jspdf";

/**
 * Genereert een PDF van de projectaanvraag (gegevens + kozijntekeningen).
 * Tekeningen worden vooraf (in de browser) naar PNG gerasterd en hier ingesloten.
 * Retourneert een Blob (voor download) en base64 (voor de e-mailbijlage).
 */

export type PdfItem = {
  /** PNG data-URL van de kozijntekening */
  imageDataUrl: string;
  /** breedte/hoogte-verhouding van de tekening */
  imageRatio: number;
  titel: string;
  rows: Array<[string, string]>;
  prijs: string;
};

export type PdfData = {
  datum: string;
  contact: {
    naam: string;
    email: string;
    telefoon: string;
    postcode: string;
    plaats: string;
    opmerkingen?: string;
  };
  items: PdfItem[];
  /** Prijsoverzicht-regels [label, bedrag] */
  overzicht: Array<[string, string]>;
};

const INK: [number, number, number] = [21, 48, 43];
const LIME: [number, number, number] = [171, 224, 0];
const GREY: [number, number, number] = [120, 120, 120];
const LINE: [number, number, number] = [203, 221, 208];

export function buildProjectPdf(data: PdfData): { blob: Blob; base64: string } {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentW = pageW - margin * 2;
  let y = margin;

  const ensure = (h: number) => {
    if (y + h > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Header ──
  doc.setFillColor(...INK);
  doc.rect(margin, y, contentW, 56, "F");
  doc.setFillColor(...LIME);
  doc.rect(margin, y, 6, 56, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("De Kozijnstudio", margin + 18, y + 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Projectaanvraag", margin + 18, y + 42);
  doc.setFontSize(9);
  doc.text(data.datum, pageW - margin - 12, y + 42, { align: "right" });
  y += 56 + 20;

  // ── Contact ──
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Aanvrager", margin, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const c = data.contact;
  const contactLines = [
    c.naam,
    `${c.email}  ·  ${c.telefoon}`,
    `${c.postcode.toUpperCase()} ${c.plaats}`,
  ];
  if (c.opmerkingen && c.opmerkingen.trim()) {
    contactLines.push(`Opmerkingen: ${c.opmerkingen.trim()}`);
  }
  for (const line of contactLines) {
    const wrapped = doc.splitTextToSize(line, contentW);
    doc.text(wrapped, margin, y);
    y += 14 * wrapped.length;
  }
  y += 10;

  // ── Kozijnen ──
  doc.setDrawColor(...LINE);
  data.items.forEach((item) => {
    const imgW = 120;
    const imgH = Math.min(150, imgW / (item.imageRatio || 0.8));
    const blockH = Math.max(imgH, 18 + item.rows.length * 14) + 22;
    ensure(blockH);

    const topY = y;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(`${item.titel} — ${item.prijs}`, margin, topY + 4);

    // tekening
    try {
      doc.addImage(item.imageDataUrl, "PNG", margin, topY + 12, imgW, imgH);
    } catch {
      /* afbeelding overslaan bij fout */
    }

    // gegevens
    let ry = topY + 20;
    const rx = margin + imgW + 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    for (const [k, v] of item.rows) {
      doc.setTextColor(...GREY);
      doc.text(k, rx, ry);
      doc.setTextColor(...INK);
      doc.text(String(v), rx + 110, ry);
      ry += 14;
    }

    y = topY + blockH;
    doc.setDrawColor(...LINE);
    doc.line(margin, y - 10, pageW - margin, y - 10);
  });

  // ── Prijsoverzicht ──
  ensure(40 + data.overzicht.length * 16);
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...INK);
  doc.text("Projectoverzicht", margin, y);
  y += 18;
  doc.setFontSize(10);
  data.overzicht.forEach(([label, bedrag], i) => {
    const strong = label.startsWith("*");
    const cleanLabel = strong ? label.slice(1) : label;
    doc.setFont("helvetica", strong ? "bold" : "normal");
    doc.setTextColor(...(strong ? INK : GREY));
    doc.text(cleanLabel, margin, y);
    doc.setTextColor(...INK);
    doc.text(bedrag, pageW - margin, y, { align: "right" });
    if (strong) {
      doc.setDrawColor(...LINE);
      doc.line(margin, y - 12, pageW - margin, y - 12);
    }
    y += 16;
    void i;
  });

  // ── Footer ──
  y += 10;
  ensure(40);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...GREY);
  const disclaimer = doc.splitTextToSize(
    "Richtprijs op basis van uw keuzes — niet bindend. De definitieve prijs wordt vastgesteld na de inmeetservice (€ 49, verrekend bij doorgang). Aanbetaling = maatwerkproductie kozijn; restant bij oplevering.",
    contentW,
  );
  doc.text(disclaimer, margin, y);

  const blob = doc.output("blob");
  const base64 = doc.output("datauristring").split(",")[1] ?? "";
  return { blob, base64 };
}
