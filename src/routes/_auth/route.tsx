import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { errorMessages } from "abipulli-types";
import { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";
import { useSnackbar } from "src/hooks/useSnackbar";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();

  useEffect(() => {
    if (error) {
      if (error.message == errorMessages.backendConnectionError)
        showSnackbar({ message: "Backend nicht erreichbar", type: "error" });
    }
    if (!isLoading && user == null) {
      navigate({ to: "/onboarding" });
    }
  }, []);

  return <Outlet />;
}
