"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/icons";
import { submitVoorstel } from "@/app/offerte/actions";
import {
  AANTAL_OPTIONS,
  BEVESTIGING_KEY,
  CONTACTVOORKEUR_OPTIONS,
  FOTO_LIMIETEN,
  MATERIAAL_OPTIONS,
  PERIODE_OPTIONS,
  SITUATIE_OPTIONS,
  WAT_OPTIONS,
  contactSchema,
  situatieSchema,
  summarize,
  wensSchema,
} from "@/lib/offerte-schema";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";


const STEPS = ["Je wens", "Je situatie", "Contact"] as const;

type Foto = { id: string; file: File; url: string };

type FormState = {
  wat: string[];
  situatie: string;
  materiaal: string;
  locatie: string;
  aantal: string;
  toelichting: string;
  naam: string;
  email: string;
  telefoon: string;
  contactvoorkeur: string;
  periode: string;
  privacyAkkoord: boolean;
  website: string;
};

type Errors = Partial<Record<keyof FormState | "fotos", string>>;

const initial: FormState = {
  wat: [],
  situatie: "",
  materiaal: "",
  locatie: "",
  aantal: "",
  toelichting: "",
  naam: "",
  email: "",
  telefoon: "",
  contactvoorkeur: "geen",
  periode: "",
  privacyAkkoord: false,
  website: "",
};

const inputClass =
  "w-full rounded-xl border border-mist bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-forest focus:ring-2 focus:ring-forest/15 aria-[invalid=true]:border-red-500 sm:text-sm";

/** Resize + re-encode a photo in the browser so uploads stay small. */
async function compress(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const max = 1600;
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.8));
  if (!blob) throw new Error("encode failed");
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
}

