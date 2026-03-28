import { createFileRoute } from "@tanstack/react-router";
import { Image } from "abipulli-types";
import React, { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import { Center } from "src/components/Misc/Center";
import DeleteIcon from "src/assets/icons/trash-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { TabOption, TabSwitcher } from "src/components/Designer/TabSwitcher";
import { useDesigner } from "src/providers/designerProvider";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useUserImages } from "src/hooks/useUserImages";
import { ViewingSide } from "src/types/ViewingSide";
import { LoadingSpinner } from "src/components/Misc/LoadingSpinner";
import GripDots from "src/assets/icons/grip-dots.svg";

const ACCEPTED_IMAGE_FORMATS = {
  "image/jpeg": [],
  "image/png": [],
  "image/webp": [],
  "image/heic": [],
  "image/jfif": [],
};

export enum ImageTabs {
  USER = "Deine Bilder",
  GENERAL = "Bibliothek",
}

const TABS: TabOption[] = [
  { id: 0, label: "Meine Bilder" },
  { id: 1, label: "Bibliothek" },
];

export const Route = createFileRoute(
  "/_auth/order/$orderId/designer/$designId/images",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { designId } = Route.useParams();

  const [tabSelected, setSelectedTab] = useState<TabOption>(TABS[0]);

  const { addImageToDesign } = useDesignImages(Number(designId));

  const {
    userImages,
    userImagesAreLoading,
    uploadImage,
    isUploadingImage: isUploadingUserImage,
    deleteImage: deleteUserImage,
  } = useUserImages();

  const {
    isDroppingImage,
    selectedImage,
    viewingSide,
    designCanvasSize,
    updateState,
    editPanelOpen,
    setShowingGenerationModal,
  } = useDesigner();

  const onDropAccepted = async (images: File[]) => {
    updateState({ isDroppingImage: false });
    await uploadImage(images[0]);
  };

  const addImage = async (image: Image) => {
    await addImageToDesign({
      image,
      designCanvasSize,
      isBackside: viewingSide == ViewingSide.Back,
    });
  };

  const [width, setWidth] = useState<number>(200);
  const isResizing = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = width;

    // Prevent text selection while dragging
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    // Calculate the distance moved (negative because we're on the right side)
    // const delta = startX.current + e.clientX;
    // console.log(delta);
    const newWidth = e.clientX - 60;
    // const newWidth = Math.max(200, Math.min(500, startWidth.current + delta));

    setWidth(newWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  // Add and remove event listeners
  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [width]); // Include width as dependency

  return (
    <div
      className={`duration-100 h-full flex flex-col pl-4 pr-6 max-w-xl ${editPanelOpen ? "w-0 lg:w-80" : "w-30 md:w-50 lg:w-80 xl:w-100"}`}
      style={{ width }}
    >
      <TabSwitcher
        className={`${selectedImage && "hidden lg:block"} mt-4`}
        tabs={TABS}
        tabSelected={tabSelected}
        setTabSelected={(tab: TabOption) => setSelectedTab(tab)}
      />
      <button
        onClick={() => updateState({ generateTab: 1 })}
        className="mt-2 cursor-pointer bg-white w-full rounded-xl text-center font-semibold p-3 border"
      >
        Bild Generieren
      </button>
      <button
        onClick={() => setShowingGenerationModal(true)}
        className="mt-2 cursor-pointer bg-white w-full rounded-xl text-center font-semibold p-3 border"
      >
        Bild Generieren Modal
      </button>
      {!userImagesAreLoading && userImages && (
        <>
          <Dropzone
            accept={ACCEPTED_IMAGE_FORMATS}
            maxFiles={5}
            maxSize={10000000}
            onDropAccepted={onDropAccepted}
            onDragOver={() =>
              !isDroppingImage && updateState({ isDroppingImage: true })
            }
            onDragLeave={() =>
              isDroppingImage && updateState({ isDroppingImage: false })
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section
                {...getRootProps()}
                className={`${selectedImage ? "hidden lg:flex" : ""} @container overflow-auto flex-1 pt-2`}
                onClick={(e) => e.preventDefault()}
              >
                <input {...getInputProps()} />
                <div className="grid grid-cols-1 @3xs:grid-cols-2 gap-4">
                  {tabSelected.id == 0 ? (
                    userImages.map((image, idx) => (
                      <div key={`image-tab-${idx}`}>
                        <div
                          onClick={() => addImage(image)}
                          className="cursor-pointer border-12 border-white aspect-square rounded-md overflow-hidden"
                        >
                          <img
                            className="object-cover w-full h-full"
                            src={image.url}
                          />
                        </div>
                        <div className="mt-2 flex flex-row justify-center items-center gap-1.5">
                          <p>Bild</p>
                          <div className="grow" />
                          <div
                            className="h-6 w-6 bg-white rounded-md cursor-pointer"
                            onClick={() => (img: Image) =>
                              updateState({ userImage: img })
                            }
                          >
                            <Center>
                              <img src={EditIcon} className="w-4 h-4" />
                            </Center>
                          </div>

                          <div
                            className="h-6 w-6 bg-white rounded-md cursor-pointer"
                            onClick={() => deleteUserImage(image.id)}
                          >
                            <Center>
                              <img src={DeleteIcon} className="w-4 h-4" />
                            </Center>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                  {isUploadingUserImage && (
                    <div className="bg-gray-200 rounded-md flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-300 aspect-square">
                      <LoadingSpinner className="fill-abipulli-green-strong dark:text-gray-300" />
                    </div>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
          <div
            className="h-full absolute right-0 w-4 cursor-w-resize flex flex-col justify-center mx-1"
            onMouseDown={handleMouseDown}
          >
            <img src={GripDots} />
            <img src={GripDots} className="mt-1" />
          </div>
        </>
      )}
    </div>
  );
}
