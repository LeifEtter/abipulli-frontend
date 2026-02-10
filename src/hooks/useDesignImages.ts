import { Image, ImageWithPositionAndScale } from "abipulli-types";
import { useEffect, useState } from "react";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";
import { useSnackbar } from "./useSnackbar";
import { DesignApi } from "src/api/endpoints/design";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    staleTime: 1000 * 60 * 2, // Disable stale time for testing
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

  const getDesignImageIndex = (imageToDesignId: number): number | undefined => {
    const index: number = designImages.findIndex(
      (image) => image.imageToDesignId == imageToDesignId,
    );

    if (index < 0) {
      return undefined;
    }
    return index;
  };
  // Mutate for changing position - with optimistic update
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
    onMutate: async ({ pos, imageToDesignId }) => {
      // Optimistic update: Update position immediately in cache
      await queryClient.cancelQueries({ queryKey: ["designImages", designId] });

      const previousImages = queryClient.getQueryData<
        ImageWithPositionAndScale[]
      >(["designImages", designId]);

      queryClient.setQueryData<ImageWithPositionAndScale[]>(
        ["designImages", designId],
        (old = []) =>
          old.map((img) =>
            img.imageToDesignId === imageToDesignId
              ? {
                  ...img,
                  positionX: Math.round(pos.x),
                  positionY: Math.round(pos.y),
                }
              : img,
          ),
      );

      return { previousImages };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousImages) {
        queryClient.setQueryData(
          ["designImages", designId],
          context.previousImages,
        );
      }
      showSnackbar({
        message: "Bild Platzierung fehlgeschlagen",
        type: "error",
      });
    },
  });

  //OLD
  // const changeImagePosition = async ({
  //   pos,
  //   imageToDesignId,
  // }: {
  //   pos: PositionType;
  //   imageToDesignId: number;
  // }) => {
  //   const index: number | undefined = getDesignImageIndex(imageToDesignId);
  //   if (index == undefined)
  //     return showSnackbar({ message: "Bild Platzierung fehlgeschlagen" });
  //   const newPos: PositionType = {
  //     x: Math.round(pos.x),
  //     y: Math.round(pos.y),
  //   };
  //   designImages[index].positionX = Math.round(pos.x);
  //   designImages[index].positionY = Math.round(pos.y);
  //   setDesignImages(designImages);
  //   await DesignApi.manipulateImageInDesign({
  //     imageToDesignId,
  //     designId: designId!,
  //     manipulateImageParams: {
  //       positionX: newPos.x,
  //       positionY: newPos.y,
  //     },
  //   });
  // };

  // const changeImageScale = async ({
  //   scale,
  //   imageToDesignId,
  // }: {
  //   scale: ScaleType;
  //   imageToDesignId: number;
  // }) => {
  //   const index: number | undefined = getDesignImageIndex(imageToDesignId);
  //   if (index == undefined)
  //     return showSnackbar({ message: "Bild Skalierung Fehlgeschlagen" });

  //   designImages[index].scaleX = scale.x;
  //   designImages[index].scaleY = scale.y;
  //   setDesignImages(designImages);
  //   await DesignApi.manipulateImageInDesign({
  //     imageToDesignId,
  //     designId: designId!,
  //     manipulateImageParams: {
  //       scaleX: scale.x,
  //       scaleY: scale.y,
  //     },
  //   });
  // };

  const changeImageScale = () => {};

  return {
    designImages,
    designImagesAreLoading: isLoading,
    designImagesError: error,
    changeImagePositionMutation,
    changeImageScale,
    addImageToDesign: addImageToDesign.mutateAsync,
    removeImageFromDesign: removeImageFromDesign.mutateAsync,
  };
};
