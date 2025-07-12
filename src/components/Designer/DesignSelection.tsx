import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { BasicButton } from "../Buttons/BasicButton";
import { DesignTab } from "./DesignTab";
import { JSX } from "react";
import { Design } from "abipulli-types";

interface DesignsSelectionProps {
  designs: Design[];
  selectDesign: (id: number) => void;
  selectedDesign: Design | undefined;
}

export const DesignsSelection = ({
  designs,
  selectDesign,
  selectedDesign,
}: DesignsSelectionProps): JSX.Element => (
  <div className="card p-0 relative h-132 flex flex-col w-2/12">
    <h2 className="text-2xl font-semibold text-center pb-3 border-2 shadow-abipulli-sm z-10 border-black bg-abipulli-green pt-3 rounded-2xl">
      Designs
    </h2>
    <div className="overflow-scroll">
      <div className="flex flex-col items-center gap-2 mt-2">
        {designs.map((e, i) => (
          <div className="w-3/4 max-w-40">
            <DesignTab
              key={`design-tab-${i}`}
              onSelect={() => selectDesign(e.id)}
              selected={selectedDesign && selectedDesign.id == e.id}
              image={e.preferredPullover!.image.url}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="absolute bottom-4 flex flex-row w-full justify-center">
      <BasicButton icon={faPlus}>Neues Design</BasicButton>
    </div>
  </div>
);
