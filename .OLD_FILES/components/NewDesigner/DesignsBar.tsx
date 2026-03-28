import TrashIcon from "src/assets/icons/trash-icon.svg";
import PlusIcon from "src/assets/icons/plus-icon.svg";
import { Center } from "../Misc/Center";
import { Design } from "abipulli-types";

export const DesignsBar = ({ designs }: { designs: Design[] }) => (
  <div
    id="finished-designs-bar"
    className="flex flex-row w-full justify-center gap-4"
  >
    {designs.map((design) => (
      <div className="relative w-30 h-30 border-2 border-abipulli-gray p-2 flex justify-center bg-abipulli-dark-beige rounded-md cursor-pointer hover:scale-105 duration-125">
        <div className="absolute top-1 right-1 bg-white w-8 h-8 p-1.5 flex justify-center items-center rounded-lg">
          <img src={TrashIcon} alt="" className="w-full h-full" />
        </div>
        <img src={design.preferredPullover!.frontImage.url} />
      </div>
    ))}
    <button className="w-30 h-30 bg-abipulli-darker-beige rounded-md p-9 cursor-pointer hover:scale-105 duration-125">
      <Center>
        <img src={PlusIcon} className="w-full h-full" />
      </Center>
    </button>
  </div>
);
