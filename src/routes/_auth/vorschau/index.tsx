import { createFileRoute, Link } from "@tanstack/react-router";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useUserImages } from "src/hooks/useUserImages";

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
