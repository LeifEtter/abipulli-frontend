import { ReactElement, useEffect, useState } from "react";
import {
  AspectRatio,
  GenerateErrors,
  GenerateInfo,
  GenerateInfoContext,
} from "./generateContext";
import { ImageApi } from "src/api/endpoints/image";

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
    aspectRatio: AspectRatio["1x1"],
    styleTags: [],
    comment: undefined,
  });

  const [errorState, setErrorState] = useState<GenerateErrors>({});

  const validate = () => {
    let newErrorState: GenerateErrors = {};
    for (const [key, value] of Object.entries(state)) {
      console.log(key);
      newErrorState = {
        ...newErrorState,
        [key]: "Bitte fülle dieses Feld aus",
      };
    }
    setErrorState(newErrorState);
  };

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

  // const saveToLocalStorage = () => {
  //   const { password, ...stateWithoutPassword } = state;
  //   const stringifiedState = JSON.stringify(stateWithoutPassword);
  //   localStorage.setItem("onboardingInfo", stringifiedState);
  // };

  // const retrieveFromLocalStorage = () => {
  //   const raw: string | null = localStorage.getItem("onboardingInfo");
  //   if (!raw) return;
  //   const parsed = JSON.parse(raw);
  //   const result = OnboardingInfoSchema.partial().nullable().safeParse(parsed);
  //   if (!result.success) return console.log(result.error);
  //   console.log(result.data!.countryCode);
  //   setState((prev) => ({ ...prev, ...result.data }));
  // };

  useEffect(() => {
    // TODO initialize stuff
  }, []);

  return (
    <GenerateInfoContext.Provider
      value={{
        ...state,
        errorState,
        clearError,
        saveProgressLocally,
        setError,
        submitComment,
        improveDescription: () => {},
        generateImage: () => {},
        saveToLocalStorage: () => {},
        retrieveFromLocalStorage: () => {},
      }}
    >
      {children}
    </GenerateInfoContext.Provider>
  );
};
