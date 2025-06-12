import {
  AddImageToDesignParams,
  AddImageToDesignResponse,
  ApiResponse,
  Design,
  DesignResponse,
  DesignsResponse,
  ImagesForDesignResponse,
  ImageWithPositionAndScale,
  ManipulateImageInDesignParams,
} from "abipulli-types";
import { api } from "../api";
import { ApiError } from "../ApiError";
import { AxiosResponse } from "axios";

export const DesignsApi = {
  retrieveOrderDesigns: async (orderNumber: number): Promise<Design[]> => {
    const res = await api.get(`/order/${orderNumber}/design`);
    const designsRes: DesignsResponse = res.data;
    if (!designsRes.success || !res.data) throw designsRes.error;
    return designsRes.data!.items;
  },
  retrieveSingleDesign: async (id: number): Promise<Design> => {
    try {
      const res: AxiosResponse = await api.get(`/design/${id}`);
      const designRes: DesignResponse = res.data;
      if (!designRes.success || !res.data) throw designRes.error;
      return designRes.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.info);
      }
      throw error;
    }
  },
  retrieveAllImagesForDesign: async (
    designId: number
  ): Promise<ImageWithPositionAndScale[]> => {
    try {
      const res: AxiosResponse = await api.get(`design/${designId}/image`);
      const imageResponse: ImagesForDesignResponse = res.data;
      if (!imageResponse.success) throw imageResponse.error;
      const images: ImageWithPositionAndScale[] = imageResponse.data!.items;
      return images;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addImageToDesign: async ({
    designId,
    imageId,
    addImageToDesignParams,
  }: {
    designId: number;
    imageId: number;
    addImageToDesignParams: AddImageToDesignParams;
  }): Promise<ImageWithPositionAndScale> => {
    try {
      const res: AxiosResponse = await api.post(
        `/design/${designId}/image/${imageId}`,
        addImageToDesignParams
      );
      if (!res.data) throw "Something went wrong";
      if (!(res.status == 201)) throw "Couldn't add image";
      const imageResponse: AddImageToDesignResponse = res.data;

      return imageResponse.data!;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  manipulateImageInDesign: async ({
    imageId,
    designId,
    manipulateImageParams,
  }: {
    imageId: number;
    designId: number;
    manipulateImageParams: ManipulateImageInDesignParams;
  }) => {
    try {
      const res: AxiosResponse = await api.patch(
        `/design/${designId}/image/${imageId}`,
        manipulateImageParams
      );
      const manipulateImageRes: ApiResponse<object> = res.data;
      if (!manipulateImageRes.success || !res.data)
        throw manipulateImageRes.error;
    } catch (error) {
      console.log(error);
    }
  },
  removeImageFromDesign: async (
    image: ImageWithPositionAndScale,
    designId: number
  ) => {
    try {
      const res: AxiosResponse = await api.delete(
        `/design/${designId}/image/${image.imageToDesignId}`
      );
      if (res.status == 200) {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  },
};
