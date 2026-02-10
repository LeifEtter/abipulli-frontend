import { useQuery } from "@tanstack/react-query";
import { Design } from "abipulli-types";
import { DesignApi } from "src/api/endpoints/design";
import { OrderApi } from "src/api/endpoints/order";

export const useDesigns = (orderId: number) => {
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

  return {
    designs: designs ?? [],
    designsAreLoading: isLoading,
    designsError: error,
  };
};
