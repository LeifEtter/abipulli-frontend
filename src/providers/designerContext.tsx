import { Image } from "abipulli-types";
import { createContext } from "react";
import { ViewingSide } from "src/types/ViewingSide";
import { SizeType } from "src/types/canvas/sizeType";
import { DesignerData } from "./designerProvider";

export interface DesignerContextType extends DesignerData {
  updateState: (state: Partial<DesignerData>) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);
