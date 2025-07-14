import { Pullover, PulloversResponse } from "abipulli-types";
import api from "../api";

export const PulloverApi = {
  getAll: async (): Promise<Pullover[]> => {
    const res = await api.get("/pullover");
    const pulloverRes: PulloversResponse = res.data;
    return pulloverRes.data!.items;
  },
};
