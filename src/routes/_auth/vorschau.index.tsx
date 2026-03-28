import { createFileRoute, Link } from "@tanstack/react-router";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { SmallLabel } from "src/components/Texts/SmallLabel";
import { useUserImages } from "src/hooks/useUserImages";
import { ButtonType } from "src/types/ButtonType";

export const Route = createFileRoute("/_auth/vorschau/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userImages } = useUserImages();

  return (
    <main
      className="card w-12/12 sm:w-10/12 lg:w-9/12 px-8"
      aria-label="Bildvorschau Auswahl"
    >
      <PageTitle>Wähle ein Bild zur Vorschau</PageTitle>
      <PageDescription>
        Diese Seite dient zur Vorschau und Verbesserung von bereits generierten
        Bildern.
      </PageDescription>
      <section className="flex gap-4 mt-12 flex-wrap" aria-label="Bilderliste">
        {userImages.length == 0 && (
          <div className="flex flex-col items-start">
            <SmallLabel
              text="Sieht aus als hättest du noch keine Bilder generiert"
              className="mb-4"
            />
            <BasicButton
              className="mb-10"
              type={ButtonType.Link}
              to={"/generieren"}
            >
              Bild Generieren
            </BasicButton>
          </div>
        )}
        {userImages.map((image, id) => (
          <Link
            key={`pick-vorschau-${image.id}`}
            to={`/vorschau/${image.id}`}
            aria-label={`Bild ${id + 1} zur Vorschau auswählen`}
          >
            <img
              className="w-40 object-cover hover:scale-110 hover:shadow-xl transition-all duration-75"
              src={image.url}
              alt={`Vorschau Bild ${id + 1}`}
            />
          </Link>
        ))}
      </section>
    </main>
  );
}
