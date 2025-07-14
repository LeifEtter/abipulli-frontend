import { useContext } from "react";
import { GenerateInfoContext } from "src/providers/generateContext";

export function useGenerateInfo() {
  const context = useContext(GenerateInfoContext);
  if (!context) {
    throw new Error(
      "useGenerateInfo must be used within an GenerateInfoProvider"
    );
  } else {
    return context;
  }
}
