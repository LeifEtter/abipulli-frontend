import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute } from "@tanstack/react-router";
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

  return (
    <div className="card p-6 sm:p-12 w-6/12 max-w-2xl">
      <PageTitle>Los geht's mit dem Vorderseiten-Design!</PageTitle>
      <PageDescription>
        Wir haben noch zwei kurze Fragen zum Jahrgang
      </PageDescription>
      <Center>
        <div className="w-60 flex flex-col gap-4 mt-12">
          <InputField
            label="Motto"
            value={motto ?? ""}
            onChange={(e) => saveProgressLocally({ motto: e.target.value })}
          />
          <InputField
            label="Jahrgang"
            value={graduationYear?.toString() ?? ""}
            onChange={(e) =>
              saveProgressLocally({ graduationYear: parseInt(e.target.value) })
            }
          />
          <div className="h-6" />
          <BasicButton
            shadow
            icon={faArrowRight}
            className="w-40 text-center"
            type={ButtonType.Link}
            to="/generieren/beschreibung"
          >
            Weiter
          </BasicButton>
        </div>
      </Center>
    </div>
  );
}
