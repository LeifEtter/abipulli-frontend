import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faIcons,
  faImages,
  faInfoCircle,
  faLock,
  faPerson,
  faPoll,
  faShirt,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center } from "../Misc/Center";
import { Link } from "@tanstack/react-router";
import { faFaceGrinStars } from "@fortawesome/free-regular-svg-icons";
import AbiPulliLogo from "src/assets/icons/abipulli-logo.png";
import Avatar from "src/assets/icons/avatar.png";

interface SidebarTileProps {
  icon: IconProp;
  label: string;
  description: string;
  to: string;
  selected?: boolean;
  locked?: boolean;
}

const SidebarTile = ({
  icon,
  label,
  description,
  to,
  selected = false,
  locked = false,
}: SidebarTileProps) => {
  return (
    <Link
      to={to}
      onClick={(e) => (locked ? e.preventDefault() : null)}
      className={`relative ${locked ? "cursor-help" : "cursor-pointer hover:bg-abipulli-green rounded-xl"}`}
    >
      <div className="absolute left-0 top-0">
        {locked ? (
          <FontAwesomeIcon icon={faLock} className="text-2xl shadow-md" />
        ) : null}
      </div>
      <div
        className={`flex flex-row items-center gap-2 group/tile rounded-xl p-3 ${selected ? "border-2 bg-abipulli-green-light shadow-abipulli-sm" : ""}`}
      >
        <div
          className={`border-2 ${selected ? "" : "shadow-abipulli-sm"} rounded-lg ${locked ? "bg-gray-400" : "bg-abipulli-green"} p-1 aspect-square w-12 ${locked ? "" : "group-hover/tile:scale-110"} duration-100`}
        >
          <Center>
            <FontAwesomeIcon icon={icon} className="text-3xl" />
          </Center>
        </div>
        <span className="hidden lg:block group-hover/navbar:block">
          <span className={`text-lg ${locked ? "text-gray-500" : ""}`}>
            {label}
          </span>
          <p className="text-md text-gray-500 font-normal">{description}</p>
        </span>
      </div>
    </Link>
  );
};

interface SidebarProps {}
export const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="card flex flex-col items-center p-6 font-semibold group/navbar w-24 lg:w-80 hover:min-w-80">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl self-center flex">
            Nav
            <span className="hidden lg:block group-hover/navbar:block">
              igation
            </span>
          </h2>
          <div className="h-4"></div>
          <SidebarTile
            icon={faInfoCircle}
            label="Onboarding"
            description="AbiPulli Prozess Erklärt"
            to="onboarding"
            selected={true}
          />
          <SidebarTile
            icon={faIcons}
            to="generate"
            label="Neues Bild Erstellen"
            description="Generiere neues Element"
          />
          <SidebarTile
            icon={faImages}
            label="Bild Vorschau"
            description="Vergleiche Bild Elemente"
            to="compare"
          />
          <SidebarTile
            icon={faShirt}
            label="Designer"
            description="Vergleiche Bild Elemente"
            to="designer"
          />
          <SidebarTile
            icon={faPoll}
            label="Umfragetool"
            description="Starte eine Umfrage"
            to="polls"
          />
          <SidebarTile
            icon={faTruckFast}
            label="Bestellabschluss"
            description="Bestelle deinen AbiPulli"
            to="order"
            locked={true}
          />
        </div>
      </div>
      <Link
        to={"/onboarding/loginNew"}
        className="flex flex-row card mt-4 items-center gap-4 p-0.5 justify-start rounded-l-4xl rounded-r-2xl"
      >
        <div className="border-2 p-1 rounded-full bg-abipulli-green border-abipulli-offblack">
          <img src={Avatar} className="w-12" />
        </div>
        <span className="text-lg font-semibold">Account</span>
      </Link>
    </div>
  );
};
