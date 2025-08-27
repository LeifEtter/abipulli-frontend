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
  <div className="flex flex-col items-center gap-1">
    <div className="border border-abipulli-dark-beige h-12 w-12 rounded-md">
      <Center>
        <img src={iconSource} className="w-8/12 h-8/12" />
      </Center>
    </div>
    <p className="text-xs font-medium">{label}</p>
  </div>
);
