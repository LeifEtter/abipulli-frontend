import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex h-full w-full bg-ap-new-beige"
      style={{ fontFamily: "Onest" }}
    >
      <div className="flex-5/6">
        <div></div>
      </div>
    </div>
  );
}
