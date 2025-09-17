import { Image } from "abipulli-types";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { ActionPanel } from "../ActionPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faRotate } from "@fortawesome/free-solid-svg-icons";
import { NewImageDropper } from "../NewImageDropper";
import { useState } from "react";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { GenerateInfoContextType } from "src/providers/generateContext";
import { Center } from "src/components/Misc/Center";

interface ChooseReferenceImage {
  previousGeneratedImages: Image[];
  previousTab: () => void;
  nextTab: () => void;
}

export const ChooseReferenceImage = ({
  previousGeneratedImages,
  previousTab,
  nextTab,
}: ChooseReferenceImage) => {
  const [uploadedImage, setUploadedImage] = useState<File>();
  const [chosenImage, setChosenImage] = useState<Image>();

  const { saveProgressLocally }: GenerateInfoContextType = useGenerateInfo();

  return (
    <ActionPanel
      title="Bild Generieren"
      description="Wähle ein Referenzbild für das Bild das du generieren willst. Dies gibt den Style vor."
      hide={false}
    >
      <p className="font-semibold text-abipulli-black text-xl mt-4 mb-2">
        Eigenes Referenz Bild
      </p>
      {uploadedImage ? (
        <div className="h-50 w-full flex justify-center border overflow-hidden relative bg-white border-abipulli-gray rounded-xl">
          <img
            className="object-contain"
            src={URL.createObjectURL(uploadedImage)}
          />
          <button
            onClick={() => setUploadedImage(undefined)}
            className="cursor-pointer absolute right-0 top-0 flex gap-2 items-center bg-abipulli-dark-beige rounded-sm py-1 px-2 shadow-sm"
          >
            <p className="font-semibold">Entfernen</p>
            <FontAwesomeIcon icon={faRotate} />
          </button>
        </div>
      ) : (
        <NewImageDropper
          onDrop={(acceptedFiles) => {
            if (acceptedFiles[0] instanceof File)
              setUploadedImage(acceptedFiles[0]);
          }}
          onDropRejected={() => {}}
          maxImageAmount={1}
          maxImageSizeInMB={15}
        />
      )}
      <div className="flex flex-row items-center mt-2">
        <div className="separator flex-5/12" />
        <div className="flex-2/12 text-center text-abipulli-black">or</div>
        <div className="separator flex-5/12"></div>
      </div>
      <p className="font-semibold text-abipulli-black text-xl mt-4 mb-2">
        Von zuvor generierten Bildern wählen
      </p>
      <div className="relative">
        <div className="grid grid-cols-3 gap-4 mt-4 overflow-scroll h-96 pb-6">
          {previousGeneratedImages.map((img, idx) => (
            <div key={`prev-generated-image-${idx}`} className="flex flex-col">
              <button
                onClick={() => setChosenImage(img)}
                className={`group relative rounded-md aspect-square cursor-pointer ${img == chosenImage ? "border-2 border-gray-400 shadow-lg" : ""}`}
              >
                <img
                  className={`shadow-sm border-10 w-full object-cover border-white rounded-md bg-white h-full ${img != chosenImage && "group-hover:scale-105"}  duration-75`}
                  src={img.url}
                />
                <div
                  className={`w-full h-full absolute bg-black top-0 left-0 rounded-md opacity-0 ${img != chosenImage && "hover:opacity-10"} scale-105`}
                />
              </button>
              {/* <div className="flex flex-row">
                <p className="font-medium text-sm">Hey</p>
              </div> */}
            </div>
          ))}
        </div>
        {/* <button className="text-center w-full py-2" onClick={() => {}}>
          <p>Alle Bilder Anzeigen</p>
        </button> */}
        {uploadedImage && (
          <div className="w-full h-full top-0 bg-gray-500/40 absolute scale-105 rounded-md hover:cursor-not-allowed">
            <Center>
              <div className="flex flex-col items-center">
                <FontAwesomeIcon
                  size="3x"
                  icon={faLock}
                  className="z-20 opacity-100"
                />
                <p className="mt-2 w-8/12 bg-gray-200 text-center font-semibold rounded-md p-1">
                  Entferne dein hochgeladenes Referenzbild um ein anderes zu
                  wählen
                </p>
              </div>
            </Center>
          </div>
        )}
      </div>

      <div className="separator mb-4" />
      <div className="flex flex-row justify-between">
        <BasicButton
          onClick={() => {
            previousTab();
          }}
        >
          Schließen
        </BasicButton>
        <BasicButton
          onClick={() => {
            saveProgressLocally({
              referenceFile: uploadedImage,
              referenceImage: chosenImage,
            });
            nextTab();
          }}
        >
          Weiter
        </BasicButton>
      </div>
    </ActionPanel>
  );
};
