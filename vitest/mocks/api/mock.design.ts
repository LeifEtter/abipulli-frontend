import {
  AddImageToDesignParams,
  Design,
  ImageWithPositionAndScale,
  ManipulateImageInDesignParams,
} from "abipulli-types";
import { DesignFactory } from "../data/factory.design";
import { faker } from "@faker-js/faker";
import { ImageFactory } from "../data/factory.image";
import { uniqueId } from "../data/utils";

//TODO LAter use "toBeCalledWith" to compare passed params

export const DesignsApi = {
  retrieveOrderDesigns: async (orderNumber: number): Promise<Design[]> =>
    DesignFactory.designs({
      orderId: orderNumber,
      amount: 10,
      customerId: 5,
    }),
  retrieveSingleDesign: async (id: number): Promise<Design> =>
    DesignFactory.design({ id: id, orderId: 5, customerId: 5 }),
  retrieveAllImagesForDesign: async (
    designId: number
  ): Promise<ImageWithPositionAndScale[]> => {
    const imageNumber = faker.number.int({ min: 0, max: 5 });
    const images: ImageWithPositionAndScale[] = [];
    for (let i = 0; i < imageNumber; i++) {
      images.push(ImageFactory.positionedImage({}));
    }
    return images;
  },
  addImageToDesign: async ({
    designId,
    imageId,
    addImageToDesignParams,
  }: {
    designId: number;
    imageId: number;
    addImageToDesignParams: AddImageToDesignParams;
  }): Promise<ImageWithPositionAndScale> => ({
    ...ImageFactory.image({ id: imageId }),
    imageToDesignId: uniqueId(),
    ...addImageToDesignParams,
  }),
  manipulateImageInDesign: async ({
    imageToDesignId,
    designId,
    manipulateImageParams,
  }: {
    imageToDesignId: number;
    designId: number;
    manipulateImageParams: ManipulateImageInDesignParams;
  }): Promise<ImageWithPositionAndScale> => ({
    ...ImageFactory.image({}),
    imageToDesignId: imageToDesignId,
    ...manipulateImageParams,
  }),
  removeImageFromDesign: async (
    image: ImageWithPositionAndScale,
    designId: number
  ): Promise<void> => {},
};
