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
import { ToolButton } from "src/components/NewDesigner/ToolButton";
import { SidebarIcon } from "src/components/NewDesigner/SidebarIcon";
import { TabOption, TabSwitcher } from "src/components/NewDesigner/TabSwitcher";

export const Route = createFileRoute("/newdesigner/")({
  component: RouteComponent,
});

function RouteComponent() {
  const tabs: TabOption[] = [
    { id: 0, label: "Meine Bilder" },
    { id: 1, label: "Bibliothek" },
  ];
  const [tabSelected, setTabSelected] = useState<TabOption>(tabs[0]);

  const images: { src: string; label: string }[] = [
    { src: AbipulliHat, label: "Image69" },
    { src: AbipulliHat, label: "Image69" },
    { src: AbipulliHat, label: "Image69" },
    { src: AbipulliHat, label: "Image69" },
    { src: AbipulliHat, label: "Image69" },
  ];

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
        <div className="w-full px-4">
          <TabSwitcher
            tabs={tabs}
            tabSelected={tabSelected}
            setTabSelected={(tab: TabOption) => setTabSelected(tab)}
          />
          <div>
            <button className="bg-white border-1 border-black w-full rounded-xl text-center font-semibold p-3">
              Generate Image
            </button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {images.map((image) => (
                <div>
                  <img
                    className="border-12 border-white rounded-md bg-white"
                    src={image.src}
                  />
                  <div className="flex flex-row mt-1">
                    <p className="font-medium text-sm">{image.label}</p>
                  </div>
                </div>
              ))}
            </div>
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
          <div className="w-full p-2">
            <FrontBackButton
              currentViewingSide={viewingSide}
              switchViewingSide={(side: ViewingSide) => setViewingSide(side)}
            />
          </div>
          <div className="flex justify-center items-center grow ">
            <img src={ExamplePullover} alt="" className="max-h-160" />
          </div>
          <div
            id="finished-designs-bar"
            className="flex flex-row w-full justify-center gap-4"
          >
            {[{ src: ExamplePullover }, { src: ExamplePullover }].map(
              (pullover) => (
                <div className="relative w-30 h-30 border-2 border-abipulli-gray p-2 flex justify-center bg-abipulli-dark-beige rounded-md cursor-pointer hover:scale-105 duration-125">
                  <div className="absolute top-1 right-1 bg-white w-8 h-8 p-1.5 flex justify-center items-center rounded-lg">
                    <img src={TrashIcon} alt="" className="w-full h-full" />
                  </div>
                  <img src={pullover.src} />
                </div>
              )
            )}
            <button className="w-30 h-30 bg-abipulli-darker-beige rounded-md p-9 cursor-pointer hover:scale-105 duration-125">
              <Center>
                <img src={PlusIcon} className="w-full h-full" />
              </Center>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
