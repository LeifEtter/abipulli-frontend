import { ReactElement, useState } from "react";
import { DesignerContext } from "./designerContext";
import { ViewingSide } from "src/types/ViewingSide";
import { SizeType } from "src/types/canvas/sizeType";
import { Image } from "abipulli-types";

export interface DesignerData {
  viewingSide: ViewingSide;
  designCanvasSize: SizeType;
  selectedImage?: Image;
  isDroppingImage: boolean;
  isUploadingImage: boolean;
}

export const DesignerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [state, setState] = useState<DesignerData>({
    viewingSide: ViewingSide.Front,
    designCanvasSize: { width: 500, height: 500 },
    selectedImage: undefined,
    isDroppingImage: false,
    isUploadingImage: false,
  });

  const updateState = (state: Partial<DesignerData>) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  return (
    <DesignerContext.Provider value={{ ...state, updateState }}>
      {children}
    </DesignerContext.Provider>
  );
};
