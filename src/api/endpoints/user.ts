import {
  User,
  UserChangePasswordParams,
  UserCheckAuthResponse,
  UserCheckAuthResult,
  UserLoginParams,
  UserLoginResponse,
  UserLoginResult,
  UserResponse,
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
    const res = await api.delete("/user");
    if (!res.data.success) throw new ApiError(res.data.error!);
  },
  getUserData: async (): Promise<Omit<User, "password">> => {
    const res = await api.get<UserResponse>("/user/me");
    if (!res.data.success) throw new ApiError(res.data.error!);
    return res.data.data!;
  },
  changePassword: async (body: UserChangePasswordParams): Promise<void> => {
    const res = await api.patch("/user/me/password", body);
  },
};
