import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LeftSideBar } from "src/components/Sidebar/Sidebar";
import TreeBG from "src/assets/tree-bg.png";
import ThumbsUP from "src/assets/thumbs-up.png";
import AbipulliMascot from "src/assets/abipulli-mascot.png";
import { SidebarNew } from "src/components/Sidebar/SidebarNew";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex h-full w-full bg-abipulli-green-light pt-30"
      style={{ fontFamily: "Inter" }}
    >
      <div className="ml-0 lg:ml-10 flex-2/12 px-4 z-10">
        <SidebarNew />
      </div>
      <div className="flex-10/12 z-10 flex">
        <div className="flex-0 lg:flex-0/12 xl:flex-1/12"></div>
        <div className="flex-12/12">
          <Outlet />
        </div>
      </div>

      <img
        className="absolute bottom-0"
        src={TreeBG}
        alt="trees-background-image"
      />
      <img
        className="absolute w-70 right-0 bottom-3/12"
        src={ThumbsUP}
        alt="thumbs-up-background-image"
      />
      <img
        src={AbipulliMascot}
        className="w-120 absolute right-2/12 -top-1/12"
        alt="mascot-background-image"
      />
    </div>
  );
}
