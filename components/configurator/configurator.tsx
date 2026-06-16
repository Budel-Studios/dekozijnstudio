"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  CONFIG_MATERIALEN,
  CONFIG_PRODUCTTYPES,
  CONFIG_GLAS,
  CONFIG_KLEUREN,
  KLEUR_CATEGORIE_LABEL,
  CONFIG_OPTIES,
  CONFIG_UITVOERING,
  SIZE_LIMITS,
  type KleurCategorie,
} from "@/data/configurator";
import {
  computePrice,
  formatEuro,
  emptyConfig,
  type KozijnConfig,
} from "@/lib/configurator-price";
import { buildHandoff, HANDOFF_KEY } from "@/lib/configurator-handoff";
import { KozijnPreview } from "@/components/configurator/kozijn-preview";
import { montagePrefill } from "@/lib/montage";
import { computeCheckout } from "@/lib/checkout";
import { MontageEditor } from "@/components/offerte/montage-editor";
import { PriceSummary } from "@/components/offerte/price-summary";
import { isdeBerekening } from "@/data/subsidie";

const STEPS = [
  "Materiaal",
  "Producttype",
  "Afmetingen",
  "Glas",
  "Kleur",
  "Uitvoering",
  "Montage",
  "Resultaat",
];

export function Configurator({ initialProducttype }: { initialProducttype?: string } = {}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<KozijnConfig>(
    initialProducttype
      ? { ...emptyConfig, producttype: initialProducttype }
      : emptyConfig,
  );
  const breakdown = computePrice(config);

  // Montage-aantallen: vooringevuld uit de configuratie, totdat de klant ze
  // zelf aanpast (dan bevroren op hun keuzes).
  const [montageAantallen, setMontageAantallen] = useState<Record<string, number>>(
    () => montagePrefill(initialProducttype ? { ...emptyConfig, producttype: initialProducttype } : null),
  );
  const [montageTouched, setMontageTouched] = useState(false);

  useEffect(() => {
    if (montageTouched) return;
    setMontageAantallen(montagePrefill(config));
  }, [config, montageTouched]);

  const totals = useMemo(
    () => computeCheckout(config, montageAantallen),
    [config, montageAantallen],
  );
  const hasProduct = Boolean(config.materiaal && config.producttype && config.glas);

  function changeMontage(id: string, value: number) {
    setMontageTouched(true);
    setMontageAantallen((a) => ({ ...a, [id]: Number.isNaN(value) ? 0 : value }));
  }

  const preselectedLabel = initialProducttype
    ? CONFIG_PRODUCTTYPES.find((p) => p.value === initialProducttype)?.label
    : undefined;

  const update = (patch: Partial<KozijnConfig>) =>
    setConfig((c) => ({ ...c, ...patch }));

  // When the material changes, reset the profiel to that material's first option
  function selectMateriaal(value: string) {
    const mat = CONFIG_MATERIALEN.find((m) => m.value === value);
    update({ materiaal: value, profiel: mat?.profielen[0]?.value });
  }

  function toggleOptie(value: string) {
    update({
      opties: config.opties.includes(value)
        ? config.opties.filter((o) => o !== value)
        : [...config.opties, value],
    });
  }

  // Whether the current step has enough input to advance
  const canAdvance = (() => {
    switch (step) {
      case 0: return Boolean(config.materiaal && config.profiel);
      case 1: return Boolean(config.producttype);
      case 2: return config.breedteCm > 0 && config.hoogteCm > 0 && config.aantal > 0;
      case 3: return Boolean(config.glas);
      case 4: return Boolean(config.kleur);
      case 5: return Boolean(config.uitvoering);
      default: return true;
    }
  })();

  function next() {
    if (!canAdvance) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function goToOfferte() {
    const handoff = buildHandoff(config, montageAantallen);
    try {
      sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff));
    } catch {
      // sessionStorage unavailable — proceed anyway, checkout just won't prefill
    }
    router.push("/offerte");
  }

  const selectedMateriaal = CONFIG_MATERIALEN.find((m) => m.value === config.materiaal);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
      {/* ── Wizard panel ── */}
      <div className="order-2 rounded-card border border-mist bg-paper p-6 sm:p-8 lg:order-1">
        {preselectedLabel && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-lime/40 bg-lime/8 px-4 py-2.5 text-sm text-ink/75">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            Gekozen product: <strong className="font-semibold text-ink">{preselectedLabel}</strong>
          </div>
        )}

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-wood">
              Stap {step + 1} van {STEPS.length}
            </p>
            <p className="text-xs text-ink/50">{STEPS[step]}</p>
          </div>
          <div className="mt-2.5 flex gap-1.5" aria-hidden>
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  i <= step ? "bg-lime" : "bg-mist",
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Step 1: Materiaal + profiel ── */}
        {step === 0 && (
          <Step title="Kies uw materiaal" hint="Elk materiaal heeft eigen voordelen. Daarna kiest u het profiel.">
            <div className="grid gap-3 sm:grid-cols-3">
              {CONFIG_MATERIALEN.map((m) => (
                <SelectCard
                  key={m.value}
                  active={config.materiaal === m.value}
                  onClick={() => selectMateriaal(m.value)}
                  title={m.label}
                  description={m.description}
                />
              ))}
            </div>
            {selectedMateriaal && (
              <div className="mt-6">
                <label htmlFor="profiel" className="mb-1.5 block text-sm font-medium text-ink">
                  Profiel
                </label>
                <select
                  id="profiel"
                  value={config.profiel ?? ""}
                  onChange={(e) => update({ profiel: e.target.value })}
                  className="w-full max-w-sm rounded-xl border border-mist bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/15"
                >
                  {selectedMateriaal.profielen.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            )}
          </Step>
        )}

        {/* ── Step 2: Producttype ── */}
        {step === 1 && (
          <Step title="Welk type kozijn?">
            <div className="grid gap-3 sm:grid-cols-2">
              {CONFIG_PRODUCTTYPES.map((p) => (
                <SelectCard
                  key={p.value}
                  active={config.producttype === p.value}
                  onClick={() => update({ producttype: p.value })}
                  title={p.label}
                />
              ))}
            </div>
          </Step>
        )}

        {/* ── Step 3: Afmetingen ── */}
        {step === 2 && (
          <Step title="Afmetingen & aantal" hint="Een globale maat volstaat — exacte maten nemen we op tijdens de inmeetservice.">
            <div className="grid gap-5 sm:grid-cols-3">
              <NumberField
                label="Breedte (cm)"
                value={config.breedteCm}
                min={SIZE_LIMITS.breedte.min}
                max={SIZE_LIMITS.breedte.max}
                onChange={(v) => update({ breedteCm: v })}
              />
              <NumberField
                label="Hoogte (cm)"
                value={config.hoogteCm}
                min={SIZE_LIMITS.hoogte.min}
                max={SIZE_LIMITS.hoogte.max}
                onChange={(v) => update({ hoogteCm: v })}
              />
              <NumberField
                label="Aantal"
                value={config.aantal}
                min={SIZE_LIMITS.aantal.min}
                max={SIZE_LIMITS.aantal.max}
                onChange={(v) => update({ aantal: v })}
              />
            </div>
            <p className="mt-4 text-sm text-ink/55">
              Oppervlak per kozijn: <strong>{breakdown.areaM2.toFixed(2)} m²</strong>
            </p>
          </Step>
        )}

        {/* ── Step 4: Glas ── */}
        {step === 3 && (
          <Step title="Type beglazing" hint="Beide typen komen in aanmerking voor ISDE-subsidie.">
            <div className="grid gap-3 sm:grid-cols-2">
              {CONFIG_GLAS.map((g) => (
                <SelectCard
                  key={g.value}
                  active={config.glas === g.value}
                  onClick={() => update({ glas: g.value })}
                  title={g.label}
                  description={g.description}
                />
              ))}
            </div>
          </Step>
        )}

        {/* ── Step 5: Kleur + opties ── */}
        {step === 4 && (
          <Step title="Kleur & opties" hint="De tekening werkt direct bij — zo ziet u uw kleur live.">
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-ink">Kleur</legend>
              {(["standaard", "ral", "hout"] as KleurCategorie[]).map((cat) => (
                <div key={cat} className="mb-4 last:mb-0">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink/45">
                    {KLEUR_CATEGORIE_LABEL[cat]}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {CONFIG_KLEUREN.filter((k) => k.category === cat).map((k) => {
                      const active = config.kleur === k.value;
                      return (
                        <button
                          key={k.value}
                          type="button"
                          onClick={() => update({ kleur: k.value })}
                          aria-pressed={active}
                          title={k.ral ? `${k.label} (${k.ral})` : k.label}
                          className={cn(
                            "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-xs font-medium transition-colors",
                            active ? "border-forest bg-forest/5 text-ink" : "border-mist text-ink/70 hover:bg-paper-soft",
                          )}
                        >
                          <span
                            className="size-6 rounded-full border border-black/10"
                            style={{ backgroundColor: k.hex }}
                            aria-hidden
                          />
                          {k.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </fieldset>

            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-medium text-ink">Extra opties (per kozijn)</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {CONFIG_OPTIES.map((o) => {
                  const checked = config.opties.includes(o.value);
                  return (
                    <label
                      key={o.value}
                      className={cn(
                        "flex cursor-pointer flex-col rounded-xl border p-4 transition-colors",
                        checked ? "border-forest bg-forest/5" : "border-mist hover:bg-paper-soft",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <input type="checkbox" checked={checked} onChange={() => toggleOptie(o.value)} className="size-4 accent-forest" />
                        <span className="text-sm font-medium text-ink">{o.label}</span>
                      </span>
                      <span className="mt-1 pl-6 text-xs text-ink/55">{o.description}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Step>
        )}

        {/* ── Step 6: Uitvoering ── */}
        {step === 5 && (
          <Step title="Montage of zelf plaatsen?">
            <div className="grid gap-3 sm:grid-cols-2">
              {CONFIG_UITVOERING.map((u) => (
                <SelectCard
                  key={u.value}
                  active={config.uitvoering === u.value}
                  onClick={() => update({ uitvoering: u.value })}
                  title={u.label}
                  description={u.description}
                />
              ))}
            </div>
          </Step>
        )}

        {/* ── Step 7: Montage ── */}
        {step === 6 && (
          <Step
            title="Montage & werkzaamheden"
            hint="Aantallen zijn vooringevuld op basis van uw configuratie. Pas ze aan en vink extra werk aan. Alle bedragen incl. btw."
          >
            {config.uitvoering === "levering" ? (
              <Callout variant="info" title="U plaatst zelf (alleen levering)">
                <p>
                  U heeft gekozen voor levering zonder montage, dus er zijn geen
                  montagekosten. Wilt u toch montage? Ga terug naar de stap
                  &lsquo;Uitvoering&rsquo;.
                </p>
              </Callout>
            ) : (
              <>
                <MontageEditor aantallen={montageAantallen} onChange={changeMontage} />
                <div className="mt-5 flex items-center justify-between border-t border-mist pt-4 text-sm">
                  <span className="text-ink/60">Montage subtotaal (incl. btw)</span>
                  <span className="font-semibold text-ink">
                    {formatEuro(totals.montage.subtotaalInclBtw)}
                  </span>
                </div>
              </>
            )}
          </Step>
        )}

        {/* ── Step 8: Resultaat / projectoverzicht ── */}
        {step === 7 && (
          <Step title="Uw projectoverzicht">
            <div className="rounded-card border border-forest/20 bg-forest/5 p-6 text-center">
              <p className="text-sm text-ink/60">
                {totals.isde.subsidie > 0 ? "Netto investering (na ISDE, incl. btw)" : "Geschat totaal (incl. btw)"}
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-ink">
                {formatEuro(totals.nettoInvestering)}
              </p>
              <p className="mt-1 text-sm text-ink/55">
                Bruto {formatEuro(totals.brutoInclBtw)}
                {totals.isde.subsidie > 0 ? ` · ISDE − ${formatEuro(totals.isde.subsidie)}` : ""}
              </p>
            </div>

            {totals.isde.eligible && (
              <Callout variant="info" className="mt-4" title="ISDE-subsidie via MTB Bouw">
                <p>
                  Indicatieve ISDE-subsidie: <strong>{formatEuro(totals.isde.subsidie)}</strong>{" "}
                  (± {totals.isde.glasM2.toFixed(1)} m²). ISDE vereist combinatie met
                  een andere isolatiemaatregel — onze vaste bouwpartner{" "}
                  <a href="/mtb-bouw" className="font-semibold underline underline-offset-2">MTB Bouw</a>{" "}
                  voert die graag voor u uit. Bedrag indicatief, bijgewerkt {isdeBerekening.lastUpdated}.
                </p>
              </Callout>
            )}

            <Callout variant="disclaimer" className="mt-4">
              <p>
                Dit is een <strong>richtprijs</strong> op basis van uw keuzes — niet
                bindend. De definitieve prijs wordt vastgesteld na de inmeetservice
                (€ 49, verrekend bij doorgang).
              </p>
            </Callout>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button onClick={goToOfferte} className="flex-1 justify-center">
                Naar jouw project →
              </Button>
              <Button variant="secondary" onClick={() => setStep(0)} className="justify-center">
                Opnieuw beginnen
              </Button>
            </div>
          </Step>
        )}

        {/* Navigation */}
        {step < STEPS.length - 1 && (
          <div className="mt-8 flex items-center justify-between gap-3 border-t border-mist pt-6">
            <Button type="button" variant="ghost" onClick={back} className={cn(step === 0 && "invisible")}>
              ← Vorige
            </Button>
            <Button type="button" onClick={next} disabled={!canAdvance}>
              Volgende →
            </Button>
          </div>
        )}
      </div>

      {/* ── Live summary sidebar ── */}
      <LiveSummary config={config} totals={totals} hasProduct={hasProduct} />
    </div>
  );
}

// ─── Live summary ─────────────────────────────────────────────────────────────

function LiveSummary({
  config,
  totals,
  hasProduct,
}: {
  config: KozijnConfig;
  totals: ReturnType<typeof computeCheckout>;
  hasProduct: boolean;
}) {
  const materiaal = CONFIG_MATERIALEN.find((m) => m.value === config.materiaal);
  const profiel = materiaal?.profielen.find((p) => p.value === config.profiel);

  const kleur = CONFIG_KLEUREN.find((k) => k.value === config.kleur);

  const rows: Array<[string, string]> = [
    ["Materiaal", materiaal?.label ?? "—"],
    ["Profiel", profiel?.label ?? "—"],
    ["Type", CONFIG_PRODUCTTYPES.find((p) => p.value === config.producttype)?.label ?? "—"],
    ["Afmeting", `${config.breedteCm} × ${config.hoogteCm} cm`],
    ["Aantal", String(config.aantal)],
    ["Glas", CONFIG_GLAS.find((g) => g.value === config.glas)?.label ?? "—"],
    ["Kleur", kleur?.label ?? "—"],
    ["Opties", config.opties.length ? config.opties.map((o) => CONFIG_OPTIES.find((x) => x.value === o)?.label).join(", ") : "—"],
    ["Uitvoering", CONFIG_UITVOERING.find((u) => u.value === config.uitvoering)?.label ?? "—"],
  ];

  return (
    <aside className="order-1 rounded-card border border-mist bg-paper-soft p-6 lg:order-2 lg:sticky lg:top-32">
      {/* Live tekening */}
      <div className="mb-5 rounded-xl border border-mist bg-paper p-4">
        <KozijnPreview config={config} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-wood">
        Uw samenstelling
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-ink/55">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-mist pt-4">
        {hasProduct ? (
          <PriceSummary totals={totals} />
        ) : (
          <p className="text-xs text-ink/45">
            Maak uw keuzes (materiaal, type en glas) voor een live prijsoverzicht.
          </p>
        )}
      </div>
    </aside>
  );
}

// ─── Small UI helpers ─────────────────────────────────────────────────────────

function Step({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        {hint && <p className="mt-1.5 text-sm text-ink/55">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function SelectCard({
  active,
  onClick,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors",
        active ? "border-forest bg-forest/5 ring-1 ring-forest/20" : "border-mist hover:bg-paper-soft",
      )}
    >
      <span className="flex w-full items-center justify-between">
        <span className="text-sm font-medium text-ink">{title}</span>
        {active && (
          <span className="flex size-5 items-center justify-center rounded-full bg-lime/20">
            <CheckIcon className="size-3 text-forest" />
          </span>
        )}
      </span>
      {description && <span className="text-xs leading-relaxed text-ink/55">{description}</span>}
    </button>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          onChange(Math.min(max, Math.max(min, n)));
        }}
        className="w-full rounded-xl border border-mist bg-paper px-4 py-3 text-sm text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/15"
      />
      <p className="mt-1 text-xs text-ink/40">{min}–{max}</p>
    </div>
  );
}
