import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { InputField } from "src/components/Inputs/InputField";
import { Center } from "src/components/Misc/Center";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { ButtonType } from "src/types/ButtonType";

export const Route = createFileRoute("/_auth/generieren/motto")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    errorState,
    clearError,
    setError,
    motto,
    graduationYear,
    saveProgressLocally,
  } = useGenerateInfo();

  const navigate = useNavigate();

  return (
    <main
      className="card p-6 sm:p-12 w-10/12 max-w-2xl flex flex-col items-start"
      aria-label="Motto und Jahrgang Eingabe"
    >
      <PageTitle>Los geht's mit dem Vorderseiten-Design!</PageTitle>
      <PageDescription>
        Wir haben noch zwei kurze Fragen zum Jahrgang
      </PageDescription>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4 w-full items-center"
        aria-label="Motto und Jahrgang Formular"
      >
        <InputField
          label="Motto"
          value={motto ?? ""}
          className="mt-8"
          onChange={(v) => {
            clearError("motto");
            saveProgressLocally({ motto: v });
          }}
          error={errorState.motto}
        />
        <InputField
          label="Jahrgang"
          value={graduationYear?.toString() ?? ""}
          onChange={(v) => {
            clearError("graduationYear");
            saveProgressLocally({ graduationYear: v });
          }}
          error={errorState.graduationYear}
        />
        <BasicButton
          shadow
          icon={faArrowRight}
          className="text-center w-52 mt-8"
          type={ButtonType.Button}
          onClick={() => {
            if (!motto) setError(["motto", "Fülle dieses Feld aus"]);
            if (!graduationYear)
              setError(["graduationYear", "Fülle dieses Feld aus"]);
            if (!motto || !graduationYear) return;
            navigate({ to: "/generieren/beschreibung" });
          }}
          aria-label="Weiter zur Beschreibung"
        >
          Weiter
        </BasicButton>
      </form>
    </main>
  );
}
