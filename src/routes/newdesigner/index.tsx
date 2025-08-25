import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/newdesigner/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
