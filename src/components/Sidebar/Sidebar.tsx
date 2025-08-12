import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFaceSmile,
  faIcons,
  faImages,
  faInfoCircle,
  faKey,
  faLock,
  faPoll,
  faShirt,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center } from "../Misc/Center";
import { Link, useLocation } from "@tanstack/react-router";
import { useAuth } from "src/hooks/useAuth";

interface SidebarTileProps {
  icon: IconProp;
  label: string;
  description: string;
  to: string;
  selected?: boolean;
  locked?: boolean;
  overrideCollapsed?: boolean;
}

const SidebarTile = ({
  icon,
  label,
  description,
  to,
  selected = false,
  locked = false,
  overrideCollapsed = false,
}: SidebarTileProps) => {
  return (
    <Link
      to={to}
      onClick={(e) => (locked ? e.preventDefault() : null)}
      className={`relative ${locked ? "cursor-help" : `cursor-pointer hover:bg-abipulli-green ${!selected && "hover:border-2"} rounded-xl`}`}
      aria-label={`${label} ${description} - ${locked ? "locked" : ""}`}
      aria-current={selected ? "page" : undefined}
      tabIndex={locked ? -1 : 0}
      aria-disabled={locked}
      role="menuitem"
    >
      <div className="absolute left-0 top-0" aria-hidden="true">
        {locked ? (
          <FontAwesomeIcon icon={faLock} className="text-2xl shadow-md" />
        ) : null}
      </div>
      <div
        className={`flex flex-row items-center gap-2 group/tile rounded-xl p-3 ${selected ? "border-2 bg-abipulli-green-light shadow-abipulli-sm" : ""}`}
      >
        <div
          className={`border-2 ${selected ? "" : "shadow-abipulli-sm"} rounded-lg ${locked ? "bg-gray-400" : "bg-abipulli-green"} p-1 aspect-square w-12 ${locked ? "" : "group-hover/tile:scale-110"} duration-100`}
          aria-hidden="true"
        >
          <Center>
            <FontAwesomeIcon icon={icon} className="text-3xl" />
          </Center>
        </div>
        <span
          className={`hidden ${!overrideCollapsed && "lg:block"} group-hover/navbar:block`}
        >
          <span
            className={`text-lg font-semibold ${locked ? "text-gray-500" : ""}`}
          >
            {label}
          </span>
          <p className="text-md text-gray-500 font-normal whitespace-nowrap overflow-ellipsis">
            {description}
          </p>
        </span>
      </div>
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const { user } = useAuth();

  const overrideCollapsed = (): boolean => {
    if (location.pathname.includes("designer")) return true;
    return false;
  };

  return (
    <nav aria-label="Seitennavigation">
      <div
        className={`card flex flex-col items-center p-6 group/navbar w-24 ${!overrideCollapsed() && "lg:w-80"} hover:w-80 transition-all duration-200 ease-in-out`}
      >
        <div className="flex flex-col items-start">
          <h2 className="text-2xl self-center flex font-semibold">
            Nav
            <span
              className={`hidden ${!overrideCollapsed() && "lg:block"} group-hover/navbar:block`}
            >
              igation
            </span>
          </h2>
          <div className="h-4" aria-hidden="true"></div>
          <SidebarTile
            icon={faInfoCircle}
            label="Onboarding"
            description="AbiPulli Prozess Erklärt"
            to="/onboarding/schule"
            selected={location.pathname.includes("onboarding")}
            overrideCollapsed={overrideCollapsed()}
            locked={user != null}
          />
          <SidebarTile
            icon={faIcons}
            to="/generieren"
            label="Neues Bild Erstellen"
            description="Generiere neues Element"
            selected={location.pathname.includes("generieren")}
            overrideCollapsed={overrideCollapsed()}
            locked={user == null}
          />
          <SidebarTile
            icon={faImages}
            label="Bild Vorschau"
            description="Vergleiche Bild Elemente"
            to="/vorschau"
            selected={location.pathname.includes("/vorschau")}
            overrideCollapsed={overrideCollapsed()}
            locked={user == null}
          />
          <SidebarTile
            icon={faShirt}
            label="Designer"
            description="Vergleiche Bild Elemente"
            to="/designer"
            selected={location.pathname.includes("/designer")}
            overrideCollapsed={overrideCollapsed()}
            locked={user == null}
          />
          <SidebarTile
            icon={faPoll}
            label="Umfragetool"
            description="Starte eine Umfrage"
            to="/umfrage"
            selected={location.pathname == "/umfrage"}
            overrideCollapsed={overrideCollapsed()}
            locked
          />
          <SidebarTile
            icon={faTruckFast}
            label="Bestellabschluss"
            description="Bestelle deinen AbiPulli"
            to="/bestellen"
            locked={true}
            selected={location.pathname == "/bestellen"}
            overrideCollapsed={overrideCollapsed()}
          />
        </div>
      </div>
      <div className="h-4" aria-hidden="true" />
      <div
        className={`card flex flex-col items-start p-2 px-4 w-24 ${!overrideCollapsed() && "lg:w-80"} group/navbar hover:w-80 transition-[width] duration-150 ease-in-out`}
      >
        {user ? (
          <SidebarTile
            icon={faFaceSmile}
            label="Benutzerkonto"
            description="Verwalte deine Daten"
            to="/account"
            selected={location.pathname == "/account"}
            overrideCollapsed={overrideCollapsed()}
          />
        ) : (
          <SidebarTile
            icon={faKey}
            label="Anmelden"
            description="Logge dich ein"
            to="/login"
            selected={location.pathname == "/login"}
            overrideCollapsed={overrideCollapsed()}
          />
        )}
      </div>
    </nav>
  );
};
