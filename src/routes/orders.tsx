import { createFileRoute } from "@tanstack/react-router";
import { genXOrders } from "../utilities/exampleData";
import { OrderTable } from "../components/OrderTable";

// export const OrdersPage = () => (
//   <div className="bg-ap-off-white rounded-4xl text-center flex-5/6 p-10">
//     <h1 className="text-xl font-semibold mt-3 mb-8">Alle Bestellungen</h1>
//     <OrderTable orders={genXOrders(50)} />
//   </div>
// );

export const Route = createFileRoute("/orders")({
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
