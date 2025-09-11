import { Image } from "abipulli-types";
import { ActionPanel } from "./ActionPanel";
import EraserIcon from "src/assets/icons/eraser-icon.svg";
import StarsIcon from "src/assets/icons/stars-icon.svg";
import { InputField } from "../Inputs/InputField";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { ImproveButton } from "./ImproveButton";
import useImage from "use-image";
import { SizeType } from "src/types/canvas/sizeType";
import { PositionType } from "src/types/canvas/positionType";
import { canvasToMask } from "src/utilities/Conversion/canvasToMask";
import { canvasToBlackMask } from "src/utilities/Conversion/canvasToBlackMask";
import { Vector2d } from "konva/lib/types";

interface ImproveImagePanelProps {
  image: Image | undefined;
}

export const ImproveImagePanel = ({ image }: ImproveImagePanelProps) => {
  const [improvement, setImprovement] = useState<string>();

  const [canvasImage] = useImage(image ? image.url : "", "anonymous");

  const CANVAS_SIZE: SizeType = { width: 400, height: 400 };

  const [imageSize, setImageSize] = useState<SizeType>();

  useEffect(() => {
    if (!image) return;
    setImageSize({ width: image.width, height: image.height });
  }, [image]);

  const [imagePos, setImagePos] = useState<PositionType>({ x: 0, y: 0 });

  const imgRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (!canvasImage) return;
    let scale: number = 1;

    let imageWidth = canvasImage.width!;
    let imageHeight = canvasImage.height!;

    const widthDiff = imageWidth - CANVAS_SIZE.width;
    const heightDiff = imageHeight - CANVAS_SIZE.height;

    if (widthDiff != 0 && widthDiff >= heightDiff) {
      scale = CANVAS_SIZE.width / imageWidth;
    } else if (heightDiff != 0 && heightDiff > widthDiff) {
      scale = CANVAS_SIZE.height / imageHeight;
    } else if (heightDiff < 0 && heightDiff > widthDiff) {
      scale = imageHeight / CANVAS_SIZE.height;
    } else if (widthDiff < 0 && widthDiff > heightDiff) {
      scale = imageWidth / CANVAS_SIZE.width;
    }

    setImageSize({
      width: imageWidth * scale,
      height: imageHeight * scale,
    });
    setImagePos({ x: CANVAS_SIZE.width / 2 - (imageWidth * scale) / 2, y: 0 });
  }, [canvasImage]);

  const [tool, setTool] = useState<string>("brush");
  const [strokeWidth, setStrokeWidth] = useState<number>(50);
  const isDrawing = useRef<boolean>(false);
  const maskRef = useRef<Konva.Image>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const { canvas, context } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = CANVAS_SIZE.width;
    c.height = CANVAS_SIZE.height;
    const ctx = c.getContext("2d")!;
    ctx.strokeStyle = "#ffffff";
    ctx.globalAlpha = 1;
    ctx.lineJoin = "round";
    ctx.lineWidth = strokeWidth;
    return { canvas: c, context: ctx };
  }, [CANVAS_SIZE.width, CANVAS_SIZE.height]);

  const handleMouseDown = (
    e: KonvaEventObject<MouseEvent | TouchEvent, Node<NodeConfig>>
  ) => {
    const stage: Konva.Stage | null = e.target.getStage();
    if (!stage) return;
    isDrawing.current = true;
    lastPos.current = stage.getPointerPosition();
  };

  const handleMouseUp = () => (isDrawing.current = false);

  const handleMouseMove = (
    e: KonvaEventObject<MouseEvent | TouchEvent, Node<NodeConfig>>
  ) => {
    const stage: Konva.Stage | null = e.target.getStage();
    if (
      !isDrawing.current ||
      !maskRef.current ||
      !context ||
      !lastPos.current ||
      !stage
    )
      return;
    context.lineWidth = strokeWidth;
    const image = maskRef.current;

    context.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    context.beginPath();

    const localPos = {
      x: lastPos.current.x - (image.x() ?? 0),
      y: lastPos.current.y - (image.y() ?? 0),
    };
    context.moveTo(localPos.x, localPos.y);

    const pos: Vector2d | null = stage.getPointerPosition();
    if (!pos) return;
    const newLocalPos = {
      x: pos.x - (image.x() ?? 0),
      y: pos.y - (image.y() ?? 0),
    };
    context.lineTo(newLocalPos.x, newLocalPos.y);
    context.closePath();
    context.stroke();

    lastPos.current = pos;
    image.getLayer?.()?.batchDraw?.();
  };

  return (
    <ActionPanel
      title="Verbessere dein Bild"
      description="Markiere den Teil den du verbessert haben willst und schreibe wie es verbessert werden soll"
      hide={image == undefined}
    >
      <p className="mt-2 font-semibold mb-2">Werkzeuge</p>
      <div className="flex flex-row items-center">
        <ImproveButton
          onClick={() => setTool("brush")}
          label={"Markieren"}
          icon={<div className="h-3.5 w-3.5 border border-dashed" />}
          selected={tool == "brush"}
        />
        <ImproveButton
          onClick={() => setTool("eraser")}
          label={"Markierung Löschen"}
          icon={<img src={EraserIcon} className="w-5 h-5" />}
          selected={tool == "eraser"}
        />
      </div>
      <div className="mt-2">
        <ImproveButton
          onClick={() => console.log("Remove bg")}
          label={"Hintergrund Entfernen"}
          icon={<img src={StarsIcon} className="w-5 h-5" />}
          selected={false}
        />
      </div>
      <div className="flex flex-row items-center justify-start">
        <p className="font-semibold">Marker Größe:</p>
        <input
          id="default-range"
          type="range"
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
          value={strokeWidth}
          className="ml-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        {/* <input
          type="number"
          value={strokeWidth}
          className="bg-white border w-10 p-0.5 "
        /> */}
        <p className="font-semibold ml-2">{strokeWidth}</p>
      </div>

      <div className="flex justify-center items-start">
        <Stage
          // scale={{ x: 2, y: 2 }}
          // draggable
          className="mt-2 border"
          width={CANVAS_SIZE.width}
          height={CANVAS_SIZE.height}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {image && imageSize ? (
              <KonvaImage
                ref={imgRef}
                image={canvasImage}
                onClick={() => {}}
                width={imageSize!.width}
                height={imageSize!.height}
                x={imagePos.x}
                y={imagePos.y}
              />
            ) : (
              <></>
            )}
            <KonvaImage ref={maskRef} image={canvas} x={0} y={0} />
          </Layer>
        </Stage>
      </div>
      <p className="mt-4 font-semibold">Verbesserung</p>
      <InputField
        multiline
        minLines={3}
        onChange={(v) => setImprovement(v)}
        value={improvement}
      />
      <button
        onClick={async () => {
          if (!canvasImage || !image) return;
          const mask = await canvasToMask({
            imageDimensions: { width: image.width, height: image.height },
            imagePosition: imagePos,
            canvasImage: canvasImage,
            canvas: canvas,
            canvasDimensions: CANVAS_SIZE,
          });

          const link = document.createElement("a");
          link.href = mask ?? "";
          link.download = "masked.png";
          link.click();
        }}
        className="bg-white border flex flex-row justify-center items-center gap-4 p-3 rounded-xl w-full mt-4"
      >
        <img className="w-6" src={StarsIcon} />
        <p className="font-semibold">Bild Verbessern</p>
      </button>
      <button
        onClick={async () => {
          if (!canvasImage || !image) return;
          const result: Blob | undefined = await canvasToBlackMask({
            imageDimensions: { width: image.width, height: image.height },
            imagePosition: imagePos,
            canvasImage: canvasImage,
            canvas: canvas,
            canvasDimensions: CANVAS_SIZE,
          });
          if (!result) return;
          const url = URL.createObjectURL(result);
          // preview in <img src={url} />
          const a = document.createElement("a");
          a.href = url;
          a.download = "ideogram-mask.png";
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Download
      </button>
      {/* <div className="separator mt-4" /> */}
    </ActionPanel>
  );
};
