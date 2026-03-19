import { Image, ImageWithPositionAndScale } from "abipulli-types";
import { useEffect, useState } from "react";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";
import { useSnackbar } from "./useSnackbar";
import { DesignApi } from "src/api/endpoints/design";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { calcImageScale } from "src/utilities/Calc/calcImageScale";

export const useDesignImages = (designId: number) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  const {
    data: designImages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["designImages", designId],
    queryFn: async (): Promise<ImageWithPositionAndScale[]> =>
      await DesignApi.retrieveAllImagesForDesign(designId),
    // enabled: !!designId,
    // staleTime: 1000 * 60 * 2, // Disable stale time for testing
  });

  const addImageToDesign = useMutation({
    mutationFn: async ({
      image,
      designCanvasSize,
      isBackside,
    }: {
      image: Image;
      designCanvasSize: SizeType;
      isBackside: boolean;
    }) => {
      const scale: number = calcImageScale({
        canvasSize: designCanvasSize,
        imageSize: { width: image.width, height: image.height },
      });
      return await DesignApi.addImageToDesign({
        designId: designId,
        imageId: image.id,
        addImageToDesignParams: {
          positionX: 0,
          positionY: 0,
          scaleX: scale,
          scaleY: scale,
          isBackside: isBackside,
        },
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["designImages", designId],
      });
      showSnackbar({ message: "Bild hinzugefügt", type: "success" });
    },
    onError: (error) => {
      showSnackbar({
        message: "Bild hinzufügen fehlgeschlagen",
        type: "error",
      });
    },
  });
  const removeImageFromDesign = useMutation({
    mutationFn: async (imageToDesignId: number) => {
      await DesignApi.removeImageFromDesign(imageToDesignId, designId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["designImages", designId],
      });
      showSnackbar({ message: "Bild gelöscht", type: "success" });
    },
    onError: (error) => {
      showSnackbar({
        message: "Bild konnte nicht gelöscht werden",
        type: "error",
      });
    },
  });

  const changeImagePositionMutation = useMutation({
    mutationFn: async ({
      pos,
      imageToDesignId,
    }: {
      pos: PositionType;
      imageToDesignId: number;
    }) => {
      if (!designId) throw new Error("Keine Design ID gegeben");
      const roundedPos: PositionType = {
        x: Math.round(pos.x),
        y: Math.round(pos.y),
      };

      queryClient.setQueryData<ImageWithPositionAndScale[]>(
        ["designImages", designId],
        (old = []) =>
          old.map((img) =>
            img.imageToDesignId === imageToDesignId
              ? {
                  ...img,
                  positionX: roundedPos.x,
                  positionY: roundedPos.y,
                }
              : img,
          ),
      );
      await DesignApi.manipulateImageInDesign({
        imageToDesignId,
        designId: designId!,
        manipulateImageParams: {
          positionX: roundedPos.x,
          positionY: roundedPos.y,
        },
      });
      return { imageToDesignId, pos: roundedPos };
    },
    onError: (error) => {
      showSnackbar({
        message: "Bild konnte nicht umplatziert werden",
        type: "error",
      });
    },
    // onMutate: async ({ pos, imageToDesignId }) => {
    //   await queryClient.invalidateQueries({
    //     queryKey: ["designImages", designId],
    //   });

    //   const previousImages = queryClient.getQueryData<
    //     ImageWithPositionAndScale[]
    //   >(["designImages", designId]);

    //   // queryClient.setQueryData<ImageWithPositionAndScale[]>(
    //   //   ["designImages", designId],
    //   //   (old = []) =>
    //   //     old.map((img) =>
    //   //       img.imageToDesignId === imageToDesignId
    //   //         ? {
    //   //             ...img,
    //   //             positionX: Math.round(pos.x),
    //   //             positionY: Math.round(pos.y),
    //   //           }
    //   //         : img,
    //   //     ),
    //   // );

    //   return { previousImages };

    // onError: (_err, _variables, context) => {
    //   if (context?.previousImages) {
    //     queryClient.setQueryData(
    //       ["designImages", designId],
    //       context.previousImages,
    //     );
    //   }
    //   showSnackbar({
    //     message: "Bild Platzierung fehlgeschlagen",
    //     type: "error",
    //   });
    // },
  });

  const changeImageScale = useMutation({
    mutationFn: async ({
      scale,
      imageToDesignId,
    }: {
      scale: ScaleType;
      imageToDesignId: number;
    }) => {
      queryClient.setQueryData<ImageWithPositionAndScale[]>(
        ["designImages", designId],
        (old = []) =>
          old.map((img) =>
            img.imageToDesignId === imageToDesignId
              ? {
                  ...img,
                  scaleX: scale.x,
                  scaleY: scale.y,
                }
              : img,
          ),
      );
      await DesignApi.manipulateImageInDesign({
        imageToDesignId,
        designId: designId!,
        manipulateImageParams: {
          scaleX: scale.x,
          scaleY: scale.y,
        },
      });
    },
    onError: (error) => {
      showSnackbar({
        message: "Bild konnte nicht vergrössert/verkleinert werden",
        type: "error",
      });
    },
  });

  return {
    designImages,
    designImagesAreLoading: isLoading,
    designImagesError: error,
    changeImagePositionMutation: changeImagePositionMutation.mutateAsync,
    changeImageScale: changeImageScale.mutateAsync,
    addImageToDesign: addImageToDesign.mutateAsync,
    removeImageFromDesign: removeImageFromDesign.mutateAsync,
  };
};
