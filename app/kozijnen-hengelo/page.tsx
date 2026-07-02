import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegioPaginaTemplate } from "@/components/regio/regio-pagina";
import { regioBySlug } from "@/data/regio";

const data = regioBySlug("kozijnen-hengelo");

export const metadata: Metadata = {
  title: data?.metaTitle,
  description: data?.metaDescription,
  alternates: { canonical: "/kozijnen-hengelo" },
  openGraph: {
    title: `${data?.metaTitle} — De Kozijnstudio`,
    description: data?.metaDescription,
  },
};

export default function KozijnenHengeloPage() {
  if (!data) notFound();
  return <RegioPaginaTemplate data={data} />;
}
