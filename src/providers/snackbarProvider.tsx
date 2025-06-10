import { useCallback, useState } from "react";
import { Snackbar, SnackbarContext } from "./snackbarContext";
import { ReactNode } from "@tanstack/react-router";

// Add animation later
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);

  const showSnackbar = useCallback(
    ({ message, type = "info", duration = 3000 }: Snackbar) => {
      setSnackbar({ message, type, duration });
      setTimeout(() => setSnackbar(null), duration);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar != null ? (
        <div className="w-full fixed top-0 text-center bg-red-500 z-50">
          {snackbar?.message}
        </div>
      ) : (
        <></>
      )}
    </SnackbarContext.Provider>
  );
};
