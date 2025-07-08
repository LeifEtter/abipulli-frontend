import { createFileRoute, Link } from "@tanstack/react-router";
import { DatePicker } from "src/components/Inputs/DatePicker";
import { InputField } from "src/components/Inputs/InputField";
import { SelectField } from "src/components/Inputs/SelectField";
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
          <div className="flex-1/12 min-w-21">
            <label
              htmlFor="select-country-code"
              className="text-lg font-medium"
            >
              Land *
            </label>
            <Select
              id="select-country-code"
              styles={{}}
              options={selectOptions}
              defaultValue={selectOptions[0]}
            />
          </div>
          <div className="flex-6/12">
            <InputField
              onChange={() => {}}
              placeholder="asdasd"
              value=""
              label="Schule"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
          <div className="flex-4/12">
            <InputField
              onChange={() => {}}
              placeholder="asdasd"
              value=""
              label="Stadt"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1/12 max-w-16">
            <InputField
              onChange={() => {}}
              placeholder="12"
              value=""
              label="Stufe"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
          <div className="flex-9/12 max-w-26">
            <InputField
              onChange={() => {}}
              placeholder="2025"
              value=""
              label="Abijahrgang"
              required
              requiredStarColor="text-abipulli-green-strong"
            />
          </div>
        </div>
        <div className="flex flex-row mt-4">
          <DatePicker
            label={"Wunschtermin Lieferung"}
            value={convertToDateValue(deadline)}
            onChange={(e) =>
              saveProgressLocally({ deadline: new Date(e.target.value) })
            }
          />
        </div>
        <div className="flex w-full justify-between h-20 mt-2">
          <span className="self-end">
            <p>Du hast schon ein Account?</p>
            <Link className="text-blue-500 font-semibold" to="/login">
              Klicke Hier um dich Einzuloggen
            </Link>
          </span>

          <button className="self-start cursor-pointer bg-abipulli-green shadow-ap-button py-1.5 px-4 rounded-md border font-semibold min-w-40 text-md hover:translate-y-2 hover:shadow-none">
            {`Nächster Schritt ->`}
          </button>
        </div>
      </div>
    </div>
  );
}
