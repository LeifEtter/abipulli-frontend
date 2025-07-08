import { ReactElement, useEffect, useState } from "react";
import { OnboardingContext } from "./onboardingContext";
import { OnboardingInfo } from "abipulli-types";
import { faker } from "@faker-js/faker";

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [state, setState] = useState<OnboardingInfo>({
    email: "",
    password: "",
    deadline: new Date(),
    mobileNumber: "",
    grade: 12,
    graduationYear: new Date().getFullYear(),
    city: "",
    countryCode: "DE",
    firstName: "",
    lastName: "",
    school: "",
    birthdate: new Date(),
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
