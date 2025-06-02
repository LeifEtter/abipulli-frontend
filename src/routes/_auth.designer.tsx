import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthContextType } from "src/providers/authContext";

export const Route = createFileRoute("/_auth/designer")({
  beforeLoad: async ({ context, location }) => {
    try {
      const { user, isLoading } = context.auth as AuthContextType;
      if (isLoading) {
        return;
      }
      if (!user) {
        throw redirect({ to: "/login", search: location.href });
      }
    } catch (error) {
      console.log("User is not authenticated");
      throw redirect({ to: "/login", search: location.href });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <p>Designer</p>;
}
