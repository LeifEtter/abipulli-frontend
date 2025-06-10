import {
  AddImageToDesignParams,
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
  }): Promise<boolean> => {
    try {
      const res: AxiosResponse = await api.post(
        `/design/${designId}/image/${imageId}`,
        addImageToDesignParams
      );
      if (!res.data) throw "Something went wrong";
      if (!(res.status == 201)) return false;
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
