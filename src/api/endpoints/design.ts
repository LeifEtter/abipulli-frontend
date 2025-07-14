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
import api from "../api";
import { AxiosResponse } from "axios";

export const DesignApi = {
  retrieveOrderDesigns: async (orderNumber: number): Promise<Design[]> => {
    const res = await api.get(`/order/${orderNumber}/design`);
    const designsRes: DesignsResponse = res.data;
    return designsRes.data!.items;
  },
  retrieveSingleDesign: async (id: number): Promise<Design> => {
    const res = await api.get(`/design/${id}`);
    const designRes: DesignResponse = res.data;
    return designRes.data!;
  },
  retrieveAllImagesForDesign: async (
    designId: number
  ): Promise<ImageWithPositionAndScale[]> => {
    const res: AxiosResponse = await api.get(`design/${designId}/image`);
    const imageResponse: ImagesForDesignResponse = res.data;
    return imageResponse.data!.items;
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
    const res: AxiosResponse = await api.post(
      `/design/${designId}/image/${imageId}`,
      addImageToDesignParams
    );
    const imageResponse: AddImageToDesignResponse = res.data;
    return imageResponse.data!;
  },
  manipulateImageInDesign: async ({
    imageToDesignId,
    designId,
    manipulateImageParams,
  }: {
    imageToDesignId: number;
    designId: number;
    manipulateImageParams: ManipulateImageInDesignParams;
  }) => {
    const res: AxiosResponse = await api.patch(
      `/design/${designId}/image/${imageToDesignId}`,
      manipulateImageParams
    );
    const manipulateImageRes: ApiResponse<object> = res.data;
    // return manipulateImageRes.data;
  },
  removeImageFromDesign: async (
    image: ImageWithPositionAndScale,
    designId: number
  ) => {
    await api.delete(`/design/${designId}/image/${image.imageToDesignId}`);
  },
};
