import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AdminSidebar } from "../../components/AdminSidebar/AdminSidebar";
import BackgroundImage from "../../assets/dotted_background.png";

export const Route = createFileRoute("/_admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div
      className="flex flex-col items-center justify-start pt-10 h-full w-full"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <button className="bg-white rounded-2xl py-2 px-6 mt-5 text-xl font-semibold shadow-ap-special-shadow">
        Admin Panel
      </button>
      <div className="w-11/12 flex bg-ap-light-grey max-w-7xl rounded-4xl shadow-ap-special-shadow mt-6">
        <div className="max-w-xs flex flex-row justify-end">
          <AdminSidebar isLoggedIn={true} />
        </div>
        <div className="flex-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
