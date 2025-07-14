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

export const UserApi = {
  retrieveUserId: async (): Promise<UserCheckAuthResult> => {
    const response = await api.get<UserCheckAuthResponse>("/user/authenticate");
    return response.data.data!;
  },

  login: async (loginParams: UserLoginParams): Promise<UserLoginResult> => {
    const res = await api.post<UserLoginResponse>("/user/login", loginParams);
    return res.data.data!;
  },
  deleteSelf: async (): Promise<void> => {
    const res = await api.delete("/user");
  },
  getUserData: async (): Promise<Omit<User, "password">> => {
    const res = await api.get<UserResponse>("/user/me");
    return res.data.data!;
  },
  changePassword: async (body: UserChangePasswordParams): Promise<void> => {
    const res = await api.patch("/user/me/password", body);
  },
};
