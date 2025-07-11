import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CountryCode } from "abipulli-types";
import { BasicButton, ButtonType } from "src/components/Buttons/BasicButton";
import { DatePicker } from "src/components/Inputs/DatePicker";
import { InputField } from "src/components/Inputs/InputField";
import { SelectField } from "src/components/Inputs/SelectField";
import { ClickToLogin } from "src/components/Onboarding/ClickToLogin";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";
import { useSnackbar } from "src/hooks/useSnackbar";
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

  const showSnackbar = useSnackbar();

  const {
    countryCode,
    school,
    city,
    grade,
    graduationYear,
    deadline,
    errorState,
    clearError,
    setError,
    saveProgressLocally,
    submitProgress,
    saveToLocalStorage,
    retrieveFromLocalStorage,
  } = useOnboardingInfo();

  return (
    <div className="card max-w-200">
      <PageTitle>Über Eure Schule</PageTitle>
      <PageDescription>
        Wir brauchen erstmal ein Paar Infos über eure Schule damit wir die
        Logistik deiner Bestellung planen können. Aber keine Angst, alles ist
        unverbindlich!
      </PageDescription>
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
          onChange={(e) => {
            clearError("school");
            saveProgressLocally({ school: e.target.value });
          }}
          placeholder="Bsp.: Otto-Schott-Gymnasium"
          value={school ?? ""}
          label="Schule"
          required
          error={errorState.school}
        />
        <InputField
          className="flex-4/12"
          onChange={(e) => saveProgressLocally({ city: e.target.value })}
          placeholder="Bsp.: Mainz"
          value={city ?? ""}
          label="Stadt"
          required
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
        />
      </div>
      <DatePicker
        idPrefix="deadline"
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
      <div className="flex w-full justify-between h-20 mt-2 items-start">
        <ClickToLogin className="self-end" to="/login" />
        <BasicButton
          shadow
          type={ButtonType.Link}
          to="/onboarding/personal"
          icon={faArrowRight}
        >
          Nächster Schritt
        </BasicButton>
      </div>
    </div>
  );
}
