import { Pullover } from "abipulli-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DesignApi } from "src/api/endpoints/design";
import { useSnackbar } from "./useSnackbar";

interface UseDesignPulloverReturn {
  updatePullover: (pullover: Pullover) => Promise<void>;
  isUpdating: boolean;
}

/**
 * Hook to manage a design's pullover selection
 * Follows the same pattern as useDesignImages
 */
export const useDesignPullover = (
  designId: number,
  orderId: number,
): UseDesignPulloverReturn => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();

  const updatePulloverMutation = useMutation({
    mutationFn: async (pullover: Pullover) => {
      return await DesignApi.updateDesignPullover(designId, pullover.id);
    },
    onSuccess: async () => {
      // Invalidate designs query to refetch with updated pullover

      await queryClient.invalidateQueries({
        queryKey: ["designs", orderId],
      });
      // showSnackbar({ message: "Pullover aktualisiert", type: "success" });
    },
    onError: (error) => {
      showSnackbar({
        message: "Pullover konnte nicht aktualisiert werden",
        type: "error",
      });
    },
  });

  return {
    updatePullover: async (pullover: Pullover) => {
      await updatePulloverMutation.mutateAsync(pullover);
    },
    isUpdating: updatePulloverMutation.isPending,
  };
};
