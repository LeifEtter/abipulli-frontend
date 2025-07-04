import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Spacer } from "src/components/Misc/Spacer";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { DesignTab } from "src/components/Designer/DesignTab";
import { ViewOption } from "src/components/Designer/ViewOption";
import { ImageCard, UploadImageCard } from "src/components/Designer/ImageCard";
import { ColorOption } from "src/components/Designer/ColorOption";
// import { PulloverOption } from "src/components/Designer/PulloverOption";
import { useEffect, useState } from "react";
import { Design, Image, ImageWithPositionAndScale } from "abipulli-types";
import { Layer, Stage, Text } from "react-konva";
import {
  ResizableImage,
  StaticImage,
} from "src/components/Designer/CanvasImages";
import { useWindowWidth } from "@react-hook/window-size";
import {
  DesignCanvasSize,
  getDesignCanvasSize,
} from "src/utilities/Design/calculateDesignWindow";
import { useDesigns } from "src/hooks/useDesigns";
import { KonvaEventObject } from "konva/lib/Node";
import { useDesignImages } from "src/hooks/useDesignImages";
import { ScaleType } from "src/types/canvas/scaleType";
import { ErrorCode as DropzoneError } from "react-dropzone";
import { useSnackbar } from "src/hooks/useSnackbar";
import { ImageDropper } from "src/components/Designer/UploadDropper";
import { ModalBackground } from "src/components/Misc/ModalBackground";
import { getTotalFileSizeFromArray } from "src/utilities/Files/getTotalFileSizeFromArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUserImages } from "src/hooks/useUserImages";
import { PositionType } from "src/types/canvas/positionType";
import { DesignApi } from "src/api/endpoints/design";
import { ImageApi } from "src/api/endpoints/image";

