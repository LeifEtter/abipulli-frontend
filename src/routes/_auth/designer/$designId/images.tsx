import { createFileRoute, useParams } from "@tanstack/react-router";
import { Design, Image, ImageWithPositionAndScale } from "abipulli-types";
import { useState } from "react";
import { DesignApi } from "src/api/endpoints/design";
import { ImageApi } from "src/api/endpoints/image";
import {
  ImagesTab,
  ImageTabs,
} from "src/components/NewDesigner/Tabs/ImagesTab";
import { TabOption, TabSwitcher } from "src/components/NewDesigner/TabSwitcher";
import { useDesigner } from "src/hooks/useDesigner";
import { useDesignImages } from "src/hooks/useDesignImages";
import { useUserImages } from "src/hooks/useUserImages";
import { ViewingSide } from "src/types/ViewingSide";

const TABS: TabOption[] = [
  { id: 0, label: "Meine Bilder" },
  { id: 1, label: "Bibliothek" },
];

export const Route = createFileRoute("/_auth/designer/$designId/images")({
  component: RouteComponent,
});

function RouteComponent() {
  const designId = 5;

  const [tabSelected, setSelectedTab] = useState<TabOption>(TABS[0]);

  const { addImageToDesign } = useDesignImages();

  const {
    userImages,
    userImagesAreLoading,
    userImagesError,
    refetch: refetchUserImages,
  } = useUserImages();

  const {
    isDroppingImage,
    selectedImage,
    isUploadingImage,
    viewingSide,
    designCanvasSize,
    generateTab,
    updateState,
  } = useDesigner();

  const onDropAccepted = async (images: File[]) => {
    updateState({ isDroppingImage: false });
    updateState({ isUploadingImage: true });
    await ImageApi.upload(images[0]);
    updateState({ isUploadingImage: false });
    refetchUserImages();
  };

  const addImage = async (image: Image) => {
    if (designId) return;
    addImageToDesign(
      image,
      designCanvasSize,
      designId,
      viewingSide == ViewingSide.Back
    );
  };

  const deleteImage = async (imageId: number) => {
    await ImageApi.delete(imageId);
    refetchUserImages();
  };

  return (
    <div
      className={`duration-100 h-full flex flex-col px-4 max-w-lg ${selectedImage ? "w-0 lg:w-80" : "w-30 md:w-50 lg:w-80 xl:w-100"}`}
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
      {!userImagesAreLoading && userImages && (
        <ImagesTab
          className={`${selectedImage ? "hidden lg:flex" : ""} overflow-auto flex-1 pt-2`}
          isDraggingOver={isDroppingImage}
          setIsDraggingOver={(is) => updateState({ isDroppingImage: is })}
          addImage={addImage}
          userImages={userImages}
          onDropAccepted={onDropAccepted}
          imageIsUploading={isUploadingImage}
          imageTabChoice={tabSelected.id}
          deleteImage={deleteImage}
          selectImage={(img) => updateState({ userImage: img })}
        />
      )}
    </div>
  );
}

{
  /* <div className={`${selectedImage ? "hidden lg:block" : ""} mt-10 mb-4`}>
        <TabSwitcher
          tabs={TABS}
          tabSelected={tabSelected}
          setTabSelected={(tab: TabOption) => setSelectedTab(tab)}
        />
      </div>

      {!userImagesAreLoading && userImages && (
        <div className={`${selectedImage ? "hidden lg:flex" : ""} h-full`}>
          <ImagesTab
            isDraggingOver={isDroppingImage}
            setIsDraggingOver={(is) => updateState({ isDroppingImage: is })}
            addImage={addImage}
            userImages={userImages}
            onDropAccepted={onDropAccepted}
            imageIsUploading={isUploadingImage}
            imageTabChoice={imageTabSelected}
            deleteImage={deleteImage}
            selectImage={selectUserImage}
          />
        </div>
      )} */
}
