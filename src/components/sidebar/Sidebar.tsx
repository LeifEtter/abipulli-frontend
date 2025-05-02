import {
  faFlaskVial,
  faGear,
  faHome,
  faTruckFast,
  faUser,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarButton } from "./SidebarButton";

export const Sidebar: React.FC = () => (
  <aside className="flex flex-col py-8 border-r-ap-light-grey border-r-3 h-full w-full">
    <h1 className="font-bold text-xl text-center pb-5">Navigation</h1>
    <nav className="flex flex-col items-center gap-2">
      <SidebarButton text="Home" icon={faHome} selected={true} />
      <SidebarButton text="Bestellungen" icon={faTruckFast} />
      <SidebarButton text="Benutzer" icon={faUser} />
      <SidebarButton text="Testing" icon={faFlaskVial} />
      <div className="h-1 w-full bg-ap-bg mt-16 mb-2"></div>
      <SidebarButton text="Settings" icon={faGear} />
      <SidebarButton text="Dein Profil" icon={faUserCog} />
    </nav>
  </aside>
);
