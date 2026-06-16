"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { CheckIcon } from "@/components/icons";
import { formatEuro, type KozijnConfig } from "@/lib/configurator-price";
import {
  CONFIG_MATERIALEN,
  CONFIG_PRODUCTTYPES,
  CONFIG_GLAS,
  CONFIG_KLEUREN,
} from "@/data/configurator";
import { KozijnPreview } from "@/components/configurator/kozijn-preview";
import { montagePrefill } from "@/lib/montage";
import { computeCheckout } from "@/lib/checkout";
import { isdeBerekening, isdeInfo } from "@/data/subsidie";
import { HANDOFF_KEY, type OfferteHandoff } from "@/lib/configurator-handoff";
import { submitCheckout } from "@/app/offerte/actions";
import { MontageEditor } from "@/components/offerte/montage-editor";
import { PriceSummary } from "@/components/offerte/price-summary";

const inputClass =
  "w-full rounded-xl border border-mist bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/15";

function lbl<T extends { value: string; label: string }>(list: T[], v?: string) {
  return list.find((x) => x.value === v)?.label ?? "—";
}

export function Checkout() {
  const [config, setConfig] = useState<KozijnConfig | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [aantallen, setAantallen] = useState<Record<string, number>>(() => montagePrefill(null));
  const [loaded, setLoaded] = useState(false);

  const [contact, setContact] = useState({
    naam: "", email: "", telefoon: "", postcode: "", plaats: "", opmerkingen: "", website: "",
  });
  const [akkoord, setAkkoord] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(HANDOFF_KEY);
      if (raw) {
        const handoff = JSON.parse(raw) as OfferteHandoff;
        setConfig(handoff.config);
        setSummary(handoff.summary);
        setAantallen(
          handoff.montageAantallen && Object.keys(handoff.montageAantallen).length > 0
            ? handoff.montageAantallen
            : montagePrefill(handoff.config),
        );
        sessionStorage.removeItem(HANDOFF_KEY);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const totals = useMemo(() => computeCheckout(config, aantallen), [config, aantallen]);

  const changeMontage = (id: string, value: number) =>
    setAantallen((a) => ({ ...a, [id]: Number.isNaN(value) ? 0 : value }));

  const setC = (key: keyof typeof contact, value: string) => {
    setContact((c) => ({ ...c, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

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
    try {
      const result = await submitCheckout({
        config,
        aantallen,
        configSummary: summary,
        contact: { ...contact, privacyAkkoord: akkoord },
      });
      if (result.ok) {
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

  if (done) {
    return (
      <div className="rounded-card border border-mist bg-paper p-8 text-center sm:p-12">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-lime/15">
          <CheckIcon className="size-7 text-forest" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-ink">Bedankt — uw projectaanvraag is verzonden!</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/65">
          We hebben uw project met volledige specificatie ontvangen en nemen
          doorgaans binnen één werkdag contact met u op om de inmeetservice in te plannen.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/">Terug naar home</Button>
          <Button href="/configurator" variant="secondary">Nieuwe configuratie</Button>
        </div>
      </div>
    );
  }

  const isde = totals.isde;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* ── Hoofdkolom ── */}
      <div className="space-y-6">
        {/* 1. Product */}
        <section className="rounded-card border border-mist bg-paper p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">1. Uw kozijn</h2>
          {!loaded ? (
            <div className="mt-5 h-24 animate-pulse rounded-xl bg-paper-soft" aria-hidden />
          ) : config ? (
            <div className="mt-5 grid gap-6 sm:grid-cols-[160px_1fr] sm:items-center">
              <div className="rounded-xl border border-mist bg-paper-soft p-3">
                <KozijnPreview config={config} />
              </div>
              <dl className="space-y-1.5 text-sm">
                <Row k="Materiaal" v={lbl(CONFIG_MATERIALEN, config.materiaal)} />
                <Row k="Type" v={lbl(CONFIG_PRODUCTTYPES, config.producttype)} />
                <Row k="Afmeting" v={`${config.breedteCm} × ${config.hoogteCm} cm`} />
                <Row k="Aantal" v={String(config.aantal)} />
                <Row k="Glas" v={lbl(CONFIG_GLAS, config.glas)} />
                <Row k="Kleur" v={lbl(CONFIG_KLEUREN, config.kleur)} />
                <div className="mt-2 flex justify-between border-t border-mist pt-2 font-medium text-ink">
                  <dt>Kozijnprijs (incl. btw)</dt>
                  <dd>{formatEuro(totals.productInclBtw)}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <Callout variant="info" className="mt-5">
              <p>
                Er is nog geen configuratie geladen. Stel eerst uw kozijn samen in
                de configurator, of vraag een{" "}
                <Link href="/offerte-aanvragen" className="font-medium underline underline-offset-2">snelle offerte</Link>{" "}
                aan.
              </p>
              <div className="mt-3">
                <Button href="/configurator" size="sm">Naar de configurator</Button>
              </div>
            </Callout>
          )}
        </section>

        {/* 2. Montage */}
        <section className="rounded-card border border-mist bg-paper p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">2. Montage &amp; werkzaamheden</h2>
          <p className="mt-1.5 text-sm text-ink/55">
            Pas de aantallen aan of vink extra werk aan. Alle bedragen incl. btw.
          </p>
          <div className="mt-6">
            <MontageEditor aantallen={aantallen} onChange={changeMontage} />
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-mist pt-4 text-sm">
            <span className="text-ink/60">Montage subtotaal (incl. btw)</span>
            <span className="font-semibold text-ink">{formatEuro(totals.montage.subtotaalInclBtw)}</span>
          </div>
        </section>

        {/* 3. ISDE */}
        <section className="rounded-card border border-mist bg-paper p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">3. ISDE-subsidie</h2>
          {isde.eligible ? (
            <>
              <div className="mt-4 rounded-xl border border-forest/20 bg-forest/5 p-5">
                <p className="text-sm text-ink/60">Indicatieve ISDE-subsidie (ontvangt u van RVO)</p>
                <p className="font-display text-2xl font-semibold text-forest">− {formatEuro(isde.subsidie)}</p>
                <p className="mt-1 text-xs text-ink/50">
                  o.b.v. ± {isde.glasM2.toFixed(1)} m² {lbl(CONFIG_GLAS, config?.glas)} ·{" "}
                  {formatEuro(isde.ratePerM2)}/m² (indicatief)
                </p>
              </div>
              {!isde.meetsMinimum && (
                <Callout variant="warning" className="mt-4">
                  <p>
                    Let op: de glasoppervlakte (± {isde.glasM2.toFixed(1)} m²) ligt onder de
                    indicatieve minimumdrempel van {isdeBerekening.minM2} m². Mogelijk komt u
                    (nog) niet in aanmerking — vergroot het oppervlak of combineer met andere maatregelen.
                  </p>
                </Callout>
              )}
              <Callout variant="info" className="mt-4" title="Combineren met andere maatregelen — via MTB Bouw">
                <p>{isdeBerekening.combinatieEis}</p>
                <p className="mt-2">
                  Onze vaste bouwpartner{" "}
                  <Link href="/mtb-bouw" className="font-semibold underline underline-offset-2">MTB Bouw</Link>{" "}
                  voert deze isolatiemaatregelen (gevel-, dak- of vloerisolatie) graag voor u uit,
                  zodat u optimaal van de ISDE profiteert — alles in één hand.
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
              <p>
                ISDE-subsidie geldt bij HR++- of triple glas. Uw huidige keuze komt niet in
                aanmerking. Kies HR++ of triple glas in de{" "}
                <Link href="/configurator" className="font-medium underline underline-offset-2">configurator</Link>.
              </p>
            </Callout>
          )}
        </section>

        {/* 4. Gegevens */}
        <section className="rounded-card border border-mist bg-paper p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-ink">4. Uw gegevens</h2>
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
              contact met mij op te nemen. Mijn gegevens worden niet voor andere doeleinden gebruikt of gedeeld.
            </span>
          </label>
          {errors.privacyAkkoord && <p className="mt-1.5 text-sm text-red-600">{errors.privacyAkkoord}</p>}

          {submitError && (
            <p role="alert" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>
          )}

          <div className="mt-6">
            <Button onClick={handleSubmit} disabled={submitting} className="w-full justify-center sm:w-auto">
              {submitting ? "Versturen…" : "Projectaanvraag versturen"}
            </Button>
          </div>
        </section>
      </div>

      {/* ── Prijsoverzicht (sticky) ── */}
      <aside className="rounded-card border border-mist bg-paper-soft p-6 lg:sticky lg:top-32">
        <p className="text-xs font-semibold uppercase tracking-widest text-wood">Projectoverzicht</p>
        <div className="mt-4">
          <PriceSummary totals={totals} />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink/45">
          Vrijblijvende richtprijs op basis van uw keuzes — niet bindend. Definitieve prijs na de inmeetservice.
        </p>
      </aside>
    </div>
  );
}

// ─── Subcomponenten ──────────────────────────────────────────────────────────

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