function issuesToErrors(issues: { path: PropertyKey[]; message: string }[]): Errors {
  const out: Errors = {};
  for (const issue of issues) {
    const key = String(issue.path[issue.path.length - 1] ?? "") as keyof Errors;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export function VoorstelForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initial);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => () => fotos.forEach((f) => URL.revokeObjectURL(f.url)), [fotos]);

  function markStarted() {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "offerte" });
    }
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    markStarted();
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(s: number): boolean {
    const schema = s === 0 ? wensSchema : s === 1 ? situatieSchema : contactSchema;
    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return true;
    }
    setErrors(issuesToErrors(result.error.issues));
    return false;
  }

  function next() {
    if (validate(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function addFotos(list: FileList | null) {
    if (!list || list.length === 0) return;
    markStarted();
    setErrors((e) => ({ ...e, fotos: undefined }));
    const room = FOTO_LIMIETEN.maxAantal - fotos.length;
    if (room <= 0) {
      setErrors((e) => ({ ...e, fotos: `Je kunt maximaal ${FOTO_LIMIETEN.maxAantal} foto's meesturen.` }));
      return;
    }
    setProcessing(true);
    const added: Foto[] = [];
    let failed = 0;
    for (const file of Array.from(list).slice(0, room)) {
      try {
        const small = await compress(file);
        if (small.size > FOTO_LIMIETEN.maxBytesPerFoto) throw new Error("too big");
        added.push({ id: crypto.randomUUID(), file: small, url: URL.createObjectURL(small) });
      } catch {
        failed += 1;
      }
    }
    setProcessing(false);
    const total = [...fotos, ...added].reduce((n, f) => n + f.file.size, 0);
    if (total > FOTO_LIMIETEN.maxBytesTotaal) {
      added.forEach((f) => URL.revokeObjectURL(f.url));
      setErrors((e) => ({ ...e, fotos: "Deze foto's zijn samen te groot. Kies er minder." }));
      return;
    }
    setFotos((prev) => [...prev, ...added]);
    if (failed > 0 || list.length > room) {
      setErrors((e) => ({
        ...e,
        fotos:
          failed > 0
            ? "Niet elke foto kon worden verwerkt. Probeer een JPG of PNG."
            : `Er zijn ${room} foto's toegevoegd; meer kan niet.`,
      }));
    }
  }

  function removeFoto(id: string) {
    setFotos((prev) => {
      const f = prev.find((p) => p.id === id);
      if (f) URL.revokeObjectURL(f.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function handleSubmit() {
    if (!validate(2)) return;
    setSubmitting(true);
    setSubmitError(null);
    const payload = {
      wat: data.wat,
      situatie: data.situatie,
      materiaal: data.materiaal,
      locatie: data.locatie,
      aantal: data.aantal,
      toelichting: data.toelichting,
      contact: {
        naam: data.naam,
        email: data.email,
        telefoon: data.telefoon,
        contactvoorkeur: data.contactvoorkeur,
        periode: data.periode,
        privacyAkkoord: data.privacyAkkoord,
        website: data.website,
      },
    };
    const fd = new FormData();
    fd.set("data", JSON.stringify(payload));
    fotos.forEach((f) => fd.append("fotos", f.file, f.file.name));
    try {
      const result = await submitVoorstel(fd);
      if (!result.ok) {
        setSubmitError(result.error);
        return;
      }
      try {
        sessionStorage.setItem(
          BEVESTIGING_KEY,
          JSON.stringify({
            regels: summarize({
              wat: data.wat,
              situatie: data.situatie,
              materiaal: data.materiaal,
              locatie: data.locatie,
              aantal: data.aantal,
            }),
            fotos: fotos.length,
            contactvoorkeur: data.contactvoorkeur,
          }),
        );
      } catch {
        // Storage unavailable — /bedankt shows a generic confirmation.
      }
      track("generate_lead", { form: "offerte", wens: data.wat.join(",") });
      router.push("/bedankt");
    } catch {
      setSubmitError("Versturen is niet gelukt. Controleer je verbinding en probeer het opnieuw.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-card border border-mist bg-paper p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-wood">
            Stap {step + 1} van {STEPS.length}
          </p>
          <p className="text-xs text-ink/55">{STEPS[step]}</p>
        </div>
        <div className="mt-2.5 flex gap-1.5" aria-hidden>
          {STEPS.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-lime" : "bg-mist")} />
          ))}
        </div>
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) next();
          else void handleSubmit();
        }}
      >
        {step === 0 && (
          <div>
            <StepHeading ref={headingRef} title="Waar gaat je vraag over?" hint="Twijfel je nog? Kies 'weet ik nog niet', dan denken we mee." />
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-ink">Waarover (meerdere mogelijk)</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {WAT_OPTIONS.map((opt) => {
                  const checked = data.wat.includes(opt.value);
                  return (
                    <ChoiceCard
                      key={opt.value}
                      type="checkbox"
                      name="wat"
                      checked={checked}
                      label={opt.label}
                      onChange={() =>
                        set("wat", checked ? data.wat.filter((v) => v !== opt.value) : [...data.wat, opt.value])
                      }
                    />
                  );
                })}
              </div>
              <FieldError id="err-wat" message={errors.wat} />
            </fieldset>
            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-medium text-ink">Wat is je situatie?</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {SITUATIE_OPTIONS.map((opt) => (
                  <ChoiceCard
                    key={opt.value}
                    type="radio"
                    name="situatie"
                    checked={data.situatie === opt.value}
                    label={opt.label}
                    onChange={() => set("situatie", opt.value)}
                  />
                ))}
              </div>
              <FieldError id="err-situatie" message={errors.situatie} />
            </fieldset>
            <fieldset className="mt-7">
              <legend className="mb-3 text-sm font-medium text-ink">Welk materiaal heb je in gedachten?</legend>
              <div className="grid gap-3 sm:grid-cols-4">
                {MATERIAAL_OPTIONS.map((opt) => (
                  <ChoiceCard
                    key={opt.value}
                    type="radio"
                    name="materiaal"
                    checked={data.materiaal === opt.value}
                    label={opt.label}
                    onChange={() => set("materiaal", opt.value)}
                  />
                ))}
              </div>
              <FieldError id="err-materiaal" message={errors.materiaal} />
            </fieldset>
          </div>
        )}

        {step === 1 && (
          <div>
            <StepHeading
              ref={headingRef}
              title="Vertel iets over je woning"
              hint="Foto's en maten zijn niet verplicht, maar helpen ons om gericht te reageren."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Woonplaats of postcode" htmlFor="locatie" error={errors.locatie}>
                <input
                  id="locatie"
                  className={inputClass}
                  value={data.locatie}
                  onChange={(e) => set("locatie", e.target.value)}
                  autoComplete="postal-code"
                  placeholder="Enschede of 7511 AB"
                  aria-invalid={!!errors.locatie}
                  aria-describedby={errors.locatie ? "err-locatie" : undefined}
                />
              </Field>
              <Field label="Hoeveel kozijnen of deuren, ongeveer?" htmlFor="aantal" error={errors.aantal}>
                <select
                  id="aantal"
                  className={inputClass}
                  value={data.aantal}
                  onChange={(e) => set("aantal", e.target.value)}
                  aria-invalid={!!errors.aantal}
                  aria-describedby={errors.aantal ? "err-aantal" : undefined}
                >
                  <option value="">Kies een aantal</option>
                  {AANTAL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-ink" id="fotos-label">
                Foto&apos;s (optioneel)
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/55">
                Bijvoorbeeld de gevel en de kozijnen van binnen. Maximaal {FOTO_LIMIETEN.maxAantal} foto&apos;s.
                We gebruiken ze alleen om je aanvraag te beoordelen; ze worden niet gepubliceerd.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {fotos.map((f) => (
                  <div key={f.id} className="relative size-24 overflow-hidden rounded-xl border border-mist">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local preview of a user file */}
                    <img src={f.url} alt="Gekozen foto" className="size-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFoto(f.id)}
                      aria-label="Foto verwijderen"
                      className="absolute right-1 top-1 grid size-7 place-items-center rounded-full bg-ink/80 text-paper hover:bg-ink"
                    >
                      <CloseIcon className="size-3.5" />
                    </button>
                  </div>
                ))}
                {fotos.length < FOTO_LIMIETEN.maxAantal && (
                  <label className="grid size-24 cursor-pointer place-items-center rounded-xl border border-dashed border-ink/25 text-center text-xs text-ink/60 hover:border-forest hover:text-forest focus-within:ring-2 focus-within:ring-forest/30">
                    <span>{processing ? "Bezig…" : "+ Foto toevoegen"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      aria-labelledby="fotos-label"
                      disabled={processing}
                      onChange={(e) => {
                        void addFotos(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                )}
              </div>
              <FieldError id="err-fotos" message={errors.fotos} />
            </div>

            <div className="mt-6">
              <Field label="Toelichting of globale maten (optioneel)" htmlFor="toelichting" error={errors.toelichting}>
                <textarea
                  id="toelichting"
                  rows={4}
                  className={inputClass}
                  value={data.toelichting}
                  onChange={(e) => set("toelichting", e.target.value)}
                  placeholder="Bijvoorbeeld: drie ramen aan de voorkant, ongeveer 120 bij 150 cm, en een achterdeur."
                />
              </Field>
              <p className="mt-1.5 text-xs text-ink/55">
                Globale maten zijn nog geen productiematen. Voordat er iets besteld wordt, meten we bij je thuis in.
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <StepHeading ref={headingRef} title="Hoe kunnen we je bereiken?" hint="Een e-mailadres of telefoonnummer is genoeg." />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Naam" htmlFor="naam" error={errors.naam} className="sm:col-span-2">
                <input
                  id="naam"
                  className={inputClass}
                  value={data.naam}
                  onChange={(e) => set("naam", e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.naam}
                  aria-describedby={errors.naam ? "err-naam" : undefined}
                />
              </Field>
              <Field label="E-mailadres" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  className={inputClass}
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
              </Field>
              <Field label="Telefoonnummer" htmlFor="telefoon" error={errors.telefoon}>
                <input
                  id="telefoon"
                  type="tel"
                  inputMode="tel"
                  className={inputClass}
                  value={data.telefoon}
                  onChange={(e) => set("telefoon", e.target.value)}
                  autoComplete="tel"
                  aria-invalid={!!errors.telefoon}
                  aria-describedby={errors.telefoon ? "err-telefoon" : undefined}
                />
              </Field>
              <Field label="Hoe wil je het liefst contact?" htmlFor="contactvoorkeur">
                <select
                  id="contactvoorkeur"
                  className={inputClass}
                  value={data.contactvoorkeur}
                  onChange={(e) => set("contactvoorkeur", e.target.value)}
                >
                  {CONTACTVOORKEUR_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Wanneer wil je het laten doen? (optioneel)" htmlFor="periode">
                <select
                  id="periode"
                  className={inputClass}
                  value={data.periode}
                  onChange={(e) => set("periode", e.target.value)}
                >
                  {PERIODE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Honeypot — hidden from people and assistive tech. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                tabIndex={-1}
                autoComplete="off"
                value={data.website}
                onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
              />
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3 text-sm text-ink/75">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-forest"
                  checked={data.privacyAkkoord}
                  onChange={(e) => set("privacyAkkoord", e.target.checked)}
                  aria-invalid={!!errors.privacyAkkoord}
                  aria-describedby={errors.privacyAkkoord ? "err-privacyAkkoord" : undefined}
                />
                <span>
                  Ik ga akkoord met de{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-forest">
                    privacyverklaring
                  </Link>
                  . We gebruiken je gegevens alleen om op je aanvraag te reageren.
                </span>
              </label>
              <FieldError id="err-privacyAkkoord" message={errors.privacyAkkoord} />
            </div>
          </div>
        )}

        {submitError && (
          <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-mist pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={cn(step === 0 && "invisible")}
          >
            ← Vorige
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="submit" disabled={processing}>
              Volgende →
            </Button>
          ) : (
            <Button type="submit" disabled={submitting || processing}>
              {submitting ? "Versturen…" : "Verstuur je aanvraag"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepHeading({
  ref,
  title,
  hint,
}: {
  ref: React.Ref<HTMLHeadingElement>;
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-6">
      <h2 ref={ref} tabIndex={-1} className="font-display text-xl font-semibold text-ink outline-none">
        {title}
      </h2>
      {hint && <p className="mt-1.5 text-sm text-ink/60">{hint}</p>}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      <FieldError id={`err-${htmlFor}`} message={error} />
    </div>
  );
}

function ChoiceCard({
  type,
  name,
  checked,
  label,
  onChange,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-medium text-ink transition-colors focus-within:ring-2 focus-within:ring-forest/25",
        checked ? "border-forest bg-forest/5" : "border-mist hover:bg-paper-soft",
      )}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="size-4 shrink-0 accent-forest" />
      {label}
    </label>
  );
}
