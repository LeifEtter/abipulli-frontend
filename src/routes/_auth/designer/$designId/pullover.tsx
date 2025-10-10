import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/designer/$designId/pullover")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/designer/$designId/pullover"!</div>;
}
