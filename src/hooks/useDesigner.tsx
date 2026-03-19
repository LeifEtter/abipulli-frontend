import { useContext } from "react";
import { DesignerContext } from "src/providers/designerContext";

export function useDesigner() {
  const context = useContext(DesignerContext);
  if (!context) {
    throw new Error(
      "useDesigner must be used within a DesignerContextProvider"
    );
  } else {
    return context;
  }
}
