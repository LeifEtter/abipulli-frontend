import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  fa0,
  faIcons,
  faImages,
  faInfoCircle,
  faPoll,
  faShirt,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center } from "../Misc/Center";
import { SmallLabel } from "../Texts/SmallLabel";

interface SidebarTileProps {
  icon: IconProp;
  label: string;
  description: string;
}

const SidebarTile = ({ icon, label, description }: SidebarTileProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="border-2 shadow-abipulli-sm rounded-lg bg-abipulli-green p-1 aspect-square w-12">
        <Center>
          <FontAwesomeIcon icon={icon} className="text-3xl" />
        </Center>
      </div>
      <span>
        <span className="text-lg">{label}</span>
        <p className="text-md text-gray-500 font-normal">{description}</p>
      </span>
    </div>
  );
};

interface SidebarProps {}
export const Sidebar: React.FC = () => {
  return (
    <div className="card flex flex-col items-center p-6 font-semibold">
      <div className="flex flex-col items-start gap-5">
        <h2 className="text-2xl self-center">Navigation</h2>
        <SidebarTile
          icon={faInfoCircle}
          label="Onboarding"
          description="AbiPulli Prozess Erklärt"
        />
        <SidebarTile
          icon={faIcons}
          label="Neues Bild Erstellen"
          description="Generiere ein neues Element"
        />
        <SidebarTile
          icon={faImages}
          label="Bild Vorschau"
          description="Vergleiche Bild Elemente"
        />
        <SidebarTile
          icon={faShirt}
          label="Designer"
          description="Vergleiche Bild Elemente"
        />
        <SidebarTile
          icon={faPoll}
          label="Umfragetool"
          description="Starte eine Umfrage"
        />
        <SidebarTile
          icon={faTruckFast}
          label="Bestellabschluss"
          description="Bestelle deinen AbiPulli"
        />
      </div>
    </div>
  );
};
