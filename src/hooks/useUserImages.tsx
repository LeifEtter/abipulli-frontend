import { Image } from "abipulli-types";
import { useEffect, useState } from "react";
import { ImageApi } from "src/api/endpoints/image";

export const useUserImages = () => {
  const [userImages, setUserImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserImages = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const images: Image[] = await ImageApi.fetchUsersImages();
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
