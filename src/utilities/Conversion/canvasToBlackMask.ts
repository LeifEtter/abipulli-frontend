import { PositionType } from "src/types/canvas/positionType";
import { SizeType } from "src/types/canvas/sizeType";

interface CanvasToBlackMaskProps {
  canvasImage: HTMLImageElement;
  canvasDimensions: SizeType;
  canvas: HTMLCanvasElement;
  imageDimensions: SizeType;
  imagePosition: PositionType;
}

// export async function exportIdeogramMask(opts?: {
//   format?: "image/png" | "image/jpeg" | "image/webp"; // default png
//   quality?: number; // 0..1, only for jpeg/webp
// }):

export const canvasToBlackMask = async ({
  canvasImage,
  canvasDimensions,
  canvas,
  imageDimensions,
  imagePosition,
}: CanvasToBlackMaskProps) => {
  if (!canvasImage) return;

  const natW =
    (canvasImage as any).naturalWidth ??
    imageDimensions.width ??
    canvasImage.width;
  const natH =
    (canvasImage as any).naturalHeight ??
    imageDimensions.height ??
    canvasImage.height;

  // The photo is displayed at (imagePos) with size (imageSize) inside a Stage-sized brush canvas.
  // Compute the crop of the brush canvas that overlaps the photo on the Stage:
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
  // const format = opts?.format ?? "image/png";
  // const quality = opts?.quality ?? 0.92;
  const format = "image/png";
  const quality = 1.0;

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
};
