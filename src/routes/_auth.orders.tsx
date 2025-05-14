import { createFileRoute, redirect } from "@tanstack/react-router";
import { genXOrders } from "../utilities/exampleData";
import { OrderTable } from "../components/OrderTable";

export const Route = createFileRoute("/_auth/orders")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({ to: "/login", search: location.href });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="bg-ap-off-white rounded-4xl text-center flex-5/6 p-10">
        <h1 className="text-xl font-semibold mt-3 mb-8">Alle Bestellungen</h1>
        <OrderTable orders={genXOrders(50)} />
      </div>
    </div>
  );
}
