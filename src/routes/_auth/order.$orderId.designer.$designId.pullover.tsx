import { createFileRoute } from "@tanstack/react-router";
import { Pullover } from "abipulli-types";
import { useMemo } from "react";
import { Divider } from "src/components/Misc/Divider";
import { useDesigner } from "src/providers/designerProvider";
import { usePullovers } from "src/hooks/usePullovers";
import { useDesignPullover } from "src/hooks/useDesignPullover";
import { useDesigns } from "src/hooks/useDesign";

export const Route = createFileRoute(
  "/_auth/order/$orderId/designer/$designId/pullover",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { designId, orderId } = Route.useParams();
  const { selectedImage, editPanelOpen } = useDesigner();

  // Fetch all available pullovers (catalog)
  const { pullovers, pulloversAreLoading } = usePullovers();

  // Fetch designs to get current design's pullover
  const { designs } = useDesigns(Number(orderId));
  const currentDesign = designs.find((d) => d.id === Number(designId));

  // Hook to update design's pullover
  const { updatePullover, isUpdating } = useDesignPullover(
    Number(designId),
    Number(orderId),
  );

  // Split pullovers into categories
  const { normalPullovers, heavyPullovers } = useMemo(() => {
    return {
      normalPullovers: pullovers.filter((p) => !p.name.includes("Heavy")),
      heavyPullovers: pullovers.filter((p) => p.name.includes("Heavy")),
    };
  }, [pullovers]);

  return (
    <div
      className={`duration-100 h-full flex flex-col px-4 max-w-lg ${editPanelOpen ? "w-0 lg:w-80" : "w-30 md:w-50 lg:w-80 xl:w-100"} overflow-scroll`}
    >
      <h2 className="font-bold mt-4 text-lg">Select Pullover Modell</h2>
      <div className="bg-gray-500" />
      <Divider className="mt-2 bg-abipulli-darker-beige" />

      {pulloversAreLoading ? (
        <div>Loading pullovers...</div>
      ) : (
        <>
          <h3 className="font-semibold text-xl">NORMAL</h3>
          <div className="grid grid-cols-2 gap-4">
            {normalPullovers?.map((p) => (
              <NewPulloverButton
                key={p.id}
                p={p}
                isSelected={currentDesign?.preferredPullover?.id === p.id}
                onSelect={updatePullover}
                isUpdating={isUpdating}
              />
            ))}
          </div>
          <h3 className="font-semibold text-xl">HEAVY</h3>
          <div className="grid grid-cols-2 gap-4">
            {heavyPullovers?.map((p) => (
              <NewPulloverButton
                key={p.id}
                p={p}
                isSelected={currentDesign?.preferredPullover?.id === p.id}
                onSelect={updatePullover}
                isUpdating={isUpdating}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface NewPulloverButton {
  p: Pullover;
  isSelected: boolean;
  onSelect: (pullover: Pullover) => void;
  isUpdating: boolean;
}

const NewPulloverButton = ({
  p,
  isSelected,
  onSelect,
  isUpdating,
}: NewPulloverButton) => (
  <button
    key={p.id}
    className="flex flex-col items-start cursor-pointer text-start"
    onClick={() => onSelect(p)}
    disabled={isUpdating}
  >
    <div
      className={`bg-white p-3 flex justify-center aspect-square overflow-hidden rounded-xl ${isSelected && "border-2 border-black"} ${isUpdating && "opacity-50"}`}
    >
      <img
        id={`${p.name}-pullover-option`}
        src={p.frontImage.url}
        alt={`${p.name}-pullover-option`}
      />
    </div>
    <label htmlFor={`${p.name}-pullover-option`} className="mt-1">
      <span className="font-semibold">{p.name}</span>
      <br />
      <span>{p.basePrice}€ / pro Einheit</span>
    </label>
    <label htmlFor={`${p.name}-pullover-option`}></label>
  </button>
);
