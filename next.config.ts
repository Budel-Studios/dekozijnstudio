import type { NextConfig } from "next";

/**
 * URL migration of 29-10-2026 (docs/seo-migratie.md). Every old URL points
 * directly to its content equivalent — no chains, no dump to the homepage
 * except /kozijnen-enschede, whose intent ("kozijnen Enschede") is now served
 * by the homepage. `permanent: true` → 308, which search engines treat as 301.
 */
const redirects: Array<{ source: string; destination: string }> = [
  { source: "/prijzen", destination: "/kosten" },
  { source: "/isde-subsidie", destination: "/subsidie" },
  { source: "/kennisbank", destination: "/kennis" },
  { source: "/kennisbank/:slug", destination: "/kennis/:slug" },
  { source: "/kozijnen-twente", destination: "/werkgebied" },
  { source: "/kozijnen-enschede", destination: "/" },
  { source: "/kozijnen-hengelo", destination: "/werkgebied/hengelo" },
  { source: "/kozijnen-almelo", destination: "/werkgebied/almelo" },
  { source: "/kozijnen-oldenzaal", destination: "/werkgebied/oldenzaal" },
  { source: "/kozijnen-haaksbergen", destination: "/werkgebied/haaksbergen" },
  { source: "/offerte-aanvragen", destination: "/offerte" },
  { source: "/referral", destination: "/aanbrengbonus" },
];

const nextConfig: NextConfig = {
  // Server actions receive photos and the project PDF as attachments.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  async redirects() {
    return redirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
