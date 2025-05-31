import { User, UsersResponse } from "abipulli-types";
import { api } from "../api";

export const UsersApi = {
  retrieveUserId: async (): Promise<number | null> => {
    const response = await api.get<{ userId: number }>(
      "/user/checkAuthentication"
    );
    return response.data.userId;
  },
  // Get all Users
  getAll: async () => {
    const response = await api.get<UsersResponse[]>("/user");
    return response.data;
  },

  // Get a single User
  getById: async (id: string) => {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  },

  // Create a new User
  register: async (UserData: Omit<User, "id">) => {
    const response = await api.post<User>("/user", UserData);
    return response.data;
  },

  login: async (UserData: Omit<User, "id">): Promise<number> => {
    const response = await api.post<{ userId: number }>(
      "/user/login",
      UserData
    );
    console.log(response);
    console.log(response.data);
    return response.data.userId;
  },

  // Update an User
  update: async (id: string, UserData: Partial<User>) => {
    const response = await api.put<User>(`/user/${id}`, UserData);
    return response.data;
  },

  // Delete an User
  delete: async (id: string) => {
    await api.delete(`/user/${id}`);
  },
};
