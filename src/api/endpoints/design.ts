import {
  AddImageToDesignParams,
  AddImageToDesignResponse,
  ApiResponse,
  Design,
  DesignCreateParams,
  DesignResponse,
  DesignsResponse,
  ImagesForDesignResponse,
  ImageWithPositionAndScale,
  ManipulateImageInDesignParams,
} from "abipulli-types";
import api from "../api";
import { AxiosResponse } from "axios";

/**
 * Api methods for managing images and design images
 */
export const DesignApi = {
  createDesign: async (
    orderNumber: number,
    params: DesignCreateParams
  ): Promise<Design> => {
    const res = await api.post(`/order/${orderNumber}/design/`, params);
    const designResponse: DesignResponse = res.data;
    return designResponse.data!;
  },
  deleteDesign: async (designId: number, orderId: number): Promise<void> => {
    const res = await api.delete(`/order/${orderId}/design/${designId}`);
  },
  retrieveAllDesigns: async (userId: number): Promise<Design[]> => {
    const res = await api.get(`/design/me`);
    const designsRes: DesignsResponse = res.data;
    return designsRes.data!.items;
  },
  /**
   * Retrieves all Designs belonging to a specific order
   * @param orderNumber - Id of order to fetch designs for
   * @returns Promise of a list of designs
   */
  retrieveOrderDesigns: async (orderNumber: number): Promise<Design[]> => {
    const res = await api.get(`/order/${orderNumber}/design`);
    const designsRes: DesignsResponse = res.data;
    return designsRes.data!.items;
  },
  /**
   * Retrieves a single design by its id
   * @param id - Id of design to be retrieved
   * @returns Promise of the corresponding Design
   */
  retrieveSingleDesign: async (id: number): Promise<Design> => {
    const res = await api.get(`/design/${id}`);
    const designRes: DesignResponse = res.data;
    return designRes.data!;
  },
  /**
   * Retrieves all images for a given design
   * @param designId - Id of the design to fetch images for
   * @returns Promise of an array of ImageWithPositionAndScale
   */
  retrieveAllImagesForDesign: async (
    designId: number
  ): Promise<ImageWithPositionAndScale[]> => {
    const res: AxiosResponse = await api.get(`design/${designId}/image`);
    const imageResponse: ImagesForDesignResponse = res.data;
    return imageResponse.data!.items;
  },
  /**
   * Adds an image to a design
   * @param params - Object containing designId, imageId, and addImageToDesignParams
   * @returns Promise of the added ImageWithPositionAndScale
   */
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
  /**
   * Manipulates an image in a design (e.g., position, scale)
   * @param params - Object containing imageToDesignId, designId, and manipulateImageParams
   */
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
  /**
   * Removes an image from a design
   * @param image - The image to remove
   * @param designId - Id of the design
   */
  removeImageFromDesign: async (
    image: ImageWithPositionAndScale,
    designId: number
  ) => {
    await api.delete(`/design/${designId}/image/${image.imageToDesignId}`);
  },
};
