import { SidebarIcon } from "./SidebarIcon";

import AbipulliHat from "src/assets/icons/abipulli-logo.png";
import { Divider } from "../Misc/Divider";
import { SidebarTab } from "src/routes/_auth/order.$orderId.designer.$designId.route";
import { Link } from "@tanstack/react-router";

interface SidebarNavProps {
  callback: (tab: SidebarTab) => void;
  tabs: SidebarTab[];
  tabSelected: SidebarTab;
}

export const SidebarNav = ({
  callback,
  tabs,
  tabSelected,
}: SidebarNavProps) => (
  <div
    id="button-section"
    className="h-full flex flex-col items-center gap-4 pt-8 p-4"
  >
    <Link to="/home">
      <img src={AbipulliHat} className="w-8" />
    </Link>
    <Divider className="border border-gray-400" />
    {tabs.map((tab) => (
      <SidebarIcon
        key={`sidebar-button-${tab.label}`}
        tab={tab}
        selected={tab == tabSelected}
        callback={callback}
      />
    ))}
  </div>
);
