import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { OrderApi } from "src/api/endpoints/order";

export const Route = createFileRoute("/_auth/designer/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const getNewestOrderNumber = async () => {
      try {
        const orders = await OrderApi.getAll();
        if (!orders) {
          return console.log("No order found");
        }
        navigate({ to: `/designer/${orders[0].id}` });
      } catch (error) {
        console.log(error);
      }
    };

    getNewestOrderNumber();
  });

  return <div>Getting order number</div>;
}
