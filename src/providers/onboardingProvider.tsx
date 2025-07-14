import { ReactElement, useEffect, useState } from "react";
import { OnboardingContext } from "./onboardingContext";
import { OnboardingInfo, OnboardingInfoSchema } from "abipulli-types";

export type OnboardingErrors = {
  [K in keyof OnboardingInfo]?: string | null;
};

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [state, setState] = useState<Partial<OnboardingInfo>>({
    email: undefined,
    password: undefined,
    deadline: undefined,
    mobileNumber: undefined,
    grade: undefined,
    graduationYear: undefined,
    city: undefined,
    countryCode: undefined,
    firstName: undefined,
    lastName: undefined,
    school: undefined,
    birthdate: undefined,
  });

  const [errorState, setErrorState] = useState<OnboardingErrors>({});

  const validate = () => {
    let newErrorState: OnboardingErrors = {};
    for (const [key, value] of Object.entries(state)) {
      newErrorState = {
        ...newErrorState,
        [key]: "Bitte fülle dieses Feld aus",
      };
    }
    setErrorState(newErrorState);
  };

  const clearError = (key: keyof OnboardingErrors) => {
    setErrorState((prev) => ({ ...prev, [key]: undefined }));
  };

  const setError = ([k, v]: [k: keyof OnboardingErrors, v: string]) => {
    setErrorState((prev) => ({ ...prev, [k]: v }));
  };

  //TODO save onboarding process in localstorage
  const saveProgressLocally = (state: Partial<OnboardingInfo>) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  const saveToLocalStorage = () => {
    const { password, ...stateWithoutPassword } = state;
    const stringifiedState = JSON.stringify(stateWithoutPassword);
    localStorage.setItem("onboardingInfo", stringifiedState);
  };

  const retrieveFromLocalStorage = (): boolean => {
    const raw: string | null = localStorage.getItem("onboardingInfo");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    const result = OnboardingInfoSchema.partial().nullable().safeParse(parsed);
    if (!result.success) return false;
    setState((prev) => ({ ...prev, ...result.data }));
    return true;
  };

  //TODO submit onboarding progress to backend
  const submitProgress = () => {
    validate();
  };

  // TODO get progress from backend
  const getProgress = () => {};

  useEffect(() => {
    // TODO initialize stuff
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        errorState,
        clearError,
        saveProgressLocally,
        submitProgress,
        getProgress,
        setError,
        saveToLocalStorage,
        retrieveFromLocalStorage,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
