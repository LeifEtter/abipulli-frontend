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
  <div className="card p-0 relative h-157 flex flex-col w-2/12 max-w-50">
    <div className="border-b-2 flex py-4 shadow-md">
      <Center>
        <div className="flex justify-center items-center gap-2">
          <div className="shadow-abipulli-sm bg-abipulli-green border-2 p-1 rounded-md">
            <Center>
              <FontAwesomeIcon icon={faPenFancy} className="text-2xl" />
            </Center>
          </div>
          <h3 className="hidden lg:block text-2xl font-semibold">Designs</h3>
        </div>
      </Center>
    </div>
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

    <div className="absolute hidden xl:flex bottom-4  flex-row w-full justify-center">
      <BasicButton icon={faPlus}>Neues Design</BasicButton>
    </div>
  </div>
);
