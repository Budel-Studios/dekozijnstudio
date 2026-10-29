import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van De Kozijnstudio: voorstellen en prijzen, inmeten, betaling, levering en montage, annuleren, garantie, klachten en aansprakelijkheid.",
  path: "/algemene-voorwaarden",
});

export default function AlgemeneVoorwaardenPage() {
  return (
    <LegalLayout
      title="Algemene voorwaarden"
      intro="Deze voorwaarden gelden voor alle voorstellen, overeenkomsten, leveringen en werkzaamheden van De Kozijnstudio."
      path="/algemene-voorwaarden"
      lastUpdated="oktober 2026"
    >
      <h2>1. Wie zijn wij?</h2>
      <p>
        In deze voorwaarden bedoelen we met &lsquo;wij&rsquo; of &lsquo;ons&rsquo;: {company.naam},
        een handelsnaam van {company.entiteit}, {company.adres}, {company.postcodePlaats}, KvK{" "}
        {company.kvk}. Met &lsquo;je&rsquo; of &lsquo;klant&rsquo; bedoelen we de persoon of het
        bedrijf met wie wij een overeenkomst sluiten.
      </p>

      <h2>2. Wanneer gelden deze voorwaarden?</h2>
      <p>
        Deze voorwaarden gelden voor al onze voorstellen (offertes) en overeenkomsten, tenzij we
        schriftelijk iets anders met je afspreken.
      </p>

      <h2>3. Voorstellen en prijzen</h2>
      <ul>
        <li>Een voorstel is vrijblijvend, tenzij in het voorstel iets anders staat.</li>
        <li>
          Bedragen op de website of in de configurator zijn <strong>indicaties inclusief btw</strong>{" "}
          en niet bindend.
        </li>
        <li>
          De definitieve prijs staat in je persoonlijke voorstel, dat we na het inmeten opstellen.
          Daarin staan de kozijnen, de montage en eventueel bouwkundig werk als aparte onderdelen.
        </li>
        <li>Een voorstel is geldig gedurende de termijn die in het voorstel staat.</li>
      </ul>

      <h2>4. Inmeten</h2>
      <p>
        Voordat er iets besteld wordt, meten we bij je thuis in. Eventuele kosten voor inmeten
        worden vooraf met je afgesproken. Pas na het inmeten kunnen we de exacte maten en de prijs
        bevestigen.
      </p>

      <h2>5. Wanneer is de overeenkomst gesloten?</h2>
      <p>De overeenkomst komt tot stand zodra je schriftelijk akkoord geeft op ons voorstel.</p>

      <h2>6. Betaling</h2>
      <ul>
        <li>Bij maatwerk vragen we bij de opdracht een aanbetaling voor de productie.</li>
        <li>Het restant, het overige deel van de kozijnen en de montage, betaal je bij de oplevering.</li>
        <li>Je betaalt binnen de termijn die op de factuur staat.</li>
      </ul>

      <h2>7. Levering en montage</h2>
      <ul>
        <li>
          Levertijden zijn indicatief en geen fatale termijnen. De verwachte levertijd staat in je
          voorstel. Verandert de planning, dan laten we je dat zo snel mogelijk weten.
        </li>
        <li>
          We regelen de montage. Bouwkundige aanpassingen, zoals een opening vergroten of een latei
          vervangen, voert MTB Bouw uit.
        </li>
        <li>
          Je zorgt ervoor dat we veilig en goed bij de plek van het werk kunnen. Wat je vooraf
          moet vrijmaken, spreken we met je af.
        </li>
        <li>
          Komt er tijdens het werk iets naar boven dat vooraf niet te zien was, zoals verborgen
          houtrot of een constructief probleem, dan bespreken we eerst met je wat er nodig is.
          Extra werk voeren we alleen uit als je daarmee akkoord gaat.
        </li>
      </ul>

      <h2>8. Annuleren van maatwerk</h2>
      <p>
        Kozijnen worden op maat voor je gemaakt. Annuleren nadat je akkoord hebt gegeven en de
        productie is gestart, kan daarom in principe niet zonder kosten.
      </p>

      <h2>9. Garantie</h2>
      <p>
        Op geleverde producten en uitgevoerde werkzaamheden geldt de wettelijke garantie en, waar
        van toepassing, de garantie van de fabrikant.
      </p>

      <h2>10. Aansprakelijkheid</h2>
      <p>
        Onze aansprakelijkheid is beperkt tot wat in deze voorwaarden staat en tot het bedrag dat
        onze verzekering in het betreffende geval uitkeert.
      </p>

      <h2>11. Klachten</h2>
      <p>
        Ben je ergens niet tevreden over? Meld het binnen een redelijke termijn nadat je het hebt
        ontdekt, via <a href={`mailto:${company.email}`}>{company.email}</a> of{" "}
        {company.telefoon}. We nemen zo snel mogelijk contact met je op om samen naar een
        oplossing te zoeken.
      </p>

      <h2>12. Toepasselijk recht</h2>
      <p>Op al onze overeenkomsten is Nederlands recht van toepassing.</p>
    </LegalLayout>
  );
}
