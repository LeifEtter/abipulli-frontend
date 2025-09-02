import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import AbipulliHat from "src/assets/icons/abipulli-logo.png";
import ExamplePullover from "src/assets/pullovers/sand-front.png";
import { TabOption, TabSwitcher } from "src/components/NewDesigner/TabSwitcher";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { ViewingSide } from "src/types/ViewingSide";
import { SelectOption } from "src/components/Inputs/SelectField";
import { Layer, Rect, Stage, Text } from "react-konva";
import { StaticImage } from "src/components/Designer/CanvasImages";
import { ChooseReferenceImage } from "src/components/NewDesigner/ImageGenActionPanel/ChooseReference";
import { ImagesTab } from "src/components/NewDesigner/Tabs/ImagesTab";
import { DesignsBar } from "src/components/NewDesigner/DesignsBar";
import { EditableTextField } from "src/components/NewDesigner/EditableTextField";
import { Toolbar } from "src/components/NewDesigner/Toolbar";
import { SidebarNav } from "src/components/NewDesigner/SidebarNav";

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
        <SidebarNav />
        <div className="w-full px-4">
          <TabSwitcher
            tabs={tabs}
            tabSelected={tabSelected}
            setTabSelected={(tab: TabOption) => setTabSelected(tab)}
          />
          <ImagesTab images={images} />
        </div>
      </section>
      <section className="flex flex-col w-full pb-8">
        <Toolbar />
        <div
          id="editing-section"
          className={`w-full bg-cover flex flex-col justify-between relative h-full dotted-background`}
        >
          <div className="w-full p-2">
            <FrontBackButton
              currentViewingSide={viewingSide}
              switchViewingSide={(side: ViewingSide) => setViewingSide(side)}
            />
          </div>
          <div className="flex justify-start items-center grow border">
            <EditableTextField />
            <Stage className="border" width={500} height={500}>
              <Layer>
                <Rect x={0} y={0} width={50} height={50} fill="red" />
                <StaticImage src={ExamplePullover} width={500} />
                <Text x={60} y={60} text="Hey" fontFamily="Onest" />
              </Layer>
            </Stage>
          </div>
          <DesignsBar designs={[]} />
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
