import { BasicButton } from "src/components/Buttons/BasicButton";
import { ActionPanel } from "../ActionPanel";
import { GenerateInfoContextType } from "src/providers/generateContext";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { useState } from "react";
import { Toggle } from "src/components/Inputs/Toggle";
import { InputField } from "src/components/Inputs/InputField";
import { SelectedStylesMap } from "src/types/generator/SelectedStyles";
import { StyleSelector } from "src/components/Generate/StyleSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";

interface ImproveDescriptionProps {
  previousTab: () => void;
  nextTab: () => void;
}

export const ImproveDescription = ({
  previousTab,
  nextTab,
}: ImproveDescriptionProps) => {
  const { description, saveProgressLocally } = useGenerateInfo();

  const [selectedStyles, setSelectedStyles] = useState<SelectedStylesMap>({
    comic: false,
    natur: true,
    realistisch: false,
    retro: false,
  });

  const [newTag, setNewTag] = useState<string>();

  const addTag = (tag: string) => {
    setSelectedStyles((prev) => ({ ...prev, [tag]: false }));
  };

  return (
    <ActionPanel title="" description="">
      <InputField
        className="mt-4"
        label="Beschreibung"
        multiline={true}
        minLines={10}
        value={description}
        onChange={(v) => saveProgressLocally({ description: v })}
      />
      <div className="flex flex-row items-end gap-2 w-full mt-4">
        <InputField
          className="w-full"
          multiline
          minLines={3}
          label="Verbesserung"
          onChange={(v) => setNewTag(v)}
          value={newTag}
        />
        {/* <button
          onClick={() => newTag && addTag(newTag)}
          className="h-10 w-10 border bottom bg-abipulli-green rounded-md"
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="bg-abipulli-green h-full aspect-square"
          />
        </button> */}
      </div>
      <BasicButton className="mt-2">Beschreibung Verbessern</BasicButton>
      <div className="separator my-3 mt-10" />
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
