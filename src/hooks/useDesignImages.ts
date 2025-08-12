import { Image, ImageWithPositionAndScale } from "abipulli-types";
import { useEffect, useState } from "react";
import { PositionType } from "src/types/canvas/positionType";
import { ScaleType } from "src/types/canvas/scaleType";
import { SizeType } from "src/types/canvas/sizeType";
import { useSnackbar } from "./useSnackbar";
import { DesignApi } from "src/api/endpoints/design";

export const useDesignImages = (designId?: number) => {
  const [designImages, setDesignImages] = useState<ImageWithPositionAndScale[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const showSnackbar = useSnackbar();

  const addImageToDesign = async (
    image: Image,
    designCanvasSize: SizeType,
    designId: number,
    isBackside: boolean
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
      await DesignApi.addImageToDesign({
        designId: designId,
        imageId: image.id,
        addImageToDesignParams: {
          positionX: 0,
          positionY: 0,
          scaleX: scale,
          scaleY: scale,
          isBackside: isBackside,
        },
      });
    if (newImage) setDesignImages([...designImages, newImage]);
  };

  const removeImageFromDesign = async (
    image: ImageWithPositionAndScale,
    designId: number
  ) => {
    try {
      await DesignApi.removeImageFromDesign(image, designId);
      const newDesignImages = designImages.filter(
        (e) => e.imageToDesignId != image.imageToDesignId
      );
      setDesignImages(newDesignImages);
    } catch (error) {
      console.log(error);
    }
  };

  const getDesignImageIndex = (imageToDesignId: number): number | undefined => {
    const index: number = designImages.findIndex(
      (image) => image.imageToDesignId == imageToDesignId
    );

    if (index < 0) {
      return undefined;
    }
    return index;
  };

  const changeImagePosition = async ({
    pos,
    imageToDesignId,
  }: {
    pos: PositionType;
    imageToDesignId: number;
  }) => {
    const index: number | undefined = getDesignImageIndex(imageToDesignId);
    if (index == undefined)
      return showSnackbar({ message: "Bild Platzierung fehlgeschlagen" });
    const newPos: PositionType = {
      x: Math.round(pos.x),
      y: Math.round(pos.y),
    };
    designImages[index].positionX = Math.round(pos.x);
    designImages[index].positionY = Math.round(pos.y);
    setDesignImages(designImages);
    await DesignApi.manipulateImageInDesign({
      imageToDesignId,
      designId: designId!,
      manipulateImageParams: {
        positionX: newPos.x,
        positionY: newPos.y,
      },
    });
  };

  const changeImageScale = async ({
    scale,
    imageToDesignId,
  }: {
    scale: ScaleType;
    imageToDesignId: number;
  }) => {
    const index: number | undefined = getDesignImageIndex(imageToDesignId);
    if (index == undefined)
      return showSnackbar({ message: "Bild Skalierung Fehlgeschlagen" });

    designImages[index].scaleX = scale.x;
    designImages[index].scaleY = scale.y;
    setDesignImages(designImages);
    await DesignApi.manipulateImageInDesign({
      imageToDesignId,
      designId: designId!,
      manipulateImageParams: {
        scaleX: scale.x,
        scaleY: scale.y,
      },
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const images: ImageWithPositionAndScale[] =
          await DesignApi.retrieveAllImagesForDesign(designId!);
        setDesignImages(images);
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
    removeImageFromDesign,
  };
};
