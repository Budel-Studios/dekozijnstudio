"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { submitOfferte } from "@/app/offerte-aanvragen/actions";
import { HANDOFF_KEY, type OfferteHandoff } from "@/lib/configurator-handoff";
import {
  offerteSchema,
  type OfferteData,
  MATERIAAL_OPTIONS,
  PRODUCTTYPE_OPTIONS,
  UITVOERING_OPTIONS,
  BOUWKUNDIG_OPTIONS,
  labelFor,
} from "@/lib/offerte-schema";

type FormState = Partial<Record<keyof OfferteData, unknown>>;
type Errors = Partial<Record<string, string>>;

const STEPS = ["Product", "Maat & aantal", "Uitvoering", "Bouwkundig", "Contact", "Samenvatting"];

// Per-step validation schemas (a slice of the full schema)
const stepSchemas = [
  offerteSchema.pick({ materiaal: true, producttypes: true }),
  offerteSchema.pick({ aantal: true, afmetingen: true }),
  offerteSchema.pick({ uitvoering: true }),
  offerteSchema.pick({ bouwkundig: true, bouwkundigToelichting: true }),
  offerteSchema.pick({ naam: true, email: true, telefoon: true, postcode: true, plaats: true, opmerkingen: true, website: true }),
  offerteSchema.pick({ privacyAkkoord: true }),
];

export function OfferteWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>({ producttypes: [] });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  // Pick up a configuration handed over from the configurator (fase 5).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(HANDOFF_KEY);
      if (!raw) return;
      const handoff = JSON.parse(raw) as OfferteHandoff;
      // sessionStorage is browser-only; reading it after mount avoids a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData((d) => ({
        ...d,
        ...(handoff.prefill.materiaal ? { materiaal: handoff.prefill.materiaal } : {}),
        ...(handoff.prefill.producttypes ? { producttypes: handoff.prefill.producttypes } : {}),
        ...(handoff.prefill.aantal ? { aantal: handoff.prefill.aantal } : {}),
        ...(handoff.prefill.uitvoering ? { uitvoering: handoff.prefill.uitvoering } : {}),
        configuratie: handoff.summary,
      }));
      setConfigLoaded(true);
      sessionStorage.removeItem(HANDOFF_KEY);
    } catch {
      // ignore malformed handoff
    }
  }, []);

  const set = (key: keyof OfferteData, value: unknown) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validateStep(): boolean {
    const result = (stepSchemas[step] as z.ZodType).safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Errors = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  }

  function next() {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function back() {
    setSubmitError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    const full = offerteSchema.safeParse(data);
    if (!full.success) {
      setSubmitError("Niet alle velden zijn correct ingevuld. Loop de stappen na.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitOfferte(full.data);
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
        <h2 className="font-display text-2xl font-semibold text-ink">
          Bedankt voor uw aanvraag!
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink/65">
          We hebben uw offerte-aanvraag ontvangen en nemen doorgaans binnen één
          werkdag contact met u op om de inmeetservice in te plannen.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/">Terug naar home</Button>
          <Button href="/kennisbank" variant="secondary">Lees onze kennisbank</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-mist bg-paper p-6 sm:p-8">
      {configLoaded && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-lime/40 bg-lime/8 px-4 py-3">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-lime/25">
            <CheckIcon className="size-3 text-forest" />
          </span>
          <p className="text-sm text-ink/75">
            Uw configuratie is geladen — materiaal, type en aantal zijn al
            ingevuld. We sturen de volledige samenstelling mee met uw aanvraag.
          </p>
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

      {/* Steps */}
      {step === 0 && (
        <StepProduct data={data} errors={errors} set={set} />
      )}
      {step === 1 && (
        <StepMaat data={data} errors={errors} set={set} />
      )}
      {step === 2 && (
        <StepUitvoering data={data} errors={errors} set={set} />
      )}
      {step === 3 && (
        <StepBouwkundig data={data} errors={errors} set={set} />
      )}
      {step === 4 && (
        <StepContact data={data} errors={errors} set={set} />
      )}
      {step === 5 && (
        <StepSamenvatting data={data} errors={errors} set={set} />
      )}

      {submitError && (
        <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-mist pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={back}
          className={cn(step === 0 && "invisible")}
        >
          ← Vorige
        </Button>
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next}>Volgende →</Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Versturen…" : "Aanvraag versturen"}
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Shared field helpers ─────────────────────────────────────────────────────

type StepProps = {
  data: FormState;
  errors: Errors;
  set: (key: keyof OfferteData, value: unknown) => void;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-600">{message}</p>;
}

function StepHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      {hint && <p className="mt-1.5 text-sm text-ink/55">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-mist bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/15";

function RadioCard({
  name,
  value,
  checked,
  label,
  description,
  onChange,
}: {
  name: string;
  value: string;
  checked: boolean;
  label: string;
  description?: string;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
        checked ? "border-forest bg-forest/5" : "border-mist hover:bg-paper-soft",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 accent-forest"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-ink/55">{description}</span>}
      </span>
    </label>
  );
}

// ─── Step 1 — Product ─────────────────────────────────────────────────────────

function StepProduct({ data, errors, set }: StepProps) {
  const selected = (data.producttypes as string[]) ?? [];
  const toggle = (value: string) => {
    set("producttypes", selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]);
  };

  return (
    <div>
      <StepHeading title="Welke kozijnen heeft u in gedachten?" hint="Weet u het nog niet zeker? Kies 'advies gewenst' — we denken graag mee." />

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Materiaal</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {MATERIAAL_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              name="materiaal"
              value={opt.value}
              checked={data.materiaal === opt.value}
              label={opt.label}
              onChange={() => set("materiaal", opt.value)}
            />
          ))}
        </div>
        <FieldError message={errors.materiaal} />
      </fieldset>

      <fieldset className="mt-7">
        <legend className="mb-3 text-sm font-medium text-ink">Producttype(s) — meerdere mogelijk</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRODUCTTYPE_OPTIONS.map((opt) => {
            const checked = selected.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                  checked ? "border-forest bg-forest/5" : "border-mist hover:bg-paper-soft",
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(opt.value)}
                  className="size-4 accent-forest"
                />
                <span className="text-sm font-medium text-ink">{opt.label}</span>
              </label>
            );
          })}
        </div>
        <FieldError message={errors.producttypes} />
      </fieldset>
    </div>
  );
}

