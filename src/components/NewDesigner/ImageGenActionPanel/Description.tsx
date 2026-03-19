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
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface DescriptionProps {
  previousTab: () => void;
  nextTab: () => void;
}

export const Description = ({ previousTab, nextTab }: DescriptionProps) => {
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
    <ActionPanel title="" description="" hide={false}>
      <InputField
        label="Beschreibung"
        multiline={true}
        minLines={10}
        value={description}
        onChange={(v) => saveProgressLocally({ description: v })}
      />
      <div className="flex flex-row items-end gap-2 w-full">
        <InputField
          label="Style Tags"
          onChange={(v) => setNewTag(v)}
          value={newTag}
        />
        <button
          onClick={() => newTag && addTag(newTag)}
          className="h-10 w-10 border bottom bg-abipulli-green rounded-md"
        >
          <FontAwesomeIcon
            icon={faPlus}
            className="bg-abipulli-green h-full aspect-square"
          />
        </button>
      </div>
      <div className="h-6"></div>
      <StyleSelector
        id="styles"
        selectedStyles={selectedStyles}
        onSelect={(k) =>
          setSelectedStyles((prev) => ({
            ...prev,
            [k]: !selectedStyles[k],
          }))
        }
      />
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
