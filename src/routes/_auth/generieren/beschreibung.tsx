import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { StyleSelector } from "src/components/Generate/StyleSelector";
import { InputField } from "src/components/Inputs/InputField";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";
import { SmallLabel } from "src/components/Texts/SmallLabel";
import { useGenerateInfo } from "src/hooks/useGenerateInfo";
import { SelectedStylesMap } from "src/types/generator/SelectedStyles";
import AbInsBett from "src/assets/Abinsbett-2.png";
import { SizeType } from "src/types/canvas/sizeType";
import { AspectRatio } from "src/providers/generateContext";
import { BasicButton, ButtonType } from "src/components/Buttons/BasicButton";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const Route = createFileRoute("/_auth/generieren/beschreibung")({
  component: RouteComponent,
});

interface SizeButtonProps {
  selected: boolean;
  src: string;
  ratio: string;
  width?: number;
  onClick: () => void;
}

function parseAspectRatio(ratio: string): number {
  const [width, height] = ratio.split("x").map(Number);
  return width / height;
}

const SizeButton = ({
  selected,
  src,
  ratio,
  width = 160,
  onClick,
}: SizeButtonProps) => (
  <div
    onClick={onClick}
    className="cursor-pointer relative hover:scale-110"
    style={{
      width: width,
      height: width / parseAspectRatio(ratio),
    }}
  >
    <img
      src={AbInsBett}
      className={`w-full h-full object-cover ${selected && "border-2 shadow-md"}`}
    />
    <div
      className={`absolute top-0 w-full h-full ${!selected && "bg-gray-600/50"}`}
    ></div>
  </div>
);

function RouteComponent() {
  const { saveProgressLocally, description, aspectRatio, styleTags } =
    useGenerateInfo();

  const [selectedStyles, setSelectedStyles] = useState<SelectedStylesMap>({
    comic: false,
    natur: true,
    realistisch: false,
    retro: false,
  });

  const convertStyleTagsToString = (tags: SelectedStylesMap) =>
    Object.entries(tags)
      .map(([style, active]) => (active ? style : null))
      .filter((v) => v != null);

  return (
    <div className="card w-7/12">
      <PageTitle>Beschreibe das Design der Vorderseite!</PageTitle>
      <PageDescription>
        Kurz, lang, verrückt - stell uns deine Idee vor.
      </PageDescription>
      <InputField
        className="mt-4 mb-4"
        label="Beschreibe dein Bild"
        multiline
        minLines={3}
        onChange={(e) => saveProgressLocally({ description: e.target.value })}
        value={description ?? ""}
      />
      <SmallLabel
        htmlFor={`styles`}
        text="Styles"
        className="text-lg font-medium"
      />
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
      <div className="h-6"> </div>
      <SmallLabel
        htmlFor={`styles`}
        text="Größenverhältnis"
        className="text-lg font-medium"
      />
      <div className="flex flex-row justify-start gap-4 items-center">
        <SizeButton
          onClick={() =>
            saveProgressLocally({ aspectRatio: AspectRatio["1x1"] })
          }
          ratio={"1x1"}
          src={AbInsBett}
          selected={aspectRatio == AspectRatio["1x1"]}
        />
        <SizeButton
          onClick={() =>
            saveProgressLocally({ aspectRatio: AspectRatio["16x9"] })
          }
          ratio={"16x9"}
          src={AbInsBett}
          selected={aspectRatio == AspectRatio["16x9"]}
        />
        <SizeButton
          onClick={() =>
            saveProgressLocally({ aspectRatio: AspectRatio["4x3"] })
          }
          ratio={"4x3"}
          src={AbInsBett}
          selected={aspectRatio == AspectRatio["4x3"]}
        />
      </div>
      <div className="w-full justify-end flex flex-row">
        <BasicButton
          type={ButtonType.Link}
          to={"/generieren/verbessern"}
          icon={faArrowRight}
        >
          Weiter
        </BasicButton>
      </div>
    </div>
  );
}
