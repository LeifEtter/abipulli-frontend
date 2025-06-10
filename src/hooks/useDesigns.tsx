import { Design } from "abipulli-types";
import { useEffect, useState } from "react";
import { DesignsApi } from "src/services/endpoints/design";

export const useDesigns = (orderId: number) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const designs: Design[] =
          await DesignsApi.retrieveOrderDesigns(orderId);
        setDesigns(designs);
        setIsLoading(false);
      } catch (error) {
        setDesigns([]);
        setError("Couldn't fetch designs");
        setIsLoading(false);
      }
    };

    fetchDesigns();
  }, [orderId]);

  return { designs, designsAreLoading: isLoading, designsError: error };
};
