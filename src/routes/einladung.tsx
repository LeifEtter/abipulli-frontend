import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/einladung")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/einladung"!</div>;
}
