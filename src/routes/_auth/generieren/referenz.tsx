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
import { BasicButton } from "src/components/Buttons/BasicButton";
import { ButtonType } from "src/types/ButtonType";
import { ReferenceImagePicker } from "src/components/Generate/ReferenceImagePicker";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { Image } from "abipulli-types";

export const Route = createFileRoute("/_auth/generieren/referenz")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userImages, userImagesAreLoading, userImagesError } = useUserImages();
  const { referenceFile, referenceImage, saveProgressLocally } =
    useGenerateInfo();
  const showSnackbar = useSnackbar();

  const handleDrop = (files: File[]) => {
    if (files.length > 1)
      showSnackbar({ type: "error", message: "Nur eine Datei" });
    if (files[0] && files[0].size > 10000000)
      showSnackbar({ type: "error", message: "Datei zu groß" });
    if (files[0]) {
      saveProgressLocally({ referenceFile: files[0] });
      saveProgressLocally({ referenceImage: undefined });
    }
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
    <div className="card p-6 sm:p-12 max-w-3xl">
      <PageTitle>Habt ihr ein Referenzbild?</PageTitle>
      <PageDescription>
        Damit wir dein Profil anlegen können brauchen wir ein Paar Infos von
        dir. Diese Infos werden gelöscht falls du den Prozess abbrichst, also
        keine Angst!
      </PageDescription>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1/1 sm:flex-6/12 h-full">
          {referenceFile ? (
            <div
              key={`uploaded-image`}
              className="shadow-sm border-1 rounded-md relative h-full"
            >
              <FontAwesomeIcon
                onClick={() =>
                  saveProgressLocally({ referenceFile: undefined })
                }
                icon={faTrash}
                className="absolute top-0 right-0 p-2 bg-red-300 rounded-md text-2xl border"
              />
              <img
                className="object-cover h-full"
                src={URL.createObjectURL(referenceFile)}
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
        <div className="flex-1/1 sm:flex-1/12 flex-col self-center">
          <p className="font-semibold text-lg text-gray-600">ODER</p>
        </div>
        <ReferenceImagePicker
          images={userImages}
          chosenImage={referenceImage}
          setChosenImage={(image: Image) =>
            saveProgressLocally({
              referenceImage: image == referenceImage ? undefined : image,
            })
          }
          deactivate={referenceFile != null}
        />
      </div>
      <div className="flex justify-center mt-8">
        <BasicButton
          shadow
          icon={faArrowRight}
          className="w-60 text-center"
          type={ButtonType.Link}
          to="/generieren/motto"
        >
          Fortfahren
        </BasicButton>
      </div>
    </div>
  );
}
