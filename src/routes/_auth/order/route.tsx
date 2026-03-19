import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout route - just renders children
export const Route = createFileRoute("/_auth/order")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
