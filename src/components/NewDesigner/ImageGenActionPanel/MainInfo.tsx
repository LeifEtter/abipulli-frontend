import { BasicButton } from "src/components/Buttons/BasicButton";
import { ActionPanel } from "../ActionPanel";
import { GenerateInfoContextType } from "src/providers/generateContext";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { useState } from "react";
import { Toggle } from "src/components/Inputs/Toggle";
import { InputField } from "src/components/Inputs/InputField";

interface MainInfoProps {
  previousTab: () => void;
  nextTab: () => void;
}

export const MainInfo = ({ previousTab, nextTab }: MainInfoProps) => {
  const [showMotto, setShowMotto] = useState<boolean>(false);
  const [showYear, setShowYear] = useState<boolean>(false);
  const [showSchoolName, setShowSchoolName] = useState<boolean>(false);

  const { motto, graduationYear, schoolName, saveProgressLocally } =
    useGenerateInfo();

  return (
    <ActionPanel title="" description="" hide={false}>
      <Toggle
        isActive={showMotto}
        toggleActive={() => setShowMotto((prev) => !prev)}
      />
      <InputField
        disabled={!showMotto}
        className="bg-white mt-1"
        label=""
        value={motto ?? ""}
        onChange={(value) => saveProgressLocally({ motto: value })}
      />
      <div className="h-2" />
      <Toggle
        isActive={showYear}
        toggleActive={() => setShowYear((prev) => !prev)}
      />
      <InputField
        disabled={!showYear}
        className="bg-white mt-1"
        label=""
        value={graduationYear ?? "2025"}
        onChange={(value) => saveProgressLocally({ graduationYear: value })}
      />
      <div className="h-2" />
      <Toggle
        isActive={showSchoolName}
        toggleActive={() => setShowSchoolName((prev) => !prev)}
      />
      <InputField
        disabled={!showSchoolName}
        className="bg-white mt-1"
        label=""
        value={"Motto"}
        onChange={(value) => saveProgressLocally({ schoolName: value })}
      />
      <div className="flex grow" />
      <div className="separator my-3" />
      <div className="flex flex-row justify-between">
        <BasicButton
          onClick={() => {
            previousTab();
          }}
        >
          Zurück
        </BasicButton>
        <BasicButton
          onClick={() => {
            nextTab();
          }}
        >
          Weiter
        </BasicButton>
      </div>
    </ActionPanel>
  );
};
