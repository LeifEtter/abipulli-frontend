import { createFileRoute, Outlet } from "@tanstack/react-router";
import { OnboardingProvider } from "src/providers/onboardingProvider";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

export function RouteComponent() {
  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
