import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AbipulliHat from "src/assets/icons/abipulli-logo.png";
import ExamplePullover from "src/assets/pullovers/sand-front.png";
import { TabOption, TabSwitcher } from "src/components/NewDesigner/TabSwitcher";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { ViewingSide } from "src/types/ViewingSide";
import { SelectOption } from "src/components/Inputs/SelectField";
import { Layer, Rect, Stage, Text } from "react-konva";
import {
  ResizableImage,
  StaticImage,
} from "src/components/Designer/CanvasImages";
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
import { Design, Image, ImageWithPositionAndScale } from "abipulli-types";
import { ImproveImagePanel } from "src/components/NewDesigner/ImproveImagePanel";
import { useAuth } from "src/hooks/useAuth";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useDesigns } from "src/hooks/useDesigns";
import { useSnackbar } from "src/hooks/useSnackbar";
import { useWindowWidth } from "@react-hook/window-size";
import { SizeType } from "src/types/canvas/sizeType";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { NewDesignerCanvas } from "src/components/NewDesigner/NewDesignerCanvas";
import { useUserImages } from "src/hooks/useUserImages";

export const Route = createFileRoute("/newdesigner/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const [imageIsUploading, setImageIsUploading] = useState<boolean>(false);

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

  const [selectedImage, selectImage] = useState<ImageWithPositionAndScale>();

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

  const [design, setDesign] = useState<Design>();

  const showSnackbar = useSnackbar();

  const width = useWindowWidth();
  const [designCanvasSize, setDesignCanvasSize] = useState<SizeType>({
    width: 600,
    height: 700,
  });

  const {
    userImages,
    userImagesAreLoading,
    userImagesError,
    refetch: refetchUserImages,
  } = useUserImages();

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
        className="h-full shadow-abipulli-sidebar bg-white flex flex-row relative"
      >
        {isDraggingOver && (
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
        <SidebarNav />
        <div className="w-full px-4">
          <TabSwitcher
            tabs={tabs}
            tabSelected={tabSelected}
            setTabSelected={(tab: TabOption) => setTabSelected(tab)}
          />
          {!userImagesAreLoading && userImages && (
            <div className={`${selectedImage ? "hidden lg:flex" : ""} h-full`}>
              <ImagesTab
                isDraggingOver={isDraggingOver}
                setIsDraggingOver={setIsDraggingOver}
                addImage={(image: Image) => {
                  if (!design) return;
                  addImageToDesign(
                    image,
                    designCanvasSize,
                    design.id,
                    viewingSide == ViewingSide.Back
                  );
                }}
                generateImage={() => setGenerateTab(1)}
                userImages={userImages}
                onDropAccepted={async (images) => {
                  setIsDraggingOver(false);
                  setImageIsUploading(true);
                  await ImageApi.upload(images[0]);
                  setImageIsUploading(false);
                  refetchUserImages();
                }}
                imageIsUploading={imageIsUploading}
                imageTabChoice={imageTabSelected}
              />
            </div>
          )}
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
            <ImproveImagePanel image={selectedImage} />
          </GenerateInfoProvider>
          {/* </div> */}
        </div>
      </section>
    </div>
  );
}
