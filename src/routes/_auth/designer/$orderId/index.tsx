import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "@react-hook/window-size";
import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { Design, Image, ImageWithPositionAndScale } from "abipulli-types";
import { KonvaEventObject } from "konva/lib/Node";
import { use, useEffect, useState } from "react";
import { Layer, Stage } from "react-konva";
import { BasicButton } from "src/components/Buttons/BasicButton";
import {
  ResizableImage,
  StaticImage,
} from "src/components/Designer/CanvasImages";
import { DesignSelection } from "src/components/Designer/DesignSelection";
import { ImageSelection } from "src/components/Designer/ImageSelection";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useDesigns } from "src/hooks/useDesigns";
import { useSnackbar } from "src/hooks/useSnackbar";
import { useUserImages } from "src/hooks/useUserImages";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { ViewingSide } from "src/types/ViewingSide";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { SizeType } from "src/types/canvas/sizeType";
import { useAuth } from "src/hooks/useAuth";
import { DesignApi } from "src/api/endpoints/design";

export const Route = createFileRoute("/_auth/designer/$orderId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [design, setDesign] = useState<Design | null>();

  const [viewingSide, setViewingSide] = useState<ViewingSide>(
    ViewingSide.Front
  );

  const params = useParams({ strict: false });
  const search = useSearch({ strict: false });

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
  const { user, isLoading } = useAuth();
  const userId = user?.id;
  const designsHook = useDesigns(userId ?? undefined);
  const { designs, fetchDesigns, designsAreLoading, designsError } =
    designsHook;

  const selectDesignById = (id: number) => {
    const design: Design | null = designs.filter((e) => e.id == id)[0];
    setDesign(design);
  };

  const onDeleteDesign = async (id: number) => {
    try {
      await DesignApi.deleteDesign(id, params.orderId);
      await fetchDesigns();
      setDesign(null);
    } catch (error) {
      console.error(error);
    }
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
  const [designCanvasSize, setDesignCanvasSize] = useState<SizeType>({
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
      if (search["selectedDesignId"] != null) {
        const selectedId = search["selectedDesignId"];
        if (designs.filter((e) => e.id == selectedId).length != 0) {
          selectDesignById(search["selectedDesignId"]);
        }
      }
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
    <main className="flex flex-row w-full" aria-label="Designer">
      {!designsAreLoading && (
        <DesignSelection
          deleteDesign={onDeleteDesign}
          designs={designs}
          selectedDesign={design ?? undefined}
          selectDesign={(id) => selectDesignById(id)}
          orderId={params["orderId"]!}
        />
      )}
      <div className="mx-2 lg:mx-16 xl:mx-30 border-3 ">
        {!design && <CanvasPlaceholder />}
        {design && (
          <Stage
            width={designCanvasSize.width}
            height={designCanvasSize.height}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            aria-label="Design Canvas"
            role="region"
          >
            <Layer>
              <StaticImage
                src={
                  viewingSide == ViewingSide.Front
                    ? design.preferredPullover!.frontImage.url
                    : design.preferredPullover!.backImage.url
                }
                width={designCanvasSize.width - 20}
                onClick={(e: KonvaEventObject<MouseEvent>) => {
                  checkDeselect(e);
                  selectImage(null);
                }}
                aria-label="Pullover Hintergrund"
              />
              {!designImagesAreLoading &&
                designImages
                  .filter((e) =>
                    viewingSide == ViewingSide.Front
                      ? !e.isBackside
                      : e.isBackside
                  )
                  .map((image) => (
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
                      aria-label={`Designbild ${designImages.indexOf(image) + 1}`}
                    />
                  ))}
            </Layer>
          </Stage>
        )}
        <div
          className="w-full flex flex-row justify-center mt-8"
          role="group"
          aria-label="Ansicht wechseln"
        >
          <FrontBackButton
            switchViewingSide={(side: ViewingSide) => setViewingSide(side)}
            currentViewingSide={viewingSide}
          />
        </div>
        <div
          className="flex justify-center mt-4"
          role="group"
          aria-label="Design speichern"
        >
          <BasicButton
            className="w-50 h-12"
            shadow
            icon={faSave}
            aria-label="Design speichern"
          >
            Speichern
          </BasicButton>
        </div>
      </div>
      <div
        className={`absolute md:relative z-20 flex-row transition-all right-0 duration-75`}
        aria-label="Bild Auswahl"
        role="region"
      >
        {userImages && (
          <ImageSelection
            onClick={(image: Image) => {
              if (!design) {
                return showSnackbar({
                  message: "Wähle ein Design aus bevor du ein Bild hinzufügst",
                });
              }
              addImageToDesign(
                image,
                designCanvasSize,
                design.id,
                viewingSide == ViewingSide.Back
              );
            }}
            images={userImages}
          />
        )}
      </div>
    </main>
  );
}
