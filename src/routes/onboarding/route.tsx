import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";
import { OnboardingProvider } from "src/providers/onboardingProvider";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

export function RouteComponent() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user != null) navigate({ to: "/generieren" });
    if (location.pathname === "/onboarding") {
      navigate({ to: "/onboarding/schule", replace: true });
    }
  }, [auth.user]);

  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