// ─── Step 2 — Maat & aantal ──────────────────────────────────────────────────

function StepMaat({ data, errors, set }: StepProps) {
  return (
    <div>
      <StepHeading title="Om hoeveel kozijnen gaat het?" hint="Een globale indicatie is voldoende — exacte maten nemen we op tijdens de inmeetservice." />

      <div className="space-y-5">
        <div>
          <label htmlFor="aantal" className="mb-1.5 block text-sm font-medium text-ink">
            Aantal kozijnen
          </label>
          <input
            id="aantal"
            type="number"
            min={1}
            max={200}
            value={(data.aantal as number) ?? ""}
            onChange={(e) => set("aantal", e.target.value === "" ? undefined : Number(e.target.value))}
            className={cn(inputClass, "max-w-40")}
            aria-invalid={!!errors.aantal}
          />
          <FieldError message={errors.aantal} />
        </div>

        <div>
          <label htmlFor="afmetingen" className="mb-1.5 block text-sm font-medium text-ink">
            Globale afmetingen <span className="font-normal text-ink/45">(optioneel)</span>
          </label>
          <textarea
            id="afmetingen"
            rows={4}
            value={(data.afmetingen as string) ?? ""}
            onChange={(e) => set("afmetingen", e.target.value)}
            placeholder="Bijv. 2× woonkamerraam ca. 180×120 cm, 1× voordeur standaard…"
            className={inputClass}
          />
          <FieldError message={errors.afmetingen} />
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 — Uitvoering ──────────────────────────────────────────────────────

function StepUitvoering({ data, errors, set }: StepProps) {
  return (
    <div>
      <StepHeading title="Montage of alleen levering?" />
      <div className="space-y-3">
        {UITVOERING_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.value}
            name="uitvoering"
            value={opt.value}
            checked={data.uitvoering === opt.value}
            label={opt.label}
            description={opt.description}
            onChange={() => set("uitvoering", opt.value)}
          />
        ))}
      </div>
      <FieldError message={errors.uitvoering} />
    </div>
  );
}

// ─── Step 4 — Bouwkundig ──────────────────────────────────────────────────────

function StepBouwkundig({ data, errors, set }: StepProps) {
  return (
    <div>
      <StepHeading title="Zijn er bouwkundige aanpassingen nodig?" hint="Denk aan een opening vergroten, een nieuwe latei of metselwerk. Via MTB Bouw regelen we dit." />
      <div className="space-y-3">
        {BOUWKUNDIG_OPTIONS.map((opt) => (
          <RadioCard
            key={opt.value}
            name="bouwkundig"
            value={opt.value}
            checked={data.bouwkundig === opt.value}
            label={opt.label}
            description={opt.description}
            onChange={() => set("bouwkundig", opt.value)}
          />
        ))}
      </div>
      <FieldError message={errors.bouwkundig} />

      {(data.bouwkundig === "ja" || data.bouwkundig === "misschien") && (
        <div className="mt-5">
          <label htmlFor="bouwkundigToelichting" className="mb-1.5 block text-sm font-medium text-ink">
            Toelichting <span className="font-normal text-ink/45">(optioneel)</span>
          </label>
          <textarea
            id="bouwkundigToelichting"
            rows={3}
            value={(data.bouwkundigToelichting as string) ?? ""}
            onChange={(e) => set("bouwkundigToelichting", e.target.value)}
            placeholder="Beschrijf kort wat u wilt aanpassen…"
            className={inputClass}
          />
          <FieldError message={errors.bouwkundigToelichting} />
        </div>
      )}
    </div>
  );
}

