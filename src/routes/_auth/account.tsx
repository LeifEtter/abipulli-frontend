import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { InputField } from "src/components/Inputs/InputField";
import { Divider } from "src/components/Misc/Divider";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useAuth } from "src/hooks/useAuth";

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

  const [email, setEmail] = useState<InputInfo>(InputInfoInit);
  const [oldPass, setOldPass] = useState<InputInfo>(InputInfoInit);
  const [newPass, setNewPass] = useState<InputInfo>(InputInfoInit);
  useEffect(() => {}, []);

  return (
    <div className="card flex flex-col">
      <PageTitle>Account</PageTitle>
      <PageDescription>
        Hier kannst du deine Account Daten verwalten. Schreib uns auf Whatsapp
        falls du deine Email ändern möchtest.
      </PageDescription>
      <InputField
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
          value={email.value ?? ""}
          onChange={(e) =>
            setEmail((prev) => ({ ...prev, value: e.target.value }))
          }
          error={email.error}
        />
        <InputField
          className="basis-60"
          label="Neues Passwort"
          value={email.value ?? ""}
          onChange={(e) =>
            setEmail((prev) => ({ ...prev, value: e.target.value }))
          }
          error={email.error}
        />
      </div>
      <Divider />
    </div>
  );
}
