import { createContext } from "react";

export interface Popup {
  message: string;
  description?: string;
  onClickConfirm: () => void;
}

interface PopupContextType {
  showPopup: (snackbar: Popup) => void;
}

export const PopupContext = createContext<PopupContextType | null>(null);
