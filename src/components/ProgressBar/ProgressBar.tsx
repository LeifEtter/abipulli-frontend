import { JSX } from "react";
import { Center } from "../Misc/Center";
import { SmallLabel } from "../Texts/SmallLabel";
import { MediumLabel } from "../Texts/MediumLabel";

const StepTileStatusOptions = [
  "FINISHED",
  "IN_PROGRESS",
  "NOT_STARTED",
] as const;
export type StepTileStatus = (typeof StepTileStatusOptions)[number];

interface StepTileProps {
  label: string;
  description: string;
  status: StepTileStatus;
}

const StepTile = ({ label, description, status }: StepTileProps) => {
  const IndicatorFinished = (
    <div className="flex ml-1 rounded-full w-10 h-10 bg-abipulli-green-strong my-1">
      <Center>
        <div className="rounded-full w-3 h-3 bg-white"></div>
      </Center>
    </div>
  );

  const IndicatorInProgress = (
    <div className="flex rounded-full w-12 h-12 border-4 border-abipulli-green-strong-opacity-50">
      <Center>
        <div className="flex rounded-full w-10 h-10 bg-white border-2 border-abipulli-green-strong">
          <Center>
            <div className="rounded-full w-3 h-3 bg-abipulli-green-strong"></div>
          </Center>
        </div>
      </Center>
    </div>
  );

  const IndicatorNotStarted = (
    <div className="flex ml-1 rounded-full w-10 h-10 bg-white border-2 border-abipulli-green-strong my-1">
      <Center>
        <div className="rounded-full w-3 h-3 bg-abipulli-green-strong"></div>
      </Center>
    </div>
  );

  const indicator = (): JSX.Element => {
    switch (status) {
      case "FINISHED":
        return IndicatorFinished;
      case "IN_PROGRESS":
        return IndicatorInProgress;
      case "NOT_STARTED":
        return IndicatorNotStarted;
    }
  };
  return (
    <button className="relative flex flex-row gap-2">
      <div>{indicator()}</div>
      <span className="left-14 hidden absolute md:flex flex-col items-start overflow-hidden w-36">
        <SmallLabel text={label} className="font-semibold" />
        <p className="text-left">{description}</p>
      </span>
    </button>
  );
};

export interface SingleProgressBarStep {
  title: string;
  description: string;
  status: StepTileStatus;
}

export const ProgressBar = ({ steps }: { steps: SingleProgressBarStep[] }) => {
  return (
    <div className="card p-4 flex flex-col items-center sm:items-start shadow-sm rounded-2xl md:w-50 transition-all duration-75 md:min-w-56 pb-10">
      <div className="w-full flex justify-center">
        <div className="hidden md:block mb-4">
          <MediumLabel text="Schritte" />
        </div>
      </div>
      {steps.map((step) => (
        <div className="flex flex-col" key={`step-${step.title}`}>
          <StepTile
            label={step.title}
            description={step.description}
            status={step.status as StepTileStatus}
          />
          {steps.indexOf(step) < steps.length - 1 && (
            <div className="h-14 ml-5.5 w-1 bg-abipulli-green-strong" />
          )}
        </div>
      ))}
    </div>
  );
};
