import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Design, Pullover } from "abipulli-types";
import { DesignApi } from "src/api/endpoints/design";
import { OrderApi } from "src/api/endpoints/order";

export const useDesigns = (orderId: number) => {
  const queryClient = useQueryClient();

  const {
    data: designs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["designs", orderId],
    queryFn: async (): Promise<Design[]> => {
      return await DesignApi.retrieveAllDesigns(orderId);
    },
  });

  const createDesignMutation = useMutation({
    mutationFn: async ({
      preferredPulloverId,
      orderId,
    }: {
      preferredPulloverId: number;
      orderId: number;
    }) => {
      const newDesign = await DesignApi.createDesign(orderId, {
        preferredPulloverId,
      });
      return newDesign;
    },
    onSuccess: async (data) =>
      queryClient.invalidateQueries({ queryKey: ["designs", orderId] }),
  });

  const deleteDesignMutation = useMutation({
    mutationFn: async ({
      designId,
      orderId,
    }: {
      designId: number;
      orderId: number;
    }) => {
      await DesignApi.deleteDesign(designId, orderId);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs", orderId] });
    },
  });

  const duplicateDesignMutation = useMutation({
    mutationFn: async ({ designId }: { designId: number }) => {
      await DesignApi.duplicateDesign(designId);
      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["designs", orderId] });
    },
  });

  return {
    designs: designs ?? [],
    designsAreLoading: isLoading,
    designsError: error,
    createDesign: createDesignMutation.mutateAsync,
    deleteDesign: deleteDesignMutation.mutateAsync,
    duplicateDesign: duplicateDesignMutation.mutateAsync,
  };
};
