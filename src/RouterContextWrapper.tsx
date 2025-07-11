import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth";
import { useMemo } from "react";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

export function RouterContextWrapper() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

// export function RouterContextWrapper() {
//   const auth = useAuth();

//   const router = useMemo(() => {
//     return createRouter({
//       routeTree,
//       defaultPreload: "viewport",
//       scrollRestoration: true,
//       context: {
//         auth,
//       },
//     });
//   }, [auth]); // re-create only when auth changes

//   return <RouterProvider router={router} />;
// }
