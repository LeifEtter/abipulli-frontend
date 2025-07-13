import { OnboardingInfo } from "abipulli-types";
import { createContext } from "react";
import { OnboardingErrors } from "./onboardingProvider";

export enum AspectRatio {
  "16x9",
  "1x1",
  "3x4",
  "4x3",
}

export interface GenerateInfo {
  motto?: string;
  graduationYear?: number;
  description?: string;
  generatedDescription?: string;
  comment?: string;
  aspectRatio: AspectRatio;
  styleTags: string[];
}

export type GenerateErrors = {
  [K in keyof GenerateInfo]?: string | null;
};

export interface GenerateInfoContextType extends GenerateInfo {
  errorState: GenerateErrors;
  clearError: (key: keyof GenerateErrors) => void;
  setError: ([k, v]: [k: keyof GenerateErrors, v: string]) => void;
  saveProgressLocally: (state: Partial<GenerateInfo>) => void;
  improveDescription: () => void;
  generateImage: () => void;
  saveToLocalStorage: () => void;
  retrieveFromLocalStorage: () => void;
  submitComment: () => Promise<void>;
}

export const GenerateInfoContext =
  createContext<GenerateInfoContextType | null>(null);
