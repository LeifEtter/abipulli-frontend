import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faIcons,
  faImages,
  faInfoCircle,
  faLock,
  faPoll,
  faShirt,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center } from "../Misc/Center";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface SidebarTileProps {
  icon: IconProp;
  label: string;
  description: string;
  to: string;
  selected?: boolean;
  locked?: boolean;
}

const SidebarMobileTile = ({
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
        className={`flex flex-row items-center gap-2 rounded-xl p-3 ${selected ? "border-2 bg-abipulli-green-light shadow-abipulli-sm" : ""}`}
      >
        <div
          className={`border-2 ${selected ? "" : "shadow-abipulli-sm"} rounded-lg ${locked ? "bg-gray-400" : "bg-abipulli-green"} p-1 aspect-square w-12 ${locked ? "" : "group-hover/tile:scale-110"} duration-100`}
        >
          <Center>
            <FontAwesomeIcon icon={icon} className="text-3xl" />
          </Center>
        </div>
        <span>
          <span className={`text-lg ${locked ? "text-gray-500" : ""}`}>
            {label}
          </span>
          <p className="text-md text-gray-500 font-normal">{description}</p>
        </span>
      </div>
    </Link>
  );
};

export const SidebarMobile: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full border">
      <div
        className={`${open ? "opacity-20" : "opacity-0 hidden"} absolute bg-black w-full h-full top-0 left-0 z-10`}
        onClick={() => setOpen(false)}
      />
      <button
        onClick={() => setOpen(true)}
        className="absolute right-8 top-8 shadow-abipulli-sm bg-abipulli-green w-12 h-12 rounded-md p-1 border-2 cursor-pointer"
      >
        <Center>
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        </Center>
      </button>
      <div
        className={`flex flex-col items-start ${open ? "w-8/12 min-w-64 opacity-100" : "w-0 opacity-0"} absolute bg-white right-0 h-full z-20 top-0 p-4 duration-150 overflow-hidden opacity-0 rounded-l-3xl`}
      >
        <h2 className="text-2xl self-center flex font-semibold my-8">
          Navigation
        </h2>
        <SidebarMobileTile
          icon={faInfoCircle}
          label="Onboarding"
          description="AbiPulli Prozess Erklärt"
          to="onboarding"
          selected={true}
        />
        <SidebarMobileTile
          icon={faIcons}
          to="generate"
          label="Neues Bild Erstellen"
          description="Generiere neues Element"
        />
        <SidebarMobileTile
          icon={faImages}
          label="Bild Vorschau"
          description="Vergleiche Bild Elemente"
          to="compare"
        />
        <SidebarMobileTile
          icon={faShirt}
          label="Designer"
          description="Vergleiche Bild Elemente"
          to="designer"
        />
        <SidebarMobileTile
          icon={faPoll}
          label="Umfragetool"
          description="Starte eine Umfrage"
          to="polls"
        />
        <SidebarMobileTile
          icon={faTruckFast}
          label="Bestellabschluss"
          description="Bestelle deinen AbiPulli"
          to="order"
          locked={true}
        />
      </div>
    </div>
  );
};
