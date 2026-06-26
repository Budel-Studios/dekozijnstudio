import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { organizationSchema, jsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";

// Swiss grotesque — vrij alternatief voor Suisse Int'l (rebrand 2026).
const grotesk = Hanken_Grotesk({
  variable: "--font-grotesk",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${grotesk.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
