import { Image } from "abipulli-types";
import { useCallback, useEffect, useState } from "react";
import { ImageApi } from "src/api/endpoints/image";

interface UseUserImagesReturn {
  userImages: Image[];
  userImagesAreLoading: boolean;
  userImagesError: string | null;
  refetch: () => Promise<void>;
}

export const useUserImages = (): UseUserImagesReturn => {
  const [userImages, setUserImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserImages = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const images: Image[] = await ImageApi.fetchUsersImages();
      images.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setUserImages(images);
      setIsLoading(false);
    } catch (error) {
      setUserImages([]);
      setError("Couldn't fetch User Images");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserImages();
  }, [fetchUserImages]);

  return {
    userImages,
    userImagesAreLoading: isLoading,
    userImagesError: error,
    refetch: fetchUserImages,
  };
};
