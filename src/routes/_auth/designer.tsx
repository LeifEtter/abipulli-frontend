import { createFileRoute } from "@tanstack/react-router";
import GreyFront from "src/assets/pullovers/grey-front.png";
import CyanFront from "src/assets/pullovers/cyan-front.png";
import { Spacer } from "src/components/Misc/Spacer";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { DesignTab } from "src/components/Designer/DesignTab";
import { ViewOption } from "src/components/Designer/ViewOption";
import { ImageCard } from "src/components/Designer/ImageCard";
import { ColorOption } from "src/components/Designer/ColorOption";
import { PulloverOption } from "src/components/Designer/PulloverOption";
import { useEffect, useState } from "react";
import { Design } from "abipulli-types";
import { Layer, Stage } from "react-konva";
import { DraggableImage } from "src/components/Designer/DraggableImage";
import { useWindowWidth } from "@react-hook/window-size";
import {
  DesignCanvasSize,
  getDesignCanvasSize,
} from "src/utilities/Design/calculateDesignWindow";
import { useDesigns } from "src/hooks/useDesigns";

export const Route = createFileRoute("/_auth/designer")({
  component: RouteComponent,
});

const IMG_URL_PULLOVER_MODEL = `${import.meta.env.VITE_BASE_IMAGE_URL}/general`;
const IMG_URL_DESIGN_IMAGE = `${import.meta.env.VITE_BASE_IMAGE_URL}/${import.meta.env.MODE}/users`;
const IMG_URL_DESIGN_IMAGE_UNDEFINED = `${import.meta.env.VITE_BASE_IMAGE_URL}/undefined/users`;

function RouteComponent() {
  const width = useWindowWidth();
  const { designs, isLoading, error } = useDesigns(23);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

  useEffect(() => {
    if (!selectedDesign && designs != null && !isLoading) {
      setSelectedDesign(designs[0]);
    }
  }, [designs, isLoading, selectedDesign]);

  const selectDesignById = (id: number) => {
    const design: Design | null = designs.filter((e) => e.id == id)[0];
    setSelectedDesign(design);
    console.log(designs[0].images);
  };

  const [designCanvasSize, setDesignCanvasSize] = useState<DesignCanvasSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const newCanvasSize: DesignCanvasSize = getDesignCanvasSize({
      windowWidth: width,
    });
    setDesignCanvasSize(newCanvasSize);
  }, [width]);

  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col items-center gap-2 mt-12 ml-8">
        <MediumLabel text="Designs" />
        {designs.map((e) => (
          <DesignTab
            key={`design-tab-${e.id}`}
            onSelect={() => selectDesignById(e.id)}
            image={`${IMG_URL_PULLOVER_MODEL}/${e.preferredPullover!.image.uuid.toLocaleUpperCase()}.png`}
          />
        ))}
      </div>
      <div className="px-4 pt-12">
        <div
          className="border-2 rounded-xl border-ap-new-gray bg-ap-new-dark-beige shadow-ap-special-shadow flex justify-center items-center overflow-hidden"
          style={{
            height: designCanvasSize.height,
            width: designCanvasSize.width,
          }}
        >
          {!selectedDesign ? (
            <p>Loading</p>
          ) : (
            <Stage
              height={designCanvasSize.height}
              width={designCanvasSize.width}
            >
              <Layer>
                <DraggableImage
                  src={`${IMG_URL_PULLOVER_MODEL}/${selectedDesign.preferredPullover!.image.uuid.toLocaleUpperCase()}.png`}
                  width={designCanvasSize.width}
                />
                {selectedDesign.images!.map((image) => (
                  <DraggableImage
                    key={`design-image-${image.id}`}
                    src={`${IMG_URL_DESIGN_IMAGE_UNDEFINED}/${image.userId}/${image.uuid}`}
                    width={designCanvasSize.width / 2.5}
                  />
                ))}
              </Layer>
            </Stage>
          )}
        </div>
        <div className="flex flex-row mt-4 gap-3">
          <ViewOption view="Vorne" selected={true} />
          <ViewOption view="Hinten" />
          <Spacer />
          <button className="border-2 w-60 h-15 rounded-lg bg-ap-new-green shadow-ap-button cursor-pointer">
            <p className="font-semibold">Design Speichern</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col pt-12 gap-4 w-3/12">
        <div className="flex flex-row gap-5">
          <div>
            <MediumLabel text="Farbe" />
            <div className="flex flex-row gap-2 mt-5">
              <ColorOption color="grey" selected={true} />
              <ColorOption color="red" selected={true} />
              <ColorOption color="green" selected={true} />
              <ColorOption color="white" selected={true} />
            </div>
          </div>
          <div>
            <MediumLabel text="Pullover-Art" />
            <div className="flex flex-row gap-2">
              <PulloverOption image={GreyFront} name="Normal" />
              <PulloverOption
                image={CyanFront}
                name="Oversized"
                selected={true}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 items-center border-2 border-ap-new-gray rounded-xl border-ap bg-ap-new-dark-beige">
          <MediumLabel text="Text Elemente" />
        </div>
        <div className="flex flex-col py-4 gap-2 items-center border-2 border-ap-new-gray rounded-xl border-ap bg-ap-new-dark-beige">
          <MediumLabel text="Bild Elemente" />
          <div className="w-11/12 grid grid-cols-2 xl:grid-cols-3 gap-4">
            <ImageCard image="a" />
            <ImageCard image="a" />
            <ImageCard image="a" />
            <ImageCard image="a" />
            <ImageCard image="a" />
            <ImageCard image="a" />
          </div>
          <button className="border-2 h-12 w-58 mt-4 rounded-lg bg-ap-new-green cursor-pointer">
            <p className="font-semibold">+ Von Abipulli Bibliothek</p>
          </button>
          <button className="px-12 py-3 w-58 cursor-pointer bg-linear-to-r from-ap-gradient-blue to-ap-gradient-red  text-white font-medium rounded-md shadow-sm">
            Mit KI Generieren
          </button>
        </div>
      </div>
    </div>
  );
}
