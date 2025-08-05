import api from "../api";

export const MiscApi = {
  test: async (): Promise<void> => {
    await api.get("/test");
  },
};
