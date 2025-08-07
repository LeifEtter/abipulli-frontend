import { createFileRoute } from "@tanstack/react-router";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";

export const Route = createFileRoute("/_auth/designer/chooseType")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="card">
      <PageTitle>Wähle ein Pullover Typ/Farbe fürs neue Design</PageTitle>
      <PageDescription>
        Dies kannst du selbstverständlich später im Designer ändern
      </PageDescription>
      <div className="flex flex-row gap-2">
        <MediumLabel text="Normal" />
        <div className="shadow-abipulli-xs border-2 border-abipulli-offblack rounded-md font-semibold bg-abipulli-green px-1">
          30€
        </div>
      </div>

      <div className="flex flex-row font-bold gap-2">
        <MediumLabel text="Heavy" />
        <div className="shadow-abipulli-xs border-2 border-abipulli-offblack rounded-md font-semibold bg-abipulli-green px-1">
          40€
        </div>
      </div>
    </div>
  );
}
