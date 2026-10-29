import type { Metadata } from "next";
import { Bricolage_Grotesque, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AanvraagDrawerProvider } from "@/components/offerte/aanvraag-drawer";
import { organizationSchema, jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";

// Merkstijl 2026-09: characterful display face for headings, friendly sans for body.
const heading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const body = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kozijnen in Enschede en Twente | De Kozijnstudio",
    template: "%s | De Kozijnstudio",
  },
  description:
    "Nieuwe kozijnen in Enschede of Twente? Vergelijk materialen, bekijk onze werkwijze en vraag een voorstel aan voor jouw woning.",
  applicationName: "De Kozijnstudio",
  openGraph: {
    siteName: "De Kozijnstudio",
    locale: "nl_NL",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: { card: "summary_large_image", images: [DEFAULT_OG_IMAGE.url] },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper-soft text-ink">
        <AanvraagDrawerProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AanvraagDrawerProvider>
      </body>
    </html>
  );
}
