import { Design, DesignResponse, DesignsResponse } from "abipulli-types";
import { api } from "../api";
import { ApiError } from "../ApiError";

export const DesignsApi = {
  retrieveOrderDesigns: async (orderNumber: number): Promise<Design[]> => {
    try {
      const res: DesignsResponse = await api.get(
        `/order/${orderNumber}/design`
      );
      if (!res.success || !res.data) throw res.error;
      return res.data.items;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.info);
      }
      throw error;
    }
  },
  retrieveSingleDesign: async (id: number): Promise<Design> => {
    try {
      const res: DesignResponse = await api.get(`/design/${id}`);
      if (!res.success || !res.data) throw res.error;
      return res.data!;
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(error.info);
      }
      throw error;
    }
  },
};
