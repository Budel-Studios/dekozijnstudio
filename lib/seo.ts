import type { Metadata } from "next";

/**
 * Per-page metadata helper. Every indexable route gets its own title,
 * description and absolute self-canonical (resolved against metadataBase =
 * SITE_URL), plus a complete Open Graph / Twitter block with the default
 * share image — Next.js replaces (not merges) a parent's openGraph object, so
 * each page must carry the full set.
 *
 * `title` is the page part only; the root layout template appends
 * " | De Kozijnstudio". Pass `absoluteTitle` to set the full title yourself.
 */

export const DEFAULT_OG_IMAGE = {
  url: "/og/default.png",
  width: 1200,
  height: 630,
  alt: "De Kozijnstudio — kozijnen in Enschede en Twente",
};

export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  noindex = false,
  type = "website",
}: {
  title?: string;
  absoluteTitle?: string;
  description: string;
  /** Route path starting with "/", without trailing slash ("/" for home). */
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ?? `${title} | De Kozijnstudio`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "De Kozijnstudio",
      locale: "nl_NL",
      type,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
