import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { errorMessages, User } from "abipulli-types";
import { useEffect, useState } from "react";
import { ApiError } from "src/api/ApiError";
import { UserApi } from "src/api/endpoints/user";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { InputField } from "src/components/Inputs/InputField";
import { Divider } from "src/components/Misc/Divider";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useAuth } from "src/hooks/useAuth";
import { usePopup } from "src/hooks/usePopup";
import { useSnackbar } from "src/hooks/useSnackbar";

export const Route = createFileRoute("/_auth/account")({
  component: RouteComponent,
});

interface InputInfo {
  value: string | null;
  error: string | null;
}
const InputInfoInit = { value: null, error: null };

function RouteComponent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const showPopup = usePopup();
  const showSnackbar = useSnackbar();

  const [email, setEmail] = useState<InputInfo>(InputInfoInit);
  const [oldPass, setOldPass] = useState<InputInfo>(InputInfoInit);
  const [newPass, setNewPass] = useState<InputInfo>(InputInfoInit);

  useEffect(() => {
    const getUserData = async () => {
      const user: Omit<User, "password"> = await UserApi.getUserData();
      setEmail((prev) => ({ ...prev, value: user.email }));
    };

    getUserData();
  }, [user]);

  return (
    <main className="card flex flex-col items-start">
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
        disabled
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
      <BasicButton
        onClick={async () => {
          try {
            if (!oldPass.value || !newPass.value) return;
            await UserApi.changePassword({
              oldPassword: oldPass.value,
              password: newPass.value,
            });
            showSnackbar({
              type: "success",
              message: "Passwort erfolgreich geändert!",
            });
          } catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
              if (error.message == errorMessages.faultyLoginCredentials) {
                setOldPass((prev) => ({
                  ...prev,
                  error: "Passwort ist falsch",
                }));
              }
              showSnackbar({
                type: "error",
                message: "Ups, etwas ist schiefgelaufen",
              });
            }
          }
        }}
        className="mt-4"
        shadow
      >
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
      <BasicButton
        className="mt-8 w-42"
        onClick={async () => {
          // await UserApi.deleteSelf();
          showPopup({
            message: "Willst du dich wirklich ausloggen?",
            description: "Click cancel or confirm",
            onClickConfirm: async () => {
              await logout();
              navigate({ to: "/onboarding" });
            },
          });
        }}
        shadow
        color="bg-gray-200"
      >
        Ausloggen
      </BasicButton>
    </main>
  );
}
