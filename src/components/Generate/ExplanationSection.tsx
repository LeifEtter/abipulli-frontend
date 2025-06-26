import { MediumLabel } from "../Texts/MediumLabel";

export const ExplanationSection = () => (
  <>
    <MediumLabel text="Wie funktioniert es?" className="mt-1 mb-1" />
    <ol className="list-decimal ml-6 font-medium text-md lg:text-lg [&_li]:leading-6 [&_li]:mt-2">
      <li className="leading-6">
        Gib ein Motto und wähle ob das Jahr angezeigt werden soll
      </li>
      <li>
        Beschreibe den Pullover kurz, gib dabei Elemente an die auf den Pullover
        zu sehen sein sollen
      </li>
      <li>
        Wähle vorgefertigte Style Tags oder Schreibe deine Eigenen. Diese gebeb
        dein Design Persönlichkeit.
      </li>
      <li>
        Wir generieren dir eine verbesserte Beschreibung. Diese kannst du auch
        bearbeiten.
      </li>
      <li>Drücke den Generator Knopf um 3 Designs zu generieren</li>
    </ol>
  </>
);
