import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LeftSideBar } from "src/components/Sidebar/SidebarOld";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex h-full w-full bg-ap-new-beige"
      style={{ fontFamily: "Onest" }}
    >
      <LeftSideBar />
      <div className="flex-5/6">
        <Outlet />
      </div>
    </div>
  );
}
