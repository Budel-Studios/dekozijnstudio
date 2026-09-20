"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { CheckIcon } from "@/components/icons";
import { formatEuro } from "@/lib/configurator-price";
import {
  CONFIG_MATERIALEN,
  CONFIG_PRODUCTTYPES,
  CONFIG_GLAS,
  CONFIG_KLEUREN,
  CONFIG_DRAAIRICHTING,
  CONFIG_HANGSLUIT,
} from "@/data/configurator";
import { buildProjectPdf, type PdfItem } from "@/lib/project-pdf";
import { KozijnPreview } from "@/components/configurator/kozijn-preview";
import { computeProject } from "@/lib/checkout";
import { isdeBerekening, isdeInfo } from "@/data/subsidie";
import { PRICE_ON_REQUEST, SHOW_PRODUCT_PRICES } from "@/lib/site";
import { submitProject } from "@/app/offerte/actions";
import { MontageEditor } from "@/components/offerte/montage-editor";
import { PriceSummary } from "@/components/offerte/price-summary";
import {
  readProject,
  writeProject,
  removeFromProject,
  PROJECT_EVENT,
  type ProjectItem,
} from "@/lib/project-cart";

const inputClass =
  "w-full border border-mist bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/15";

function lbl<T extends { value: string; label: string }>(list: readonly T[], v?: string) {
  return list.find((x) => x.value === v)?.label ?? "—";
}

/** Rastert een ingesloten SVG-tekening naar een PNG data-URL (voor de PDF). */
async function svgToPng(svg: SVGSVGElement): Promise<{ dataUrl: string; w: number; h: number }> {
  const vb = svg.viewBox?.baseVal;
  const w = vb && vb.width ? vb.width : svg.clientWidth || 300;
  const h = vb && vb.height ? vb.height : svg.clientHeight || 300;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("width", String(w));
  clone.setAttribute("height", String(h));
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const xml = new XMLSerializer().serializeToString(clone);
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("svg load"));
    img.src = url;
  });
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return { dataUrl: canvas.toDataURL("image/png"), w, h };
}

