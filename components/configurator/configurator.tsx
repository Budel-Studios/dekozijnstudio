"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
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
  CONFIG_DRAAIRICHTING,
  CONFIG_HANGSLUIT,
  CONFIG_VENTILATIE_POSITIE,
  DRAAIRICHTING_TYPES,
  SIZE_LIMITS,
  type KleurCategorie,
  type Profiel,
} from "@/data/configurator";
import {
  computePrice,
  formatEuro,
  emptyConfig,
  type KozijnConfig,
} from "@/lib/configurator-price";
import { addToProject as addKozijnToProject } from "@/lib/project-cart";
import { KozijnPreview } from "@/components/configurator/kozijn-preview";
import { defaultCheckedIds } from "@/lib/montage";
import { computeCheckout } from "@/lib/checkout";
import { MontageEditor } from "@/components/offerte/montage-editor";
import { PriceSummary } from "@/components/offerte/price-summary";
import { isdeBerekening } from "@/data/subsidie";
import { PRICE_ON_REQUEST, SHOW_PRODUCT_PRICES } from "@/lib/site";

const STEPS = [
  "Materiaal",
  "Producttype",
  "Afmetingen",
  "Glas",
  "Kleur",
  "Ventilatie",
  "Uitvoering",
  "Montage",
  "Resultaat",
];

const VENTILATIE_OPTIE = "ventilatie";

