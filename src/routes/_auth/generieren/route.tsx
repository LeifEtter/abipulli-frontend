import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ProgressBar,
  SingleProgressBarStep,
  StepTileStatus,
} from "src/components/ProgressBar/ProgressBar";
import { SidebarNew } from "src/components/Sidebar/SidebarNew";
import { GenerateInfoProvider } from "src/providers/generateProvider";

const StepPagesList = [
  "/generieren/referenz",
  "/generieren/motto",
  "/generieren/beschreibung",
  "/generieren/verbessern",
];
type StepPage = (typeof StepPagesList)[number];

export const Route = createFileRoute("/_auth/generieren")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/generieren") {
      navigate({ to: "/generieren/referenz", replace: true });
    }
  }, [location.pathname]);

  const getStatus = (stepPage: StepPage): StepTileStatus => {
    const currentlyViewingIndex: number = StepPagesList.indexOf(
      location.pathname
    );
    if (currentlyViewingIndex == -1) return "NOT_STARTED";
    const stepPageIndex = StepPagesList.indexOf(stepPage);
    if (stepPageIndex == -1) return "NOT_STARTED";
    if (stepPageIndex == currentlyViewingIndex) return "IN_PROGRESS";
    if (stepPageIndex < currentlyViewingIndex) return "FINISHED";
    return "NOT_STARTED";
  };

  const steps: SingleProgressBarStep[] = [
    {
      title: "Referenz",
      description: "Wähle ein Referenzbild",
      status: getStatus(StepPagesList[0]),
    },
    {
      title: "Motto",
      description: "Eckdaten fürs Bild",
      status: getStatus(StepPagesList[1]),
    },
    {
      title: "Beschreibung",
      description: "Beschreibe dein Bild",
      status: getStatus(StepPagesList[2]),
    },
    {
      title: "Kommentieren",
      description: "Verbessere die Beschreibung",
      status: getStatus(StepPagesList[3]),
    },
  ];

  return (
    <GenerateInfoProvider>
      <div className="w-full flex flex-row gap-4 items-start">
        <Outlet />
        <ProgressBar steps={steps} />
      </div>
    </GenerateInfoProvider>
  );
}
