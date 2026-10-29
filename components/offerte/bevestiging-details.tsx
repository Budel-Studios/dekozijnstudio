"use client";

import { useSyncExternalStore } from "react";
import { BEVESTIGING_KEY, CONTACTVOORKEUR_OPTIONS, labelFor } from "@/lib/offerte-schema";

type Bevestiging = { regels: Array<[string, string]>; fotos: number; contactvoorkeur: string };

function read(): string | null {
  try {
    return sessionStorage.getItem(BEVESTIGING_KEY);
  } catch {
    return null;
  }
}

/** Shows what the visitor just sent (stored in their own browser tab only). */
export function BevestigingDetails() {
  const raw = useSyncExternalStore(
    () => () => {},
    read,
    () => null,
  );
  if (!raw) return null;
  let b: Bevestiging;
  try {
    b = JSON.parse(raw) as Bevestiging;
  } catch {
    return null;
  }
  return (
    <div className="mt-8 rounded-card border border-mist bg-paper p-6">
      <p className="text-sm font-semibold text-ink">Dit heb je ons gestuurd</p>
      <dl className="mt-4 divide-y divide-mist text-sm">
        {b.regels.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-2">
            <dt className="text-ink/60">{label}</dt>
            <dd className="text-right font-medium text-ink">{value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 py-2">
          <dt className="text-ink/60">Foto&apos;s</dt>
          <dd className="text-right font-medium text-ink">{b.fotos > 0 ? b.fotos : "Geen"}</dd>
        </div>
        <div className="flex justify-between gap-4 py-2">
          <dt className="text-ink/60">Contactvoorkeur</dt>
          <dd className="text-right font-medium text-ink">{labelFor(CONTACTVOORKEUR_OPTIONS, b.contactvoorkeur)}</dd>
        </div>
      </dl>
    </div>
  );
}
