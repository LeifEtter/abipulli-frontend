import { useQuery } from "@tanstack/react-query";
import { Design } from "abipulli-types";
import { DesignApi } from "src/api/endpoints/design";

export const useDesign = (designId: number) => {
  const {
    data: design,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["design", designId],
    queryFn: async (): Promise<Design> => {
      console.log(designId);
      return await DesignApi.retrieveSingleDesign(designId);
    },
  });

  return {
    design,
    designsAreLoading: isLoading,
    designsError: error,
  };
};
