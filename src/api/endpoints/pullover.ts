import { Pullover, PulloversResponse } from "abipulli-types";
import api from "../api";

/**
 * API methods for managing pullovers.
 * Provides functions to retrieve all pullover items.
 */
export const PulloverApi = {
  /**
   * Retrieves all pullovers.
   * @returns Promise resolving to an array of Pullover.
   */
  getAll: async (): Promise<Pullover[]> => {
    const res = await api.get("/pullover");
    const pulloverRes: PulloversResponse = res.data;
    return pulloverRes.data!.items;
  },
};
