import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { InputField } from "src/components/Inputs/InputField";
import { Divider } from "src/components/Misc/Divider";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useAuth } from "src/hooks/useAuth";
import { usePopup } from "src/hooks/usePopup";

export const Route = createFileRoute("/_auth/account")({
  component: RouteComponent,
});

interface InputInfo {
  value: string | null;
  error: string | null;
}
const InputInfoInit = { value: null, error: null };

function RouteComponent() {
  const { user } = useAuth();

  const showPopup = usePopup();

  const [email, setEmail] = useState<InputInfo>(InputInfoInit);
  const [oldPass, setOldPass] = useState<InputInfo>(InputInfoInit);
  const [newPass, setNewPass] = useState<InputInfo>(InputInfoInit);
  useEffect(() => {}, []);

  return (
    <div className="card flex flex-col items-start">
      <PageTitle>Account</PageTitle>
      <PageDescription>
        Hier kannst du deine Account Daten verwalten. Schreib uns auf Whatsapp
        falls du deine Email ändern möchtest.
      </PageDescription>
      <InputField
        className="mt-4"
        label="Email"
        value={email.value ?? ""}
        onChange={(e) =>
          setEmail((prev) => ({ ...prev, value: e.target.value }))
        }
        error={email.error}
      />
      <Divider />
      <div className="flex flex-row gap-4">
        <InputField
          className="basis-60"
          label="Altes Passwort"
          value={oldPass.value ?? ""}
          onChange={(e) =>
            setOldPass((prev) => ({ ...prev, value: e.target.value }))
          }
          error={oldPass.error}
        />
        <InputField
          className="basis-60"
          label="Neues Passwort"
          value={newPass.value ?? ""}
          onChange={(e) =>
            setNewPass((prev) => ({ ...prev, value: e.target.value }))
          }
          error={newPass.error}
        />
      </div>
      <BasicButton onClick={() => {}} className="mt-4" shadow>
        Passwort Ändern
      </BasicButton>
      <Divider />
      <BasicButton
        onClick={async () => {
          // await UserApi.deleteSelf();
          showPopup({
            message: "Do you really want to cancel?",
            description: "Click cancel or confirm",
            onClickConfirm: () => {},
          });
        }}
        shadow
        color="bg-red-300"
      >
        Account Löschen
      </BasicButton>
    </div>
  );
}
