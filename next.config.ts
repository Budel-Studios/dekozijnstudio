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

/**
 * GitHub Codespaces preview (.devcontainer): the dev server is reached via
 * <codespace>-3000.app.github.dev, so that host must be allowed for dev
 * assets and server actions. Only set inside a codespace.
 */
const codespacesHosts =
  process.env.CODESPACES === "true"
    ? [`*.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || "app.github.dev"}`]
    : [];

const nextConfig: NextConfig = {
  ...(codespacesHosts.length ? { allowedDevOrigins: codespacesHosts } : {}),
  // Server actions receive photos and the project PDF as attachments.
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
      ...(codespacesHosts.length ? { allowedOrigins: codespacesHosts } : {}),
    },
  },
  async redirects() {
    return redirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
