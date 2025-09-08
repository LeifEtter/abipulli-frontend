import { PositionType } from "src/types/canvas/positionType";
import { SizeType } from "src/types/canvas/sizeType";

interface CanvasToMaskProps {
  canvasImage: HTMLImageElement;
  canvasDimensions: SizeType;
  canvas: HTMLCanvasElement;
  imageDimensions: SizeType;
  imagePosition: PositionType;
}

export async function canvasToMask({
  canvasImage,
  canvasDimensions,
  canvas,
  imageDimensions,
  imagePosition,
}: CanvasToMaskProps): Promise<string | undefined> {
  if (!canvasImage) return;

  // Natural/original pixel size of the source image
  const natW =
    (canvasImage as any).naturalWidth ??
    imageDimensions.width ??
    canvasImage.width;
  const natH =
    (canvasImage as any).naturalHeight ??
    imageDimensions.height ??
    canvasImage.height;

  // Build a natural-sized mask canvas
  const maskNat = document.createElement("canvas");
  maskNat.width = natW;
  maskNat.height = natH;
  const mctx = maskNat.getContext("2d")!;

  // Crop the brush canvas to the displayed photo rectangle on the Stage
  const sx = Math.max(0, imagePosition.x);
  const sy = Math.max(0, imagePosition.y);
  const sWidth = Math.max(
    0,
    Math.min(canvasDimensions.width - sx, imageDimensions.width)
  );
  const sHeight = Math.max(
    0,
    Math.min(canvasDimensions.height - sy, imageDimensions.height)
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
