import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/legal/legal-layout";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { MODULES } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Voorwaarden aanbrengbonus",
  description:
    "De voorwaarden van de aanbrengbonus van De Kozijnstudio: wie mee kan doen, het aanbrengjaar, hoe de bonus wordt berekend en uitgekeerd, en wat niet meetelt.",
  path: "/aanbrengbonus-voorwaarden",
});

export default function AanbrengbonusVoorwaardenPage() {
  if (!MODULES.aanbrengbonus) notFound();

  return (
    <LegalLayout
      title="Voorwaarden aanbrengbonus"
      intro="Deze voorwaarden gelden als je meedoet aan de aanbrengbonus van De Kozijnstudio."
      path="/aanbrengbonus-voorwaarden"
      lastUpdated="oktober 2026"
    >
      <h2>1. Wie kan meedoen?</h2>
      <ul>
        <li>
          Je kunt meedoen als je als particulier zelf een opdracht hebt gegeven aan {company.naam}, een handelsnaam van{" "}
          {company.entiteit}.
        </li>
        <li>Na je akkoord op je eigen opdracht krijg je een persoonlijke aanbrengcode.</li>
      </ul>

      <h2>2. Het aanbrengjaar</h2>
      <p>
        Vanaf de datum van je eigen opdracht heb je <strong>12 maanden</strong> (het &lsquo;aanbrengjaar&rsquo;) om
        anderen aan te dragen. Aandrachten na die periode tellen niet mee.
      </p>

      <h2>3. De bonus</h2>
      <ul>
        <li>
          Voor elke aangedragen persoon die klant wordt, is de bonus <strong>3% van het projectbedrag van die
          persoon, exclusief btw</strong>.
        </li>
        <li>
          Al je bonussen samen zijn <strong>maximaal 25%</strong> van de waarde van je eigen project.
        </li>
        <li>We keren de bonus uit als cashback of als korting, nadat het aangedragen project is opgeleverd en betaald.</li>
        <li>
          De hoogte van een bonus hangt af van de definitieve, betaalde projectbedragen. Er is geen vaste of
          gegarandeerde uitkering: aan voorbeelden, schattingen of verwachtingen kun je geen rechten ontlenen.
        </li>
      </ul>

      <h2>4. Wanneer we de bonus uitkeren</h2>
      <ul>
        <li>De persoon die je aandraagt, heeft jouw aanbrengcode genoemd bij de aanvraag.</li>
        <li>Die persoon had nog geen aanvraag, voorstel of opdracht bij ons lopen.</li>
        <li>Het aangedragen project is opgeleverd en betaald.</li>
      </ul>

      <h2>5. Los van reviews</h2>
      <p>
        De aanbrengbonus is nooit verbonden aan het schrijven van een review. Of je een review schrijft, en wat je
        daarin schrijft, heeft geen invloed op je bonus. We belonen geen reviews, ook niet met korting, cadeaus of
        andere voordelen.
      </p>

      <h2>6. Overig</h2>
      <ul>
        <li>De aanbrengbonus is persoonlijk en niet overdraagbaar.</li>
        <li>We keren de bonus alleen uit op de manieren die in artikel 3 staan.</li>
        <li>
          We kunnen deze voorwaarden wijzigen of de aanbrengbonus stoppen. Een bonus waar je op dat moment al recht op
          hebt, blijft gelden.
        </li>
        <li>In situaties die deze voorwaarden niet regelen, beslist {company.naam}.</li>
        <li>
          Vragen over de aanbrengbonus? Mail naar <a href={`mailto:${company.email}`}>{company.email}</a> of bel{" "}
          {company.telefoon}.
        </li>
      </ul>
    </LegalLayout>
  );
}
