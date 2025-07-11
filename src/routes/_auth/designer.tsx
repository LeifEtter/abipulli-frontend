import { fa1, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createFileRoute } from "@tanstack/react-router";
import { BasicButton } from "src/components/Buttons/BasicButton";
import { useDesigns } from "src/hooks/useDesigns";

export const Route = createFileRoute("/_auth/designer")({
  component: RouteComponent,
});

function RouteComponent() {
  // const {} = useDesigns();

  return (
    <div className="flex flex-row w-full">
      <div className="card px-0 pt-4 relative  w-4/12 max-w-54 max-h-135">
        <h2 className="text-2xl font-semibold text-center shadow-sm pb-2">
          Designs
        </h2>
        <div className="overflow-scroll max-h-121">
          <div className="flex flex-col items-center gap-2 mt-2">
            {["1", "2", "3", "4", "5"].map((e) => (
              <div key={e} className="border w-30 h-30"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 flex flex-row w-full justify-center">
          <BasicButton icon={faPlus}>Neues Design</BasicButton>
        </div>
      </div>
    </div>
  );
}
