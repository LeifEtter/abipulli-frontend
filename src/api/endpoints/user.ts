import {
  User,
  UserChangePasswordParams,
  UserCheckAuthResponse,
  UserCheckAuthResult,
  UserCreateParams,
  UserLoginParams,
  UserLoginResponse,
  UserLoginResult,
  UserResponse,
} from "abipulli-types";
import api from "../api";

/**
 * API methods for managing user authentication and profile data.
 * Provides functions for login, authentication check, user data retrieval, password change, and account deletion.
 */
export const UserApi = {
  /**
   * Checks if the current user is authenticated and retrieves their user ID.
   * @returns Promise resolving to the authentication result and user ID
   */
  retrieveUserId: async (): Promise<UserCheckAuthResult> => {
    const response = await api.get<UserCheckAuthResponse>("/user/authenticate");
    return response.data.data!;
  },

  /**
   * Logs in a user with the provided credentials.
   * @param loginParams - The login parameters (username, password, etc.)
   * @returns Promise resolving to the login result
   */
  login: async (loginParams: UserLoginParams): Promise<UserLoginResult> => {
    const res = await api.post<UserLoginResponse>("/user/login", loginParams);
    return res.data.data!;
  },
  /**
   * Logs Out and delete cookie
   * @returns Promise resolving to the logout result
   */
  logout: async (): Promise<void> => {
    const res = await api.get<string>("/user/logout");
  },
  /**
   * Deletes the current user's account.
   * @returns Promise resolving when the account is deleted
   */
  deleteSelf: async (): Promise<void> => {
    const res = await api.delete("/user");
  },
  /**
   * Retrieves the current user's profile data (excluding password).
   * @returns Promise resolving to the user data
   */
  getUserData: async (): Promise<Omit<User, "password">> => {
    const res = await api.get<UserResponse>("/user/me");
    return res.data.data!;
  },
  /**
   * Changes the current user's password.
   * @param body - The parameters for changing the password
   * @returns Promise resolving when the password is changed
   */
  changePassword: async (body: UserChangePasswordParams): Promise<void> => {
    const res = await api.patch("/user/me/password", body);
  },
  create: async (body: UserCreateParams): Promise<void> => {
    const res = await api.post("/user/register", body);
    console.log(res.data);
  },
};
