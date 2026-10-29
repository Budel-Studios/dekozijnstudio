import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegioPaginaTemplate } from "@/components/regio/regio-pagina";
import { regioBySlug } from "@/data/regio";

const data = regioBySlug("twente");

export const metadata: Metadata = {
  title: { absolute: data?.metaTitle ?? "Werkgebied · De Kozijnstudio" },
  description: data?.metaDescription,
  alternates: { canonical: "/werkgebied" },
  openGraph: {
    title: data?.metaTitle,
    description: data?.metaDescription,
    url: "/werkgebied",
  },
};

export default function WerkgebiedPage() {
  if (!data) notFound();
  return <RegioPaginaTemplate data={data} />;
}
