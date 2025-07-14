import { createFileRoute, Link } from "@tanstack/react-router";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useUserImages } from "src/hooks/useUserImages";

export const Route = createFileRoute("/_auth/vorschau/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userImages, userImagesAreLoading, userImagesError } = useUserImages();

  return (
    <div className="card w-12/12 sm:w-10/12 lg:w-9/12 px-8">
      <PageTitle>Wähle ein Bild zur Vorschau</PageTitle>
      <PageDescription>
        Diese Seite dient zur Vorschau und Verbesserung von bereits generierten
        Bildern.
      </PageDescription>
      <div className="flex gap-4 mt-12 flex-wrap">
        {userImages.map((image) => (
          <Link key={`pick-vorschau-${image.id}`} to={`/vorschau/${image.id}`}>
            <img
              className="w-40 object-cover hover:scale-110 hover:shadow-xl transition-all duration-75"
              src={image.url}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
