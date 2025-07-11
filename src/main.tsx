import "./index.css";
import "./utilities/index";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./providers/authProvider";
import { SnackbarProvider } from "./providers/snackbarProvider";
import { RouterContextWrapper } from "./RouterContextWrapper";
import { PopupProvider } from "./providers/popupProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <PopupProvider>
          <RouterContextWrapper />
        </PopupProvider>
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>
);
