import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Voorwaarden Aanbrengbonus",
  description:
    "De voorwaarden van de Aanbrengbonus van De Kozijnstudio: 3% per aangedragen klant, tot 25% cashback, binnen het aanbrengjaar van 12 maanden.",
  alternates: { canonical: "/aanbrengbonus-voorwaarden" },
};

export default function AanbrengbonusVoorwaardenPage() {
  return (
    <LegalLayout
      title="Voorwaarden Aanbrengbonus"
      intro="Deze voorwaarden gelden voor deelname aan de Aanbrengbonus van De Kozijnstudio."
    >
      <h2>1. Deelname</h2>
      <ul>
        <li>Deelname staat open voor particuliere klanten die zelf een opdracht hebben geplaatst bij {company.naam}.</li>
        <li>U ontvangt na akkoord op uw eigen opdracht een persoonlijke aanbrengcode.</li>
      </ul>

      <h2>2. Het aanbrengjaar</h2>
      <p>
        Vanaf de datum van uw eigen opdracht heeft u <strong>12 maanden</strong> (het
        &lsquo;aanbrengjaar&rsquo;) om anderen aan te dragen. Aandrachten daarna komen niet
        in aanmerking.
      </p>

      <h2>3. De bonus</h2>
      <ul>
        <li>Voor elke aangedragen persoon die klant wordt, ontvangt u <strong>3% van diens projectbedrag (excl. btw)</strong>.</li>
        <li>De som van uw bonussen bedraagt <strong>maximaal 25%</strong> van de waarde van uw eigen project.</li>
        <li>De bonus wordt uitgekeerd als cashback of als korting, na oplevering van het aangedragen project.</li>
      </ul>

      <h2>4. Voorwaarden voor uitkering</h2>
      <ul>
        <li>De aandracht verloopt aantoonbaar via uw persoonlijke aanbrengcode.</li>
        <li>De aangedragen klant heeft niet eerder een offerte of opdracht bij ons lopen.</li>
        <li>Het aangedragen project is daadwerkelijk opgeleverd en betaald.</li>
      </ul>

      <h2>5. Overig</h2>
      <ul>
        <li>De Aanbrengbonus is persoonsgebonden en niet overdraagbaar.</li>
        <li>De bonus kan niet worden ingewisseld voor contant geld buiten de genoemde uitkeringsvormen.</li>
        <li>{company.naam} behoudt zich het recht voor de voorwaarden te wijzigen of het programma te beëindigen; reeds opgebouwde rechten blijven daarbij gerespecteerd.</li>
        <li>In gevallen waarin deze voorwaarden niet voorzien, beslist {company.naam}.</li>
      </ul>
      <p><em>[Exacte bedragen, termijnen en uitkeringswijze nog definitief vast te leggen.]</em></p>
    </LegalLayout>
  );
}
