import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate({ to: "/newdesigner" });
  // });

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        navigate({ to: "/newdesigner" });
      } else {
        navigate({ to: "/login" });
      }
    }
  }, [user, isLoading]);

  return <div>Hello "/"!!</div>;
}
