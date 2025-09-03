import { Image } from "abipulli-types";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { ActionPanel } from "../ActionPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { NewImageDropper } from "../NewImageDropper";

interface ChooseReferenceImage {
  chosenReferenceImage: string;
  previousGeneratedImages: Image[];
  setReferenceImage: (imageId: number) => void;
  setUploadedReferenceImage: (image: File) => void;
}

export const ChooseReferenceImage = ({
  chosenReferenceImage,
  previousGeneratedImages,
  setReferenceImage,
  setUploadedReferenceImage,
}: ChooseReferenceImage) => {
  return (
    <ActionPanel
      title="Bild Generieren"
      description="Wähle ein Referenzbild für das Bild das du generieren willst. Dies gibt den Style vor."
    >
      <p className="font-semibold text-abipulli-black text-xl mt-4 mb-2">
        Eigenes Referenz Bild
      </p>
      {chosenReferenceImage ? (
        <div className="h-50 w-full flex justify-center border overflow-hidden relative bg-white border-abipulli-gray rounded-xl">
          <img className="object-contain" src={chosenReferenceImage} />
          <div className="absolute right-0 top-0 flex gap-2 items-center bg-abipulli-dark-beige rounded-sm py-1 px-2 shadow-sm">
            <p className="font-semibold">Ändern</p>
            <FontAwesomeIcon icon={faRotate} />
          </div>
        </div>
      ) : (
        <NewImageDropper
          onDrop={(acceptedFiles) => {
            if (acceptedFiles[0] instanceof File)
              setUploadedReferenceImage(acceptedFiles[0]);
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
      <div className="grid grid-cols-3 gap-4 mt-4">
        {previousGeneratedImages.map((img, idx) => (
          <button
            onClick={() => {}}
            className={`rounded-md cursor-pointer ${img.userId ? "border border-black shadow-md" : ""}`}
          >
            <img
              className={`border-12 border-white rounded-md bg-white h-full hover:border-gray-300`}
              src={img.url}
            />
            <div className="flex flex-row mt-1">
              <p className="font-medium text-sm">{""}</p>
            </div>
          </button>
        ))}
      </div>
      <button className="text-center w-full py-2" onClick={() => {}}>
        <p>Alle Bilder Anzeigen</p>
      </button>
      <div className="separator mb-4" />
      <div className="flex flex-row justify-between">
        <BasicButton>Zurück</BasicButton>
        <BasicButton>Fortfahren</BasicButton>
      </div>
    </ActionPanel>
  );
};

// [
//         { src: AbipulliHat, chosen: false },
//         { src: AbipulliHat, chosen: false },
//         { src: AbipulliHat, chosen: false },
//         { src: AbipulliHat, chosen: true },
//       ]
