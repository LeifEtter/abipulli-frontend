import { Image } from "abipulli-types";
import { useQuery } from "@tanstack/react-query";
import { ImageApi } from "src/api/endpoints/image";

interface UseUserImagesReturn {
  userImages: Image[];
  userImagesAreLoading: boolean;
  userImagesError: string | null;
  refetch: () => Promise<void>;
}

export const useUserImages = (): UseUserImagesReturn => {
  const {
    data: userImages = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userImages"],
    queryFn: async () => {
      const images: Image[] = await ImageApi.fetchUsersImages();
      return images.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    },
  });

  return {
    userImages,
    userImagesAreLoading: isLoading,
    userImagesError: error ? "Couldn't fetch User Images" : null,
    refetch: async () => {
      await refetch();
    },
  };
};
