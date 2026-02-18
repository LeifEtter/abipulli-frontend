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

const getTimeSinceEdited = (prevDate: Date): string => {
  const diff: number = Date.now() - prevDate.getTime();
  const dateInMinutes = Math.round(diff / 1000 / 60);
  if (dateInMinutes < 60) return dateInMinutes + " Minuten";
  const dateInHours = Math.round(dateInMinutes / 60);
  if (dateInHours < 24) return dateInHours + " Stunden";
  const dateInDays = Math.round(dateInHours / 24);
  if (dateInMinutes < 31) return dateInDays + " Tagen";
  const dateInMonths = Math.round(dateInDays / 30);
  return dateInMonths + " Monaten";
};

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
