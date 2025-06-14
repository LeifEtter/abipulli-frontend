import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./providers/authProvider";
import { SnackbarProvider } from "./providers/snackbarProvider";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <InnerApp />
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>
);