export function Checkout() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [contact, setContact] = useState({
    naam: "", email: "", telefoon: "", postcode: "", plaats: "", opmerkingen: "", website: "",
  });
  const [akkoord, setAkkoord] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    setItems(readProject());
    setLoaded(true);
    const onUpd = () => setItems(readProject());
    window.addEventListener(PROJECT_EVENT, onUpd);
    return () => window.removeEventListener(PROJECT_EVENT, onUpd);
  }, []);

  const project = useMemo(
    () => computeProject(items.map((i) => ({ config: i.config, montageChecked: i.montageChecked }))),
    [items],
  );
  const totals = project.total;

  function removeItem(id: string) {
    setItems(removeFromProject(id));
  }

  function toggleItemMontage(id: string, regelId: string, on: boolean) {
    setItems((cur) => {
      const next = cur.map((it) =>
        it.id === id
          ? {
              ...it,
              montageChecked: on
                ? [...new Set([...it.montageChecked, regelId])]
                : it.montageChecked.filter((x) => x !== regelId),
            }
          : it,
      );
      writeProject(next);
      return next;
    });
  }

  const setC = (key: keyof typeof contact, value: string) => {
    setContact((c) => ({ ...c, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  async function generatePdf(): Promise<{ blob: Blob; base64: string } | null> {
    if (typeof document === "undefined") return null;
    const svgs = Array.from(
      document.querySelectorAll<SVGSVGElement>("[data-kozijn-preview] svg"),
    );
    const pdfItems: PdfItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const c = items[i].config;
      let imageDataUrl = "";
      let ratio = 0.8;
      const svg = svgs[i];
      if (svg) {
        try {
          const png = await svgToPng(svg);
          imageDataUrl = png.dataUrl;
          ratio = png.h > 0 ? png.w / png.h : 0.8;
        } catch {
          /* tekening overslaan bij rasterfout */
        }
      }
      const rows: Array<[string, string]> = [
        ["Materiaal", lbl(CONFIG_MATERIALEN, c.materiaal)],
        ["Type", lbl(CONFIG_PRODUCTTYPES, c.producttype)],
        ["Afmeting", `${c.breedteCm} × ${c.hoogteCm} cm`],
        ["Aantal", String(c.aantal)],
        ["Glas", lbl(CONFIG_GLAS, c.glas)],
        ["Kleur", lbl(CONFIG_KLEUREN, c.kleur)],
      ];
      if (c.draairichting) rows.push(["Draairichting", lbl(CONFIG_DRAAIRICHTING, c.draairichting)]);
      if (c.hangSluit) rows.push(["Hang/sluit", lbl(CONFIG_HANGSLUIT, c.hangSluit)]);
      if (c.opties.includes("ventilatie")) rows.push(["Ventilatie", "Ja"]);
      pdfItems.push({
        imageDataUrl,
        imageRatio: ratio,
        titel: `Kozijn ${i + 1}`,
        rows,
        prijs: SHOW_PRODUCT_PRICES
          ? formatEuro(project.perItem[i]?.brutoInclBtw ?? 0)
          : PRICE_ON_REQUEST,
      });
    }

    const overzicht: Array<[string, string]> = SHOW_PRODUCT_PRICES
      ? [
          ["Kozijnen", formatEuro(totals.productInclBtw)],
          ["Montage & werk", formatEuro(totals.montage.subtotaalInclBtw)],
          ["*Bruto (incl. btw)", formatEuro(totals.brutoInclBtw)],
          [`waarvan btw`, formatEuro(totals.btwBedrag)],
        ]
      : [
          ["Kozijnen", PRICE_ON_REQUEST],
          ["Montage & werk (indicatief)", formatEuro(totals.montage.subtotaalInclBtw)],
        ];
    if (totals.isde.subsidie > 0) {
      overzicht.push(["ISDE-subsidie (indicatief)", `− ${formatEuro(totals.isde.subsidie)}`]);
      if (SHOW_PRODUCT_PRICES) {
        overzicht.push(["*Netto investering", formatEuro(totals.nettoInvestering)]);
      }
    }
    if (SHOW_PRODUCT_PRICES) {
      overzicht.push(["Aanbetaling bij opdracht", formatEuro(totals.aanbetaling)]);
      overzicht.push(["Restant bij oplevering", formatEuro(totals.restantBijOplevering)]);
    }

    const datum = new Date().toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return buildProjectPdf({ datum, contact: { ...contact }, items: pdfItems, overzicht });
  }

  async function handleSubmit() {
    const e: Record<string, string> = {};
    if (contact.naam.trim().length < 2) e.naam = "Vul uw naam in.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) e.email = "Vul een geldig e-mailadres in.";
    if (contact.telefoon.trim().length < 8) e.telefoon = "Vul een geldig telefoonnummer in.";
    if (!/^\d{4}\s?[A-Za-z]{2}$/.test(contact.postcode)) e.postcode = "Vul een geldige postcode in.";
    if (contact.plaats.trim().length < 2) e.plaats = "Vul uw plaats in.";
    if (!akkoord) e.privacyAkkoord = "U dient akkoord te gaan met de privacyverklaring.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    let pdf: { blob: Blob; base64: string } | null = null;
    try {
      pdf = await generatePdf();
    } catch {
      pdf = null; // PDF mislukt — aanvraag gaat alsnog door
    }

    try {
      const result = await submitProject({
        items: items.map((i) => ({ config: i.config, montageChecked: i.montageChecked })),
        contact: { ...contact, privacyAkkoord: akkoord },
        pdfBase64: pdf?.base64 ?? null,
      });
      if (result.ok) {
        if (pdf) setPdfUrl(URL.createObjectURL(pdf.blob));
        setDone(true);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitError(result.error);
      }
    } catch {
      setSubmitError("Er ging iets mis bij het versturen. Probeer het later opnieuw.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!loaded) {
    return (
      <div className="border border-mist bg-paper p-8 text-sm text-ink/50">
        Project laden…
      </div>
    );
  }

  if (done) {
    return (
      <div className="border border-mist bg-paper p-8 text-center sm:p-12">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center bg-lime/15">
          <CheckIcon className="size-7 text-forest" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">Bedankt — uw projectaanvraag is verzonden!</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/65">
          We hebben uw project met alle kozijnen ontvangen en nemen doorgaans
          binnen één werkdag contact met u op om de inmeetservice in te plannen.
          {pdfUrl ? " U kunt hieronder een PDF van uw aanvraag downloaden." : ""}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              download="projectaanvraag-dekozijnstudio.pdf"
              className="inline-flex h-11 items-center justify-center gap-2 bg-lime px-6 text-sm font-medium text-ink transition-colors hover:bg-lime-hover"
            >
              ↓ Download PDF
            </a>
          )}
          <Button href="/" variant={pdfUrl ? "secondary" : "primary"}>Terug naar home</Button>
          <Button href="/configurator" variant="secondary">Nieuw kozijn samenstellen</Button>
        </div>
      </div>
    );
  }

  // Leeg mandje
  if (loaded && items.length === 0) {
    return (
      <div className="border border-mist bg-paper p-8 text-center sm:p-12">
        <p className="font-display text-xl font-semibold text-ink">Uw project is nog leeg</p>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/65">
          Stel uw eerste kozijn samen in de configurator en voeg het toe aan uw
          project. U kunt zoveel kozijnen toevoegen als u wilt.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/configurator">Naar de configurator</Button>
          <Button href="/producten" variant="secondary">Bekijk producten</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* ── Hoofdkolom ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Uw kozijnen {loaded ? `(${items.length})` : ""}
          </h2>
          <Button href="/configurator" variant="secondary" size="sm">+ Nog een kozijn</Button>
        </div>

        {items.map((item, idx) => (
          <ProjectCard
            key={item.id}
            index={idx}
            item={item}
            productPrijs={project.perItem[idx]?.productInclBtw ?? 0}
            montagePrijs={project.perItem[idx]?.montage.subtotaalInclBtw ?? 0}
            onRemove={() => removeItem(item.id)}
            onToggleMontage={(regelId, on) => toggleItemMontage(item.id, regelId, on)}
          />
        ))}

        {/* ISDE (gecombineerd over het hele project) */}
        <section className="border border-mist bg-paper p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">ISDE-subsidie</h2>
          {totals.isde.eligible ? (
            <>
              <div className="mt-4 border border-forest/20 bg-forest/5 p-5">
                <p className="text-sm text-ink/60">Indicatieve ISDE-subsidie (ontvangt u van RVO)</p>
                <p className="font-display text-2xl font-semibold text-forest">− {formatEuro(totals.isde.subsidie)}</p>
                <p className="mt-1 text-xs text-ink/50">o.b.v. ± {totals.isde.glasM2.toFixed(1)} m² HR++/triple glas in dit project</p>
              </div>
              {!totals.isde.meetsMinimum && (
                <Callout variant="warning" className="mt-4">
                  <p>
                    Let op: het glasoppervlak (± {totals.isde.glasM2.toFixed(1)} m²) ligt onder de
                    indicatieve minimumdrempel van {isdeBerekening.minM2} m². Voeg eventueel meer
                    kozijnen toe om in aanmerking te komen.
                  </p>
                </Callout>
              )}
              <Callout variant="info" className="mt-4" title="Verdubbelen via MTB Bouw">
                <p>{isdeBerekening.combinatieVoordeel}</p>
                <p className="mt-2">
                  Glas komt zelfstandig in aanmerking. Combineren met een andere isolatiemaatregel
                  kan de subsidie verdubbelen — onze vaste bouwpartner{" "}
                  <Link href="/mtb-bouw" className="font-semibold underline underline-offset-2">MTB Bouw</Link>{" "}
                  voert die graag voor u uit.
                </p>
              </Callout>
              <Callout variant="disclaimer" className="mt-4" title={`Indicatief — bijgewerkt ${isdeBerekening.lastUpdated}`}>
                <p>
                  {isdeInfo.disclaimer}{" "}
                  <a href={isdeInfo.rvoUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-forest underline underline-offset-2 hover:no-underline">
                    {isdeInfo.rvoLabel} →
                  </a>
                </p>
              </Callout>
            </>
          ) : (
            <Callout variant="disclaimer" className="mt-4">
              <p>ISDE-subsidie geldt bij HR++- of triple glas. Kies dat glastype in de configurator om mogelijk subsidie te ontvangen.</p>
            </Callout>
          )}
        </section>

        {/* Gegevens */}
        <section className="border border-mist bg-paper p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">Uw gegevens</h2>
          <p className="mt-1.5 text-sm text-ink/55">
            We gebruiken deze uitsluitend om uw offerte op te stellen en contact op te nemen.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <CField id="naam" label="Naam" value={contact.naam} onChange={(v) => setC("naam", v)} error={errors.naam} autoComplete="name" />
            <CField id="email" label="E-mailadres" type="email" value={contact.email} onChange={(v) => setC("email", v)} error={errors.email} autoComplete="email" />
            <CField id="telefoon" label="Telefoon" type="tel" value={contact.telefoon} onChange={(v) => setC("telefoon", v)} error={errors.telefoon} autoComplete="tel" />
            <div className="grid grid-cols-2 gap-3">
              <CField id="postcode" label="Postcode" value={contact.postcode} onChange={(v) => setC("postcode", v)} error={errors.postcode} placeholder="7500 AA" autoComplete="postal-code" />
              <CField id="plaats" label="Plaats" value={contact.plaats} onChange={(v) => setC("plaats", v)} error={errors.plaats} autoComplete="address-level2" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="opmerkingen" className="mb-1.5 block text-sm font-medium text-ink">Opmerkingen (optioneel)</label>
            <textarea id="opmerkingen" rows={3} className={inputClass} value={contact.opmerkingen} onChange={(ev) => setC("opmerkingen", ev.target.value)} />
          </div>

          <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <input type="text" tabIndex={-1} autoComplete="off" value={contact.website} onChange={(ev) => setC("website", ev.target.value)} />
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={akkoord} onChange={(ev) => { setAkkoord(ev.target.checked); setErrors((er) => ({ ...er, privacyAkkoord: "" })); }} className="mt-0.5 size-4 accent-forest" />
            <span className="text-sm leading-relaxed text-ink/70">
              Ik ga akkoord dat mijn gegevens worden gebruikt om mijn offerte op te stellen en
              contact met mij op te nemen, zoals beschreven in de{" "}
              <Link href="/privacy" className="font-medium text-forest underline underline-offset-2">privacyverklaring</Link>.
            </span>
          </label>
          {errors.privacyAkkoord && <p className="mt-1.5 text-sm text-red-600">{errors.privacyAkkoord}</p>}

          {submitError && (
            <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>
          )}

          <div className="mt-6">
            <Button onClick={handleSubmit} disabled={submitting} className="w-full justify-center sm:w-auto">
              {submitting ? "Versturen…" : `Projectaanvraag versturen (${items.length} kozijn${items.length === 1 ? "" : "en"})`}
            </Button>
          </div>
        </section>
      </div>

      {/* ── Prijsoverzicht (sticky) ── */}
      <aside className="border border-mist bg-paper-soft p-6 lg:sticky lg:top-32">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood">Projectoverzicht</p>
        <p className="mt-1 text-sm text-ink/55">{items.length} kozijn{items.length === 1 ? "" : "en"}</p>
        <div className="mt-4">
          <PriceSummary totals={totals} />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink/45">
          Indicatie van de montagekosten op basis van uw keuzes — niet bindend. Uw kozijnprijs en de definitieve prijs volgen na de inmeetservice.
        </p>
      </aside>
    </div>
  );
}

// ─── Project-item kaart ──────────────────────────────────────────────────────

function ProjectCard({
  index,
  item,
  productPrijs,
  montagePrijs,
  onRemove,
  onToggleMontage,
}: {
  index: number;
  item: ProjectItem;
  productPrijs: number;
  montagePrijs: number;
  onRemove: () => void;
  onToggleMontage: (regelId: string, on: boolean) => void;
}) {
  const [montageOpen, setMontageOpen] = useState(false);
  const c = item.config;

  return (
    <section className="border border-mist bg-paper p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-ink">Kozijn {index + 1}</h3>
        <button type="button" onClick={onRemove} className="text-sm font-medium text-ink/45 underline underline-offset-2 hover:text-red-600">
          Verwijderen
        </button>
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-[150px_1fr] sm:items-start">
        <div data-kozijn-preview className="border border-mist bg-paper-soft p-3">
          <KozijnPreview config={c} />
        </div>
        <dl className="space-y-1.5 text-sm">
          <Row k="Materiaal" v={lbl(CONFIG_MATERIALEN, c.materiaal)} />
          <Row k="Type" v={lbl(CONFIG_PRODUCTTYPES, c.producttype)} />
          <Row k="Afmeting" v={`${c.breedteCm} × ${c.hoogteCm} cm`} />
          <Row k="Aantal" v={String(c.aantal)} />
          <Row k="Glas" v={lbl(CONFIG_GLAS, c.glas)} />
          <Row k="Kleur" v={lbl(CONFIG_KLEUREN, c.kleur)} />
          <div className="mt-2 flex justify-between border-t border-mist pt-2 text-ink">
            {SHOW_PRODUCT_PRICES ? (
              <>
                <dt className="font-medium">Kozijn + montage (incl. btw)</dt>
                <dd className="font-semibold">{formatEuro(productPrijs + montagePrijs)}</dd>
              </>
            ) : (
              <>
                <dt className="font-medium">Montage (incl. btw)</dt>
                <dd className="font-semibold">{formatEuro(montagePrijs)}</dd>
              </>
            )}
          </div>
        </dl>
      </div>

      {/* Montage per kozijn (uitklapbaar) */}
      <div className="mt-5 border-t border-mist pt-4">
        <button
          type="button"
          onClick={() => setMontageOpen((o) => !o)}
          aria-expanded={montageOpen}
          className="flex w-full items-center justify-between text-sm font-medium text-ink"
        >
          <span>Montage &amp; werkzaamheden — {formatEuro(montagePrijs)}</span>
          <span className="text-ink/40">{montageOpen ? "Verbergen" : "Aanpassen"}</span>
        </button>
        {montageOpen && (
          <div className="mt-4">
            <MontageEditor
              config={c}
              checkedIds={item.montageChecked}
              onToggle={(regelId, on) => onToggleMontage(regelId, on)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink/55">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}

function CField({
  id, label, value, onChange, error, type = "text", placeholder, autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  error?: string; type?: string; placeholder?: string; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={inputClass}
      />
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
