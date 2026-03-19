import { createFileRoute } from "@tanstack/react-router";
import { Center } from "src/components/Misc/Center";

export const Route = createFileRoute("/einladung")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full">
      <Center>
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-xl font-semibold">Einladungscode</h1>
          <div className="border rounded-lg border-abipulli-green">
            <input
              type="text"
              className="border-2 rounded-lg py-1 min-w-70 border-abipulli-darker-beige bg-abipulli-light-beige focus:border-abipulli-green-strong-opacity-50 focus:outline-0 focus:outline-abipulli-light-green"
            />
          </div>
        </div>
      </Center>
    </div>
  );
}
