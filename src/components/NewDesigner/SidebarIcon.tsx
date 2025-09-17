import { JSX } from "react";
import { Center } from "../Misc/Center";

interface SidebarIconProps {
  selected?: boolean;
  iconSource: string;
  label: string;
}

export const SidebarIcon = ({
  selected = false,
  iconSource,
  label,
}: SidebarIconProps): JSX.Element => (
  <div className="flex flex-col items-center gap-1 cursor-pointer">
    <div
      className={`h-12 w-12 rounded-md ${selected && "bg-abipulli-gray border-1 border-gray-500"}`}
    >
      <Center>
        <img src={iconSource} className="w-8/12 h-8/12" />
      </Center>
    </div>
    <p className="text-xs font-medium">{label}</p>
  </div>
);
