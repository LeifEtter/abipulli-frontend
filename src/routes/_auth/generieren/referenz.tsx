import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageDropper } from "src/components/Designer/UploadDropper";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useSnackbar } from "src/hooks/useSnackbar";
import { ErrorCode as DropzoneError, FileRejection } from "react-dropzone";
import { useUserImages } from "src/hooks/useUserImages";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Center } from "src/components/Misc/Center";
import { BasicButton, ButtonType } from "src/components/Buttons/BasicButton";

export const Route = createFileRoute("/_auth/generieren/referenz")({
  component: RouteComponent,
});

function RouteComponent() {
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();
  const [chosenImage, setChosenImage] = useState<number | undefined>();
  const { userImages, userImagesAreLoading, userImagesError } = useUserImages();
  const showSnackbar = useSnackbar();

  const handleDrop = (files: File[]) => {
    if (files.length > 1)
      showSnackbar({ type: "error", message: "Nur eine Datei" });
    if (files[0] && files[0].size > 10000000)
      showSnackbar({ type: "error", message: "Datei zu groß" });
    if (files[0]) setUploadedImage(files[0]);
  };

  const handleRejections = (fileRejections: FileRejection[]) => {
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
            message: "Bitte droppe nur eine Datei pro mal ins Feld",
            type: "error",
          });
        }
      }
    }
  };

  return (
    <div className="card max-w-3xl">
      <PageTitle>Habt ihr ein Referenzbild?</PageTitle>
      <PageDescription>
        Damit wir dein Profil anlegen können brauchen wir ein Paar Infos von
        dir. Diese Infos werden gelöscht falls du den Prozess abbrichst, also
        keine Angst!
      </PageDescription>
      <div className="flex flex-row mt-8 gap-6 items-center h-80">
        <div className="flex-6/12 h-full">
          {uploadedImage ? (
            <div
              key={`uploaded-image`}
              className="shadow-sm border-1 rounded-md relative h-full"
            >
              <FontAwesomeIcon
                onClick={() => setUploadedImage(undefined)}
                icon={faTrash}
                className="absolute top-0 right-0 p-2 bg-red-300 rounded-md text-2xl border"
              />
              <img
                className="object-cover h-full"
                src={URL.createObjectURL(uploadedImage)}
              />
            </div>
          ) : (
            <ImageDropper
              onDrop={handleDrop}
              onDropRejected={handleRejections}
              maxImageAmount={1}
              maxImageSizeInMB={10}
            />
          )}
        </div>
        <div className="flex-1/12 flex-col self-center">
          <p className="font-semibold text-lg text-gray-600">ODER</p>
        </div>
        <div className="flex-6/12 flex flex-col border rounded-xl p-4 aspect-square overflow-scroll h-full">
          <MediumLabel
            className="text-center"
            text="Wähle aus zuvor Generierten Bildern"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {[...userImages, ...userImages].map((image) => {
              const imageChosen: boolean = chosenImage == image.id;
              return (
                <div
                  className="cursor-pointer relative"
                  onClick={() =>
                    !uploadedImage &&
                    setChosenImage(imageChosen ? undefined : image.id)
                  }
                >
                  <div
                    className={`absolute -right-2 -top-2 w-6 h-6 border flex ${uploadedImage ? "bg-gray-300" : imageChosen ? "bg-abipulli-green" : "bg-white"}`}
                  >
                    {imageChosen && (
                      <Center>
                        <FontAwesomeIcon icon={faCheck} />
                      </Center>
                    )}
                  </div>
                  <img src={image.url} className="w-30" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <BasicButton
          shadow
          icon={faArrowRight}
          className="w-40 text-center"
          type={ButtonType.Link}
          to="/generieren/motto"
        >
          Weiter
        </BasicButton>
      </div>
    </div>
  );
}
