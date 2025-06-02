import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthContextType } from "../providers/authContext";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
