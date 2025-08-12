import { Design } from "abipulli-types";
import { useCallback, useEffect, useState } from "react";
import { DesignApi } from "src/api/endpoints/design";

export const useDesigns = (userId: number | undefined) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDesigns = useCallback(async () => {
    if (!userId) return;
    setError(null);
    setIsLoading(true);
    try {
      const designs: Design[] = await DesignApi.retrieveAllDesigns(userId);
      setDesigns(designs);
      setIsLoading(false);
    } catch (error) {
      setDesigns([]);
      setError("Couldn't fetch designs");
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  return {
    designs,
    fetchDesigns,
    designsAreLoading: isLoading,
    designsError: error,
  };
};
