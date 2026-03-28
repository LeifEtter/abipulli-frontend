import { createContext, ReactElement, useContext, useState } from "react";
import { ImageApi } from "src/api/endpoints/image";
import {
  AspectRatio,
  GenerateImageParams,
  Image,
  ImproveImageQueryParams,
} from "abipulli-types";

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
  schoolName?: string;
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

const GenerateInfoContext =
  createContext<GenerateInfoContextType | null>(null);

export function useGenerateInfo() {
  const context = useContext(GenerateInfoContext);
  if (!context) {
    throw new Error(
      "useGenerateInfo must be used within an GenerateInfoProvider"
    );
  }
  return context;
}

export const GenerateInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}): ReactElement => {
  const [state, setState] = useState<GenerateInfo>({
    motto: undefined,
    graduationYear: undefined,
    description: undefined,
    generatedDescription: undefined,
    aspectRatio: "1x1",
    styleTags: [],
    comment: undefined,
    referenceFile: undefined,
    referenceImage: undefined,
    schoolName: undefined,
  });

  const [errorState, setErrorState] = useState<GenerateErrors>({});

  const clearError = (key: keyof GenerateErrors) => {
    setErrorState((prev) => ({ ...prev, [key]: undefined }));
  };

  const setError = ([k, v]: [k: keyof GenerateErrors, v: string]) => {
    setErrorState((prev) => ({ ...prev, [k]: v }));
  };

  //TODO save onboarding process in localstorage
  const saveProgressLocally = (state: Partial<GenerateInfo>) => {
    setState((prev) => ({ ...prev, ...state }));
  };

  const generateDescription = async (): Promise<void> => {
    try {
      if (!state.motto || !state.description) return;
      const req: ImproveImageQueryParams = {
        //ADD graduation year
        motto: state.motto,
        description: state.description,
        styleTags: state.styleTags,
      };
      const { description } = await ImageApi.generateDescription(req);
      saveProgressLocally({ generatedDescription: description });
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async (): Promise<void> => {
    try {
      if (!state.generatedDescription)
        return setError([
          "generatedDescription",
          "Bitte fülle dieses Feld aus oder generiere eine neue Beschreibung",
        ]);
      if (!state.comment)
        return setError([
          "comment",
          "Fülle dieses Feld aus mit einem Kommentar",
        ]);
      const newDescription = await ImageApi.commentOnDescription({
        description: state.generatedDescription!,
        comment: state.comment!,
      });
      saveProgressLocally({ generatedDescription: newDescription });
    } catch (error) {
      console.log(error);
    }
  };

  const generateImage = async (): Promise<number> => {
    try {
      if (!state.generatedDescription) {
        setError(["generatedDescription", "Bitte Generiere eine Beschreibung"]);
        throw Error;
      }
      if (!state.motto) {
        setError(["motto", "Gib dein Motto an"]);
        throw Error;
      }
      if (!state.graduationYear) {
        setError(["graduationYear", "Trage dein Abschlussjahr ein"]);
        throw Error;
      }
      if (!state.aspectRatio) {
        throw Error;
      }

      let imageId: number | undefined;
      if (state.referenceFile) {
        imageId = await ImageApi.upload(state.referenceFile);
      } else if (state.referenceImage) {
        imageId = state.referenceImage!.id;
      }
      const params: GenerateImageParams = {
        referenceImageId: imageId,
        prompt: state.generatedDescription,
        aspectRatio: state.aspectRatio,
      };
      const result: Image[] = await ImageApi.generateImages(params);
      return result[0]!.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const saveToLocalStorage = () => {
    const { referenceFile, ...stateWithoutFile } = state;
    const stringifiedState = JSON.stringify({ ...stateWithoutFile });
    localStorage.setItem("onboardingInfo", stringifiedState);
  };

  const retrieveFromLocalStorage = () => {
    const raw: string | null = localStorage.getItem("onboardingInfo");
    if (!raw) return;
    const parsed = JSON.parse(raw);
    setState((prev) => ({ ...prev, ...parsed.data }));
  };

  return (
    <GenerateInfoContext.Provider
      value={{
        ...state,
        errorState,
        clearError,
        saveProgressLocally,
        setError,
        submitComment,
        generateImage,
        generateDescription,
        saveToLocalStorage: () => {},
        retrieveFromLocalStorage: () => {},
      }}
    >
      {children}
    </GenerateInfoContext.Provider>
  );
};
