import {
  Image,
  ImagesResponse,
  ImageUploadResultResponse,
} from "abipulli-types";
import { api } from "../api";

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
};
