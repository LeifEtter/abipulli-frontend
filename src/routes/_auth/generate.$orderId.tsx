import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Pullover } from "abipulli-types";
import { useEffect, useState } from "react";
import { BackButton } from "src/components/Buttons/BackButton";
import { SuperDuperShinySpecialButton } from "src/components/Buttons/SuperDuperShinySpecialButton";
import { ExampleSection } from "src/components/Generate/ExampleSection";
import { ExplanationSection } from "src/components/Generate/ExplanationSection";
import { PreviewChooser } from "src/components/Generate/PreviewChooser";
import { PreviewDesign } from "src/components/Generate/PreviewDesign";
import { StyleSelector } from "src/components/Generate/StyleSelector";
import { InputField } from "src/components/Inputs/InputField";
import { SmallLabel } from "src/components/Texts/SmallLabel";
import { GENERATION_EXAMPLES } from "src/exampleData/GenerationExamples";
import { ImageApi } from "src/services/endpoints/image";
import { PulloverApi } from "src/services/endpoints/pullover";
import { GenerationExample } from "src/types/generator/GenerationExample";
import { SelectedStylesMap } from "src/types/generator/SelectedStyles";

export const Route = createFileRoute("/_auth/generate/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = useParams({ strict: false });

  const [pullovers, setPullovers] = useState<Pullover[]>([]);

  useEffect(() => {
    const getPullovers = async () => {
      try {
        const pullovers = await PulloverApi.getAll();
        setPullovers(pullovers);
      } catch (error) {
        console.error(error);
      }
    };
    getPullovers();
  }, []);

  const [inputs, setInputs] = useState({
    motto: "",
    jahrgang: "",
    beschreibung: "",
    generated: "",
  });

  const [selectedStyles, setSelectedStyles] = useState<SelectedStylesMap>({
    comic: false,
    natur: true,
    realistisch: false,
    retro: false,
  });

  const [examples, setExamples] =
    useState<GenerationExample[]>(GENERATION_EXAMPLES);

  const onImproveDescription = async () => {
    const styleTags: string[] = Object.entries(selectedStyles)
      .map(([style, active]) => (active ? style : null))
      .filter((v) => v != null);
    const description: string = (
      await ImageApi.improveDescription({
        styleTags,
        motto: inputs.motto,
        description: inputs.beschreibung,
      })
    ).description;
    setInputs((prev) => ({ ...prev, generated: description }));
  };

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <BackButton to={`/designer/${orderId}`} />
        <h1 className="text-2xl font-semibold mt-4">Ki Bild Generator</h1>
        <div></div>
      </div>
      <div className="flex gap-8 pl-2">
        <div className="flex flex-col w-7/12 p-2">
          <div className="flex gap-8">
            <div className="w-8/12 max-w-sm">
              <InputField
                value={inputs.motto}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, motto: e.target.value }))
                }
                placeholder="z.B.: Abikropolis"
                label="Motto"
              />
            </div>
            <div className="w-4/12 max-w-36">
              <InputField
                value={inputs.jahrgang}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, jahrgang: e.target.value }))
                }
                placeholder="2025"
                label="Jahrgang"
              />
            </div>
          </div>
          <div className="max-w-xl mt-2">
            <InputField
              value={inputs.beschreibung}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, beschreibung: e.target.value }))
              }
              placeholder="z.B.: Abikropolis"
              label="Beschreibung"
              multiline
              minLines={4}
            />
          </div>
          <SmallLabel text="Styles" className="mt-2" />
          <StyleSelector
            selectedStyles={selectedStyles}
            onSelect={(k) =>
              setSelectedStyles((prev) => ({
                ...prev,
                [k]: !selectedStyles[k],
              }))
            }
          />
          <SuperDuperShinySpecialButton
            onClick={() => onImproveDescription()}
            text="Beschreibung Generieren"
          />
          <div className="flex">
            <div className="w-7/12 flex flex-col items-center">
              <PreviewDesign
                pullover={pullovers[1]}
                designImage="https://abipulli.nbg1.your-objectstorage.com/development/users/60/8effa685-4c52-4388-983b-7bd70332e108"
              />
              <PreviewChooser
                images={[
                  {
                    id: 1,
                    userId: 1,
                    url: "https://abipulli.nbg1.your-objectstorage.com/development/users/60/8effa685-4c52-4388-983b-7bd70332e108",
                    uuid: "asd",
                    createdAt: new Date(Date.now()),
                    width: 1,
                    height: 1,
                  },
                ]}
              />
            </div>
            <div className="w-5/12">
              <InputField
                label="Generierte Beschreibung"
                value={inputs.generated}
                multiline
                minLines={8}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, generated: e.target.value }))
                }
              />
              <SuperDuperShinySpecialButton
                onClick={() => {}}
                text="3 Designs Generieren"
              />
              <p className="font-medium text-ap-new-gray leading-5 mt-2">
                Diese Beschreibung wurde generiert, um bessere Bilderzeugung zu
                erlauben. Du darfst diese aber auch bearbeiten.
              </p>
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <ExplanationSection />
          <ExampleSection examples={examples} />
        </div>
      </div>
    </div>
  );
}
