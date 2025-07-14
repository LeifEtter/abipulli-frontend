import { AspectRatio, Image } from "abipulli-types";
import { createContext } from "react";

export interface GenerateInfo {
  motto?: string;
  graduationYear?: string;
  description?: string;
  generatedDescription?: string;
  comment?: string;
  aspectRatio: AspectRatio;
  styleTags: string[];
  referenceFile?: File;
  referenceImage?: Image;
}

export type GenerateErrors = {
  [K in keyof GenerateInfo]?: string | null;
};

export interface GenerateInfoContextType extends GenerateInfo {
  errorState: GenerateErrors;
  clearError: (key: keyof GenerateErrors) => void;
  setError: ([k, v]: [k: keyof GenerateErrors, v: string]) => void;
  saveProgressLocally: (state: Partial<GenerateInfo>) => void;
  generateImage: () => Promise<number>;
  saveToLocalStorage: () => void;
  retrieveFromLocalStorage: () => void;
  submitComment: () => Promise<void>;
  generateDescription: () => Promise<void>;
}

export const GenerateInfoContext =
  createContext<GenerateInfoContextType | null>(null);
