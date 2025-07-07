import { JSX, useState } from "react";
import { Center } from "../Misc/Center";
import { SmallLabel } from "../Texts/SmallLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faCircleQuestion,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "@tanstack/react-router";

const StepTileStatusOptions = [
  "FINISHED",
  "IN_PROGRESS",
  "NOT_STARTED",
] as const;
type StepTileStatus = (typeof StepTileStatusOptions)[number];

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
    <div className="flex flex-row gap-2">
      {indicator()}
      <span>
        <SmallLabel text={label} className="font-semibold" />
        <p>{description}</p>
      </span>
    </div>
  );
};

export const SidebarNew: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      label: "Grundinfos",
      description: "Schritt 1: Infos",
      status: "FINISHED",
    },
    {
      label: "Grundinfos",
      description: "Schritt 1: Infos",
      status: "IN_PROGRESS",
    },
    {
      label: "Grundinfos",
      description: "Schritt 1: Infos",
      status: "NOT_STARTED",
    },
  ];

  return (
    <div className="h-full flex flex-col gap-4 justify-start">
      <div className="flex flex-col items-start bg-white shadow-ap-special-shadow rounded-2xl px-8 py-4 min-h-9/12">
        <h2 className="text-xl font-semibold mb-10">Abipulli.com</h2>
        {steps.map((step) => (
          <>
            <StepTile
              label={step.label}
              description={step.description}
              status={step.status as StepTileStatus}
            />
            {steps.indexOf(step) < steps.length - 1 ? (
              <div className="h-14 ml-5.5 w-1 bg-abipulli-green-strong"></div>
            ) : (
              <></>
            )}
          </>
        ))}
      </div>
      <div className="card p-3">
        <Link to="/chats" aria-labelledby="link-title">
          <span className="flex gap-2 border items-center">
            <FontAwesomeIcon icon={faComments} />
            <span id="link-title">Chats</span>
          </span>
        </Link>
        <Link to="/help" aria-labelledby="link-title">
          <span className="flex gap-2 border items-center">
            <FontAwesomeIcon icon={faCircleQuestion} />
            <span id="link-title">Chats</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
