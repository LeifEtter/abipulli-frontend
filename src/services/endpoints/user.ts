import { User, UsersResponse } from "abipulli-types";
import { api } from "../api";

export const UsersApi = {
  // Get all Users
  getAll: async () => {
    const response = await api.get<User[]>("/user");
    return response.data;
  },

  // Get a single User
  getById: async (id: string) => {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  },

  // Create a new User
  create: async (UserData: Omit<User, "id">) => {
    const response = await api.post<User>("/user", UserData);
    return response.data;
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
