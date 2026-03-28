import { Image, ImageWithPositionAndScale } from "abipulli-types";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";
import { useSnackbar } from "src/providers/snackbarProvider";
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
  } = useQuery({
    queryKey: ["designImages", designId],
    queryFn: async (): Promise<ImageWithPositionAndScale[]> =>
      await DesignApi.retrieveAllImagesForDesign(designId),
    enabled: !!designId,
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
    onError: () => {
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
    onMutate: async (imageToDesignId) => {
      await queryClient.cancelQueries({
        queryKey: ["designImages", designId],
      });
      const previous = queryClient.getQueryData<ImageWithPositionAndScale[]>([
        "designImages",
        designId,
      ]);
      queryClient.setQueryData<ImageWithPositionAndScale[]>(
        ["designImages", designId],
        (old = []) =>
          old.filter((img) => img.imageToDesignId !== imageToDesignId),
      );
      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["designImages", designId],
          context.previous,
        );
      }
      showSnackbar({
        message: "Bild konnte nicht gelöscht werden",
        type: "error",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["designImages", designId] });
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
      const roundedPos: PositionType = {
        x: Math.round(pos.x),
        y: Math.round(pos.y),
      };
      await DesignApi.manipulateImageInDesign({
        imageToDesignId,
        designId,
        manipulateImageParams: {
          positionX: roundedPos.x,
          positionY: roundedPos.y,
        },
      });
      return { imageToDesignId, pos: roundedPos };
    },
    onMutate: async ({ pos, imageToDesignId }) => {
      await queryClient.cancelQueries({
        queryKey: ["designImages", designId],
      });
      const previous = queryClient.getQueryData<ImageWithPositionAndScale[]>([
        "designImages",
        designId,
      ]);
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
      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["designImages", designId],
          context.previous,
        );
      }
      showSnackbar({
        message: "Bild konnte nicht umplatziert werden",
        type: "error",
      });
    },
  });

  const changeImageScale = useMutation({
    mutationFn: async ({
      scale,
      imageToDesignId,
    }: {
      scale: ScaleType;
      imageToDesignId: number;
    }) => {
      await DesignApi.manipulateImageInDesign({
        imageToDesignId,
        designId,
        manipulateImageParams: {
          scaleX: scale.x,
          scaleY: scale.y,
        },
      });
    },
    onMutate: async ({ scale, imageToDesignId }) => {
      await queryClient.cancelQueries({
        queryKey: ["designImages", designId],
      });
      const previous = queryClient.getQueryData<ImageWithPositionAndScale[]>([
        "designImages",
        designId,
      ]);
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
      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["designImages", designId],
          context.previous,
        );
      }
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
