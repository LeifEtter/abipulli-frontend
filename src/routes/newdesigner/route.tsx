import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { ViewingSide } from "src/types/ViewingSide";
import { ChooseReferenceImage } from "src/components/NewDesigner/ImageGenActionPanel/ChooseReference";
import { DesignsBar } from "src/components/NewDesigner/DesignsBar";
import { Toolbar } from "src/components/NewDesigner/Toolbar";
import { SidebarNav } from "src/components/NewDesigner/SidebarNav";
import { GenerateInfoProvider } from "src/providers/generateProvider";
import { ImageFactory } from "vitest/mocks/data/factory.image";
import { MainInfo } from "src/components/NewDesigner/ImageGenActionPanel/MainInfo";
import { Description } from "src/components/NewDesigner/ImageGenActionPanel/Description";
import { ImproveDescription } from "src/components/NewDesigner/ImageGenActionPanel/ImproveDescription";
import { Design, ImageWithPositionAndScale } from "abipulli-types";
import { ImproveImagePanel } from "src/components/NewDesigner/ImproveImagePanel";
import { useAuth } from "src/hooks/useAuth";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useDesigns } from "src/hooks/useDesigns";
import { useSnackbar } from "src/hooks/useSnackbar";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { NewDesignerCanvas } from "src/components/NewDesigner/NewDesignerCanvas";
import { DropHereIcon } from "src/assets/icons/drop-here-icon";
import NameIcon from "src/assets/icons/name-icon.svg";
import TextIcon from "src/assets/icons/text-icon.svg";
import PulloverIcon from "src/assets/icons/pullover-icon.svg";
import ImageIcon from "src/assets/icons/image-icon.svg";
import { useDesigner } from "src/hooks/useDesigner";

export interface SidebarTab {
  label: string;
  icon: string;
  selected?: boolean;
  url: string;
}

const SIDEBAR_TABS: SidebarTab[] = [
  {
    label: "Pullover",
    icon: PulloverIcon,
    url: "pullover",
  },
  {
    label: "Bilder",
    icon: ImageIcon,
    url: "images",
  },
  {
    label: "Texte",
    icon: TextIcon,
    url: "texts",
  },
  {
    label: "Namen",
    icon: NameIcon,
    url: "names",
  },
];

export const Route = createFileRoute("/newdesigner")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.href.split("/").slice(-1)[0];

  const {
    designCanvasSize,
    selectedImage,
    userImage,
    isDroppingImage,
    viewingSide,
    generateTab,
    nextGenerateTab,
    previousGenerateTab,
    selectImage,
    selectUserImage,
  } = useDesigner();

  const designId = 5;

  const [zoom, setZoom] = useState<number>(100);

  // const fontOptions: SelectOption<string>[] = [
  //   { label: "Poppins", value: "poppins" },
  //   { label: "Arial", value: "arial" },
  // ];

  // const [chosenFont, setChosenFont] = useState<SelectOption<string>>(
  //   fontOptions[0]
  // );

  const [design, setDesign] = useState<Design>();

  const { user } = useAuth();
  const { designs, designsAreLoading, designsError } = useDesigns(user?.id);
  const {
    designImages,
    designImagesAreLoading,
    designImagesError,
    changeImagePosition,
    changeImageScale,
    addImageToDesign,
    removeImageFromDesign,
  } = useDesignImages(designs[0] ? designs[0].id : undefined);

  const showSnackbar = useSnackbar();

  const onDeleteImage = async (image: ImageWithPositionAndScale) => {
    if (!design)
      return showSnackbar({
        message: "Kein Design ausgewählt",
        type: "error",
      });
    await removeImageFromDesign(image, design.id);
  };

  const onImagePositionChange = (
    pos: PositionType,
    image: ImageWithPositionAndScale
  ) =>
    changeImagePosition({
      pos,
      imageToDesignId: image.imageToDesignId,
    });

  const onScaleChange = (scale: ScaleType, image: ImageWithPositionAndScale) =>
    changeImageScale({
      scale,
      imageToDesignId: image.imageToDesignId,
    });

  useEffect(() => {
    if (designs && designs[0]) setDesign(designs[0]);
  }, [designs, designImages]);

  return (
    <div className="flex flex-row h-full w-full">
      <section
        id="sidebar"
        className="h-full shadow-abipulli-sidebar bg-abipulli-beige flex flex-row relative"
      >
        {isDroppingImage && (
          <div className="absolute w-full h-full bg-gray-400/70 z-20 p-2 pointer-events-none">
            <div className="w-full h-full border-2 border-dashed border-gray-500 rounded-md flex flex-col justify-center items-center ">
              <DropHereIcon
                className="stroke-gray-700"
                width={50}
                height={50}
              />
              <p className="font-semibold text-xl mt-4">
                Zieh dein Bild hier rein
              </p>
            </div>
          </div>
        )}
        <SidebarNav
          tabs={SIDEBAR_TABS}
          tabSelected={SIDEBAR_TABS.filter((tab) => tab.url == currentPath)[0]}
          callback={(tab) => navigate({ to: `/newdesigner/${tab.url}` })}
        />
        <Outlet />
      </section>
      <section id="main-section" className="flex flex-col w-full pb-8">
        <Toolbar zoom={zoom} setZoom={setZoom} />
        <div
          className={`w-full bg-cover flex flex-col justify-between relative h-full dotted-background`}
          onClick={(e) => e.currentTarget == e.target && selectImage(undefined)}
        >
          <FrontBackButton
            className="mt-2 ml-2"
            currentViewingSide={viewingSide}
            switchViewingSide={(side: ViewingSide) => setViewingSide(side)}
          />
          <div
            className="flex ml-0 lg:ml-20 xl:ml-30 items-center grow"
            onClick={(e) =>
              e.currentTarget == e.target &&
              selectImage(undefined) &&
              selectUserImage(undefined)
            }
          >
            {/* <EditableTextField /> */}
            <NewDesignerCanvas
              designCanvasSize={designCanvasSize}
              viewingSide={viewingSide}
              selectImage={selectImage}
              deselectImage={() => selectImage(undefined)}
              selectedImage={selectedImage}
              onDeleteImage={onDeleteImage}
              onImagePositionChange={onImagePositionChange}
              onScaleChange={onScaleChange}
              designImages={designImages}
              designImagesAreLoading={designImagesAreLoading}
              zoom={zoom}
              deselectUserImage={() => selectUserImage(undefined)}
            />
          </div>
          <DesignsBar designs={[]} />
          {/* <div className="absolute right-4 top-2"> */}
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
            <ImproveImagePanel image={selectedImage ?? userImage} />
          </GenerateInfoProvider>
          {/* </div> */}
        </div>
      </section>
    </div>
  );
}
