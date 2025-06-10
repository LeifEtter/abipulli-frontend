import { ImageWithPositionAndScale } from "abipulli-types";
import { useEffect, useState } from "react";
import { DesignsApi } from "src/services/endpoints/design";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";

export const useDesignImages = (designId?: number) => {
  const [designImages, setDesignImages] = useState<ImageWithPositionAndScale[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const changeImagePosition = ({
    pos,
    imageId,
  }: {
    pos: PositionType;
    imageId: number;
  }) => {
    const indexOfImage: number = designImages.findIndex(
      (image) => image.id == imageId
    );
    designImages[indexOfImage].positionX = Math.round(pos.x);
    designImages[indexOfImage].positionY = Math.round(pos.y);
    setDesignImages(designImages);
  };

  const changeImageScale = ({
    scale,
    imageId,
  }: {
    scale: ScaleType;
    imageId: number;
  }) => {
    const indexOfImage: number = designImages.findIndex(
      (image) => image.id == imageId
    );
    designImages[indexOfImage].scaleX = Math.round(scale.x);
    designImages[indexOfImage].scaleY = Math.round(scale.y);
    setDesignImages(designImages);
  };

  useEffect(() => {
    const fetchImages = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const images: ImageWithPositionAndScale[] =
          await DesignsApi.retrieveAllImagesForDesign(designId!);
        setDesignImages(images);
        console.log(images);
        setIsLoading(false);
      } catch (error) {
        setDesignImages([]);
        setError("Couldn't fetch design Images");
        setIsLoading(false);
      }
    };
    if (designId) {
      fetchImages();
    }
  }, [designId]);

  return {
    designImages,
    designImagesAreLoading: isLoading,
    designImagesError: error,
    changeImagePosition,
    changeImageScale,
  };
};
