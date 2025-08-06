import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/designer/chooseType")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/designer/chooseType"!</div>;
}
