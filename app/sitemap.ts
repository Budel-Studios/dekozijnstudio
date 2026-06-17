import type { MetadataRoute } from "next";

const baseUrl = "https://www.dekozijnstudio.nl"; // placeholder — update when domain is live

const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/producten", priority: 0.95, changeFrequency: "weekly" },
  { path: "/producten/ramen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/producten/deuren", priority: 0.9, changeFrequency: "monthly" },
  { path: "/producten/schuifpuien", priority: 0.9, changeFrequency: "monthly" },
  { path: "/configurator", priority: 0.9, changeFrequency: "monthly" },
  { path: "/over-ons", priority: 0.7, changeFrequency: "monthly" },
  { path: "/mtb-bouw", priority: 0.7, changeFrequency: "monthly" },
  { path: "/kunststof-kozijnen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/houten-kozijnen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/aluminium-kozijnen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/montage", priority: 0.8, changeFrequency: "monthly" },
  { path: "/diy", priority: 0.7, changeFrequency: "monthly" },
  { path: "/bouwkundige-aanpassingen", priority: 0.8, changeFrequency: "monthly" },
  { path: "/isde-subsidie", priority: 0.9, changeFrequency: "monthly" },
  { path: "/prijzen", priority: 0.95, changeFrequency: "weekly" },
  { path: "/aanbrengbonus", priority: 0.6, changeFrequency: "monthly" },
  { path: "/projecten", priority: 0.7, changeFrequency: "weekly" },
  { path: "/kennisbank", priority: 0.8, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/offerte-aanvragen", priority: 0.9, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/algemene-voorwaarden", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookiebeleid", priority: 0.3, changeFrequency: "yearly" },
  { path: "/aanbrengbonus-voorwaarden", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
