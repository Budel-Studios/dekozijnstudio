/**
 * Canonieke site-URL — één bron voor metadata, sitemap, robots en JSON-LD.
 * Wordt gehost op Vercel (kozijnstudio.vercel.app). Zet `NEXT_PUBLIC_SITE_URL`
 * (bijv. in Vercel → Settings → Environment Variables) zodra het eigen domein
 * www.dekozijnstudio.nl live staat.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kozijnstudio.vercel.app"
).replace(/\/$/, "");
