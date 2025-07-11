import { createFileRoute, Link } from "@tanstack/react-router";
import { Gender, MobileCountryCode } from "abipulli-types";
import { useState } from "react";
import { InputField } from "src/components/Inputs/InputField";
import { SelectField, SelectOption } from "src/components/Inputs/SelectField";
import { ClickToLogin } from "src/components/Onboarding/ClickToLogin";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";

export const Route = createFileRoute("/onboarding/personal")({
  component: RouteComponent,
});

function RouteComponent() {
  const genderOptions: SelectOption[] = ["weiblich", "männlich", "divers"].map(
    (gender) => ({
      value: gender,
      label: gender.capitalize(),
    })
  );

  const phoneCountryOptions: SelectOption[] = ["+49", "+41", "+43"].map(
    (phoneCountry) => ({
      value: phoneCountry,
      label: phoneCountry,
    })
  );

  const [repeatPassword, setRepeatPassword] = useState<string | null>(null);

  const {
    //gender
    firstName,
    lastName,
    birthdate,
    mobileCountryCode,
    mobileNumber,
    email,
    gender,
    password,
    saveProgressLocally,
    submitProgress,
    saveToLocalStorage,
    retrieveFromLocalStorage,
  } = useOnboardingInfo();

  const passwordStrength = (): number => {
    if (!password) return 0;
    let points: number = 0;

    points += password?.length * 2;
    if (password.length < 4) return points > 100 ? 100 : points;
    if (password.match(/[!@#$%^&*()_+]/g)) points += 25;
    if (password.match(/[A-Z]/g)) points += 25;
    if (password.match(/[0-9]/g)) points += 25;
    return points > 100 ? 100 : points;
  };

  return (
    <div>
      <div className="card max-w-200">
        <PageTitle>Über Dich</PageTitle>
        <PageDescription>
          Damit wir dein Profil anlegen können brauchen wir ein Paar Infos von
          dir. Diese Infos werden gelöscht falls du den Prozess abbrichst, also
          keine Angst!
        </PageDescription>
        <div className="flex flex-wrap gap-4 mt-4">
          <SelectField
            className="basis-35"
            label="Geschlecht"
            options={genderOptions}
            chosenOption={
              genderOptions.filter((option) => option.value == gender)[0]
            }
            onChange={(e) =>
              saveProgressLocally({ gender: e!.value as Gender })
            }
          />
          <InputField
            className="basis-50"
            onChange={(e) => saveProgressLocally({ firstName: e.target.value })}
            placeholder="Max"
            value={firstName ?? ""}
            label="Name"
            required
            requiredStarColor="text-abipulli-green-strong"
          />
          <InputField
            onChange={(e) => saveProgressLocally({ lastName: e.target.value })}
            placeholder="Mustermann"
            value={lastName ?? ""}
            label="Nachname"
            required
            requiredStarColor="text-abipulli-green-strong"
          />
          <div className="flex flex-row gap-2 flex-12/12">
            <SelectField
              className="basis-24"
              label="Vorwahl"
              options={phoneCountryOptions}
              chosenOption={
                phoneCountryOptions.filter(
                  (option) => option.value == mobileCountryCode
                )[0]
              }
              onChange={(e) =>
                saveProgressLocally({
                  mobileCountryCode: e!.value as MobileCountryCode,
                })
              }
            />
            <InputField
              className="basis-30"
              onChange={(e) =>
                saveProgressLocally({ mobileNumber: e.target.value })
              }
              placeholder="1744206955"
              value={mobileNumber ?? ""}
              label="Mobilnummer"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
          <div className="w-full flex flex-row">
            <InputField
              className="basis-50 flex-1/2 max-w-80"
              onChange={(e) => saveProgressLocally({ email: e.target.value })}
              placeholder="max.mustermann@gmail.com"
              value={email ?? ""}
              label="Email"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
          <div className="flex flex-row gap-4 flex-wrap">
            <div>
              <InputField
                className="flex-2/6 basis-30"
                onChange={(e) =>
                  saveProgressLocally({ password: e.target.value })
                }
                placeholder="SuperSicher@1234"
                value={password ?? ""}
                label="Passwort"
                type="password"
                required
                requiredStarColor="text-abipulli-green-strong"
              />
              <div className="h-0.5 mt-2 bg-gray-300">
                <div
                  className="h-0.5 bg-green-500 w-9/12"
                  style={{
                    width: `${passwordStrength()}%`,
                  }}
                ></div>
              </div>
            </div>
            <InputField
              className="flex-2/6 basis-30"
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="SuperSicher@1234"
              value={repeatPassword ?? ""}
              label="Passwort Wiederholen"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
        </div>

        <div className="flex w-full justify-between h-20 mt-2">
          <ClickToLogin className="self-end" to="/login" />
          <button className="self-start cursor-pointer bg-abipulli-green shadow-ap-button py-1.5 px-4 rounded-md border font-semibold min-w-40 text-md hover:translate-y-2 hover:shadow-none">
            {`Nächster Schritt ->`}
          </button>
        </div>
      </div>
    </div>
  );
}
