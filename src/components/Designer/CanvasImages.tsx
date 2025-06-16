import { Fragment, useEffect, useRef, useState } from "react";
import { Image, Transformer } from "react-konva";
import { DesignCanvasSize } from "src/utilities/Design/calculateDesignWindow";
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
  initialX?: number;
  initialY?: number;
  canvasSize?: DesignCanvasSize;
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;
}

export const StaticImage: React.FC<StaticImageParams> = ({
  src,
  width,
  initialX,
  initialY,
  canvasSize,
  onClick,
}) => {
  const [image] = useImage(src);

  const [imageRatio, setImageRatio] = useState(1);

  const [x, setX] = useState<number>(initialX ?? 0);
  const [y, setY] = useState<number>(initialY ?? 0);

  useEffect(() => {
    if (image) {
      const imageWidth: number = image.width;
      const imageHeight: number = image.height;
      const ratio: number = imageHeight / imageWidth;
      setImageRatio(ratio);
      setX(canvasSize!.width / 2 - width / 2);
      setY(canvasSize!.height / 2 - (width * imageRatio) / 2);
    }
  }, [image, canvasSize, width, imageRatio]);

  return (
    <Image
      onClick={onClick}
      image={image}
      height={width * imageRatio}
      width={width}
      x={x}
      y={y}
    />
  );
};

interface ResizableImageProps {
  originalSize: SizeType;
  canvasSize: SizeType;
  originalPos: PositionType;
  originalScale: ScaleType;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (pos: PositionType) => void;
  onScaleChange: (scale: ScaleType) => void;
  src: string;
}

interface ViewData {
  pos: PositionType;
  scale: ScaleType;
}

export const ResizableImage = ({
  originalPos,
  originalScale,
  isSelected,
  onSelect,
  onPositionChange,
  onScaleChange,
  src,
}: ResizableImageProps) => {
  const [image] = useImage(src);
  const imageRef = useRef<KonvaImage>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const [viewData, setViewData] = useState<ViewData | null>(null);

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
    <Fragment>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={imageRef}
        image={image}
        scale={viewData.scale}
        x={50}
        y={50}
        draggable
        onDragEnd={(e: KonvaEventObject<DragEvent>) => {
          const newPosition: PositionType = {
            x: e.target.x(),
            y: e.target.y(),
          };
          onPositionChange(newPosition);
        }}
        onTransformEnd={(_) => {
          if (!imageRef.current) return;
          onScaleChange({
            x: imageRef.current.scaleX(),
            y: imageRef.current.scaleY(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </Fragment>
  ) : (
    <Fragment />
  );
};
