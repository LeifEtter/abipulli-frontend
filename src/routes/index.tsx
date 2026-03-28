import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "src/providers/authProvider";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate({ to: "/order" });
      } else {
        navigate({ to: "/login" });
      }
    }
  }, [user, isLoading]);

  return <div>Hello "/"!!</div>;
}
