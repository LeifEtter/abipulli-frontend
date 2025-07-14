import { Image } from "abipulli-types";
import { useEffect, useState } from "react";
import { ImageApi } from "src/api/endpoints/image";

interface UseUserImagesReturn {
  userImages: Image[];
  userImagesAreLoading: boolean;
  userImagesError: string | null;
}

export const useUserImages = (): UseUserImagesReturn => {
  const [userImages, setUserImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImages = async () => {
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
    };

    fetchUserImages();
  }, []);

  return {
    userImages,
    userImagesAreLoading: isLoading,
    userImagesError: error,
  };
};
