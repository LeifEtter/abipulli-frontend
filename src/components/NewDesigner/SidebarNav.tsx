import { SidebarIcon } from "./SidebarIcon";
import NameIcon from "src/assets/icons/name-icon.svg";
import TextIcon from "src/assets/icons/text-icon.svg";
import PulloverIcon from "src/assets/icons/pullover-icon.svg";
import ImageIcon from "src/assets/icons/image-icon.svg";
import AbipulliHat from "src/assets/icons/abipulli-logo.png";

export const SidebarNav = () => (
  <div
    id="button-section"
    className="h-full flex flex-col items-center gap-4 pt-8 p-4"
  >
    <img src={AbipulliHat} className="w-8" />
    <SidebarIcon iconSource={PulloverIcon} label="Pullover" />
    <SidebarIcon iconSource={ImageIcon} label="Bilder" />
    <SidebarIcon iconSource={TextIcon} label="Texte" />
    <SidebarIcon iconSource={NameIcon} label="Namen" />
  </div>
);