export function Configurator({ initialProducttype }: { initialProducttype?: string } = {}) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<KozijnConfig>(
    initialProducttype
      ? { ...emptyConfig, producttype: initialProducttype }
      : emptyConfig,
  );
  const breakdown = computePrice(config);

  // Montage: standaard relevante regels aangevinkt; bevroren zodra de klant
  // zelf iets aan-/uitvinkt. Hoeveelheden worden automatisch berekend.
  const [montageChecked, setMontageChecked] = useState<string[]>(
    () => defaultCheckedIds(initialProducttype ? { ...emptyConfig, producttype: initialProducttype } : null),
  );
  const [montageTouched, setMontageTouched] = useState(false);

  useEffect(() => {
    if (montageTouched) return;
    // Re-derive montage defaults until the visitor edits them (intentional sync).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMontageChecked(defaultCheckedIds(config));
  }, [config, montageTouched]);

  const totals = useMemo(
    () => computeCheckout(config, montageChecked),
    [config, montageChecked],
  );
  const hasProduct = Boolean(config.materiaal && config.producttype && config.glas);

  function toggleMontage(id: string, on: boolean) {
    setMontageTouched(true);
    setMontageChecked((cur) => (on ? [...new Set([...cur, id])] : cur.filter((x) => x !== id)));
  }

  /** Ventilatierooster aan/uit: stuurt de optie 'ventilatie' aan voor de prijs. */
  function setVentilatie(aanwezig: boolean) {
    update({
      opties: aanwezig
        ? [...new Set([...config.opties, VENTILATIE_OPTIE])]
        : config.opties.filter((o) => o !== VENTILATIE_OPTIE),
    });
  }
  const ventilatieAan = config.opties.includes(VENTILATIE_OPTIE);
  const showDraairichting = config.producttype
    ? DRAAIRICHTING_TYPES.includes(config.producttype)
    : false;

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
      case 5: return true; // ventilatie (optioneel)
      case 6: return Boolean(config.uitvoering);
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

  function addToProject(navigate: boolean) {
    addKozijnToProject(config, montageChecked);
    if (navigate) {
      router.push("/project");
    } else {
      // Nog een kozijn: configurator resetten naar een schone start.
      setConfig(emptyConfig);
      setMontageChecked(defaultCheckedIds(emptyConfig));
      setMontageTouched(false);
      setStep(0);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
          <Step title="Kies je materiaal" hint="Elk materiaal heeft eigen voordelen. Daarna kies je het profiel.">
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
                <p className="mb-2 text-sm font-medium text-ink">Profiel</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedMateriaal.profielen.map((p) => (
                    <ProfielCard
                      key={p.value}
                      active={config.profiel === p.value}
                      onClick={() => update({ profiel: p.value })}
                      profiel={p}
                    />
                  ))}
                </div>
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
          <Step title="Afmetingen & aantal" hint="Een globale maat is genoeg. De exacte maten nemen we op als we bij je thuis inmeten.">
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

            {showDraairichting && (
              <fieldset className="mt-7">
                <legend className="mb-3 text-sm font-medium text-ink">
                  Draairichting <span className="font-normal text-ink/45">(van buitenaf gezien)</span>
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CONFIG_DRAAIRICHTING.map((d) => (
                    <SelectCard
                      key={d.value}
                      active={config.draairichting === d.value}
                      onClick={() => update({ draairichting: d.value })}
                      title={d.label}
                      description={d.description}
                    />
                  ))}
                </div>
              </fieldset>
            )}
          </Step>
        )}

        {/* ── Step 4: Glas ── */}
        {step === 3 && (
          <Step title="Type beglazing" hint="Twijfel je? Bij je voorstel bespreken we welk glas bij je woning past.">
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
          <Step title="Kleur & opties" hint="De tekening past zich direct aan, zo zie je je kleur meteen.">
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
              <legend className="mb-3 text-sm font-medium text-ink">Hang- en sluitwerk</legend>
              <div className="flex flex-wrap gap-2.5">
                {CONFIG_HANGSLUIT.map((hs) => {
                  const active = config.hangSluit === hs.value;
                  return (
                    <button
                      key={hs.value}
                      type="button"
                      onClick={() => update({ hangSluit: hs.value })}
                      aria-pressed={active}
                      title={hs.description}
                      className={cn(
                        "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-xs font-medium transition-colors",
                        active ? "border-forest bg-forest/5 text-ink" : "border-mist text-ink/70 hover:bg-paper-soft",
                      )}
                    >
                      <span
                        className="size-6 rounded-full border border-black/10"
                        style={{ backgroundColor: hs.value === "zwart" ? "#1c1c1c" : "#cfd2d4" }}
                        aria-hidden
                      />
                      {hs.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-medium text-ink">Extra&apos;s (per kozijn)</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {CONFIG_OPTIES.filter((o) => o.value !== VENTILATIE_OPTIE).map((o) => {
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

        {/* ── Step 6: Ventilatie ── */}
        {step === 5 && (
          <Step title="Ventilatierooster" hint="Optioneel, voor frisse lucht in huis. Je kiest zelf de positie en de kleur.">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-mist p-4 transition-colors hover:bg-paper-soft">
              <input
                type="checkbox"
                checked={ventilatieAan}
                onChange={(e) => setVentilatie(e.target.checked)}
                className="mt-0.5 size-4 accent-forest"
              />
              <span>
                <span className="block text-sm font-medium text-ink">Ventilatierooster toevoegen</span>
                <span className="mt-0.5 block text-xs text-ink/55">Aanbevolen bij goed isolerende kozijnen.</span>
              </span>
            </label>

            {ventilatieAan && (
              <>
                <fieldset className="mt-6">
                  <legend className="mb-3 text-sm font-medium text-ink">In welk glasvlak / positie?</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CONFIG_VENTILATIE_POSITIE.map((p) => (
                      <SelectCard
                        key={p.value}
                        active={config.ventilatiePositie === p.value}
                        onClick={() => update({ ventilatiePositie: p.value })}
                        title={p.label}
                      />
                    ))}
                  </div>
                </fieldset>
                <fieldset className="mt-6">
                  <legend className="mb-3 text-sm font-medium text-ink">Kleur rooster</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {CONFIG_KLEUREN.map((k) => {
                      const active = config.ventilatieKleur === k.value;
                      return (
                        <button
                          key={k.value}
                          type="button"
                          onClick={() => update({ ventilatieKleur: k.value })}
                          aria-pressed={active}
                          title={k.label}
                          className={cn(
                            "flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-xs font-medium transition-colors",
                            active ? "border-forest bg-forest/5 text-ink" : "border-mist text-ink/70 hover:bg-paper-soft",
                          )}
                        >
                          <span className="size-6 rounded-full border border-black/10" style={{ backgroundColor: k.hex }} aria-hidden />
                          {k.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </>
            )}
          </Step>
        )}

        {/* ── Step 7: Uitvoering ── */}
        {step === 6 && (
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

        {/* ── Step 8: Montage ── */}
        {step === 7 && (
          <Step
            title="Montage & werkzaamheden"
            hint="De werkzaamheden die meestal nodig zijn, staan al aangevinkt. Vink aan of uit; aantallen en prijs rekenen we automatisch uit. Alle bedragen zijn inclusief btw."
          >
            {config.uitvoering === "levering" ? (
              <Callout variant="info" title="Je plaatst zelf (alleen levering)">
                <p>
                  Je hebt gekozen voor levering zonder montage, dus er zijn geen
                  montagekosten. Wil je toch montage? Ga terug naar de stap
                  &lsquo;Uitvoering&rsquo;.
                </p>
              </Callout>
            ) : (
              <>
                <MontageEditor config={config} checkedIds={montageChecked} onToggle={toggleMontage} />
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

        {/* ── Step 9: Resultaat / projectoverzicht ── */}
        {step === 8 && (
          <Step title="Je projectoverzicht">
            <div className="rounded-card border border-forest/20 bg-forest/5 p-6 text-center">
              {SHOW_PRODUCT_PRICES ? (
                <>
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
                </>
              ) : (
                <>
                  <p className="text-sm text-ink/60">Kozijnprijs</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-ink">
                    {PRICE_ON_REQUEST}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">
                    Je kozijnprijs stellen we op maat vast na je aanvraag. De
                    montagekosten zie je hierboven al wel, per werkzaamheid.
                  </p>
                </>
              )}
            </div>

            {totals.isde.eligible && (
              <Callout variant="info" className="mt-4" title="Subsidie (ISDE)">
                <p>
                  {totals.isde.subsidie > 0 && (
                    <>
                      Indicatieve ISDE-subsidie: <strong>{formatEuro(totals.isde.subsidie)}</strong>{" "}
                      (± {totals.isde.glasM2.toFixed(1)} m², bijgewerkt {isdeBerekening.lastUpdated}).{" "}
                    </>
                  )}
                  Met HR++- of triple glas kom je mogelijk in aanmerking voor de ISDE. Of dat zo is,
                  hangt af van je woning, het glasoppervlak en de uitvoering. Lees{" "}
                  <Link href="/subsidie" className="font-semibold underline underline-offset-2">
                    waar je op let bij subsidie
                  </Link>
                  .
                </p>
              </Callout>
            )}

            <Callout variant="disclaimer" className="mt-4">
              <p>
                {SHOW_PRODUCT_PRICES ? (
                  <>
                    Dit is een <strong>richtprijs</strong> op basis van je keuzes en
                    niet bindend. De definitieve prijs staat in je voorstel, nadat we
                    bij je thuis hebben ingemeten.
                  </>
                ) : (
                  <>
                    De getoonde montagekosten zijn <strong>indicatief</strong> en niet
                    bindend. De definitieve prijs, ook van de kozijnen, staat in je
                    voorstel, nadat we bij je thuis hebben ingemeten.
                  </>
                )}
              </p>
            </Callout>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => addToProject(true)} className="flex-1 justify-center">
                Voeg toe en bekijk je project →
              </Button>
              <Button variant="secondary" onClick={() => addToProject(false)} className="justify-center">
                + Nog een kozijn
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
  const extras = config.opties.filter((o) => o !== "ventilatie");
  const ventilatieAan = config.opties.includes("ventilatie");

  const rows: Array<[string, string]> = [
    ["Materiaal", materiaal?.label ?? "—"],
    ["Profiel", profiel?.label ?? "—"],
    ["Type", CONFIG_PRODUCTTYPES.find((p) => p.value === config.producttype)?.label ?? "—"],
    ["Afmeting", `${config.breedteCm} × ${config.hoogteCm} cm`],
    ["Aantal", String(config.aantal)],
    ["Glas", CONFIG_GLAS.find((g) => g.value === config.glas)?.label ?? "—"],
    ["Kleur", kleur?.label ?? "—"],
    ...(config.draairichting ? [["Draairichting", CONFIG_DRAAIRICHTING.find((d) => d.value === config.draairichting)?.label ?? "—"] as [string, string]] : []),
    ...(config.hangSluit ? [["Hang- en sluitwerk", CONFIG_HANGSLUIT.find((h) => h.value === config.hangSluit)?.label ?? "—"] as [string, string]] : []),
    ["Ventilatie", ventilatieAan ? `Ja${config.ventilatiePositie ? ` (${CONFIG_VENTILATIE_POSITIE.find((p) => p.value === config.ventilatiePositie)?.label})` : ""}` : "Nee"],
    ["Extra's", extras.length ? extras.map((o) => CONFIG_OPTIES.find((x) => x.value === o)?.label).join(", ") : "—"],
    ["Uitvoering", CONFIG_UITVOERING.find((u) => u.value === config.uitvoering)?.label ?? "—"],
  ];

  return (
    <aside className="order-1 rounded-card border border-mist bg-paper-soft p-6 lg:order-2 lg:sticky lg:top-32">
      {/* Live tekening (buitenaanzicht) */}
      <div className="mb-5 rounded-xl border border-mist bg-paper p-4">
        <KozijnPreview config={config} />
        <p className="mt-2 text-center text-xs uppercase tracking-widest text-ink/40">
          Buitenaanzicht
        </p>
        {profiel?.specs && (
          <dl className="mt-3 space-y-1 border-t border-mist pt-3 text-xs">
            {profiel.afbeelding && (
              <div className="mb-2 flex items-center gap-2">
                <span className="relative block size-10 shrink-0 overflow-hidden border border-mist bg-paper">
                  <Image src={profiel.afbeelding} alt={`Profiel ${profiel.label}`} fill sizes="40px" className="object-contain p-0.5" />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-ink/55">{profiel.label}</span>
              </div>
            )}
            <SpecRow label="Zichtbreedte" value={`${profiel.specs.kozijnMm[0]} mm`} />
            <SpecRow label="Inbouwdiepte" value={`${profiel.specs.inbouwdiepteMm} mm`} />
            {profiel.specs.raamMm && (
              <SpecRow label="Raamprofiel" value={`${profiel.specs.raamMm[0]} × ${profiel.specs.raamMm[1]} mm`} />
            )}
            {typeof profiel.specs.aanslagMm === "number" && (
              <SpecRow label="Aanslag" value={`${profiel.specs.aanslagMm} mm`} />
            )}
          </dl>
        )}
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-wood">
        Je samenstelling
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
            {SHOW_PRODUCT_PRICES
              ? "Kies materiaal, type en glas voor een live prijsoverzicht."
              : "Kies materiaal, type en glas voor een overzicht van je samenstelling en de montagekosten."}
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

function ProfielCard({
  active,
  onClick,
  profiel,
}: {
  active: boolean;
  onClick: () => void;
  profiel: Profiel;
}) {
  const specs = profiel.specs;
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
      {profiel.afbeelding && (
        <span className="relative mb-2 block h-24 w-full overflow-hidden border border-mist bg-paper">
          <Image
            src={profiel.afbeelding}
            alt={`Profiel ${profiel.label}`}
            fill
            sizes="200px"
            className="object-contain p-2"
          />
        </span>
      )}
      <span className="flex w-full items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink">{profiel.label}</span>
        {active && (
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/20">
            <CheckIcon className="size-3 text-forest" />
          </span>
        )}
      </span>
      {profiel.omschrijving && (
        <span className="text-xs leading-relaxed text-ink/55">{profiel.omschrijving}</span>
      )}
      {specs && (
        <span className="mt-1.5 flex flex-wrap gap-1.5">
          <SpecChip>{specs.kozijnMm[0]} mm zicht</SpecChip>
          <SpecChip>{specs.inbouwdiepteMm} mm diep</SpecChip>
          {typeof specs.aanslagMm === "number" && <SpecChip>{specs.aanslagMm} mm aanslag</SpecChip>}
        </span>
      )}
    </button>
  );
}

function SpecChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-mist/70 px-1.5 py-0.5 text-[11px] font-medium text-ink/65">
      {children}
    </span>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink/50">{label}</dt>
      <dd className="font-medium text-ink/80">{value}</dd>
    </div>
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
