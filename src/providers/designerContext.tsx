import { Image, ImageWithPositionAndScale, Pullover } from "abipulli-types";
import { createContext } from "react";
import { ViewingSide } from "src/types/ViewingSide";
import { SizeType } from "src/types/canvas/sizeType";
import { DesignerData } from "./designerProvider";

export interface DesignerContextType extends DesignerData {
  updateState: (state: Partial<DesignerData>) => void;
  nextGenerateTab: () => void;
  previousGenerateTab: () => void;
  selectImage: (image?: ImageWithPositionAndScale) => void;
  selectUserImage: (image?: Image) => void;
  setViewingSide: (side: ViewingSide) => void;
  selectPullover: (pullover?: Pullover) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);
