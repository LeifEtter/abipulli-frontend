import { createContext } from "react";

type SnackbarType = "success" | "error" | "info" | "warning";

export interface Snackbar {
  message: string;
  type?: SnackbarType;
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (snackbar: Snackbar) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);
