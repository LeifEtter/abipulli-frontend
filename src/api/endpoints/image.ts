import {
  CommentOnQueryParams,
  CommentOnQueryResult,
  GenerateImageParams,
  Image,
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
    if (!res.data) throw "Something went wrong";
    const imageRes: ImageUploadResultResponse = res.data;
    if (!imageRes.success) throw imageRes.error;
    return imageRes.data!.imageId;
  },
  fetchUsersImages: async (): Promise<Image[]> => {
    const res = await api.get("image/me");
    if (!res.data) throw "Something went wrong";
    const imageRes: ImagesResponse = res.data;
    if (!imageRes.success) throw imageRes.error;
    return imageRes.data!.items;
  },
  generateDescription: async (
    params: ImproveImageQueryParams
  ): Promise<{ description: string }> => {
    const res = await api.post("/image/prompt", params);
    if (!res.data) throw "Couldn't Improve Query";
    const improveRes: ImproveImageQueryResponse = res.data;
    if (!improveRes.success) throw improveRes.error;
    return improveRes.data!;
  },
  commentOnDescription: async (
    params: CommentOnQueryParams
  ): Promise<string> => {
    const res = await api.post("/image/prompt/improve", params);
    const commentResult: CommentOnQueryResult = res.data;
    return commentResult.description;
  },
  generateImages: async (params: GenerateImageParams): Promise<Image[]> => {
    const res = await api.post("/image/generate", params);
    if (!res.data) throw "Couldn't generate images";
    const genImagesRes: ImagesResponse = res.data;
    if (!genImagesRes.success) throw genImagesRes.error;
    return genImagesRes.data!.items;
  },
};
