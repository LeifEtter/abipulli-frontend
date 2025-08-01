import { faPenFancy, faPlus } from "@fortawesome/free-solid-svg-icons";
import { BasicButton } from "../Buttons/BasicButton";
import { DesignTab } from "./DesignTab";
import { JSX } from "react";
import { Design } from "abipulli-types";
import { Center } from "../Misc/Center";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DesignSelectionProps {
  designs: Design[];
  selectDesign: (id: number) => void;
  selectedDesign: Design | undefined;
}

export const DesignSelection = ({
  designs,
  selectDesign,
  selectedDesign,
}: DesignSelectionProps): JSX.Element => (
  <section
    className="card p-0 relative h-157 flex flex-col w-2/12 max-w-50"
    aria-label="Design Auswahl"
  >
    <header className="border-b-2 flex py-4 shadow-md" role="banner">
      <Center>
        <div className="flex justify-center items-center gap-2">
          <div
            className="shadow-abipulli-sm bg-abipulli-green border-2 p-1 rounded-md"
            aria-hidden="true"
          >
            <Center>
              <FontAwesomeIcon icon={faPenFancy} className="text-2xl" />
            </Center>
          </div>
          <h3
            className="hidden lg:block text-2xl font-semibold"
            id="designs-heading"
          >
            Designs
          </h3>
        </div>
      </Center>
    </header>
    <div
      className="overflow-scroll"
      role="list"
      aria-labelledby="designs-heading"
    >
      <div className="flex flex-col items-center gap-2 mt-2">
        {designs.map((e, i) => (
          <div
            className="w-3/4 max-w-40"
            role="listitem"
            key={`design-tab-${i}`}
          >
            <DesignTab
              onSelect={() => selectDesign(e.id)}
              selected={selectedDesign && selectedDesign.id == e.id}
              image={e.preferredPullover!.image.url}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="absolute hidden xl:flex bottom-4 flex-row w-full justify-center">
      <BasicButton icon={faPlus} ariaLabel="Neues Design hinzufügen">
        Neues Design
      </BasicButton>
    </div>
    <div className="absolute flex xl:hidden bottom-4 flex-row w-full justify-center">
      <button
        aria-label="Neues Design hinzufügen"
        className="border-2 bg-abipulli-green rounded-xl py-3 px-4 shadow-md text-2xl"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </section>
);
