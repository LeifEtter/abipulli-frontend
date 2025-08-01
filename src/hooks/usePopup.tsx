import { useContext } from "react";
import { PopupContext } from "src/providers/popupContext";

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context.showPopup;
};
