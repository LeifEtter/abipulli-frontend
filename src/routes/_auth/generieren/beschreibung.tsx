import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { BasicButton } from "src/components/Buttons/BasicButton";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ButtonType } from "src/types/ButtonType";
import { Center } from "src/components/Misc/Center";
import { LoadingSpinnerNew } from "src/components/Misc/LoadingSpinner";

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
  const {
    saveProgressLocally,
    description,
    aspectRatio,
    styleTags,
    errorState,
    clearError,
    generateDescription,
  } = useGenerateInfo();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
    <div className="card px-6 sm:px-12 w-7/12">
      {isLoading && (
        <div className="absolute w-full h-full bg-black/20 top-0 left-0 rounded-2xl">
          <Center>
            <LoadingSpinnerNew />
          </Center>
        </div>
      )}
      <PageTitle>Beschreibe das Design der Vorderseite!</PageTitle>
      <PageDescription>
        Kurz, lang, verrückt - stell uns deine Idee vor.
      </PageDescription>
      <InputField
        className="mt-4 mb-4"
        label="Beschreibe dein Bild"
        multiline
        minLines={3}
        onChange={(e) => {
          clearError("description");
          saveProgressLocally({ description: e.target.value });
        }}
        value={description ?? ""}
        error={errorState.description}
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
          onClick={() => saveProgressLocally({ aspectRatio: "1x1" })}
          ratio={"1x1"}
          src={AbInsBett}
          selected={aspectRatio == "1x1"}
        />
        <SizeButton
          onClick={() => saveProgressLocally({ aspectRatio: "16x9" })}
          ratio={"16x9"}
          src={AbInsBett}
          selected={aspectRatio == "16x9"}
        />
        <SizeButton
          onClick={() => saveProgressLocally({ aspectRatio: "4x3" })}
          ratio={"4x3"}
          src={AbInsBett}
          selected={aspectRatio == "4x3"}
        />
      </div>
      <div className="w-full justify-end flex flex-row">
        <BasicButton
          type={ButtonType.Button}
          onClick={async () => {
            setIsLoading(true);
            await generateDescription();
            setIsLoading(false);
            navigate({ to: "/generieren/verbessern" });
          }}
          // to={"/generieren/verbessern"}
          icon={faArrowRight}
        >
          Beschreibung Generieren
        </BasicButton>
      </div>
    </div>
  );
}
