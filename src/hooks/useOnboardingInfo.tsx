import { useContext } from "react";
import { OnboardingContext } from "src/providers/onboardingContext";

export function useOnboardingInfo() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingInfo must be used within an OnboardingProvider"
    );
  } else {
    return context;
  }
}
