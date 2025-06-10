import { Image } from "abipulli-types";
import { PositionType } from "./positionType";
import { ScaleType } from "./scaleType";

export interface CanvasImage {
  pos: PositionType;
  scale: ScaleType;
  image: Image;
}
