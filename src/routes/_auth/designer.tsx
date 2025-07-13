import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import { createFileRoute } from "@tanstack/react-router";
import { Design, Image, ImageWithPositionAndScale } from "abipulli-types";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { BasicButton } from "src/components/Buttons/BasicButton";
import {
  ResizableImage,
  StaticImage,
} from "src/components/Designer/CanvasImages";
import { DesignsSelection } from "src/components/Designer/DesignSelection";
import { ImageSelection } from "src/components/Designer/ImageSelection";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useDesigns } from "src/hooks/useDesigns";
import { useSnackbar } from "src/hooks/useSnackbar";
import { useUserImages } from "src/hooks/useUserImages";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { DesignCanvasSize } from "src/utilities/Design/calculateDesignWindow";
import { ViewingSide } from "src/types/ViewingSide";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";

export const Route = createFileRoute("/_auth/designer")({
  component: RouteComponent,
});

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
    width: 400,
    height: 550,
  });

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

  const [imageSelectorExpanded, setImageSelectorExpanded] =
    useState<boolean>(false);

  const CanvasPlaceholder: React.FC = () => (
    <div
      style={{
        width: designCanvasSize.width,
        height: designCanvasSize.height,
      }}
    />
  );

  return (
    <div className="flex flex-row w-full">
      {!designsAreLoading && (
        <DesignsSelection
          designs={designs}
          selectedDesign={design ?? undefined}
          selectDesign={(id) => selectDesignById(id)}
        />
      )}
      <div className="mx-2 lg:mx-16 xl:mx-30">
        {!design && <CanvasPlaceholder />}
        {design && (
          <Stage
            width={designCanvasSize.width}
            height={designCanvasSize.height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
          >
            <Layer>
              <StaticImage
                src={design.preferredPullover!.image.url}
                width={designCanvasSize.width - 20}
                canvasSize={{
                  width: designCanvasSize.width,
                  height: designCanvasSize.height,
                }}
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
        <div className="w-full flex flex-row justify-center mt-8">
          <FrontBackButton
            switchViewingSide={(side: ViewingSide) => setViewingSide(side)}
            currentViewingSide={viewingSide}
          />
        </div>
        <div className="flex justify-center mt-4">
          <BasicButton className="w-50 h-12" shadow icon={faSave}>
            Speichern
          </BasicButton>
        </div>
      </div>
      <div
        onClick={() => setImageSelectorExpanded(false)}
        className={`${imageSelectorExpanded ? "absolute" : "hidden"} absolute z-10 bg-gray-800/20 w-full h-full top-0 left-0`}
      />
      <div
        onClick={() => !imageSelectorExpanded && setImageSelectorExpanded(true)}
        className={`absolute md:relative z-20 flex-row ${imageSelectorExpanded ? "right-0" : "-right-25 "} md:right-0 transition-all duration-75`}
      >
        {userImages && (
          <ImageSelection
            onClick={(image: Image) => {
              if (!imageSelectorExpanded) {
                setImageSelectorExpanded(true);
                return;
              }
              if (!design) {
                return showSnackbar({
                  message: "Wähle ein Design aus bevor du ein Bild hinzufügst",
                });
              }
              addImageToDesign(image, designCanvasSize, design.id);
            }}
            images={userImages}
          />
        )}
      </div>
    </div>
  );
}
