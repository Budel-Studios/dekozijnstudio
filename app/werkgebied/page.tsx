import { notFound } from "next/navigation";
import { RegioPaginaTemplate } from "@/components/regio/regio-pagina";
import { regioBySlug } from "@/data/regio";
import { pageMetadata } from "@/lib/seo";

const data = regioBySlug("twente");

export const metadata = pageMetadata({
  absoluteTitle: data?.metaTitle ?? "Werkgebied | De Kozijnstudio",
  description: data?.metaDescription ?? "",
  path: "/werkgebied",
});

export default function WerkgebiedPage() {
  if (!data) notFound();
  return <RegioPaginaTemplate data={data} />;
}
