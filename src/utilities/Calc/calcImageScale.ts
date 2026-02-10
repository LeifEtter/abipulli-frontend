import { SizeType } from "src/types/canvas/sizeType";

export const calcImageScale = ({
  canvasSize,
  imageSize,
}: {
  canvasSize: SizeType;
  imageSize: SizeType;
}): number => {
  const widthDiff = imageSize.width - canvasSize.width * 0.5;
  const heightDiff = imageSize.height - canvasSize.height * 0.5;

  const imageWiderThanCanvas = widthDiff > heightDiff && widthDiff > 0;
  const imageTallerThanCanvas = heightDiff > 0;

  let scale: number;
  if (imageWiderThanCanvas) {
    scale = (canvasSize.width * 0.5) / imageSize.width;
  } else if (imageTallerThanCanvas) {
    scale = (canvasSize.height * 0.5) / imageSize.height;
  } else {
    scale = 1;
  }
  return scale;
};
