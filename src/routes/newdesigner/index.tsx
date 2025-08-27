import { createFileRoute } from "@tanstack/react-router";
import { JSX, useState } from "react";
import NameIcon from "src/assets/icons/name-icon.svg";
import TextIcon from "src/assets/icons/text-icon.svg";
import PulloverIcon from "src/assets/icons/pullover-icon.svg";
import ImageIcon from "src/assets/icons/image-icon.svg";
import AbipulliHat from "src/assets/icons/abipulli-logo.png";
import BackArrow from "src/assets/icons/back-arrow-icon.svg";
import FrontArrow from "src/assets/icons/front-arrow-icon.svg";
import DottedBackground from "src/assets/background/dotted-background-2.svg";
import ExamplePullover from "src/assets/pullovers/sand-front.png";
import { Center } from "src/components/Misc/Center";

export const Route = createFileRoute("/newdesigner/")({
  component: RouteComponent,
});

interface SidebarIconProps {
  selected?: boolean;
  iconSource: string;
  label: string;
}

const SidebarIcon = ({
  selected = false,
  iconSource,
  label,
}: SidebarIconProps): JSX.Element => (
  <div className="flex flex-col items-center gap-1">
    <div className="border border-abipulli-dark-beige h-12 w-12 rounded-md">
      <Center>
        <img src={iconSource} className="w-8/12 h-8/12" />
      </Center>
    </div>
    <p className="text-xs font-medium">{label}</p>
  </div>
);

interface ToolButtonProps {
  iconSource: string;
  label: string;
  onClick: () => void;
}

const ToolButton = ({ iconSource, label, onClick }: ToolButtonProps) => (
  <div className="flex flex-row items-center border-abipulli-darker-beige border rounded-lg hover:scale-105 hover:bg-gray-800 hover:text-white duration-125 hover:border-black cursor-pointer ">
    <img
      src={iconSource}
      className="border-r border-abipulli-darker-beige p-2"
    />
    <p className="py-1 px-2 font-medium">{label}</p>
  </div>
);

function RouteComponent() {
  const [tabSelected, setTabSelected] = useState<string>("My Generated Images");

  return (
    <div className="flex flex-row h-full w-full">
      <section
        id="sidebar"
        className="h-full w-4/12 shadow-abipulli-sidebar bg-abipulli-light-beige flex flex-row"
      >
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
        <div className="w-full px-6 py-6">
          <div className="flex flex-row">
            <button
              className="w-1/2 cursor-pointer"
              onClick={() => setTabSelected("My Generated Images")}
            >
              <p className="text-left font-semibold">Meine Bilder</p>
            </button>
            <button
              className="w-1/2 cursor-pointer"
              onClick={() => setTabSelected("Library")}
            >
              <p className="text-left font-semibold">Library</p>
            </button>
          </div>
          <div
            className={`relative h-0.5 w-full top-1 flex flex-row  ${tabSelected == "My Generated Images" ? "justify-start" : "justify-end"} duration-100 mt-2`}
          >
            <div className={`w-5/12 bg-gray-600 duration-100 z-20`} />
            <div className="bg-gray-200 w-full absolute h-0.5" />
          </div>
        </div>
      </section>
      <section className="flex flex-col w-full h-full">
        <div className="w-full bg-white border-b-2 border-b-abipulli-gray flex items-center px-4 gap-4 py-4">
          <ToolButton
            iconSource={BackArrow}
            label="Rückgängig"
            onClick={() => {}}
          />
          <ToolButton
            iconSource={FrontArrow}
            label="Wiederholen"
            onClick={() => {}}
          />
        </div>
        <div
          className="w-full bg-cover h-11/12 flex justify-center"
          style={{
            backgroundImage: `url(${DottedBackground})`,
          }}
        >
          <img
            src={ExamplePullover}
            alt=""
            className="h-9/12 mt-20 object-cover"
            // style={{
            //   WebkitFilter: "drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.1))",
            //   filter: "drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.1))",
            // }}
          />
        </div>
      </section>
    </div>
  );
}
