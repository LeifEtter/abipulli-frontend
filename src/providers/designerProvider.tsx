import { createContext, ReactElement, useContext, useState } from "react";
import { ViewingSide } from "src/types/ViewingSide";
import { SizeType } from "src/types/canvas/sizeType";
import { Image, ImageWithPositionAndScale, Pullover } from "abipulli-types";

export interface DesignerData {
  viewingSide: ViewingSide;
  designCanvasSize: SizeType;
  selectedImage?: ImageWithPositionAndScale;
  isDroppingImage: boolean;
  generateTab?: number;
  userImage?: Image;
  selectedPullover?: Pullover;
  editPanelOpen: boolean;
  showingGenerationModal: boolean;
}

export interface DesignerContextType extends DesignerData {
  updateState: (state: Partial<DesignerData>) => void;
  nextGenerateTab: () => void;
  previousGenerateTab: () => void;
  selectImage: (image?: ImageWithPositionAndScale) => void;
  selectUserImage: (image?: Image) => void;
  setViewingSide: (side: ViewingSide) => void;
  selectPullover: (pullover?: Pullover) => void;
  setEditPanelOpen: (open: boolean) => void;
  setShowingGenerationModal: (showing: boolean) => void;
}

const DesignerContext = createContext<DesignerContextType | null>(null);

export function useDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error(
      "useDesigner must be used within a DesignerContextProvider"
    );
  }
  return context;
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
    generateTab: undefined,
    userImage: undefined,
    selectedPullover: undefined,
    editPanelOpen: false,
    showingGenerationModal: false,
  });

  const updateState = (state: Partial<DesignerData>) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  const nextGenerateTab = () => {
    if (state.generateTab == 4) return;
    updateState({ generateTab: (state.generateTab ?? 0) + 1 });
  };

  const previousGenerateTab = () => {
    if (!state.generateTab || state.generateTab <= 1) return;
    updateState({ generateTab: state.generateTab - 1 });
  };

  const selectImage = (image?: ImageWithPositionAndScale) => {
    updateState({ selectedImage: image });
  };

  const selectUserImage = (image?: Image) => {
    updateState({ userImage: image });
  };

  const setViewingSide = (side: ViewingSide) => {
    updateState({ viewingSide: side });
  };
  const selectPullover = (pullover?: Pullover) => {
    updateState({ selectedPullover: pullover });
  };

  const setEditPanelOpen = (open: boolean) => {
    updateState({ editPanelOpen: open });
  };

  const setShowingGenerationModal = (showing: boolean) => {
    updateState({ showingGenerationModal: showing });
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
        setViewingSide,
        selectPullover,
        setEditPanelOpen,
        setShowingGenerationModal,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
};
