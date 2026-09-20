"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CONSENT_KEY,
  GA_ID,
  readConsent,
  trackEvent,
  writeConsent,
  type ConsentValue,
} from "@/lib/analytics";

/**
 * Cookiebanner + Google Analytics 4 (Consent Mode v2).
 *
 * GA laadt pas ná toestemming. Zonder `NEXT_PUBLIC_GA_ID` verschijnt er geen
 * banner en wordt er niets geladen — de site draait dan zonder tracking.
 *
 * Meet daarnaast de conversies uit het SEO-plan: klikken op telefoon, WhatsApp
 * en e-mail. Formulierverzendingen melden zichzelf via `trackEvent`.
 */
export function Analytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);
  }, []);

  // Klikken op contactlinks tellen als conversie (alleen met toestemming).
  useEffect(() => {
    if (consent !== "granted") return;
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;
      if (href.startsWith("tel:")) trackEvent("contact_telefoon", { link_url: href });
      else if (href.startsWith("mailto:")) trackEvent("contact_email", { link_url: href });
      else if (href.includes("wa.me") || href.includes("whatsapp.com"))
        trackEvent("contact_whatsapp", { link_url: href });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [consent]);

  const choose = useCallback((value: ConsentValue) => {
    writeConsent(value);
    setConsent(value);
    window.gtag?.("consent", "update", {
      analytics_storage: value,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookievoorkeuren"
          className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-mist bg-paper p-5 shadow-soft sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <p className="flex-1 text-sm leading-relaxed text-ink/70">
              We gebruiken analytische cookies om te zien welke pagina&rsquo;s
              bezoekers helpen. Alleen met uw toestemming.{" "}
              <Link
                href="/cookiebeleid"
                className="font-medium text-forest underline underline-offset-2"
              >
                Cookiebeleid
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => choose("denied")}
                data-consent-key={CONSENT_KEY}
              >
                Alleen noodzakelijk
              </Button>
              <Button size="sm" onClick={() => choose("granted")}>
                Accepteren
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
