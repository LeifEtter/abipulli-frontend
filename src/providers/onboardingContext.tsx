import { OnboardingInfo } from "abipulli-types";
import { createContext } from "react";

export interface OnboardingContextType extends Partial<OnboardingInfo> {
  saveProgressLocally: (state: Partial<OnboardingInfo>) => void;
  submitProgress: () => void;
  getProgress: () => void;
  setError: () => void;
  saveToLocalStorage: () => void;
  retrieveFromLocalStorage: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);
