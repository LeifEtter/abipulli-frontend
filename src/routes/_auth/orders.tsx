import { createFileRoute, Link } from "@tanstack/react-router";
import { Order } from "abipulli-types";
import { useEffect, useState } from "react";
import { OrdersApi } from "src/services/endpoints/order";

export const Route = createFileRoute("/_auth/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  const initOrders = async () => {
    try {
      const orders: Order[] | null = await OrdersApi.getAll();
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initOrders();
  }, []);

  return (
    <div
      className="flex h-full w-full bg-ap-new-beige"
      style={{ fontFamily: "Onest" }}
    >
      <div className="flex-5/6">
        <h1>Orders</h1>
        <div>
          {orders != null ? (
            orders!.map((order: Order) => (
              <Link
                to={`/designer/$orderId`}
                params={{ orderId: order.id.toString() }}
              >
                Order ${order.id}
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
