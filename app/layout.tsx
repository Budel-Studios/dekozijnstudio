import type { Metadata } from "next";
import { Bricolage_Grotesque, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import { organizationSchema, jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";

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
    default: "De Kozijnstudio — Transparante kozijnen in Twente",
    template: "%s · De Kozijnstudio",
  },
  description:
    "Nieuwe kozijnen zonder verborgen marges. Kunststof, houten en aluminium kozijnen met transparante prijzen incl. btw. Compleet ontzorgd via MTB Bouw. Werkgebied: Twente & Oost-Nederland.",
  keywords: [
    "kozijnen",
    "kunststof kozijnen",
    "houten kozijnen",
    "aluminium kozijnen",
    "kozijnen plaatsen",
    "kozijnen prijzen",
    "kozijnen twente",
    "isde subsidie kozijnen",
    "kozijnen offerte",
  ],
  openGraph: {
    siteName: "De Kozijnstudio",
    locale: "nl_NL",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Vul GOOGLE_SITE_VERIFICATION in Vercel → Environment Variables met de code
  // uit Search Console (methode "HTML-tag"); zonder waarde blijft de tag weg.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
