import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Sidebar } from "../components/sidebar/Sidebar";

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="flex flex-col items-center justify-start pt-10 h-full w-full">
        <button className="bg-white rounded-2xl py-2 px-6 mt-5 text-xl font-semibold shadow-ap-special-shadow">
          Admin Panel
        </button>
        <div className="w-11/12 flex bg-ap-light-grey max-w-7xl rounded-4xl shadow-ap-special-shadow mt-6">
          <div className="max-w-xs flex flex-row justify-end">
            <Sidebar />
          </div>
          <div className="flex-5/6">
            <Outlet />
          </div>
        </div>
        <TanStackRouterDevtools />
      </div>
    );
  },
});
