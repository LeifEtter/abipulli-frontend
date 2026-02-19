import {
  faClockRotateLeft,
  faCopy,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Pullover } from "abipulli-types";
import { DesignApi } from "src/api/endpoints/design";
import { AbiPulliLogo } from "src/components/Misc/AbipulliLogo";
import { Center } from "src/components/Misc/Center";
import { useDesigns } from "src/hooks/useDesign";
import { usePullovers } from "src/hooks/usePullovers";
import { useSnackbar } from "src/hooks/useSnackbar";

// This route handles ONLY /order/$orderId/designer (no children)
export const Route = createFileRoute("/_auth/order/$orderId/designer/")({
  loader: async ({ params }) => {
    const designs = await DesignApi.retrieveOrderDesigns(
      parseInt(params.orderId),
    );

    // if (designs.length > 0) {
    //   throw redirect({
    //     to: "/order/$orderId/designer/$designId/pullover",
    //     params: {
    //       orderId: params.orderId,
    //       designId: designs[0].id.toString(),
    //     },
    //   });
    // }

    return { designs };
  },
  component: RouteComponent,
});

const getTimeSinceEdited = (prevDate: Date): string => {
  const diff: number = Date.now() - prevDate.getTime();
  const dateInMinutes = Math.round(diff / 1000 / 60);
  if (dateInMinutes < 60) return dateInMinutes + " Minuten";
  const dateInHours = Math.round(dateInMinutes / 60);
  if (dateInHours < 24) return dateInHours + " Stunden";
  const dateInDays = Math.round(dateInHours / 24);
  if (dateInMinutes < 31) return dateInDays + " Tagen";
  const dateInMonths = Math.round(dateInDays / 30);
  return dateInMonths + " Monaten";
};

function RouteComponent() {
  const params = Route.useParams();
  const { designs, createDesign } = useDesigns(parseInt(params.orderId));
  const { pullovers } = usePullovers();
  const showSnackbar = useSnackbar();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="self-start">
        <AbiPulliLogo />
      </div>
      <div className="w-10/12 mt-16">
        <h2 className="font-semibold text-3xl mb-6">Deine Entwürfe</h2>
        <div className="flex flex-row flex-wrap gap-5">
          {designs.map((design) => {
            const date = new Date(design.createdAt);
            return (
              <div className="flex flex-col">
                <Link
                  key={`started-design-${design.id}`}
                  to={`/order/${params.orderId}/designer/${design.id}`}
                  className="relative border-1 bg-white border-gray-400 hover:border-abipulli-green-strong hover:rotate-1 rounded-xl w-3xs h-86 flex items-center justify-center p-4 hover:scale-105 animate duration-100 cursor-pointer pt-10"
                >
                  <div className="absolute w-full top-0 h-8 bg-abipulli-green rounded-t-xl shadow-sm">
                    <Center>
                      <p className="font-semibold text-sm text-center">
                        Bearbeitet vor {getTimeSinceEdited(date)}
                        <FontAwesomeIcon
                          icon={faClockRotateLeft}
                          className="ml-2"
                        />
                      </p>
                    </Center>
                  </div>
                  <img
                    src={design.preferredPullover!.frontImage.url}
                    className="w-5/6 mt-0"
                  />
                  <div className="absolute w-full h-full">
                    {design.images?.map((image) => {
                      return (
                        <img
                          key={`design-image-${image.imageToDesignId}`}
                          src={image.url}
                          width={image.width * image.scaleX! * 0.4}
                          height={image.height * image.scaleY! * 0.4}
                          className="absolute"
                          style={{
                            left: image.positionX! * 0.4,
                            top: image.positionY! * 0.4,
                          }}
                        />
                      );
                    })}
                  </div>
                </Link>
                <div className="mt-2 flex flex-row gap-2">
                  <button className="flex w-1/2 gap-1 items-center bg-white border border-abipulli-gray rounded-md px-3 py-1 font-medium cursor-pointer">
                    <FontAwesomeIcon icon={faCopy} />
                    Duplizieren
                  </button>
                  <button className="flex w-1/2 gap-2 items-center bg-white border border-abipulli-gray rounded-md px-3 py-1 font-medium cursor-pointer hover:scale-105 hover:bg-red-100 hover:border-red-200 duration-75 animate">
                    <FontAwesomeIcon icon={faTrash} />
                    Löschen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <h2 className="font-semibold text-3xl mb-6 mt-12">
          Neuen AbiPulli Erstellen
        </h2>
        <div className="flex flex-row gap-5 flex-wrap">
          {pullovers.map((pullover) => (
            <button
              key={`create-pullover-${pullover.id}`}
              onClick={async () => {
                try {
                  const newDesign = await createDesign({
                    orderId: parseInt(params.orderId),
                    preferredPulloverId: pullover.id,
                  });
                  navigate({
                    to: `/order/${parseInt(params.orderId)}/designer/${newDesign.id}`,
                  });
                } catch (error) {
                  showSnackbar({
                    type: "error",
                    message: "Pullover konnte nicht erstellt werden",
                  });
                }
              }}
            >
              <div className="border-2 border-abipulli-darker-beige hover:border-abipulli-green-strong hover:rotate-1 rounded-xl w-48 h-48 flex items-center justify-center bg-white hover:scale-105 animate duration-100 cursor-pointer">
                <img src={pullover.frontImage.url} className="h-4/5" />
              </div>
              <p className="font-semibold text-md mt-1">{pullover.name}</p>
              <p className="text-sm">{pullover.basePrice}.00€ / pro Pulli</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
