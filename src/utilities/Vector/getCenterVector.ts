import { PositionType } from "src/types/canvas/positionType";
import { SizeType } from "src/types/canvas/sizeType";

export const getCenterVector = (size: SizeType): PositionType => {
  const x = size.width / 2;
  const y = size.height / 2;
  return { x, y };
};
