import { useQuery } from "@tanstack/react-query";
import { Pullover } from "abipulli-types";
import { PulloverApi } from "src/api/endpoints/pullover";

interface UsePulloversReturn {
  pullovers: Pullover[];
  pulloversAreLoading: boolean;
  pulloversError: string | null;
}

/**
 * Hook to fetch all available pullover types (catalog)
 * This is read-only - use useDesignPullover to update a design's pullover
 */
export const usePullovers = (): UsePulloversReturn => {
  const {
    data: pullovers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pullovers"],
    queryFn: async (): Promise<Pullover[]> => await PulloverApi.getAll(),
    staleTime: 1000 * 60 * 10, // Pullovers don't change often
  });

  return {
    pullovers,
    pulloversAreLoading: isLoading,
    pulloversError: error ? "Couldn't fetch pullovers" : null,
  };
};
