import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { GenerateInfoProvider } from "src/providers/generateProvider";

export const Route = createFileRoute("/_auth/generieren")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: "/generieren/referenz" });
  }, []);

  return (
    <GenerateInfoProvider>
      <div className="w-full">
        <Outlet />
        <div>Bottom Bar</div>
      </div>
    </GenerateInfoProvider>
  );
}
