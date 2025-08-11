import { createFileRoute } from "@tanstack/react-router";
import { DesignCreateParams, Pullover } from "abipulli-types";
import { MediumLabel } from "src/components/Texts/MediumLabel";
import { PageDescription } from "src/components/Texts/PageDescription";
import { PageTitle } from "src/components/Texts/PageTitle";

const PulloverModelCard = ({
  pullover,
  onSelectPullover,
}: {
  pullover: Pullover;
  onSelectPullover: (pulloverId: number) => void;
}) => (
  <div>
    <button
      onClick={() => onSelectPullover(pullover.id)}
      className="hover:cursor-pointer hover:scale-110 duration-100 hover:bg-abipulli-green hover:shadow-abipulli hover:border-2 p-2 rounded-xl"
    >
      <img className="w-40" src={pullover.frontImage.url} />
    </button>
  </div>
);

export const Route = createFileRoute("/_auth/designer/chooseType")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pullovers, setPullovers] = useState<Pullover[]>();
  return (
    <div className="card">
      <PageTitle>Wähle ein Pullover Typ/Farbe fürs neue Design</PageTitle>
      <PageDescription>
        Dies kannst du selbstverständlich später im Designer ändern
      </PageDescription>
      <div className="flex flex-row gap-2 mt-8">
        <MediumLabel text="Normal" />
        <div className="shadow-abipulli-xs border-2 border-abipulli-offblack rounded-md font-semibold bg-abipulli-green px-1">
          30€
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-6">
        {pullovers &&
          pullovers
            .filter((e) => e.basePrice == 30)
            .map((pullover) => (
              <PulloverModelCard
                onSelectPullover={onSelectPullover}
                pullover={pullover}
              />
            ))}
      </div>

      <div className="flex flex-row font-bold gap-2 mt-8">
        <MediumLabel text="Heavy" />
        <div className="shadow-abipulli-xs border-2 border-abipulli-offblack rounded-md font-semibold bg-abipulli-green px-1">
          40€
        </div>
      </div>
      <div className="flex flex-row mt-4 gap-6">
        {pullovers &&
          pullovers
            .filter((e) => e.basePrice == 40)
            .map((pullover) => (
              <PulloverModelCard
                onSelectPullover={onSelectPullover}
                pullover={pullover}
              />
            ))}
      </div>
    </div>
  );
}
