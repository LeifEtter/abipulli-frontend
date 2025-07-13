import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ImageApi } from "src/api/endpoints/image";
import { BasicButton, ButtonType } from "src/components/Buttons/BasicButton";
import { InputField } from "src/components/Inputs/InputField";
import {
  LoadingSpinner,
  LoadingSpinnerNew,
} from "src/components/Misc/LoadingSpinner";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { useSnackbar } from "src/hooks/useSnackbar";

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
  } = useGenerateInfo();

  const showSnackbar = useSnackbar();
  return (
    <div className="card">
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
      <div className="flex flex-row items-center">
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
              await submitComment();
              showSnackbar({
                type: "success",
                message: "Beschreibung Verbessert!",
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Send
        </BasicButton>
      </div>
      <div className="flex flex-row justify-between mt-12">
        <BasicButton
          className="bg-gray-400"
          type={ButtonType.Link}
          to="/vorschau"
        >
          Zurück
        </BasicButton>
        <BasicButton icon={faArrowRight} type={ButtonType.Link} to="/vorschau">
          Bild Generieren
        </BasicButton>
      </div>
    </div>
  );
}
