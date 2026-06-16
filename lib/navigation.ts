/**
 * Site navigation — single source of truth for the full sitemap.
 * Consumed by SiteHeader and SiteFooter so the menu and footer stay in sync.
 * Routes that arrive in later fases (klantportaal, configurator) are not
 * linked yet and will be added when those modules exist.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  links: NavLink[];
};

export const productLinks: NavLink[] = [
  { label: "Alle producten", href: "/producten" },
  { label: "Ramen", href: "/producten/ramen" },
  { label: "Deuren", href: "/producten/deuren" },
  { label: "Schuifpuien", href: "/producten/schuifpuien" },
  { label: "Configurator", href: "/configurator" },
];

export const serviceLinks: NavLink[] = [
  { label: "Montage", href: "/montage" },
  { label: "Zelf plaatsen (DIY)", href: "/diy" },
  { label: "Bouwkundige aanpassingen", href: "/bouwkundige-aanpassingen" },
];

export const infoLinks: NavLink[] = [
  { label: "Configurator", href: "/configurator" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "ISDE-subsidie", href: "/isde-subsidie" },
  { label: "Projecten", href: "/projecten" },
  { label: "Kennisbank", href: "/kennisbank" },
  { label: "Veelgestelde vragen", href: "/faq" },
];

export const companyLinks: NavLink[] = [
  { label: "Over ons", href: "/over-ons" },
  { label: "MTB Bouw", href: "/mtb-bouw" },
  { label: "Aanbrengbonus", href: "/aanbrengbonus" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta: NavLink = {
  label: "Offerte aanvragen",
  href: "/offerte-aanvragen",
};

/** Grouped header dropdowns (desktop) and accordion (mobile). */
export const headerGroups: NavGroup[] = [
  { label: "Kozijnen", links: productLinks },
  { label: "Diensten", links: serviceLinks },
];

/** Direct (ungrouped) header links shown alongside the dropdowns. */
export const headerDirectLinks: NavLink[] = [
  { label: "Configurator", href: "/configurator" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "ISDE-subsidie", href: "/isde-subsidie" },
  { label: "Kennisbank", href: "/kennisbank" },
];

/** Footer columns — covers the complete sitemap. */
export const footerGroups: NavGroup[] = [
  { label: "Kozijnen", links: productLinks },
  { label: "Diensten", links: serviceLinks },
  { label: "Informatie", links: infoLinks },
  { label: "Bedrijf", links: companyLinks },
];
