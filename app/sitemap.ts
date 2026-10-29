import type { MetadataRoute } from "next";
import { SITE_URL as baseUrl, MODULES } from "@/lib/site";
import { getAllArticles } from "@/lib/content";
import { PLAATS_PAGINAS, regioPad } from "@/data/regio";

/**
 * Sitemap: only published, canonical, indexable URLs that return 200
 * (SEO-strategie 2026-10 (privé projectdocument), h12). `lastModified` is the date of the last
 * real content change — update it when you change a page's content, not on
 * every deploy. Flow pages (/project, /bedankt), internal pages and switched-off
 * modules are left out on purpose.
 */
const CONTENT_UPDATED = "2026-10-29";

const staticPaths: Array<{ path: string; updated: string }> = [
  { path: "/", updated: CONTENT_UPDATED },
  { path: "/kunststof-kozijnen", updated: CONTENT_UPDATED },
  { path: "/kozijnen-vervangen", updated: CONTENT_UPDATED },
  { path: "/kosten", updated: CONTENT_UPDATED },
  { path: "/montage", updated: CONTENT_UPDATED },
  { path: "/werkwijze", updated: CONTENT_UPDATED },
  { path: "/over-ons", updated: CONTENT_UPDATED },
  { path: "/contact", updated: CONTENT_UPDATED },
  { path: "/offerte", updated: CONTENT_UPDATED },
  { path: "/houten-kozijnen", updated: CONTENT_UPDATED },
  { path: "/aluminium-kozijnen", updated: CONTENT_UPDATED },
  { path: "/kozijnen", updated: CONTENT_UPDATED },
  { path: "/bouwkundige-aanpassingen", updated: CONTENT_UPDATED },
  { path: "/subsidie", updated: CONTENT_UPDATED },
  { path: "/mtb-bouw", updated: CONTENT_UPDATED },
  { path: "/faq", updated: CONTENT_UPDATED },
  { path: "/kennis", updated: CONTENT_UPDATED },
  { path: "/werkgebied", updated: CONTENT_UPDATED },
  { path: "/privacy", updated: CONTENT_UPDATED },
  { path: "/algemene-voorwaarden", updated: CONTENT_UPDATED },
  { path: "/cookiebeleid", updated: CONTENT_UPDATED },
  ...(MODULES.configurator
    ? [
        { path: "/producten", updated: CONTENT_UPDATED },
        { path: "/producten/ramen", updated: CONTENT_UPDATED },
        { path: "/producten/deuren", updated: CONTENT_UPDATED },
        { path: "/producten/schuifpuien", updated: CONTENT_UPDATED },
        { path: "/configurator", updated: CONTENT_UPDATED },
      ]
    : []),
  ...(MODULES.aanbrengbonus
    ? [
        { path: "/aanbrengbonus", updated: CONTENT_UPDATED },
        { path: "/aanbrengbonus-voorwaarden", updated: CONTENT_UPDATED },
      ]
    : []),
  ...(MODULES.plaatspaginas
    ? PLAATS_PAGINAS.map((r) => ({ path: regioPad(r), updated: CONTENT_UPDATED }))
    : []),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPaths.map(({ path, updated }) => ({
    url: path === "/" ? baseUrl : `${baseUrl}${path}`,
    lastModified: new Date(updated),
  }));

  const articles = getAllArticles().map((article) => ({
    url: `${baseUrl}/kennis/${article.slug}`,
    lastModified: new Date(article.dateModified ?? article.date),
  }));

  return [...pages, ...articles];
}
