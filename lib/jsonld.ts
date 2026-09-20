/**
 * JSON-LD schema helpers.
 * Returns plain objects — serialize with JSON.stringify in <script> tags.
 * Schemas: Organization/LocalBusiness (site-wide), FAQPage (FAQ/product pages),
 * BreadcrumbList (all inner pages).
 */

import { SITE_URL } from "@/lib/site";
import { company } from "@/data/company";

// ─── Organization / LocalBusiness ────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "De Kozijnstudio",
    description:
      "Transparante kozijnleverancier voor kunststof, houten en aluminium kozijnen. Onderdeel van MTB Bouw. Werkgebied: Twente & Oost-Nederland.",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`, // placeholder
    address: {
      "@type": "PostalAddress",
      streetAddress: company.adres,
      postalCode: company.postcode,
      addressLocality: company.plaats,
      addressRegion: "Overijssel",
      addressCountry: "NL",
    },
    telephone: company.telefoonHref,
    email: company.email,
    openingHours: "Mo-Fr 08:00-17:00",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Twente" },
      { "@type": "AdministrativeArea", name: "Overijssel" },
      { "@type": "City", name: "Enschede" },
      { "@type": "City", name: "Hengelo" },
      { "@type": "City", name: "Almelo" },
      { "@type": "City", name: "Oldenzaal" },
      { "@type": "City", name: "Haaksbergen" },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "MTB Bouw",
      url: "https://www.mtbbouw.com",
    },
    sameAs: [company.instagram],
  };
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────

export type FaqSchemaItem = { question: string; answer: string };

export function faqPageSchema(items: FaqSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

export type BreadcrumbItem = { label: string; href?: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────

/**
 * Dienstpagina's (montage, bouwkundig werk, materialen). Bewust zonder `offers`
 * met bedragen: kozijnprijzen zijn maatwerk en staan niet online.
 */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${SITE_URL}${opts.path}`,
    provider: {
      "@type": "LocalBusiness",
      name: "De Kozijnstudio",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Twente" },
      { "@type": "AdministrativeArea", name: "Overijssel" },
    ],
  };
}

// ─── Article ──────────────────────────────────────────────────────────────────

export function articleSchema(opts: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Organization",
      name: "De Kozijnstudio",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "De Kozijnstudio",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/kennisbank/${opts.slug}`,
    },
  };
}

// ─── Serialize helper ─────────────────────────────────────────────────────────

export function jsonLd(...schemas: object[]) {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
