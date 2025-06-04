import { Design, DesignResponse, DesignsResponse } from "abipulli-types";
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
};
