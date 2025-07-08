import { OnboardingInfo } from "abipulli-types";
import { createContext } from "react";

export interface OnboardingContextType extends OnboardingInfo {
  saveProgressLocally: (state: Partial<OnboardingInfo>) => void;
  submitProgress: () => void;
  getProgress: () => void;
  setError: () => void;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(
  null
);