// ─── Step 5 — Contact ─────────────────────────────────────────────────────────

function StepContact({ data, errors, set }: StepProps) {
  return (
    <div>
      <StepHeading title="Uw contactgegevens" hint="We gebruiken deze gegevens uitsluitend om uw offerte op te stellen en contact met u op te nemen." />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Naam" id="naam" error={errors.naam}>
          <input id="naam" type="text" autoComplete="name" value={(data.naam as string) ?? ""} onChange={(e) => set("naam", e.target.value)} className={inputClass} aria-invalid={!!errors.naam} />
        </Field>
        <Field label="E-mailadres" id="email" error={errors.email}>
          <input id="email" type="email" autoComplete="email" value={(data.email as string) ?? ""} onChange={(e) => set("email", e.target.value)} className={inputClass} aria-invalid={!!errors.email} />
        </Field>
        <Field label="Telefoonnummer" id="telefoon" error={errors.telefoon}>
          <input id="telefoon" type="tel" autoComplete="tel" value={(data.telefoon as string) ?? ""} onChange={(e) => set("telefoon", e.target.value)} className={inputClass} aria-invalid={!!errors.telefoon} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Postcode" id="postcode" error={errors.postcode}>
            <input id="postcode" type="text" autoComplete="postal-code" value={(data.postcode as string) ?? ""} onChange={(e) => set("postcode", e.target.value)} className={inputClass} aria-invalid={!!errors.postcode} placeholder="7500 AA" />
          </Field>
          <Field label="Plaats" id="plaats" error={errors.plaats}>
            <input id="plaats" type="text" autoComplete="address-level2" value={(data.plaats as string) ?? ""} onChange={(e) => set("plaats", e.target.value)} className={inputClass} aria-invalid={!!errors.plaats} />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <Field label="Opmerkingen (optioneel)" id="opmerkingen" error={errors.opmerkingen}>
          <textarea id="opmerkingen" rows={4} value={(data.opmerkingen as string) ?? ""} onChange={(e) => set("opmerkingen", e.target.value)} className={inputClass} placeholder="Vragen of bijzonderheden die we moeten weten?" />
        </Field>
      </div>

      {/* Honeypot — visually hidden, ignored by humans */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" >
        <label>
          Laat dit veld leeg
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={(data.website as string) ?? ""}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      {children}
      <FieldError message={error} />
    </div>
  );
}

// ─── Step 6 — Samenvatting ────────────────────────────────────────────────────

function StepSamenvatting({ data, errors, set }: StepProps) {
  const producttypes = ((data.producttypes as string[]) ?? [])
    .map((t) => labelFor(PRODUCTTYPE_OPTIONS, t))
    .join(", ") || "—";

  const rows: Array<[string, string]> = [
    ["Materiaal", data.materiaal ? labelFor(MATERIAAL_OPTIONS, data.materiaal as string) : "—"],
    ["Producttype(s)", producttypes],
    ["Aantal kozijnen", data.aantal ? String(data.aantal) : "—"],
    ["Globale afmetingen", (data.afmetingen as string)?.trim() || "—"],
    ["Uitvoering", data.uitvoering ? labelFor(UITVOERING_OPTIONS, data.uitvoering as string) : "—"],
    ["Bouwkundig werk", data.bouwkundig ? labelFor(BOUWKUNDIG_OPTIONS, data.bouwkundig as string) : "—"],
    ["Naam", (data.naam as string) || "—"],
    ["E-mail", (data.email as string) || "—"],
    ["Telefoon", (data.telefoon as string) || "—"],
    ["Adres", [(data.postcode as string), (data.plaats as string)].filter(Boolean).join(" ") || "—"],
  ];

  return (
    <div>
      <StepHeading title="Controleer uw aanvraag" hint="Klopt alles? Ga akkoord met de privacyverklaring en verstuur." />

      <dl className="divide-y divide-mist rounded-xl border border-mist">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 px-4 py-3 text-sm">
            <dt className="w-40 shrink-0 font-medium text-ink/60">{label}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {typeof data.configuratie === "string" && data.configuratie.trim() !== "" && (
        <div className="mt-4 rounded-xl border border-mist bg-paper-soft p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-wood">
            Meegestuurde configuratie
          </p>
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-ink/70">
            {data.configuratie}
          </pre>
        </div>
      )}

      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={data.privacyAkkoord === true}
          onChange={(e) => set("privacyAkkoord", e.target.checked)}
          className="mt-0.5 size-4 accent-forest"
          aria-invalid={!!errors.privacyAkkoord}
        />
        <span className="text-sm leading-relaxed text-ink/70">
          Ik ga akkoord dat mijn gegevens worden gebruikt om mijn offerte op te
          stellen en contact met mij op te nemen, zoals beschreven in de{" "}
          <a href="/privacy" className="font-medium text-forest underline underline-offset-2">privacyverklaring</a>.
        </span>
      </label>
      <FieldError message={errors.privacyAkkoord} />
    </div>
  );
}
