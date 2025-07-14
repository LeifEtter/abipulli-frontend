import { faRedo, faShirt, faSliders } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Image } from "abipulli-types";
import { useEffect, useState } from "react";
import { ImageApi } from "src/api/endpoints/image";
import PulloverSandFront from "src/assets/pullovers/sand-front.png";
import PulloverSandBack from "src/assets/pullovers/sand-back.png";
import { DescriptionButton } from "src/components/Buttons/DescriptionButton";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { useSnackbar } from "src/hooks/useSnackbar";
import { ButtonType } from "src/types/ButtonType";
import { ViewingSide } from "src/types/ViewingSide";
export const Route = createFileRoute("/_auth/vorschau/$imageId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { imageId } = useParams({ strict: false });

  const [image, setImage] = useState<Image>();
  const [viewingSide, setViewingSide] = useState<ViewingSide>(
    ViewingSide.Front
  );

  const showSnackbar = useSnackbar();

  useEffect(() => {
    const initImage = async () => {
      try {
        if (!imageId) return;
        const retrievedImage: Image = await ImageApi.fetch(imageId);
        setImage(retrievedImage);
      } catch (error) {
        console.log(error);
        showSnackbar({ type: "error", message: "Huh" });
      }
    };

    initImage();
  }, []);

  const canvasWidth = 400;
  const generatedImageWidth = 150;

  return (
    <main className="w-full" aria-label="Bildvorschau">
      <div
        className="relative left-6 sm:left-1/12 lg:left-2/12"
        style={{
          width: canvasWidth,
        }}
      >
        <div
          className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] h-140 ${
            viewingSide == ViewingSide.Back && "rotate-y-180"
          }`}
          aria-label="Pullover Vorschau"
        >
          <img
            src={PulloverSandFront}
            alt="Pullover Vorderseite"
            className="absolute w-full h-full backface-hidden object-contain"
          />
          <img
            src={PulloverSandBack}
            alt="Pullover Rückseite"
            className="absolute w-full h-full backface-hidden rotate-y-180 object-contain"
          />
        </div>
        {image && (
          <img
            style={{
              width: generatedImageWidth,
              left: canvasWidth / 2 - generatedImageWidth / 2,
            }}
            className={`absolute ${viewingSide == ViewingSide.Front ? "top-30" : "top-40"} left-1/2 transition-all duration-200`}
            src={image.url}
            alt="Generiertes Designbild"
            aria-label="Generiertes Designbild"
          />
        )}
        <div
          className="absolute bottom-30 w-full flex gap-4 flex-col lg:flex-row justify-center items-center"
          role="group"
          aria-label="Bildaktionen"
        >
          <DescriptionButton
            type={ButtonType.Link}
            to="/generieren"
            icon={faRedo}
            shadow
            className="w-70 bg-red-200"
            description="Bild wird gespeichert"
            aria-label="Neues Bild generieren"
          >
            Neues Bild
          </DescriptionButton>
          <DescriptionButton
            type={ButtonType.Link}
            to="/"
            icon={faSliders}
            shadow
            className="w-70"
            description="Bild verbessern"
            aria-label="Bild verbessern"
          >
            Verbessern
          </DescriptionButton>
        </div>
        <div
          className="flex flex-row justify-center"
          role="group"
          aria-label="Ansicht wechseln"
        >
          <FrontBackButton
            switchViewingSide={(side: ViewingSide) => {
              console.log(side);
              setViewingSide(side);
            }}
            currentViewingSide={viewingSide}
          />
        </div>
      </div>
      <div
        className="relative flex flex-row justify-center left-6 sm:left-1/12 lg:left-2/12 top-10"
        style={{ width: canvasWidth }}
        role="group"
        aria-label="Designer öffnen"
      >
        <DescriptionButton
          type={ButtonType.Link}
          to="/designer"
          icon={faShirt}
          shadow
          className="w-70"
          description="Kombiniere Pullis und Designs"
          aria-label="Designer öffnen"
        >
          Zum Designer
        </DescriptionButton>
      </div>
    </main>
  );
}
