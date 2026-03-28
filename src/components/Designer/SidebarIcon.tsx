import { JSX } from "react";
import { Center } from "../Misc/Center";
import { SidebarTab } from "src/routes/_auth/order.$orderId.designer.$designId.route";

interface SidebarIconProps {
  selected?: boolean;
  tab: SidebarTab;
  callback: (tab: SidebarTab) => void;
}

export const SidebarIcon = ({
  selected = false,
  tab,
  callback,
}: SidebarIconProps): JSX.Element => (
  <div
    className="flex flex-col items-center gap-1 cursor-pointer"
    onClick={() => callback(tab)}
  >
    <div
      className={`h-12 w-12 rounded-md ${selected && "bg-abipulli-gray border-1 border-gray-500"}`}
    >
      <Center>
        <img src={tab.icon} className="w-8/12 h-8/12" />
      </Center>
    </div>
    <p className="text-sm font-semibold -mt-0.5">{tab.label}</p>
  </div>
);
