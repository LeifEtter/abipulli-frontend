import { GenerationExample } from "src/types/generator/GenerationExample";
import { MediumLabel } from "../Texts/MediumLabel";
import { Center } from "../Misc/Center";
import { LoadingSpinner } from "../Misc/LoadingSpinner";

export const ExampleSection = ({
  examples,
}: {
  examples: GenerationExample[];
}) => (
  <>
    <MediumLabel text="Beispiele" className="mt-4 mb-2" />
    <ul className="flex flex-col gap-4">
      {examples.length == 0 ? (
        <Center>
          <LoadingSpinner />
        </Center>
      ) : (
        examples.map((e) => (
          <li
            key={`example-${examples.indexOf(e)}`}
            className="flex flex-col font-medium text-lg"
          >
            <div className="flex flex-row gap-2">
              <img src={e.imageUrl} width={125} height={125} />
              <p>{e.text}</p>
            </div>
            <div className="flex flex-row gap-2 mt-2">
              {Object.entries(e.styles).map(
                ([k, v]: [k: string, v: boolean]) => (
                  <div
                    key={`example-${examples.indexOf(e)}-style-${k}`}
                    className={`px-2 border rounded-md ${v ? "bg-green-700 text-white" : "bg-ap-new-dark-beige"}`}
                  >
                    {k.capitalize()}
                  </div>
                )
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  </>
);
