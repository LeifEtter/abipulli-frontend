import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import NameIcon from "src/assets/icons/name-icon.svg";
import TextIcon from "src/assets/icons/text-icon.svg";
import PulloverIcon from "src/assets/icons/pullover-icon.svg";
import ImageIcon from "src/assets/icons/image-icon.svg";
import AbipulliHat from "src/assets/icons/abipulli-logo.png";
import BackArrow from "src/assets/icons/back-arrow-icon.svg";
import FrontArrow from "src/assets/icons/front-arrow-icon.svg";
import DottedBackground from "src/assets/background/dotted-background-2.svg";
import ExamplePullover from "src/assets/pullovers/sand-front.png";
import TrashIcon from "src/assets/icons/trash-icon.svg";
import PlusIcon from "src/assets/icons/plus-icon.svg";
import { ToolButton } from "src/components/NewDesigner/ToolButton";
import { SidebarIcon } from "src/components/NewDesigner/SidebarIcon";
import { TabOption, TabSwitcher } from "src/components/NewDesigner/TabSwitcher";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { ViewingSide } from "src/types/ViewingSide";
import { Center } from "src/components/Misc/Center";
import { SelectOption } from "src/components/Inputs/SelectField";
import { ActionPanel } from "src/components/NewDesigner/ActionPanel";
import { ZoomSwitcher } from "src/components/NewDesigner/ZoomSwitcher";
import { NewImageDropper } from "src/components/NewDesigner/NewImageDropper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { Image, Layer, Rect, Stage, Text } from "react-konva";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { StaticImage } from "src/components/Designer/CanvasImages";
import { ChooseReferenceImage } from "src/components/NewDesigner/ImageGenActionPanel/ChooseReference";

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

  const [viewingSide, setViewingSide] = useState<ViewingSide>(
    ViewingSide.Front
  );

  const [zoom, setZoom] = useState<number>(100);

  const fontOptions: SelectOption<string>[] = [
    { label: "Poppins", value: "poppins" },
    { label: "Arial", value: "arial" },
  ];

  const [chosenFont, setChosenFont] = useState<SelectOption<string>>(
    fontOptions[0]
  );

  const [referenceImage, setReferenceImage] = useState<File>();

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
            <button className="bg-white border border-black w-full rounded-xl text-center font-semibold p-3">
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
      <section className="flex flex-col w-full pb-8">
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
          <div className="grow" />
          <div>Zoom</div>
          <ZoomSwitcher zoom={100} />
        </div>
        <div
          id="editing-section"
          className="w-full bg-cover flex flex-col justify-between relative h-full"
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
          <div className="flex justify-start items-center grow border">
            {/* <div
              draggable
              contentEditable
              className="absolute border min-w-30 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none empty:before:absolute whitespace-pre-wrap"
              data-placeholder="asdasd"
              role="textbox"
              aria-label="text"
              onSelect={() => {}}
              onInput={() => {}}
              style={{}}
            /> */}
            <Stage className="border" width={500} height={500}>
              <Layer>
                <Rect x={0} y={0} width={50} height={50} fill="red" />
                <StaticImage src={ExamplePullover} width={500} />
                <Text x={60} y={60} text="Hey" fontFamily="Onest" />
              </Layer>
            </Stage>
            {/* <img src={ExamplePullover} alt="" className="max-h-160" /> */}
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
          <div className="absolute right-0 top-0">
            <ChooseReferenceImage
              previousGeneratedImages={[]}
              chosenReferenceImage={""}
              setReferenceImage={() => {}}
              setUploadedReferenceImage={() => {}}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
