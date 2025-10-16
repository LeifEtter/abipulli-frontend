import { createFileRoute } from "@tanstack/react-router";
import { Pullover } from "abipulli-types";
import { useEffect, useState } from "react";
import { PulloverApi } from "src/api/endpoints/pullover";
import { Divider } from "src/components/Misc/Divider";
import { useDesigner } from "src/hooks/useDesigner";

export const Route = createFileRoute("/_auth/designer/$designId/pullover")({
  component: RouteComponent,
});

function RouteComponent() {
  const { selectedImage } = useDesigner();
  const [pullovers, setPullovers] = useState<Pullover[]>();

  useEffect(() => {
    const fetchPullovers = async () => {
      const res: Pullover[] = await PulloverApi.getAll();
      setPullovers(res);
    };

    fetchPullovers();
  }, []);

  return (
    <div
      className={`duration-100 h-full flex flex-col px-4 max-w-lg ${selectedImage ? "w-0 lg:w-80" : "w-30 md:w-50 lg:w-80 xl:w-100"}`}
    >
      <h2 className="font-medium">Select Pullover Modell</h2>
      <Divider className="mt-2 bg-abipulli-darker-beige" />
    </div>
  );
}
