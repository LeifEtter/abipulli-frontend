import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "src/hooks/useAuth";

export const Route = createFileRoute("/_admin/admin/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, error } = useAuth();
  const navigate = useNavigate();
  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!isLoading && error != null) {
    navigate({ to: "/login", search: window.location.href });
  }

  return (
    <div>
      <div className="bg-ap-off-white rounded-4xl text-center flex-5/6 p-10">
        <h1 className="text-xl font-semibold mt-3 mb-8">Alle Bestellungen</h1>
        {/* <OrderTable orders={genXOrders(50)} /> */}
      </div>
    </div>
  );
}
