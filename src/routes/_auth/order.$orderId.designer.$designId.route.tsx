import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FrontBackButton } from "src/components/Buttons/FrontBackButton";
import { ViewingSide } from "src/types/ViewingSide";
import { ChooseReferenceImage } from "src/components/Designer/ImageGenActionPanel/ChooseReference";
import { Toolbar } from "src/components/Designer/Toolbar";
import { SidebarNav } from "src/components/Designer/SidebarNav";
import { GenerateInfoProvider } from "src/providers/generateProvider";
import { MainInfo } from "src/components/Designer/ImageGenActionPanel/MainInfo";
import { Description } from "src/components/Designer/ImageGenActionPanel/Description";
import { ImproveDescription } from "src/components/Designer/ImageGenActionPanel/ImproveDescription";
import { Design, ImageWithPositionAndScale } from "abipulli-types";
import { ImproveImagePanel } from "src/components/Designer/ImproveImagePanel";
import { useDesignImages } from "src/hooks/useDesignImages";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { NewDesignerCanvas } from "src/components/Designer/NewDesignerCanvas";
import { DropHereIcon } from "src/assets/icons/drop-here-icon";
import NameIcon from "src/assets/icons/name-icon.svg";
import TextIcon from "src/assets/icons/text-icon.svg";
import PulloverIcon from "src/assets/icons/pullover-icon.svg";
import ImageIcon from "src/assets/icons/image-icon.svg";
import { DesignerProvider, useDesigner } from "src/providers/designerProvider";
import { useDesigns } from "src/hooks/useDesign";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

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

export const Route = createFileRoute(
  "/_auth/order/$orderId/designer/$designId",
)({
  component: () => (
    <DesignerProvider>
      <RouteComponent />
    </DesignerProvider>
  ),
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.href.split("/").slice(-1)[0];
  const { designId, orderId } = Route.useParams();

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
    setViewingSide,
    setEditPanelOpen,
    editPanelOpen,
    showingGenerationModal,
    setShowingGenerationModal,
  } = useDesigner();

  const [zoom, setZoom] = useState<number>(100);

  const { designs, designsAreLoading } = useDesigns(
    Number(orderId),
  );

  const [selectedDesign, setSelectedDesign] = useState<Design>();

  const {
    designImages,
    designImagesAreLoading,
    changeImagePositionMutation,
    changeImageScale,
    removeImageFromDesign,
  } = useDesignImages(Number(designId));

  const onDeleteImage = async (image: ImageWithPositionAndScale) => {
    await removeImageFromDesign(image.imageToDesignId);
  };

  const onImagePositionChange = (
    pos: PositionType,
    image: ImageWithPositionAndScale,
  ) =>
    changeImagePositionMutation({
      pos,
      imageToDesignId: image.imageToDesignId,
    });

  const onScaleChange = (scale: ScaleType, image: ImageWithPositionAndScale) =>
    changeImageScale({
      scale,
      imageToDesignId: image.imageToDesignId,
    });

  useEffect(
    () =>
      setSelectedDesign(designs.filter((d) => d.id === Number(designId))[0]),
    [designs],
  );

  // Show loading state instead of early return to avoid hooks error
  if (designsAreLoading || !selectedDesign) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-gray-600">Loading design...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-full w-full overflow-hidden">
      {showingGenerationModal && (
        <div
          className="absolute w-full h-full bg-black/20 z-20 flex justify-center"
          onClick={() => setShowingGenerationModal(false)}
        >
          <div
            className="w-6/12 min-w-3xl h-160 top-1/5 absolute rounded-md duration-75 bg-abipulli-dark-beige shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-6 top-4 cursor-pointer"
              onClick={(e) => {
                setShowingGenerationModal(false);
              }}
            >
              <FontAwesomeIcon icon={faClose} size={"xl"} />
            </button>
          </div>
        </div>
      )}
      <section
        id="sidebar"
        className="h-full shadow-abipulli-sidebar bg-abipulli-light-beige flex flex-row relative flex-shrink-0"
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
          callback={(tab) =>
            navigate({
              to: `/order/${orderId}/designer/${designId}/${tab.url}`,
            })
          }
        />
        <Outlet />
      </section>
      <section id="main-section" className="flex flex-col w-full pb-8 border">
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
              pulloverFront={selectedDesign.preferredPullover!.frontImage.url}
              pulloverBack={selectedDesign.preferredPullover!.backImage.url}
              setEditPanelOpen={setEditPanelOpen}
            />
            <GenerateInfoProvider>
              {generateTab == 1 && (
                <ChooseReferenceImage
                  previousGeneratedImages={[]}
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
              {editPanelOpen && (
                <ImproveImagePanel image={selectedImage ?? userImage} />
              )}
            </GenerateInfoProvider>
          </div>
        </div>
      </section>
    </div>
  );
}
