import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Image, Layer, Rect, Transformer } from "react-konva";
import useImage from "use-image";
import { KonvaEventObject } from "konva/lib/Node";
import { Image as KonvaImage } from "konva/lib/shapes/Image";
import Konva from "konva";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";

interface StaticImageParams {
  src: string;
  width: number;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
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
      stroke={"3"}
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
          onClick={onSelect}
          onTap={onSelect}
          ref={imageRef}
          image={image}
          scale={viewData.scale}
          x={viewData.pos.x}
          y={viewData.pos.y}
          draggable
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
            enabledAnchors={["middle-right", "bottom-right", "bottom-center"]}
            rotateEnabled={false}
            aria-label="Bildgröße ändern"
            role="group"
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
              width={40}
              height={40}
              cornerRadius={6}
              fill={"white"}
              x={viewData.pos.x - 20}
              y={viewData.pos.y - 20}
            />
            <Image
              image={trashImage}
              width={30}
              height={30}
              x={viewData.pos.x - 15}
              y={viewData.pos.y - 15}
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
