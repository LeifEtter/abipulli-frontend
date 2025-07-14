import {
  ApiResponse,
  CommentOnQueryParams,
  GenerateImageParams,
  Image,
  ImageResponse,
  ImagesResponse,
  ImageUploadResultResponse,
  ImproveImageQueryParams,
  ImproveImageQueryResponse,
} from "abipulli-types";
import api from "../api";

/**
 * API methods for managing images, including upload, retrieval, description generation, commenting, and image generation.
 */
export const ImageApi = {
  /**
   * Uploads an image file to Hetzner Object Storage
   * @param image - The image file to upload
   * @returns Promise resolving to the uploaded image's ID
   */
  upload: async (image: File): Promise<number> => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await api.post(`/image`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    const imageRes: ImageUploadResultResponse = res.data;
    return imageRes.data!.imageId;
  },
  /**
   * Fetches all images belonging to the current user.
   * @returns Promise resolving to an array of Image objects
   */
  fetchUsersImages: async (): Promise<Image[]> => {
    const res = await api.get("image/me");
    const imageRes: ImagesResponse = res.data;
    return imageRes.data!.items;
  },
  /**
   * Generates a description for an image using provided parameters.
   * @param params - Parameters for generating image description
   * @returns Promise resolving to an object containing the description
   */
  generateDescription: async (
    params: ImproveImageQueryParams
  ): Promise<{ description: string }> => {
    const res = await api.post("/image/prompt", params);
    const improveRes: ImproveImageQueryResponse = res.data;
    return improveRes.data!;
  },
  /**
   * Comments on an image Description to improve it
   * @param params - Parameters for commenting on the image description
   * @returns Promise resolving to the improved description
   */
  commentOnDescription: async (
    params: CommentOnQueryParams
  ): Promise<string> => {
    const res = await api.post("/image/comment", params);
    const commentResult: ApiResponse<string> = res.data;
    return commentResult.data!;
  },
  /**
   * Generates images based on provided parameters.
   * @param params - Parameters for image generation
   * @returns Promise resolving to an array of generated Image objects
   */
  generateImages: async (params: GenerateImageParams): Promise<Image[]> => {
    const res = await api.post("/image/generate", params);
    const genImagesRes: ImagesResponse = res.data;
    return genImagesRes.data!.items;
  },
  /**
   * Fetches a single image by its ID.
   * @param id - The ID of the image to fetch
   * @returns Promise resolving to the Image object
   */
  fetch: async (id: number): Promise<Image> => {
    const res = await api.get(`/image/${id}`);
    const imageResponse: ImageResponse = res.data;
    return imageResponse.data!;
  },
};
