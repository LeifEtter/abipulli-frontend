import { createFileRoute, Link } from "@tanstack/react-router";
import { CountryCode } from "abipulli-types";
import { DatePicker } from "src/components/Inputs/DatePicker";
import { InputField } from "src/components/Inputs/InputField";
import { SelectField } from "src/components/Inputs/SelectField";
import { ClickToLogin } from "src/components/Onboarding/ClickToLogin";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";
import { convertToDateValue } from "src/utilities/date";

export const Route = createFileRoute("/onboarding/schule")({
  component: RouteComponent,
});

const countryCodes = ["DE", "CH", "AT"];

function RouteComponent() {
  const selectOptions = countryCodes.map((countryCode) => ({
    value: countryCode,
    label: countryCode,
  }));

  const {
    countryCode,
    school,
    city,
    grade,
    graduationYear,
    deadline,
    saveProgressLocally,
    submitProgress,
    saveToLocalStorage,
    retrieveFromLocalStorage,
  } = useOnboardingInfo();

  return (
    <div>
      <div className="bg-white shadow-ap-special-shadow rounded-xl px-12 pt-10 pb-5 max-w-200">
        <h1 className="text-3xl font-medium text-ap-new-black">
          Über Eure Schule
        </h1>
        <p className="text-md text-gray-600">
          Wir brauchen erstmal ein Paar Infos über eure Schule damit wir die
          Logistik deiner Bestellung planen können. Aber keine Angst, alles ist
          unverbindlich!
        </p>
        <div className="flex flex-row gap-2 mt-10">
          <SelectField
            label="Land"
            options={selectOptions}
            chosenOption={
              selectOptions.filter((option) => option.value == countryCode)[0]
            }
            onChange={(e) =>
              saveProgressLocally({
                countryCode: e!.value as CountryCode,
              })
            }
          />
          <InputField
            className="flex-6/12"
            onChange={(e) => saveProgressLocally({ school: e.target.value })}
            placeholder="Bsp.: Otto-Schott-Gymnasium"
            value={school ?? ""}
            label="Schule"
            required
            requiredStarColor="text-abipulli-green-strong"
          />
          <InputField
            className="flex-4/12"
            onChange={(e) => saveProgressLocally({ city: e.target.value })}
            placeholder="Bsp.: Mainz"
            value={city ?? ""}
            label="Stadt"
            required
            requiredStarColor="text-abipulli-green-strong"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <InputField
            className="flex-1/12 max-w-16"
            onChange={(e) =>
              saveProgressLocally({ grade: parseInt(e.target.value) })
            }
            placeholder="12"
            value={grade ? grade.toString() : ""}
            label="Stufe"
            required
            requiredStarColor="text-abipulli-green-strong"
          />
          <InputField
            className="flex-9/12 max-w-26"
            onChange={(e) =>
              saveProgressLocally({ graduationYear: parseInt(e.target.value) })
            }
            placeholder="2025"
            maxLength={4}
            value={graduationYear ? graduationYear.toString() : ""}
            label="Abijahrgang"
            required
            requiredStarColor="text-abipulli-green-strong"
          />
        </div>
        <DatePicker
          className="flex mt-4"
          label={"Wunschtermin Lieferung"}
          value={
            deadline
              ? convertToDateValue(deadline)
              : convertToDateValue(new Date())
          }
          onChange={(e) =>
            saveProgressLocally({ deadline: new Date(e.target.value) })
          }
        />
        <div className="flex w-full justify-between h-20 mt-2">
          <ClickToLogin className="self-end" to="/login" />
          <Link
            to={"/onboarding/personal"}
            className="self-start cursor-pointer bg-abipulli-green shadow-ap-button py-1.5 px-4 rounded-md border font-semibold min-w-40 text-md hover:translate-y-2 hover:shadow-none"
          >
            {`Nächster Schritt ->`}
          </Link>
        </div>
      </div>
    </div>
  );
}
