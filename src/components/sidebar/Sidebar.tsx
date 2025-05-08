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
  <aside className="flex flex-col py-8 px-5 border-r-gray-200 border-r-2 h-full w-full">
    <h1 className="font-bold text-xl pb-8 flex flex-row justify-center">
      <span>Nav</span>
      <span className="md:block hidden">igation</span>
    </h1>
    <nav className="flex flex-col gap-2 items-start">
      <SidebarButton route="/home" text="Home" icon={faHome} />
      <SidebarButton route="/orders" text="Bestellungen" icon={faTruckFast} />
      <SidebarButton route="/users" text="Benutzer" icon={faUser} />
      <SidebarButton route="/testing" text="Testing" icon={faFlaskVial} />

      <SidebarButton route="/settings" text="Settings" icon={faGear} />
      <SidebarButton route="/profile" text="Dein Profil" icon={faUserCog} />
    </nav>
  </aside>
);

{
  /* <div className="h-1 w-full bg-ap-bg mt-16 mb-2"></div> */
}
