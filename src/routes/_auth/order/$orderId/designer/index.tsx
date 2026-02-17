import { createFileRoute, redirect, useParams } from "@tanstack/react-router";
import { DesignApi } from "src/api/endpoints/design";
import { useDesigns } from "src/hooks/useDesign";

// This route handles ONLY /order/$orderId/designer (no children)
export const Route = createFileRoute("/_auth/order/$orderId/designer/")({
  loader: async ({ params }) => {
    const designs = await DesignApi.retrieveOrderDesigns(
      parseInt(params.orderId),
    );

    // if (designs.length > 0) {
    //   throw redirect({
    //     to: "/order/$orderId/designer/$designId/pullover",
    //     params: {
    //       orderId: params.orderId,
    //       designId: designs[0].id.toString(),
    //     },
    //   });
    // }

    return { designs };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const { designs } = useDesigns(parseInt(params.orderId));

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2>Deine Entwürfe</h2>
      <div className="flex flex-row">
        {designs.map((design) => (
          <div>pullover</div>
        ))}
      </div>
      <h2>Neuen AbiPulli erstellen</h2>
    </div>
  );
}
