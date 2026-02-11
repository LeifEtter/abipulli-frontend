import { ImageWithPositionAndScale, Pullover } from "abipulli-types";
import { Layer, Stage } from "react-konva";
import { SizeType } from "src/types/canvas/sizeType";
import { ViewingSide } from "src/types/ViewingSide";
import { ResizableImage, StaticImage } from "../Designer/CanvasImages";
import ExamplePullover from "src/assets/pullovers/sand-front.png";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { KonvaEventObject } from "konva/lib/Node";

interface NewDesignerCanvasProps {
  designCanvasSize: SizeType;
  designImages: ImageWithPositionAndScale[];
  designImagesAreLoading: boolean;
  viewingSide: ViewingSide;
  selectedImage: ImageWithPositionAndScale | undefined;
  selectImage: (image: ImageWithPositionAndScale) => void;
  deselectImage: () => void;
  onImagePositionChange: (
    pos: PositionType,
    image: ImageWithPositionAndScale,
  ) => void;
  onScaleChange: (scale: ScaleType, image: ImageWithPositionAndScale) => void;
  onDeleteImage: (image: ImageWithPositionAndScale) => void;
  zoom: number;
  deselectUserImage: () => void;
  pulloverFront: string;
  pulloverBack: string;
  setEditPanelOpen: (open: boolean) => void;
}

export const NewDesignerCanvas = ({
  designCanvasSize,
  designImages,
  designImagesAreLoading,
  viewingSide,
  selectedImage,
  selectImage,
  deselectImage,
  onImagePositionChange,
  onScaleChange,
  onDeleteImage,
  zoom,
  deselectUserImage,
  pulloverFront,
  pulloverBack,
  setEditPanelOpen,
}: NewDesignerCanvasProps) => {
  const clickedOnPulloverImage = (target: string): boolean => {
    return target == "pullover-image-back" || target == "pullover-image-front";
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty =
      e.target === e.target.getStage() ||
      clickedOnPulloverImage(e.target.name());
    if (clickedOnEmpty) {
      deselectImage();
      deselectUserImage();
      setEditPanelOpen(false);
    }
  };

  const checkResetCursor = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (
      e.target.getStage() == e.target ||
      clickedOnPulloverImage(e.target.name())
    )
      e.target.getStage()!.container().style.cursor = "default";
  };

  return (
    <Stage
      width={designCanvasSize.width}
      height={designCanvasSize.height}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      onMouseOver={checkResetCursor}
      scale={{ x: zoom / 100, y: zoom / 100 }}
      // draggable
    >
      <Layer>
        {/* <Rect x={0} y={0} width={50} height={50} fill="red" /> */}
        {viewingSide == ViewingSide.Front ? (
          <StaticImage
            src={pulloverFront}
            width={500}
            name="pullover-image-front"
            parentWidth={designCanvasSize.width}
          />
        ) : (
          <StaticImage
            src={pulloverBack}
            width={500}
            name="pullover-image-back"
            parentWidth={designCanvasSize.width}
          />
        )}

        {!designImagesAreLoading &&
          designImages
            .filter((e) =>
              viewingSide == ViewingSide.Front ? !e.isBackside : e.isBackside,
            )
            .map((image) => {
              return (
                <ResizableImage
                  setEditPanelOpen={setEditPanelOpen}
                  zoom={zoom / 100}
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
                  onPositionChange={(pos) => onImagePositionChange(pos, image)}
                  onScaleChange={(scale) => onScaleChange(scale, image)}
                  aria-label={`Designbild ${designImages.indexOf(image) + 1}`}
                />
              );
            })}
        {/* <Text x={60} y={60} text="Hey" fontFamily="Onest" /> */}
      </Layer>
    </Stage>
  );
};
