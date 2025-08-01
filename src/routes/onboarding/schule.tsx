import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CountryCode, CountryCodeSchema } from "abipulli-types";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { DatePicker } from "src/components/Inputs/DatePicker";
import { InputField } from "src/components/Inputs/InputField";
import { SelectField, SelectOption } from "src/components/Inputs/SelectField";
import { ClickToLogin } from "src/components/Onboarding/ClickToLogin";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { useOnboardingInfo } from "src/hooks/useOnboardingInfo";
import { useSnackbar } from "src/hooks/useSnackbar";
import { ButtonType } from "src/types/ButtonType";
import { convertToDateValue } from "src/utilities/date";

export const Route = createFileRoute("/onboarding/schule")({
  component: RouteComponent,
});

function RouteComponent() {
  const countryCodeOptions = CountryCodeSchema.options.map<
    SelectOption<CountryCode>
  >((countryCode) => ({
    value: countryCode.value,
    label: countryCode.value,
  }));

  const showSnackbar = useSnackbar();
  const navigate = useNavigate();

  const {
    orderInfo,
    orderErrors,
    setOrderInfo,
    validateOrderInfo,
    saveOrderInfoToLocalStorage,
  } = useOnboardingInfo();

  return (
    <main aria-label="Onboarding Schule">
      <div className="card max-w-200">
        <PageTitle>Über Eure Schule</PageTitle>
        <PageDescription>
          Wir brauchen erstmal ein Paar Infos über eure Schule damit wir die
          Logistik deiner Bestellung planen können. Aber keine Angst, alles ist
          unverbindlich!
        </PageDescription>
        <div
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-row gap-2 mt-10"
          aria-label="Schulinfos Formular"
        >
          <SelectField<CountryCode>
            label="Land"
            idPrefix="country"
            options={countryCodeOptions}
            chosenOption={
              countryCodeOptions.find(
                (option) => option.value == orderInfo.schoolCountryCode
              )!
            }
            onChange={(e) =>
              setOrderInfo({
                schoolCountryCode: e?.value,
              })
            }
          />
          <InputField
            className="flex-6/12"
            onChange={(v) => setOrderInfo({ school: v })}
            placeholder="Bsp.: Otto-Schott-Gymnasium"
            value={orderInfo.school ?? ""}
            label="Schule"
            required
            error={orderErrors.school}
          />
          <InputField
            className="flex-4/12"
            onChange={(v) => setOrderInfo({ schoolCity: v })}
            placeholder="Bsp.: Mainz"
            value={orderInfo.schoolCity ?? ""}
            error={orderErrors.schoolCity}
            label="Stadt"
            required
          />
        </div>
        <div
          className="flex gap-2 mt-4"
          aria-label="Jahrgang und Abijahrgang Formular"
        >
          <InputField
            className="flex-1/12 max-w-16"
            onChange={(v) => setOrderInfo({ currentGrade: Number(v) })}
            placeholder="12"
            value={
              Number.isNaN(orderInfo.currentGrade) || !orderInfo.currentGrade
                ? ""
                : orderInfo.currentGrade
            }
            error={orderErrors.currentGrade}
            label="Stufe"
            required
          />
          <InputField
            className="flex-9/12 max-w-26"
            onChange={(v) => v && setOrderInfo({ graduationYear: Number(v) })}
            placeholder="2025"
            type="number"
            maxLength={4}
            value={orderInfo.graduationYear!}
            error={orderErrors.graduationYear}
            label="Abijahrgang"
            required
          />
        </div>
        <DatePicker
          idPrefix="deadline"
          className="flex mt-4"
          label={"Wunschtermin Lieferung"}
          value={convertToDateValue(orderInfo.deadline!)}
          onChange={(e) => setOrderInfo({ deadline: new Date(e.target.value) })}
        />
        <div className="flex w-full justify-between h-20 mt-2 items-start">
          <ClickToLogin className="self-end" to="/login" />
          <BasicButton
            shadow
            type={ButtonType.Button}
            onClick={() => {
              if (validateOrderInfo() == false) return;
              saveOrderInfoToLocalStorage();
              navigate({ to: "/onboarding/personal" });
            }}
            // type={ButtonType.Link}
            // to="/onboarding/personal"
            icon={faArrowRight}
            aria-label="Nächster Schritt"
          >
            Nächster Schritt
          </BasicButton>
        </div>
      </div>
    </main>
  );
}
