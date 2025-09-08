import { Image } from "abipulli-types";
import { ActionPanel } from "./ActionPanel";
import EraserIcon from "src/assets/icons/eraser-icon.svg";
import { Center } from "../Misc/Center";
import StarsIcon from "src/assets/icons/stars-icon.svg";
import { InputField } from "../Inputs/InputField";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";
import { KonvaEventObject, Node, NodeConfig } from "konva/lib/Node";
import { ImproveButton } from "./ImproveButton";
import useImage from "use-image";
import { SizeType } from "src/types/canvas/sizeType";
import { PositionType } from "src/types/canvas/positionType";
import { BasicButton } from "../Buttons/BasicButton";

interface ImproveImagePanelProps {
  image: Image;
}

export const ImproveImagePanel = ({ image }: ImproveImagePanelProps) => {
  const [improvement, setImprovement] = useState<string>();

  const [canvasImage] = useImage(
    "https://abipulli.nbg1.your-objectstorage.com/DO_NOT_DELETE/Examples/new.png",
    "anonymous"
  );

  const CANVAS_SIZE: SizeType = { width: 400, height: 400 };

  const [imageSize, setImageSize] = useState<SizeType>({
    width: image.width,
    height: image.height,
  });

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
  const maskRef = useRef<any>(null); // Konva.Image or null
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

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const stage = e.target?.getStage?.();
    lastPos.current = stage?.getPointerPosition?.() ?? null;
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleMouseMove = (
    e: KonvaEventObject<MouseEvent | TouchEvent, Node<NodeConfig>>
  ) => {
    if (
      !isDrawing.current ||
      !maskRef.current ||
      !context ||
      !lastPos.current ||
      !e.target.getStage()
    )
      return;
    context.lineWidth = strokeWidth;
    const image = maskRef.current;
    const stage: Konva.Stage = e.target.getStage()!;

    context.globalCompositeOperation =
      tool === "eraser" ? "destination-out" : "source-over";
    context.beginPath();

    const localPos = {
      x: lastPos.current.x - (image.x?.() ?? 0),
      y: lastPos.current.y - (image.y?.() ?? 0),
    };
    context.moveTo(localPos.x, localPos.y);

    const pos = stage.getPointerPosition?.();
    if (!pos) return;
    const newLocalPos = {
      x: pos.x - (image.x?.() ?? 0),
      y: pos.y - (image.y?.() ?? 0),
    };
    context.lineTo(newLocalPos.x, newLocalPos.y);
    context.closePath();
    context.stroke();

    lastPos.current = pos;
    image.getLayer?.()?.batchDraw?.();
  };

  async function exportMaskedPNG(): Promise<string | undefined> {
    if (!canvasImage) return;

    // Natural/original pixel size of the source image
    const natW =
      (canvasImage as any).naturalWidth ?? image.width ?? canvasImage.width;
    const natH =
      (canvasImage as any).naturalHeight ?? image.height ?? canvasImage.height;

    // Build a natural-sized mask canvas
    const maskNat = document.createElement("canvas");
    maskNat.width = natW;
    maskNat.height = natH;
    const mctx = maskNat.getContext("2d")!;

    // Crop the brush canvas to the displayed photo rectangle on the Stage
    const sx = Math.max(0, imagePos.x);
    const sy = Math.max(0, imagePos.y);
    const sWidth = Math.max(
      0,
      Math.min(CANVAS_SIZE.width - sx, imageSize.width)
    );
    const sHeight = Math.max(
      0,
      Math.min(CANVAS_SIZE.height - sy, imageSize.height)
    );

    if (sWidth <= 0 || sHeight <= 0) return;

    // Draw that crop into the natural-sized mask
    mctx.drawImage(
      canvas, // source = your brush canvas (Stage-sized)
      sx, // source x (stage coords)
      sy, // source y
      sWidth, // source w
      sHeight, // source h
      0, // dest x
      0, // dest y
      natW, // dest w (scale to natural)
      natH // dest h
    );

    // Output canvas at natural size
    const out = document.createElement("canvas");
    out.width = natW;
    out.height = natH;
    const octx = out.getContext("2d")!;

    console.log("All good");

    // Draw the original photo at full resolution
    octx.drawImage(canvasImage, 0, 0, natW, natH);

    // Keep only painted parts
    octx.globalCompositeOperation = "destination-in";
    octx.drawImage(maskNat, 0, 0);
    octx.globalCompositeOperation = "source-over";

    console.log("All good still");

    return out.toDataURL("image/png");
  }

  async function exportIdeogramMask(opts?: {
    format?: "image/png" | "image/jpeg" | "image/webp"; // default png
    quality?: number; // 0..1, only for jpeg/webp
  }): Promise<Blob | undefined> {
    if (!canvasImage) return;

    const natW =
      (canvasImage as any).naturalWidth ?? image.width ?? canvasImage.width;
    const natH =
      (canvasImage as any).naturalHeight ?? image.height ?? canvasImage.height;

    // The photo is displayed at (imagePos) with size (imageSize) inside a Stage-sized brush canvas.
    // Compute the crop of the brush canvas that overlaps the photo on the Stage:
    const sx = Math.max(0, imagePos.x);
    const sy = Math.max(0, imagePos.y);
    const sWidth = Math.max(
      0,
      Math.min(CANVAS_SIZE.width - sx, imageSize.width)
    );
    const sHeight = Math.max(
      0,
      Math.min(CANVAS_SIZE.height - sy, imageSize.height)
    );
    if (sWidth <= 0 || sHeight <= 0) return;

    // Create a natural-sized mask canvas
    const mask = document.createElement("canvas");
    mask.width = natW;
    mask.height = natH;
    const mctx = mask.getContext("2d")!;

    // === Build a binary mask: BLACK where brush has alpha, WHITE elsewhere ===
    // Fill BLACK everywhere first
    mctx.fillStyle = "#000";
    mctx.fillRect(0, 0, natW, natH);

    // Keep black only where the brush has alpha (use brush alpha as a stencil)
    mctx.globalCompositeOperation = "destination-in";
    mctx.imageSmoothingEnabled = true; // smoother scaling
    mctx.drawImage(
      canvas, // source: Stage-sized brush canvas
      sx,
      sy, // crop within stage coords
      sWidth,
      sHeight,
      0,
      0, // dest origin
      natW,
      natH // scale to natural size
    );

    // Turn all remaining transparent pixels (i.e., where no brush) into WHITE
    mctx.globalCompositeOperation = "destination-over";
    mctx.fillStyle = "#fff";
    mctx.fillRect(0, 0, natW, natH);

    // Reset comp op
    mctx.globalCompositeOperation = "source-over";

    // Encode as requested format (PNG safest for crisp BW; JPEG/WebP shrink size if needed)
    const format = opts?.format ?? "image/png";
    const quality = opts?.quality ?? 0.92;

    const blob: Blob = await new Promise((resolve) =>
      mask.toBlob((b) => resolve(b as Blob), format, quality)
    );

    // Optional: sanity clamp to <= 10MB (Ideogram’s limit). If too big, try WebP/JPEG at lower quality.
    if (blob.size > 10 * 1024 * 1024 && format === "image/png") {
      // retry with webp
      const fallback: Blob = await new Promise((resolve) =>
        mask.toBlob((b) => resolve(b as Blob), "image/webp", 0.85)
      );
      return fallback;
    }
    return blob;
  }

  return (
    <ActionPanel
      title="Verbessere dein Bild"
      description="Markiere den Teil den du verbessert haben willst und schreibe wie es verbessert werden soll"
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
            <KonvaImage
              image={canvasImage}
              onClick={() => {}}
              width={imageSize.width}
              height={imageSize.height}
              x={imagePos.x}
              y={imagePos.y}
            />
            <KonvaImage ref={imageRef} image={canvas} x={0} y={0} />
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
        onClick={() => {}}
        className="bg-white border flex flex-row justify-center items-center gap-4 p-3 rounded-xl w-full mt-4"
      >
        <img className="w-6" src={StarsIcon} />
        <p className="font-semibold">Bild Verbessern</p>
      </button>
      {/* <div className="separator mt-4" /> */}
    </ActionPanel>
  );
};
