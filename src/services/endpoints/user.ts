import {
  UserCheckAuthResponse,
  UserCheckAuthResult,
  UserLoginParams,
  UserLoginResponse,
  UserLoginResult,
} from "abipulli-types";
import { api } from "../api";
import { ApiError } from "../ApiError";

export const UsersApi = {
  retrieveUserId: async (): Promise<UserCheckAuthResult> => {
    try {
      const response =
        await api.get<UserCheckAuthResponse>("/user/authenticate");
      if (!response.data.success) throw response.data.error;
      return response.data.data!;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  login: async (loginParams: UserLoginParams): Promise<UserLoginResult> => {
    try {
      const res = await api.post<UserLoginResponse>("/user/login", loginParams);
      if (!res.data.success) throw new ApiError(res.data.error!);
      return res.data.data!;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
