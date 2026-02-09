import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pullover } from "abipulli-types";
import { useEffect, useState } from "react";
import { PulloverApi } from "src/api/endpoints/pullover";
import { PulloverOption } from "src/components/Designer/PulloverOption";
import { Divider } from "src/components/Misc/Divider";
import { useDesigner } from "src/hooks/useDesigner";

export const Route = createFileRoute("/_auth/designer/$designId/pullover")({
  component: RouteComponent,
});

function RouteComponent() {
  const { selectedImage, selectedPullover, selectPullover } = useDesigner();
  const [normalPullovers, setNormalPullovers] = useState<Pullover[]>();
  const [heavyPullovers, setHeavyPullovers] = useState<Pullover[]>();

  useEffect(() => {
    const fetchPullovers = async () => {
      const res: Pullover[] = await PulloverApi.getAll();
      setNormalPullovers(res.filter((e) => !e.name.includes("Heavy")));
      setHeavyPullovers(res.filter((e) => e.name.includes("Heavy")));
    };

    fetchPullovers();
  }, []);

  return (
    <div
      className={`duration-100 h-full flex flex-col px-4 max-w-lg ${selectedImage ? "w-0 lg:w-80" : "w-30 md:w-50 lg:w-80 xl:w-100"} overflow-scroll`}
    >
      <h2 className="font-bold mt-4 text-lg">Select Pullover Modell</h2>
      <div className="bg-gray-500" />
      <Divider className="mt-2 bg-abipulli-darker-beige" />
      <h3 className="font-semibold text-xl">NORMAL</h3>
      <div className="grid grid-cols-2 gap-4">
        {normalPullovers?.map((p) => (
          <NewPulloverButton
            p={p}
            isSelected={!!(selectedPullover && selectedPullover.id == p.id)}
            selectPullover={selectPullover}
          />
        ))}
      </div>
      <h3 className="font-semibold text-xl">HEAVY</h3>
      <div className="grid grid-cols-2 gap-4">
        {heavyPullovers?.map((p) => (
          <NewPulloverButton
            p={p}
            isSelected={!!(selectedPullover && selectedPullover.id == p.id)}
            selectPullover={selectPullover}
          />
        ))}
      </div>
    </div>
  );
}

interface NewPulloverButton {
  p: Pullover;
  isSelected: boolean;
  selectPullover: (pullover: Pullover) => void;
}

const NewPulloverButton = ({
  p,
  isSelected,
  selectPullover,
}: NewPulloverButton) => (
  <button
    key={p.id}
    className="flex flex-col items-start cursor-pointer text-start"
    onClick={() => selectPullover(p)}
  >
    <div
      className={`bg-white p-3 flex justify-center aspect-square overflow-hidden rounded-xl ${isSelected && "border-2"}`}
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

// const NewPulloverButton = ({
//   p,
//   selectedPullover,
//   selectPullover,
// }: NewPulloverButton) => (
//   <button
//     key={p.id}
//     className={`flex flex-col cursor-pointer items-center justify-center ${selectedPullover?.id === p.id ? "bg-ap-new-green border-2" : ""} rounded-xl border-ap-new-gray`}
//     onClick={() => selectPullover(p)}
//     // className={`flex flex-col cursor-pointer items-center justify-center ${true ? "bg-ap-new-green border-2" : ""} rounded-xl border-ap-new-gray`}
//   >
//     <img
//       id={`${p.name}-pullover-option`}
//       src={p.frontImage.url}
//       className="h-8/12 object-contain"
//       alt={`${p.name}-pullover-option`}
//     />
//     <label
//       className="text-md font-bold w-9/12 mt-3"
//       htmlFor={`${p.name}-pullover-option`}
//     >
//       {p.name}
//     </label>
//   </button>
// );
