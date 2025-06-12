import { Image, ImageWithPositionAndScale } from "abipulli-types";
import { useEffect, useState } from "react";
import { DesignsApi } from "src/services/endpoints/design";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";

export const useDesignImages = (designId?: number) => {
  const [designImages, setDesignImages] = useState<ImageWithPositionAndScale[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const addImageToDesign = async (
    image: Image,
    designCanvasSize: SizeType,
    designId: number
  ) => {
    let scale: number;
    const widthDiff = image.width - designCanvasSize.width * 0.5;
    const heightDiff = image.height - designCanvasSize.height * 0.5;
    if (widthDiff > heightDiff && widthDiff > 0) {
      scale = (designCanvasSize.width * 0.5) / image.width;
    } else if (heightDiff > 0) {
      scale = (designCanvasSize.height * 0.5) / image.height;
    } else {
      scale = 1;
    }
    const newImage: ImageWithPositionAndScale =
      await DesignsApi.addImageToDesign({
        designId: designId,
        imageId: image.id,
        addImageToDesignParams: {
          positionX: 0,
          positionY: 0,
          scaleX: scale,
          scaleY: scale,
        },
      });
    if (newImage) setDesignImages([...designImages, newImage]);
  };
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
    addImageToDesign,
  };
};
