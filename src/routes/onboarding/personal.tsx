import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute } from "@tanstack/react-router";
import {
  Gender,
  GenderSchema,
  MobileCountryCode,
  MobileCountryCodeSchema,
} from "abipulli-types";
import { useState } from "react";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { DatePicker } from "src/components/Inputs/DatePicker";
import { InputField } from "src/components/Inputs/InputField";
import { SelectField, SelectOption } from "src/components/Inputs/SelectField";
import { ClickToLogin } from "src/components/Onboarding/ClickToLogin";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";
import { ButtonType } from "src/types/ButtonType";
import { convertToDateValue } from "src/utilities/date";

export const Route = createFileRoute("/onboarding/personal")({
  component: RouteComponent,
});

function RouteComponent() {
  const genderOptions: SelectOption<Gender>[] = GenderSchema.options.map(
    (gender) => ({
      value: gender.value as Gender,
      label: gender.value.capitalize(),
    })
  );

  const mobileCountryCodeOptions: SelectOption<MobileCountryCode>[] =
    MobileCountryCodeSchema.options.map((phoneCountry) => ({
      value: phoneCountry.value as MobileCountryCode,
      label: phoneCountry.value,
    }));

  const [repeatPassword, setRepeatPassword] = useState<string | null>(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(
    null
  );

  const {
    userInfo,
    setUserInfo,
    userErrors,
    submitUserInfo,
    submitOrderInfo,
    clearUserError,
    submitProgress,
  } = useOnboardingInfo();

  const passwordStrength = (pw: string | undefined): number => {
    if (!pw) return 0;
    let points: number = 0;

    points += pw.length * 2;
    if (pw.length < 4) return points > 100 ? 100 : points;
    if (pw.match(/[!@#$%^&*()_+]/g)) points += 25;
    if (pw.match(/[A-Z]/g)) points += 25;
    if (pw.match(/[0-9]/g)) points += 25;
    return points > 100 ? 100 : points;
  };

  return (
    <main aria-label="Onboarding Persönliche Daten">
      <div className="card max-w-200">
        <PageTitle>Über Dich</PageTitle>
        <PageDescription>
          Damit wir dein Profil anlegen können brauchen wir ein Paar Infos von
          dir. Diese Infos werden gelöscht falls du den Prozess abbrichst, also
          keine Angst!
        </PageDescription>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-wrap gap-4 mt-4"
          aria-label="Persönliche Daten Formular"
        >
          <SelectField<Gender>
            className="basis-35"
            label="Geschlecht"
            idPrefix="gender"
            options={genderOptions}
            chosenOption={
              genderOptions.find((e) => e.value == userInfo.gender) ??
              genderOptions[0]
            }
            onChange={(e) => e && setUserInfo({ gender: e.value as Gender })}
          />
          <InputField
            className="basis-50"
            onChange={(v) => setUserInfo({ firstName: v })}
            placeholder="Max"
            value={userInfo.firstName ?? ""}
            error={userErrors.firstName}
            label="Name"
            required
          />
          <InputField
            onChange={(v) => setUserInfo({ lastName: v })}
            placeholder="Mustermann"
            value={userInfo.lastName ?? ""}
            error={userErrors.lastName}
            label="Nachname"
            required
          />
          <div
            className="flex flex-row gap-2 flex-12/12"
            aria-label="Mobilnummer und Geburtstag"
          >
            <SelectField<MobileCountryCode>
              className="basis-24"
              idPrefix="mobile"
              label="Vorwahl"
              options={mobileCountryCodeOptions}
              chosenOption={
                mobileCountryCodeOptions.find(
                  (e) => e.value == userInfo.mobileCountryCode
                ) ?? mobileCountryCodeOptions[0]
              }
              onChange={(e) => setUserInfo({ mobileCountryCode: e?.value })}
            />
            <InputField
              className="basis-30"
              onChange={(v) => setUserInfo({ mobileNumber: v })}
              error={userErrors.mobileNumber}
              placeholder="1744206955"
              value={userInfo.mobileNumber ?? ""}
              label="Mobilnummer"
              required
            />
            <DatePicker
              idPrefix="birthday"
              className="flex"
              label={"Geburtstag"}
              value={
                userInfo.birthdate
                  ? convertToDateValue(userInfo.birthdate)
                  : convertToDateValue(new Date())
              }
              onChange={(e) =>
                setUserInfo({ birthdate: new Date(e.target.value) })
              }
            />
          </div>
          <div className="w-full flex flex-row">
            <InputField
              className="basis-50 flex-1/2 max-w-80"
              onChange={(v) => setUserInfo({ email: v })}
              placeholder="max.mustermann@gmail.com"
              value={userInfo.email ?? ""}
              error={userErrors.email}
              label="Email"
              required
            />
          </div>
          <div
            className="flex flex-row gap-4 flex-wrap"
            aria-label="Passwort Eingabe"
          >
            <div>
              <InputField
                className="flex-2/6 basis-30"
                onChange={(v) => setUserInfo({ password: v })}
                placeholder="SuperSicher@1234"
                error={userErrors.password}
                value={userInfo.password ?? ""}
                label="Passwort"
                type="password"
                required
              />
              <div className="h-0.5 mt-2 bg-gray-300" aria-hidden="true">
                <div
                  className="h-0.5 bg-green-500 w-9/12"
                  style={{
                    width: `${passwordStrength(userInfo.password)}%`,
                  }}
                ></div>
              </div>
            </div>
            <InputField
              className="flex-2/6 basis-30"
              onChange={(v) => setRepeatPassword(v)}
              placeholder="SuperSicher@1234"
              value={repeatPassword ?? ""}
              label="Passwort Wiederholen"
              type="password"
              error={repeatPasswordError}
              required
            />
          </div>
        </form>
        <div className="flex w-full justify-between h-20 mt-2 items-start">
          <ClickToLogin className="self-end" to="/login" />
          <BasicButton
            shadow
            onClick={() => {
              submitOrderInfo();
              submitUserInfo();
            }}
            type={ButtonType.Button}
            icon={faArrowRight}
            aria-label="Einreichen"
          >
            Einreichen
          </BasicButton>
        </div>
      </div>
    </main>
  );
}
