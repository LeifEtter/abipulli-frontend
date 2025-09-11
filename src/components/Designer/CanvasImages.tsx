import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Image, Layer, Rect, Transformer } from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";
import { Image as KonvaImage } from "konva/lib/shapes/Image";
import Konva from "konva";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";
import ResizeIcon from "src/assets/icons/resize-icon.svg";

interface StaticImageParams {
  src: string;
  width: number;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
  name?: string;
}

/**
 * Renders a Static image for use in Konva Canvas
 *
 * @param src - Source for image
 * @param width - Width of image
 * @param onClick - Function to run if image is clicked
 * @returns Static Konva Image
 */
export const StaticImage: React.FC<StaticImageParams> = ({
  src,
  width,
  onClick,
  name,
}) => {
  const [image] = useImage(src);

  const [imageRatio, setImageRatio] = useState(1);

  useEffect(() => {
    if (image) {
      const imageWidth: number = image.width;
      const imageHeight: number = image.height;
      const ratio: number = imageHeight / imageWidth;
      setImageRatio(ratio);
    }
  }, [image, width, imageRatio]);

  return (
    <Image
      name={name}
      onClick={onClick}
      image={image}
      height={width * imageRatio}
      width={width}
      x={0}
      y={0}
    />
  );
};

interface ResizableImageProps {
  width: number;
  height: number;
  originalSize: SizeType;
  canvasSize: SizeType;
  originalPos: PositionType;
  originalScale: ScaleType;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (pos: PositionType) => void;
  onScaleChange: (scale: ScaleType) => void;
  onDelete: () => void;
  src: string;
}

interface ViewData {
  pos: PositionType;
  scale: ScaleType;
}

/**
 * Renders a draggable, resizable Image for use in Konva Canvas
 *
 * @params ResizableImageProps
 * @returns Draggable, Resizable Konva Image
 */
export const ResizableImage = ({
  width,
  originalPos,
  originalScale,
  isSelected,
  onSelect,
  onPositionChange,
  onScaleChange,
  onDelete,
  src,
}: ResizableImageProps) => {
  const [image] = useImage(src);
  const [trashImage] = useImage("/src/assets/icons/trash-icon.svg");
  const [resizeImage] = useImage(ResizeIcon);
  const imageRef = useRef<KonvaImage>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [viewData, setViewData] = useState<ViewData | null>(null);

  const [deleteVisible, setDeleteVisible] = useState<boolean>(true);

  useEffect(() => {
    setViewData({
      pos: { x: originalPos.x, y: originalPos.y },
      scale: originalScale,
    });
    if (isSelected && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
    }
  }, [isSelected, originalPos, originalScale]);

  return viewData != null ? (
    <Group>
      <Fragment>
        <Image
          onMouseOver={(e) => {
            if (isSelected) {
              e.target.getStage()!.container().style.cursor = "grab";
            } else {
              e.target.getStage()!.container().style.cursor = "pointer";
            }
          }}
          onClick={(e) => {
            e.target.getStage()!.container().style.cursor = "grab";
            onSelect();
          }}
          onTap={onSelect}
          ref={imageRef}
          image={image}
          scale={viewData.scale}
          x={viewData.pos.x}
          y={viewData.pos.y}
          draggable={isSelected}
          aria-label="Bild verschieben und skalieren"
          role="img"
          onDragStart={() => setDeleteVisible(false)}
          onTransformStart={() => setDeleteVisible(false)}
          onDragEnd={(e: KonvaEventObject<DragEvent>) => {
            onPositionChange({ x: e.target.x(), y: e.target.y() });
            setViewData({
              ...viewData,
              pos: { x: e.target.x(), y: e.target.y() },
            });
            setDeleteVisible(true);
          }}
          onTransformEnd={(_) => {
            if (!imageRef.current) return;
            onScaleChange({
              x: imageRef.current.scaleX(),
              y: imageRef.current.scaleY(),
            });
            setViewData({
              ...viewData,
              scale: {
                x: imageRef.current.scaleX(),
                y: imageRef.current.scaleY(),
              },
            });
            setDeleteVisible(true);
          }}
        />

        {isSelected && (
          <Transformer
            //! Implement Rotation
            ref={trRef}
            flipEnabled={false}
            anchorStyleFunc={(anchor) => {
              if (anchor.name().includes("rotate")) {
                anchor.position({
                  x: image!.width * viewData.scale.x + 15,
                  y: -30,
                });
              }
              if (anchor.name() == "bottom-right _anchor") {
                anchor.setPosition({
                  x: anchor.position().x + 15,
                  y: anchor.position().y + 15,
                });
              }
              anchor.fill("white");
              anchor.strokeWidth(0);
              anchor.size({ width: 25, height: 25 });
              anchor.cornerRadius(3);

              if (!deleteVisible) anchor.hide();
            }}
            enabledAnchors={["bottom-right"]}
            rotateEnabled={true}
            rotateLineVisible={false}
            aria-label="Bildgröße ändern"
            role="group"
          />
        )}
        {deleteVisible && isSelected && (
          <Image
            fillEnabled={false}
            image={resizeImage}
            x={viewData.pos.x + image!.width * viewData.scale.x + 15}
            y={viewData.pos.y + image!.height * viewData.scale.y + 15}
            width={15}
            height={15}
          />
        )}
        {deleteVisible && isSelected && (
          <Group
            onClick={onDelete}
            onTap={onDelete}
            aria-label="Bild löschen"
            role="button"
            tabIndex={0}
          >
            <Rect
              width={25}
              height={25}
              cornerRadius={3}
              fill={"white"}
              x={viewData.pos.x - 35}
              y={viewData.pos.y - 35}
            />
            <Image
              image={trashImage}
              width={15}
              height={15}
              x={viewData.pos.x - 30}
              y={viewData.pos.y - 30}
              aria-label="Papierkorb Icon"
              role="img"
            />
          </Group>
        )}
      </Fragment>
    </Group>
  ) : (
    <Fragment />
  );
};
