/**
 * JSON-LD schema helpers.
 * Returns plain objects — serialize with JSON.stringify in <script> tags.
 * Schemas: Organization/LocalBusiness (site-wide), FAQPage (FAQ/product pages),
 * BreadcrumbList (all inner pages).
 */

import { SITE_URL } from "@/lib/site";
import { company } from "@/data/company";

// ─── Organization / LocalBusiness ────────────────────────────────────────────

/** Stable identity that other schemas reference. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Site-wide organisation data — only verified facts that are also visible on
 * the site (footer/contact): trade name, legal entity, address (visits by
 * appointment), phone, e-mail, service area. No ratings, reviews or
 * accreditations (docs/seo-strategie-2026-10.md, h12).
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": ORGANIZATION_ID,
    name: company.naam,
    legalName: company.entiteit,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-512.png`,
    image: `${SITE_URL}/og/default.png`,
    description:
      "Kozijnen in Enschede en Twente: advies, levering en montage van kunststof, houten en aluminium kozijnen, met een uitgesplitst voorstel.",
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
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: company.telefoonHref,
      email: company.email,
      availableLanguage: "nl",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
    areaServed: [
      { "@type": "City", name: "Enschede" },
      { "@type": "AdministrativeArea", name: "Twente" },
    ],
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
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/kennis/${opts.slug}`,
    },
  };
}

// ─── Serialize helper ─────────────────────────────────────────────────────────

export function jsonLd(...schemas: object[]) {
  return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
}
