import { createFileRoute, redirect } from "@tanstack/react-router";
import { OrderApi } from "src/api/endpoints/order";

// This route handles ONLY /order (no children)
export const Route = createFileRoute("/_auth/order/")({
  loader: async () => {
    const orders = await OrderApi.getAll();

    if (orders.length > 0) {
      throw redirect({
        to: "/order/$orderId/designer",
        params: {
          orderId: orders[0].id.toString(),
        },
      });
    }

    return { orders };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="text-center">
        <p className="text-lg text-gray-600 mb-4">No orders found.</p>
        <p className="text-sm text-gray-500">
          Create your first order to get started.
        </p>
      </div>
    </div>
  );
}
