import { OnboardingInfo } from "abipulli-types";
import { createContext } from "react";
import { OnboardingErrors } from "./onboardingProvider";

export interface OnboardingContextType extends Partial<OnboardingInfo> {
  errorState: OnboardingErrors;
  clearError: (key: keyof OnboardingErrors) => void;
  setError: ([k, v]: [k: keyof OnboardingErrors, v: string]) => void;
  saveProgressLocally: (state: Partial<OnboardingInfo>) => void;
  submitProgress: () => void;
  getProgress: () => void;
  saveToLocalStorage: () => void;
  retrieveFromLocalStorage: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);
