import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RegioPaginaTemplate } from "@/components/regio/regio-pagina";
import { PLAATS_PAGINAS, regioBySlug, regioPad } from "@/data/regio";
import { MODULES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ plaats: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return MODULES.plaatspaginas ? PLAATS_PAGINAS.map((r) => ({ plaats: r.slug })) : [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { plaats } = await params;
  const data = regioBySlug(plaats);
  if (!data || data.soort !== "plaats") return {};
  return pageMetadata({
    absoluteTitle: data.metaTitle,
    description: data.metaDescription,
    path: regioPad(data),
  });
}

export default async function PlaatsPage({ params }: Props) {
  const { plaats } = await params;
  const data = regioBySlug(plaats);
  if (!MODULES.plaatspaginas || !data || data.soort !== "plaats") notFound();
  return <RegioPaginaTemplate data={data} />;
}
