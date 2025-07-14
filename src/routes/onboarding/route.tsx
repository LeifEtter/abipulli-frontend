import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";
import { OnboardingProvider } from "src/providers/onboardingProvider";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

export function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/onboarding/schule" });
  }, []);

  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
