import { faKey } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { InputField } from "src/components/Inputs/InputField";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useAuth } from "src/hooks/useAuth";
import { ButtonType } from "src/types/ButtonType";

export const Route = createFileRoute("/freischalten")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activationCode, setActivationCode] = useState<string>("");

  return (
    <div className="card flex flex-col items-start">
      <PageTitle>Email Bestätigen</PageTitle>
      <PageDescription>
        Du erhältst in Kürze eine Email mit deinem Persönlichen
        Bestätigungscode. Gebe diesen Hier ein um dein Account freizuschalten
      </PageDescription>
      <InputField<string>
        className="mt-16 w-40"
        value={activationCode}
        onChange={(e) => setActivationCode(e)}
        label={"Bestätigungscode"}
      />
      <BasicButton
        className="mt-6"
        type={ButtonType.Link}
        to={"/login"}
        icon={faKey}
      >
        Bestätigen
      </BasicButton>
    </div>
  );
}