export const Route = createFileRoute("/_auth/designer/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = useParams({ strict: false });
  const showSnackbar = useSnackbar();
  const width = useWindowWidth();

  const [imageUploadPopupOpen, setImageUploadPopupOpen] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { designs, designsAreLoading, designsError } = useDesigns(
    parseInt(orderId!)
  );
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const {
    designImages,
    designImagesAreLoading,
    designImagesError,
    changeImagePosition,
    changeImageScale,
    addImageToDesign,
    removeImageFromDesign,
  } = useDesignImages(selectedDesign?.id);
  const [selectedImage, selectImage] =
    useState<ImageWithPositionAndScale | null>(null);
  const [designCanvasSize, setDesignCanvasSize] = useState<DesignCanvasSize>({
    width: 0,
    height: 0,
  });

  const { userImages, userImagesAreLoading, userImagesError } = useUserImages();

  useEffect(() => {
    if (userImagesError) {
      showSnackbar({
        message: "Es gab ein Problem beim laden deiner eigenen Bilder",
        type: "error",
      });
    }
    if (designImagesError) {
      showSnackbar({
        message: "Es gab ein Problem beim laden deiner erstellten designs",
      });
    }
  }, [userImagesError, designImagesError, showSnackbar]);

  const uploadImageFiles = async () => {
    try {
      if (imageFiles.length == 0) {
        return showSnackbar({
          message: "Du hast keine Bilddatei ausgewählt",
          type: "error",
        });
      }
      const uploadedIds: number[] = [];
      for (const image of imageFiles) {
        uploadedIds.push(await ImageApi.upload(image));
      }
    } catch (error) {
      showSnackbar({
        message: "Bild konnte nicht hochgeladen werden",
        type: "error",
      });
    }
  };

  const saveDesignAlterations = async () => {
    if (selectedDesign) {
      for (const designImage of designImages) {
        await DesignApi.manipulateImageInDesign({
          imageToDesignId: designImage.imageToDesignId,
          designId: selectedDesign?.id,
          manipulateImageParams: {
            scaleX: designImage.scaleX,
            scaleY: designImage.scaleY,
            positionX: designImage.positionX,
            positionY: designImage.positionY,
          },
        });
      }
    }
  };

  const selectDesignById = (id: number) => {
    const design: Design | null = designs.filter((e) => e.id == id)[0];
    setSelectedDesign(design);
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectImage(null);
    }
  };

  useEffect(() => {
    if (!selectedDesign && !designsAreLoading && !designsError)
      setSelectedDesign(designs[0]);
  }, [designs, designsAreLoading, selectedDesign, designsError]);

  useEffect(
    () => setDesignCanvasSize(getDesignCanvasSize({ windowWidth: width })),
    [width]
  );

  return (
    <>
      {imageUploadPopupOpen ? (
        <>
          <ModalBackground darkenIntensity={imageUploadPopupOpen ? 0.15 : 0} />
          <div
            className="fixed w-full h-full flex justify-center items-center z-10"
            onClick={() => setImageUploadPopupOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-ap-new-beige w-md rounded-2xl shadow-2xl border-ap-new-gray border-2"
            >
              <div className="border-b-2 border-b-ap-new-light-gray-beigish px-4 py-2 ">
                <p className="font-medium text-lg">Dateien Hochladen</p>
                <p className="text-gray-400 font-medium">
                  Lade hier die Bilder hoch die du für das Design nutzen willst
                </p>
              </div>
              <div className="h-50 p-3">
                <ImageDropper
                  onDrop={(files) => {
                    const allowedMBOfFiles = 50;
                    if (
                      getTotalFileSizeFromArray(imageFiles) >
                      allowedMBOfFiles * 1000000
                    ) {
                      return showSnackbar({
                        message: "Maximale Anzahl an Speicherplatz erreicht",
                      });
                    }
                    if (files) setImageFiles((prev) => [...prev, ...files]);
                  }}
                  onDropRejected={(fileRejections) => {
                    for (const rejection of fileRejections) {
                      for (const fileError of rejection.errors) {
                        if (fileError.code == DropzoneError.FileTooLarge) {
                          return showSnackbar({
                            message: "Die Datei ist zu groß",
                            type: "error",
                          });
                        }
                        if (fileError.code == DropzoneError.FileInvalidType) {
                          return showSnackbar({
                            message: "Der Dateityp ist nicht erlaubt",
                            type: "error",
                          });
                        }
                        if (fileError.code == DropzoneError.TooManyFiles) {
                          return showSnackbar({
                            message:
                              "Bitte droppe nur eine Datei pro mal ins Feld",
                            type: "error",
                          });
                        }
                      }
                    }
                  }}
                  maxImageAmount={1}
                  maxImageSizeInMB={10}
                />
              </div>
              <div className="px-4 flex gap-1 flex-wrap">
                {imageFiles.map((image) => (
                  <div
                    key={`uploaded-image-${imageFiles.indexOf(image)}}`}
                    className="h-20 w-20 shadow-sm border-1 border-gray-500 rounded-md relative"
                  >
                    <FontAwesomeIcon
                      onClick={() => {
                        const newImageFiles = imageFiles.filter(
                          (e) => !(e == image)
                        );
                        setImageFiles(newImageFiles);
                      }}
                      icon={faTrash}
                      className="absolute top-0 right-0 p-1 bg-red-300 rounded-md text-sm"
                    />
                    <img
                      className="object-cover h-full"
                      src={URL.createObjectURL(image)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-4">
                <button
                  onClick={() => uploadImageFiles()}
                  className="border-2 w-55 h-10 rounded-lg bg-ap-new-green cursor-pointer flex flex-row justify-center items-center gap-2"
                >
                  <p className="font-semibold">Alle Bilder Hochladen</p>
                  <FontAwesomeIcon icon={faFileUpload} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="flex flex-row h-full">
        <div className="flex flex-col items-center gap-2 mt-12 ml-8">
          <MediumLabel text="Designs" />
          {!designsAreLoading ? (
            designs.map((e) => (
              <DesignTab
                key={`design-tab-${e.id}`}
                onSelect={() => selectDesignById(e.id)}
                image={e.preferredPullover!.image.url}
              />
            ))
          ) : (
            <>Designs Laden</>
          )}
        </div>
        <div className="px-4 pt-12">
          <div
            className="border-2 rounded-xl border-ap-new-gray bg-ap-new-dark-beige shadow-ap-special-shadow flex justify-center items-center overflow-hidden"
            style={{
              height: designCanvasSize.height,
              width: designCanvasSize.width,
            }}
          >
            {!selectedDesign ? (
              <p>Loading</p>
            ) : (
              <Stage
                height={designCanvasSize.height}
                width={designCanvasSize.width}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
              >
                <Layer>
                  <StaticImage
                    src={selectedDesign.preferredPullover!.image.url}
                    width={designCanvasSize.width * 0.75}
                    canvasSize={designCanvasSize}
                    onClick={(e: KonvaEventObject<MouseEvent>) => {
                      selectImage(null);
                      checkDeselect(e);
                    }}
                  />
                  {!designImagesAreLoading ? (
                    designImages.map((image) => (
                      <ResizableImage
                        key={`design-image-${designImages.indexOf(image)}`}
                        width={image.width}
                        height={image.height}
                        onDelete={async () => {
                          if (!selectedDesign)
                            return showSnackbar({
                              message: "Kein Design ausgewählt",
                              type: "error",
                            });
                          await removeImageFromDesign(image, selectedDesign.id);
                        }}
                        originalPos={{
                          x: image.positionX!,
                          y: image.positionY!,
                        }}
                        originalSize={{
                          width: image.width,
                          height: image.height,
                        }}
                        canvasSize={designCanvasSize}
                        originalScale={{ x: image.scaleX!, y: image.scaleY! }}
                        src={image.url}
                        isSelected={
                          selectedImage != null &&
                          designImages.indexOf(image) ==
                            designImages.indexOf(selectedImage)
                        }
                        onSelect={() => selectImage(image)}
                        onPositionChange={(pos: PositionType) =>
                          changeImagePosition({
                            pos,
                            imageToDesignId: image.imageToDesignId,
                          })
                        }
                        onScaleChange={(scale: ScaleType) =>
                          changeImageScale({
                            scale,
                            imageToDesignId: image.imageToDesignId,
                          })
                        }
                      />
                    ))
                  ) : (
                    <Text text="Design Lädt" />
                  )}
                </Layer>
              </Stage>
            )}
          </div>
          <div className="flex flex-row mt-4 gap-3">
            <ViewOption view="Vorne" selected={true} />
            <ViewOption view="Hinten" />
            <Spacer />
            <button
              onClick={() => saveDesignAlterations()}
              className="border-2 w-60 h-15 rounded-lg bg-ap-new-green shadow-ap-button cursor-pointer"
            >
              <p className="font-semibold">Design Speichern</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col pt-12 gap-4 w-4/12 pr-4">
          <div className="flex flex-row gap-5">
            <div>
              <MediumLabel text="Farbe" />
              <div className="flex flex-row gap-2 mt-5">
                <ColorOption color="grey" selected={true} />
                <ColorOption color="red" selected={true} />
                <ColorOption color="green" selected={true} />
                <ColorOption color="white" selected={true} />
              </div>
            </div>
            <div>
              <MediumLabel text="Pullover-Art" />
              {/* <div className="flex flex-row gap-2">
                <PulloverOption image={GreyFront} name="Normal" />
                <PulloverOption
                  image={CyanFront}
                  name="Oversized"
                  selected={true}
                />
              </div> */}
            </div>
          </div>
          <div className="flex flex-col p-2 items-center border-2 border-ap-new-gray rounded-xl border-ap bg-ap-new-dark-beige">
            <MediumLabel text="Text Elemente" />
          </div>
          <div className="flex flex-col py-4 gap-2 items-center border-2 border-ap-new-gray rounded-xl border-ap bg-ap-new-dark-beige">
            <MediumLabel text="Bild Elemente" />
            <div className="w-11/12 grid grid-cols-2 xl:grid-cols-3 gap-4">
              {!userImagesAreLoading ? (
                userImages.map((image: Image) => (
                  <ImageCard
                    key={`image-card-${image.id}`}
                    image={image.url}
                    onClick={() => {
                      if (!selectedDesign) {
                        return showSnackbar({
                          message:
                            "Wähle ein Design aus bevor du ein Bild hinzufügst",
                        });
                      }
                      addImageToDesign(
                        image,
                        designCanvasSize,
                        selectedDesign.id
                      );
                    }}
                  />
                ))
              ) : (
                <>Bilder Laden</>
              )}
              <UploadImageCard onClick={() => setImageUploadPopupOpen(true)} />
            </div>
            <button className="border-2 h-12 w-58 mt-4 rounded-lg bg-ap-new-green cursor-pointer">
              <p className="font-semibold">+ Von Abipulli Bibliothek</p>
            </button>
            <Link
              to={`/generate/${orderId}`}
              className="px-12 py-3 w-58 cursor-pointer bg-linear-to-r from-ap-gradient-blue to-ap-gradient-red  text-white font-medium rounded-md shadow-sm"
            >
              Mit KI Generieren
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
