"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon, UsersIcon, WrenchIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Option = {
  href: string;
  title: string;
  description: string;
  meta: string;
  icon: typeof UsersIcon;
};

/** De twee routes naar een aanvraag — bewust maar twee keuzes. */
const options: Option[] = [
  {
    href: "/contact",
    title: "Direct contact",
    description:
      "Liever even overleggen? Bel of mail ons, of laat uw gegevens achter. We denken rustig met u mee.",
    meta: "Persoonlijk advies",
    icon: UsersIcon,
  },
  {
    href: "/configurator",
    title: "Snel zelf samenstellen",
    description:
      "Stel uw kozijn in een paar minuten zelf samen. U ziet de montagekosten meteen; uw kozijnprijs krijgt u op maat.",
    meta: "± 2 minuten",
    icon: WrenchIcon,
  },
];

/**
 * "Aanvragen"-knop met keuzedialoog (header, desktop én mobiel).
 * `renderTrigger` bepaalt hoe de knop eruitziet, zodat de header zijn eigen
 * knopstijl kan meegeven.
 */
export function AanvraagDialog({
  renderTrigger,
}: {
  renderTrigger: (props: {
    onClick: () => void;
    "aria-haspopup": "dialog";
    "aria-expanded": boolean;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {renderTrigger({
        onClick: () => setOpen(true),
        "aria-haspopup": "dialog",
        "aria-expanded": open,
      })}
      <AanvraagDialogPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/**
 * Alleen het dialoogvenster — voor situaties waarin de knop in een onderdeel
 * zit dat verdwijnt bij het openen (zoals het mobiele menu). De state hoort
 * dan thuis in de component die blijft staan.
 */
export function AanvraagDialogPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const setOpen = (next: boolean) => {
    if (!next) onClose();
  };
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Escape sluit; achtergrond scrollt niet mee; focus start op de eerste optie.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="aanvraag-dialog-titel"
            className="w-full max-w-2xl rounded-3xl border border-mist bg-paper p-6 shadow-soft sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/70">
                  <span aria-hidden className="size-2 rounded-full bg-lime" />
                  Aanvragen
                </p>
                <h2
                  id="aanvraag-dialog-titel"
                  className="mt-3 text-2xl text-ink sm:text-3xl"
                >
                  Hoe wilt u beginnen?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Sluiten"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-pill border border-ink/15 text-ink transition-colors hover:border-ink"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {options.map((option, i) => {
                const Icon = option.icon;
                return (
                  <Link
                    key={option.href}
                    href={option.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex flex-col rounded-2xl border border-mist bg-paper-soft p-6",
                      "transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-soft",
                    )}
                  >
                    <span className="grid size-12 place-items-center rounded-full bg-lime text-ink">
                      <Icon className="size-5" />
                    </span>
                    <span className="mt-5 font-display text-xl font-semibold text-ink">
                      {option.title}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">
                      {option.description}
                    </span>
                    <span className="mt-5 flex items-center justify-between text-sm font-semibold text-forest">
                      {option.meta}
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-ink/50">
              Beide routes zijn vrijblijvend. Liever meteen een volledige
              offerte?{" "}
              <Link
                href="/offerte-aanvragen"
                onClick={() => setOpen(false)}
                className="font-medium text-forest underline underline-offset-2"
              >
                Offerte aanvragen
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}
