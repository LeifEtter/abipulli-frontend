import "./index.css";
import "./utilities/index";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/authProvider";
import { SnackbarProvider } from "./providers/snackbarProvider";
import { RouterContextWrapper } from "./RouterContextWrapper";
import { PopupProvider } from "./providers/popupProvider";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <PopupProvider>
            <RouterContextWrapper />
          </PopupProvider>
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
