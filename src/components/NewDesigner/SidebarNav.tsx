import { SidebarIcon } from "./SidebarIcon";
import NameIcon from "src/assets/icons/name-icon.svg";
import TextIcon from "src/assets/icons/text-icon.svg";
import PulloverIcon from "src/assets/icons/pullover-icon.svg";
import ImageIcon from "src/assets/icons/image-icon.svg";
import AbipulliHat from "src/assets/icons/abipulli-logo.png";
import { useState } from "react";

export interface SidebarTab {
  label: string;
  icon: string;
  selected?: boolean;
}

const tabs: SidebarTab[] = [
  {
    label: "Pullover",
    icon: PulloverIcon,
  },
  {
    label: "Bilder",
    icon: ImageIcon,
  },
  {
    label: "Texte",
    icon: TextIcon,
  },
  {
    label: "Namen",
    icon: NameIcon,
  },
];

export const SidebarNav = () => {
  const [sidebarTabs, setSidebarTabs] = useState<SidebarTab[]>(
    tabs.map((tab) => ({ ...tab, selected: false }))
  );

  return (
    <div
      id="button-section"
      className="h-full flex flex-col items-center gap-4 pt-8 p-4"
    >
      <img src={AbipulliHat} className="w-8" />
      {sidebarTabs.map((tabs) => (
        <SidebarIcon
          key={`sidebar-button-${tabs.label}`}
          iconSource={tabs.icon}
          label={tabs.label}
          selected={tabs.selected}
        />
      ))}
    </div>
  );
};
