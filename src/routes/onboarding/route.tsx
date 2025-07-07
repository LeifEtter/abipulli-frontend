import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LeftSideBar } from "src/components/Sidebar/Sidebar";
import TreeBG from "src/assets/tree-bg.png";
import ThumbsUP from "src/assets/thumbs-up.png";
import AbipulliMascot from "src/assets/abipulli-mascot.png";

export const Route = createFileRoute("/onboarding")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex h-full w-full bg-abipulli-green-light"
      style={{ fontFamily: "Inter" }}
    >
      <div className="flex-2/12 border"></div>
      <div className="flex-1/12"></div>
      <div className="flex-9/12 z-10 pt-52">
        <Outlet />
      </div>

      <img className="absolute bottom-0" src={TreeBG} alt="" />
      <img
        className="absolute w-70 right-0 bottom-3/12"
        src={ThumbsUP}
        alt=""
      />
      <img
        src={AbipulliMascot}
        className="w-120 absolute right-2/12 -top-1/12"
        alt=""
      />
    </div>
  );
}
