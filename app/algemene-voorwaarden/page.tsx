import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van De Kozijnstudio: offertes, prijzen, betaling, levering, montage, garantie en aansprakelijkheid.",
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalLayout
      title="Algemene voorwaarden"
      intro="Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en leveringen van De Kozijnstudio."
    >
      <h2>1. Definities</h2>
      <p>
        In deze voorwaarden wordt verstaan onder &lsquo;wij&rsquo;/&lsquo;ons&rsquo;:{" "}
        {company.naam}, handelsnaam van {company.entiteit};
        en &lsquo;klant&rsquo;: de natuurlijke persoon of rechtspersoon met wie wij een
        overeenkomst aangaan.
      </p>

      <h2>2. Toepasselijkheid</h2>
      <p>Deze voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten, tenzij schriftelijk anders overeengekomen.</p>

      <h2>3. Offertes en prijzen</h2>
      <ul>
        <li>Alle offertes zijn vrijblijvend, tenzij anders vermeld.</li>
        <li>Prijzen die via de configurator en op de website worden getoond zijn <strong>indicatieve richtprijzen inclusief btw</strong> en niet bindend.</li>
        <li>De definitieve prijs wordt vastgesteld na de inmeetservice en vermeld in de persoonlijke offerte.</li>
        <li>Een uitgebrachte offerte is geldig gedurende de daarin genoemde termijn. <em>[Geldigheidsduur nog vast te leggen.]</em></li>
      </ul>

      <h2>4. Inmeetservice</h2>
      <p>
        De inmeetservice bedraagt € 49 en wordt volledig verrekend wanneer de opdracht
        doorgaat. Pas na opmeting kunnen exacte maten en prijzen worden bevestigd.
      </p>

      <h2>5. Totstandkoming van de overeenkomst</h2>
      <p>De overeenkomst komt tot stand na schriftelijke akkoordverklaring van de klant op de offerte.</p>

      <h2>6. Betaling</h2>
      <ul>
        <li>Bij maatwerk wordt een aanbetaling gevraagd bij opdracht, ter dekking van de maatwerkproductie.</li>
        <li>Het restantbedrag (resterend deel van de kozijnen en de montage) wordt voldaan bij oplevering.</li>
        <li>Betaling dient te geschieden binnen de op de factuur vermelde termijn. <em>[Termijn nog vast te leggen.]</em></li>
      </ul>

      <h2>7. Levering en montage</h2>
      <ul>
        <li>Genoemde levertijden (doorgaans vanaf ± 8 weken na opmeting en opdracht) zijn indicatief en geen fatale termijnen.</li>
        <li>Montage wordt uitgevoerd door onze monteurs; bouwkundige aanpassingen worden uitgevoerd door {company.moeder}.</li>
        <li>De klant zorgt voor een veilige en toegankelijke werkplek.</li>
      </ul>

      <h2>8. Annulering van maatwerk</h2>
      <p>
        Omdat kozijnen op maat worden geproduceerd, is annulering na akkoord en start van
        de productie in beginsel niet kosteloos mogelijk. <em>[Annuleringsregeling nog vast te leggen.]</em>
      </p>

      <h2>9. Garantie</h2>
      <p>Op geleverde producten en uitgevoerde werkzaamheden gelden de wettelijke en/of fabrieksgaranties. <em>[Specifieke garantietermijnen nog vast te leggen.]</em></p>

      <h2>10. Aansprakelijkheid</h2>
      <p>Onze aansprakelijkheid is beperkt tot hetgeen in deze voorwaarden is geregeld en tot het bedrag dat in het betreffende geval door onze verzekering wordt uitgekeerd. <em>[Aansprakelijkheidsbepaling nog juridisch te toetsen.]</em></p>

      <h2>11. Klachten</h2>
      <p>Klachten kunt u binnen een redelijke termijn melden via {company.email}. Wij streven ernaar binnen één werkdag te reageren.</p>

      <h2>12. Toepasselijk recht</h2>
      <p>Op alle overeenkomsten is Nederlands recht van toepassing.</p>
    </LegalLayout>
  );
}
