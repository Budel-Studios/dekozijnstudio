/**
 * Site navigation — single source of truth for header and footer.
 * Structure follows SEO-strategie 2026-10 (privé projectdocument) (h6): a small menu
 * plus one primary action. Since 1-11-2026 the site focuses on "kozijnen
 * vervangen in Enschede": that group comes first and its first link is the
 * homepage (the landing page for that query). Menu: Kozijnen vervangen ·
 * Materialen · Kosten · Over ons. Kennis and werkgebied are in the footer.
 * Routes of modules that are switched off (lib/site.ts MODULES) and pages
 * without real content (projecten) are not linked.
 */

import { MODULES } from "@/lib/site";
import { REGIO_PAGINAS, regioPad } from "@/data/regio";

export type NavLink = {
  label: string;
  href: string;
  /** Short helper line, shown in header dropdowns. */
  description?: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
  /** Intro column of the header mega menu (same structure as mtbbouw.com). */
  intro?: { title: string; text: string; href: string; button: string };
};

const configuratorLinks: NavLink[] = MODULES.configurator
  ? [
      { label: "Producten bekijken", href: "/producten", description: "Ramen, deuren en schuifpuien" },
      { label: "Configurator", href: "/configurator", description: "Stel je kozijn zelf samen" },
    ]
  : [];

export const kozijnenLinks: NavLink[] = [
  { label: "Kunststof kozijnen", href: "/kunststof-kozijnen", description: "Uitstraling, glas en onderhoud" },
  { label: "Houten kozijnen", href: "/houten-kozijnen", description: "Warm en op maat geprofileerd" },
  { label: "Aluminium kozijnen", href: "/aluminium-kozijnen", description: "Slanke profielen, veel glas" },
  { label: "Materialen vergelijken", href: "/kozijnen", description: "Hout, kunststof en aluminium naast elkaar" },
  ...configuratorLinks,
];

export const werkLinks: NavLink[] = [
  { label: "Kozijnen vervangen in Enschede", href: "/", description: "Wanneer, hoe en wat het kost" },
  { label: "Montage", href: "/montage", description: "Wat bij het monteren hoort" },
  { label: "Werkwijze", href: "/werkwijze", description: "Van eerste vraag tot oplevering" },
  { label: "Bouwkundige aanpassingen", href: "/bouwkundige-aanpassingen", description: "Opening vergroten, latei, metselwerk" },
  { label: "Subsidie", href: "/subsidie", description: "Isolatieglas en de ISDE" },
];

/** Header: dropdown groups and direct links, in menu order. */
export const headerGroups: NavGroup[] = [
  {
    label: "Kozijnen vervangen",
    links: werkLinks,
    intro: {
      title: "Kozijnen vervangen in Enschede",
      text: "Van inmeten tot oplevering: wat er in je woning gebeurt en welke keuzes je maakt.",
      href: "/#zo-gaat-het",
      button: "Zo gaat het",
    },
  },
  {
    label: "Materialen",
    links: kozijnenLinks,
    intro: {
      title: "Kozijnen in hout, kunststof en aluminium",
      text: "Vergelijk de materialen en bekijk wat bij je woning past.",
      href: "/kozijnen",
      button: "Materialen vergelijken",
    },
  },
];

export const headerDirectLinks: NavLink[] = [
  { label: "Kosten", href: "/kosten" },
  { label: "Over ons", href: "/over-ons" },
];

/** The one primary action, used site-wide. */
export const primaryCta: NavLink = {
  label: "Vraag een voorstel",
  href: "/offerte",
};

export const infoLinks: NavLink[] = [
  { label: "Kosten", href: "/kosten" },
  { label: "Kennis", href: "/kennis" },
  { label: "Veelgestelde vragen", href: "/faq" },
  { label: "Werkgebied", href: "/werkgebied" },
];

export const companyLinks: NavLink[] = [
  { label: "Over ons", href: "/over-ons" },
  { label: "MTB Bouw", href: "/mtb-bouw" },
  ...(MODULES.aanbrengbonus ? [{ label: "Aanbrengbonus", href: "/aanbrengbonus" }] : []),
  { label: "Contact", href: "/contact" },
];

/**
 * Werkgebied: Enschede (served by the homepage), the hub and the place pages
 * (only when the module is on).
 */
export const werkgebiedLinks: NavLink[] = [
  { label: "Enschede", href: "/" },
  { label: "Twente", href: "/werkgebied" },
  ...(MODULES.plaatspaginas
    ? REGIO_PAGINAS.filter((r) => r.soort === "plaats").map((r) => ({
        label: r.naam,
        href: regioPad(r),
      }))
    : []),
];

export const legalLinks: NavLink[] = [
  { label: "Privacyverklaring", href: "/privacy" },
  { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
  { label: "Cookiebeleid", href: "/cookiebeleid" },
  ...(MODULES.aanbrengbonus
    ? [{ label: "Voorwaarden aanbrengbonus", href: "/aanbrengbonus-voorwaarden" }]
    : []),
];

export const footerGroups: NavGroup[] = [
  { label: "Kozijnen vervangen", links: werkLinks },
  { label: "Materialen", links: kozijnenLinks },
  { label: "Informatie", links: infoLinks },
  { label: "Bedrijf", links: companyLinks },
];
