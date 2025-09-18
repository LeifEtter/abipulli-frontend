import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { DesignerProvider } from "src/providers/designerProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <DesignerProvider>
        <Outlet />
      </DesignerProvider>
    </React.Fragment>
  );
}
