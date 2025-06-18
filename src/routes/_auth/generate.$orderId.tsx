import { createFileRoute, useParams } from "@tanstack/react-router";
import { Pullover } from "abipulli-types";
import { useEffect, useState } from "react";
import { InputField } from "src/components/Inputs/InputField";
import { MediumLabel } from "src/components/Texts/MediumLabel";
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
      <div className="flex w-full justify-center">
        <h1 className="text-2xl font-semibold mt-4">Ki Bild Generator</h1>
      </div>
      <div className="flex gap-8 pl-2">
        {/* <Link to={`/designer/${orderId}`}>Zurück</Link> */}
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
              value={inputs.jahrgang}
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
          <div className="flex gap-2">
            {Object.entries(selectedStyles).map(([k, v]) => (
              <button
                className={`hover:-mt-1 hover:mb-1 cursor-pointer transition duration-75 font-medium border-1 border-ap-new-gray p-1 px-2 rounded-md bg-ap-new-dark-beige ${v ? "bg-green-700 text-white border-none shadow-md" : "bg-ap-new-dark-beige"}`}
                onClick={() =>
                  setSelectedStyles((prev) => ({
                    ...prev,
                    [k]: !v,
                  }))
                }
              >
                {k.capitalize()}
              </button>
            ))}
          </div>
          <button className="hover:shadow-md hover:scale-105 px-12 py-2 max-w-2xs mt-2 cursor-pointer bg-linear-to-r from-ap-gradient-blue to-ap-gradient-red  text-white font-medium rounded-md dark:hover:bg-slate-100 focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
            Beschreibung Generieren
          </button>
          <div className="flex">
            <div className="w-7/12 flex flex-col items-center">
              {pullovers.length == 0 ? (
                <>Loading</>
              ) : (
                <div className="relative justify-center mt-5">
                  <div className="flex justify-center">
                    <img
                      src={pullovers[3].image.url}
                      className="w-10/12 max-w-sm"
                    />
                  </div>
                  <div className="absolute flex justify-center items-center w-full h-full top-0 left-0">
                    <img
                      src="https://abipulli.nbg1.your-objectstorage.com/development/users/60/8effa685-4c52-4388-983b-7bd70332e108"
                      alt=""
                      className="-mt-30"
                      width={150}
                    />
                  </div>
                </div>
              )}
              <div className="flex gap-5 mt-5">
                {pullovers[0] ? (
                  ["image1", "image2", "image3"].map((image) => (
                    <img
                      src={
                        "https://abipulli.nbg1.your-objectstorage.com/development/users/60/8effa685-4c52-4388-983b-7bd70332e108"
                      }
                      width={100}
                      height={100}
                      className="border hover:scale-110 transition duration-100 cursor-pointer"
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
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
              <button className="w-full py-2 mt-2 cursor-pointer bg-linear-to-r from-ap-gradient-blue to-ap-gradient-red  text-white font-medium rounded-md shadow-sm">
                3 Designs Generieren
              </button>
              <p className="font-medium text-ap-new-gray leading-5 mt-2">
                Diese Beschreibung wurde generiert, um bessere Bilderzeugung zu
                erlauben. Du darfst diese aber auch bearbeiten.
              </p>
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <MediumLabel text="Wie funktioniert es?" className="mt-1 mb-1" />
          <ol className="list-decimal ml-6 font-medium text-lg [&_li]:leading-6 [&_li]:mt-2">
            <li className="leading-6">
              Gib ein Motto und wähle ob das Jahr angezeigt werden soll
            </li>
            <li>
              Beschreibe den Pullover kurz, gib dabei Elemente an die auf den
              Pullover zu sehen sein sollen
            </li>
            <li>
              Wähle vorgefertigte Style Tags oder Schreibe deine Eigenen. Diese
              gebeb dein Design Persönlichkeit.
            </li>
            <li>
              Wir generieren dir eine verbesserte Beschreibung. Diese kannst du
              auch bearbeiten.
            </li>
            <li>Drücke den Generator Knopf um 3 Designs zu generieren</li>
          </ol>
          <MediumLabel text="Beispiel" className="mt-4 mb-2" />
          <ul className="flex flex-col gap-4">
            {examples ? (
              examples.map((e) => (
                <li className="flex flex-col font-medium text-lg">
                  <div className="flex flex-row gap-2">
                    <img src={e.imageUrl} width={125} height={125} />
                    <p>{e.text}</p>
                  </div>
                  <div className="flex flex-row gap-2 mt-2">
                    {Object.entries(e.styles).map(
                      ([k, v]: [k: string, v: boolean]) => (
                        <div
                          className={`px-2 border rounded-md ${v ? "bg-green-700 text-white" : "bg-ap-new-dark-beige"}`}
                        >
                          {k.capitalize()}
                        </div>
                      )
                    )}
                  </div>
                </li>
              ))
            ) : (
              <>Loading</>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
