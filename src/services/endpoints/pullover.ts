import { Pullover, PulloversResponse } from "abipulli-types";
import { api } from "../api";

export const PulloverApi = {
  getAll: async (): Promise<Pullover[]> => {
    const res = await api.get("pullover/");
    if (!res.data) throw "Something went wrong";
    const pulloverRes: PulloversResponse = res.data;
    if (!pulloverRes.data) throw pulloverRes.error!;
    return pulloverRes.data.items;
  },
};
