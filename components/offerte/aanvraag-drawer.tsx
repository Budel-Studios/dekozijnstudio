"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { VoorstelForm } from "@/components/offerte/voorstel-form";
import { ContactLink } from "@/components/contact-link";
import { Button } from "@/components/ui/button";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { company } from "@/data/company";

/**
 * Aanvraagpaneel — slide-over from the right with the 3-step "Vraag een
 * voorstel" form, modelled on the quote drawer of mtbbouw.com.
 *
 * Every same-site link to /offerte opens this panel instead of navigating
 * (progressive enhancement: crawlers and no-JS visitors still follow the real
 * link). Opt out per link with `data-no-drawer`. On /offerte itself the inline
 * form is used. Leads go to the MTB Bouw mailbox (lib/mail-transport.ts).
 */

const DrawerContext = createContext<{ open: () => void } | null>(null);

export function useAanvraagDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useAanvraagDrawer must be used within AanvraagDrawerProvider");
  return ctx;
}

export function AanvraagDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // keep the form (and its input) after first open
  const [success, setSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const open = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setMounted(true);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (success) {
      setSuccess(false);
      setFormKey((k) => k + 1); // fresh form after a sent request
    }
    opener.current?.focus?.();
  }, [success]);

  // Intercept same-site links to /offerte (capture phase, before Next's Link handler).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.hasAttribute("data-no-drawer") || a.getAttribute("target") === "_blank") return;
      const url = new URL(a.getAttribute("href") ?? "", window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== "/offerte") return;
      if (window.location.pathname === "/offerte") return;
      e.preventDefault();
      opener.current = a as HTMLElement;
      setMounted(true);
      setIsOpen(true);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Close when the route changes (e.g. a link inside the panel).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (isOpen) setIsOpen(false);
  }

  // Escape, scroll lock and initial focus while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <DrawerContext.Provider value={{ open }}>
      {/* Page content is inert while the panel is open (no focus or clicks behind it). */}
      <div className="contents" inert={isOpen || undefined}>
        {children}
      </div>

      {mounted && (
        <div
          hidden={!isOpen}
          className="fixed inset-0 z-[60] flex animate-overlay-in justify-end bg-ink/40 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="aanvraag-titel"
            tabIndex={-1}
            className="flex h-full w-full max-w-lg animate-drawer-in flex-col bg-paper shadow-2xl outline-none"
          >
            {success ? (
              <div className="flex flex-1 animate-pop-in flex-col items-center justify-center px-8 text-center">
                <span className="mb-6 grid size-16 place-items-center rounded-full bg-lime/30 text-ink">
                  <CheckIcon className="size-8" />
                </span>
                <h2 id="aanvraag-titel" className="text-2xl font-bold text-ink">
                  Dankjewel voor je aanvraag
                </h2>
                <p className="mt-3 max-w-sm leading-relaxed text-ink/70">
                  We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken.
                </p>
                <p className="mt-6 font-semibold text-ink">Groet, De Kozijnstudio</p>
                <Button type="button" onClick={close} className="mt-8 w-full max-w-xs">
                  Sluiten
                </Button>
              </div>
            ) : (
              <>
                <div className="relative px-6 pb-5 pt-6">
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Sluiten"
                    className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-paper-soft hover:text-ink"
                  >
                    <CloseIcon className="size-6" />
                  </button>
                  <h2 id="aanvraag-titel" className="pr-10 text-2xl font-bold text-ink">
                    Vraag een voorstel
                  </h2>
                  <p className="mt-1 text-sm text-ink/60">In drie korte stappen, vrijblijvend</p>
                </div>
                <VoorstelForm
                  key={formKey}
                  variant="drawer"
                  onSuccess={() => setSuccess(true)}
                  footerExtra={<ContactChips />}
                />
              </>
            )}
          </div>
        </div>
      )}
    </DrawerContext.Provider>
  );
}

function ContactChips() {
  const chip = "inline-flex items-center gap-1.5 text-xs text-ink/65 hover:text-ink";
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2">
      <ContactLink kind="phone" location="drawer" className={chip}>
        Bel {company.telefoon}
      </ContactLink>
      <ContactLink kind="whatsapp" location="drawer" className={chip}>
        WhatsApp
      </ContactLink>
      <a href={`mailto:${company.email}`} className={chip}>
        {company.email}
      </a>
    </div>
  );
}

/** Explicit trigger, for places where a button (not a link) fits better. */
export function AanvraagButton({ children, className }: { children: ReactNode; className?: string }) {
  const { open } = useAanvraagDrawer();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
