import { fa1, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import { createFileRoute } from "@tanstack/react-router";
import { Design, Image, ImageWithPositionAndScale } from "abipulli-types";
import { KonvaEventObject } from "konva/lib/Node";
import { JSX, useEffect, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import { BasicButton } from "src/components/Buttons/BasicButton";
import {
  ResizableImage,
  StaticImage,
} from "src/components/Designer/CanvasImages";
import { DesignTab } from "src/components/Designer/DesignTab";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useDesigns } from "src/hooks/useDesigns";
import { useSnackbar } from "src/hooks/useSnackbar";
import { useUserImages } from "src/hooks/useUserImages";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import {
  DesignCanvasSize,
  getDesignCanvasSize,
} from "src/utilities/Design/calculateDesignWindow";

export const Route = createFileRoute("/_auth/designer")({
  component: RouteComponent,
});

interface DesignsSelectionProps {
  designs: Design[];
  selectDesign: (id: number) => void;
  selectedDesign: Design | undefined;
}

const DesignsSelection = ({
  designs,
  selectDesign,
  selectedDesign,
}: DesignsSelectionProps): JSX.Element => (
  <div className="card p-0 relative h-132 flex flex-col w-2/12">
    <h2 className="text-2xl font-semibold text-center pb-3 border-2 shadow-abipulli-sm z-10 border-black bg-abipulli-green pt-3 rounded-2xl">
      Designs
    </h2>
    <div className="overflow-scroll">
      <div className="flex flex-col items-center gap-2 mt-2">
        {[...designs, ...designs].map((e, i) => (
          <div className="w-1/2 min-w-50">
            <DesignTab
              key={`design-tab-${i}`}
              onSelect={() => selectDesign(e.id)}
              selected={selectedDesign && selectedDesign.id == e.id}
              image={e.preferredPullover!.image.url}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="absolute bottom-4 flex flex-row w-full justify-center">
      <BasicButton icon={faPlus}>Neues Design</BasicButton>
    </div>
  </div>
);

interface ImageSelectionProps {
  images: Image[];
}

enum SelectedTab {
  Images,
  Texts,
}

const ImageSelection = ({ images }: ImageSelectionProps) => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    SelectedTab.Images
  );

  return (
    <div className="card p-0 pt-4 w-40 md:w-80 h-120 flex flex-col">
      <h3 className="text-center text-xl font-semibold pb-4">Elemente</h3>
      <div className="relative flex flex-row flex-wrap [&>*]:transition-all duration-75">
        <button
          onClick={() => setSelectedTab(SelectedTab.Images)}
          className={`font-semibold cursor-pointer p-1 flex-1/1 md:flex-1/2  border-black border-y z-10 ${selectedTab == SelectedTab.Images ? " text-white" : " text-black"}`}
        >
          Bilder
        </button>
        <button
          onClick={() => setSelectedTab(SelectedTab.Texts)}
          className={`font-semibold cursor-pointer p-1 flex-1/1 md:flex-1/2 border-black z-10 border-y ${selectedTab == SelectedTab.Texts ? "text-white" : " text-black"}`}
        >
          Texte
        </button>
        <div
          className={`hidden md:block absolute w-1/2 bg-black h-full ${selectedTab == SelectedTab.Images ? "left-0" : "left-1/2"}`}
        />
        <div
          className={`block md:hidden absolute w-full h-1/2 bg-black ${selectedTab == SelectedTab.Images ? "top-0" : "top-1/2"}`}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-4 overflow-scroll py-4 px-3">
        {[...images, ...images].map((image, index) => (
          <div className="aspect-square border" key={index}>
            image
          </div>
        ))}
      </div>
    </div>
  );
};

enum ViewingSide {
  Front,
  Back,
}

function RouteComponent() {
  const [design, setDesign] = useState<Design | null>();

  const [viewingSide, setViewingSide] = useState<ViewingSide>(
    ViewingSide.Front
  );

  const {
    designImages,
    designImagesAreLoading,
    designImagesError,
    changeImagePosition,
    changeImageScale,
    addImageToDesign,
    removeImageFromDesign,
  } = useDesignImages(design?.id);

  const { userImages, userImagesAreLoading, userImagesError } = useUserImages();

  const { designs, designsAreLoading, designsError } = useDesigns(4);

  const selectDesignById = (id: number) => {
    const design: Design | null = designs.filter((e) => e.id == id)[0];
    setDesign(design);
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectImage(null);
    }
  };

  const [selectedImage, selectImage] =
    useState<ImageWithPositionAndScale | null>(null);

  const showSnackbar = useSnackbar();

  const width = useWindowWidth();
  const [designCanvasSize, setDesignCanvasSize] = useState<DesignCanvasSize>({
    width: 0,
    height: 0,
  });
  useEffect(
    () => setDesignCanvasSize(getDesignCanvasSize({ windowWidth: width })),
    [width]
  );

  const onDeleteImage = async (image: ImageWithPositionAndScale) => {
    if (!design)
      return showSnackbar({
        message: "Kein Design ausgewählt",
        type: "error",
      });
    await removeImageFromDesign(image, design.id);
  };

  const onImagePositionChange = (
    pos: PositionType,
    image: ImageWithPositionAndScale
  ) =>
    changeImagePosition({
      pos,
      imageToDesignId: image.imageToDesignId,
    });

  const onScaleChange = (scale: ScaleType, image: ImageWithPositionAndScale) =>
    changeImageScale({
      scale,
      imageToDesignId: image.imageToDesignId,
    });

  useEffect(() => {
    if (!designsAreLoading && !designsError) {
      setDesign(designs[0]);
    }
  }, [designsAreLoading, designs]);

  return (
    <div className="flex flex-row w-full">
      {!designsAreLoading && (
        <DesignsSelection
          designs={designs}
          selectedDesign={design ?? undefined}
          selectDesign={(id) => selectDesignById(id)}
        />
      )}
      <div className="border border-red-500">
        {design && (
          <Stage
            height={designCanvasSize.height}
            width={designCanvasSize.width}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              <StaticImage
                src={design.preferredPullover!.image.url}
                width={designCanvasSize.width * 0.6}
                canvasSize={designCanvasSize}
                onClick={(e: KonvaEventObject<MouseEvent>) => {
                  checkDeselect(e);
                  selectImage(null);
                }}
              />
              {!designImagesAreLoading &&
                designImages.map((image) => (
                  <ResizableImage
                    key={`design-image-${designImages.indexOf(image)}`}
                    width={image.width}
                    height={image.height}
                    onDelete={() => onDeleteImage(image)}
                    originalPos={{
                      x: image.positionX!,
                      y: image.positionY!,
                    }}
                    originalSize={{
                      width: image.width,
                      height: image.height,
                    }}
                    canvasSize={designCanvasSize}
                    originalScale={{ x: image.scaleX!, y: image.scaleY! }}
                    src={image.url}
                    isSelected={
                      selectedImage != null &&
                      designImages.indexOf(image) ==
                        designImages.indexOf(selectedImage)
                    }
                    onSelect={() => selectImage(image)}
                    onPositionChange={(pos) =>
                      onImagePositionChange(pos, image)
                    }
                    onScaleChange={(scale) => onScaleChange(scale, image)}
                  />
                ))}
            </Layer>
          </Stage>
        )}
        <div className="w-full flex justify-evenly border flex-row flex-wrap">
          <div className="flex-1/3 md:block"></div>
          <div className="flex-1/1 md:flex-1/3 border flex justify-center">
            <div className="flex justify-center relative border-black border-2 bg-white rounded-4xl h-14 font-semibold [&>*]:cursor-pointer min-w-60 max-w-70">
              <button
                onClick={() => setViewingSide(ViewingSide.Front)}
                className={`z-10 w-1/2 text-black pl-2 ${viewingSide == ViewingSide.Front && "text-white"}`}
              >
                Vorne
              </button>
              <button
                onClick={() => setViewingSide(ViewingSide.Back)}
                className={`z-10 w-1/2 pr-2 ${viewingSide == ViewingSide.Back && "text-white"}`}
              >
                Hinten
              </button>
              <div
                className={`absolute h-14 rounded-4xl bg-black w-7/12 -top-0.5 ${viewingSide == ViewingSide.Front ? " -left-0.5" : "left-5/12"} transition-all duration-100`}
              />
            </div>
          </div>

          <div className="flex-1/1 md:flex-1/3 flex justify-en px-4">
            <BasicButton className="w-full" icon={faSave}>
              Speichern
            </BasicButton>
          </div>
        </div>
      </div>
      {userImages && <ImageSelection images={userImages} />}
    </div>
  );
}
