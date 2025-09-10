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
import { GenerateInfoProvider } from "src/providers/generateProvider";
import { ImageFactory } from "vitest/mocks/data/factory.image";
import { MainInfo } from "src/components/NewDesigner/ImageGenActionPanel/MainInfo";
import { Description } from "src/components/NewDesigner/ImageGenActionPanel/Description";
import { ImproveDescription } from "src/components/NewDesigner/ImageGenActionPanel/ImproveDescription";
import { Image } from "abipulli-types";
import { ImproveImagePanel } from "src/components/NewDesigner/ImproveImagePanel";

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

  const [generateTab, setGenerateTab] = useState<number>();
  const nextGenerateTab = () => setGenerateTab((prev) => prev! + 1);
  const previousGenerateTab = () =>
    setGenerateTab((prev) => (prev == 0 ? 0 : prev! - 1));

  // const [viewingImage, setViewingImage] = useState<Image>(
  //   ImageFactory.image({})
  // );

  const [viewingImage, setViewingImage] = useState<Image>();

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
          <ImagesTab
            generateImage={() => {
              setGenerateTab(1);
            }}
            images={images}
          />
        </div>
      </section>
      <section id="main-section" className="flex flex-col w-full pb-8">
        <Toolbar zoom={zoom} setZoom={setZoom} />
        <div
          className={`w-full bg-cover flex flex-col justify-between relative h-full dotted-background`}
        >
          <FrontBackButton
            className="mt-2 ml-2"
            currentViewingSide={viewingSide}
            switchViewingSide={(side: ViewingSide) => setViewingSide(side)}
          />
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
          <div className="absolute right-5 top-5">
            <GenerateInfoProvider>
              {generateTab == 1 && (
                <ChooseReferenceImage
                  previousGeneratedImages={[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                  ].map((id) => ImageFactory.image({ id: id }))}
                  previousTab={previousGenerateTab}
                  nextTab={nextGenerateTab}
                />
              )}
              {generateTab == 2 && (
                <MainInfo
                  nextTab={nextGenerateTab}
                  previousTab={previousGenerateTab}
                />
              )}
              {generateTab == 3 && (
                <Description
                  nextTab={nextGenerateTab}
                  previousTab={previousGenerateTab}
                />
              )}
              {generateTab == 4 && (
                <ImproveDescription
                  nextTab={nextGenerateTab}
                  previousTab={previousGenerateTab}
                />
              )}
              {viewingImage && !generateTab && (
                <ImproveImagePanel image={viewingImage} />
              )}
            </GenerateInfoProvider>
          </div>
        </div>
      </section>
    </div>
  );
}
