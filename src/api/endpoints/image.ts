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

export const ImageApi = {
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
  fetchUsersImages: async (): Promise<Image[]> => {
    const res = await api.get("image/me");
    const imageRes: ImagesResponse = res.data;
    return imageRes.data!.items;
  },
  generateDescription: async (
    params: ImproveImageQueryParams
  ): Promise<{ description: string }> => {
    const res = await api.post("/image/prompt", params);
    const improveRes: ImproveImageQueryResponse = res.data;
    return improveRes.data!;
  },
  commentOnDescription: async (
    params: CommentOnQueryParams
  ): Promise<string> => {
    const res = await api.post("/image/comment", params);
    const commentResult: ApiResponse<string> = res.data;
    return commentResult.data!;
  },
  generateImages: async (params: GenerateImageParams): Promise<Image[]> => {
    const res = await api.post("/image/generate", params);
    const genImagesRes: ImagesResponse = res.data;
    return genImagesRes.data!.items;
  },
  fetch: async (id: number): Promise<Image> => {
    const res = await api.get(`/image/${id}`);
    const imageResponse: ImageResponse = res.data;
    return imageResponse.data!;
  },
};
