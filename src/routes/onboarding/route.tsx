import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { OnboardingProvider } from "src/providers/onboardingProvider";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

export function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/onboarding") {
      navigate({ to: "/onboarding/schule", replace: true });
    }
  }, []);

  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
