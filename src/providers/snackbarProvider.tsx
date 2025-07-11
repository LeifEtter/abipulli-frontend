import { useCallback, useState } from "react";
import { Snackbar, SnackbarContext } from "./snackbarContext";
import { ReactNode } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Add animation later
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);

  const showSnackbar = useCallback(
    ({ message, type = "info", duration = 5000 }: Snackbar) => {
      setSnackbar({ message, type, duration });
      setTimeout(() => setSnackbar(null), duration);
    },
    []
  );

  const snackbarColor = {
    info: "bg-blue-400",
    error: "bg-red-400",
    warning: "bg-yellow-400",
    success: "bg-green-400",
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar != null ? (
        <div className="w-full flex justify-center">
          <div
            data-testid="snackbar-popup"
            className={`fixed top-0 text-center rounded-xl shadow-lg animate-bounce p-3 z-50 mt-6 font-medium text-gray-800 ${snackbarColor[snackbar.type!]}`}
          >
            {snackbar?.message}
            <FontAwesomeIcon icon={faExclamationTriangle} className="ml-2" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </SnackbarContext.Provider>
  );
};
