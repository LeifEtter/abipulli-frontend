import { ReactElement, useEffect, useState } from "react";
import { OnboardingContext } from "./onboardingContext";
import { OnboardingInfo, OnboardingInfoSchema } from "abipulli-types";
import { faker } from "@faker-js/faker";

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

  //TODO save onboarding process in localstorage
  const saveProgressLocally = (state: Partial<OnboardingInfo>) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  //TODO submit onboarding progress to backend
  const submitProgress = () => {};

  // TODO get progress from backend
  const getProgress = () => {};

  //TODO React to error
  const setError = () => {};

  useEffect(() => {
    // TODO initialize stuff
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        saveProgressLocally,
        submitProgress,
        getProgress,
        setError,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
