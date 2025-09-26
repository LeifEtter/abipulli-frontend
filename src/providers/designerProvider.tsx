import { ReactElement, useState } from "react";
import { DesignerContext } from "./designerContext";
import { ViewingSide } from "src/types/ViewingSide";
import { SizeType } from "src/types/canvas/sizeType";
import { Image, ImageWithPositionAndScale } from "abipulli-types";

export interface DesignerData {
  viewingSide: ViewingSide;
  designCanvasSize: SizeType;
  selectedImage?: Image;
  isDroppingImage: boolean;
  isUploadingImage: boolean;
  generateTab?: number;
  userImage?: Image;
}

export const DesignerProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [state, setState] = useState<DesignerData>({
    viewingSide: ViewingSide.Front,
    designCanvasSize: {
      width: 600,
      height: 700,
    },
    selectedImage: undefined,
    isDroppingImage: false,
    isUploadingImage: false,
    generateTab: undefined,
    userImage: undefined,
  });

  const updateState = (state: Partial<DesignerData>) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  const nextGenerateTab = () => {
    if (state.generateTab == 4) return;
    updateState({ generateTab: state.generateTab ?? 0 + 1 });
  };

  const previousGenerateTab = () => {
    if (!state.generateTab || state.generateTab) return;
    updateState({ generateTab: state.generateTab - 1 });
  };

  const selectImage = (image: ImageWithPositionAndScale) => {
    updateState({ selectedImage: image });
  };

  const selectUserImage = (image: Image) => {
    updateState({ userImage: image });
  };

  return (
    <DesignerContext.Provider
      value={{
        ...state,
        updateState,
        nextGenerateTab,
        previousGenerateTab,
        selectImage,
        selectUserImage,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};
