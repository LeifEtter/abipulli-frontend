import {
  UserCheckAuthResponse,
  UserCheckAuthResult,
  UserLoginParams,
  UserLoginResponse,
  UserLoginResult,
} from "abipulli-types";
import api from "../api";
import { ApiError } from "../ApiError";

export const UserApi = {
  retrieveUserId: async (): Promise<UserCheckAuthResult> => {
    const response = await api.get<UserCheckAuthResponse>("/user/authenticate");
    if (!response.data.success) throw response.data.error;
    return response.data.data!;
  },

  login: async (loginParams: UserLoginParams): Promise<UserLoginResult> => {
    const res = await api.post<UserLoginResponse>("/user/login", loginParams);
    if (!res.data.success) throw new ApiError(res.data.error!);
    return res.data.data!;
  },
  deleteSelf: async (): Promise<void> => {
    const res = await api.delete("/");
    if (!res.data.success) throw new ApiError(res.data.error!);
  },
};
