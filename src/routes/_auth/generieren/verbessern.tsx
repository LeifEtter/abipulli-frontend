import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ImageApi } from "src/api/endpoints/image";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { InputField } from "src/components/Inputs/InputField";
import { Center } from "src/components/Misc/Center";
import {
  LoadingSpinner,
  LoadingSpinnerNew,
} from "src/components/Misc/LoadingSpinner";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { useSnackbar } from "src/hooks/useSnackbar";
import { ButtonType } from "src/types/ButtonType";

export const Route = createFileRoute("/_auth/generieren/verbessern")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    generatedDescription,
    saveProgressLocally,
    submitComment,
    comment,
    errorState,
    clearError,
    generateImage,
  } = useGenerateInfo();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const showSnackbar = useSnackbar();
  return (
    <div className="card relative">
      {isLoading && (
        <div className="absolute w-full h-full bg-black/20 top-0 left-0 rounded-2xl">
          <Center>
            <LoadingSpinnerNew />
          </Center>
        </div>
      )}
      <PageTitle>Beschreibe das Design der Vorderseite!</PageTitle>
      <PageDescription>
        Kurz, lang, verrückt - stell uns deine Idee vor.
      </PageDescription>
      <InputField
        className="mt-4 mb-4 basis-80 max-w-106"
        label="Generierte Beschreibung"
        multiline
        minLines={3}
        onChange={(e) =>
          saveProgressLocally({
            generatedDescription: e.target.value,
          })
        }
        value={generatedDescription ?? ""}
        error={errorState.generatedDescription}
      />
      <form
        onClick={(e) => e.preventDefault()}
        className="flex flex-row items-center"
        aria-label="Kommentar Formular"
      >
        <InputField
          className="mt-4 mb-4 basis-80"
          label="Schlage Verbesserungen vor"
          onChange={(e) => {
            clearError("comment");
            saveProgressLocally({ comment: e.target.value });
          }}
          value={comment ?? ""}
          error={errorState.comment}
        />
        <BasicButton
          className="mt-7 ml-2"
          icon={faPaperPlane}
          onClick={async () => {
            try {
              clearError("comment");
              setIsLoading(true);
              await submitComment();
              setIsLoading(false);
              showSnackbar({
                type: "success",
                message: "Beschreibung Verbessert!",
              });
            } catch (error) {
              console.log(error);
            }
          }}
          aria-label="Kommentar senden"
        >
          Send
        </BasicButton>
      </form>
      <div className="flex flex-row justify-between mt-12">
        <BasicButton
          className="bg-gray-400"
          type={ButtonType.Link}
          to="/vorschau"
        >
          Zurück
        </BasicButton>
        <BasicButton
          icon={faArrowRight}
          type={ButtonType.Button}
          onClick={async () => {
            try {
              setIsLoading(true);
              const imageId = await generateImage();
              setIsLoading(false);
              navigate({ to: `/vorschau/${imageId}` });
            } catch (error) {
              console.log(error);
              showSnackbar({
                type: "error",
                message: "Bild konnte nicht generiert werden",
              });
            }
          }}
        >
          Bild Generieren
        </BasicButton>
      </div>
    </div>
  );
}
