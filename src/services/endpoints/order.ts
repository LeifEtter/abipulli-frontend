import { api } from "../api";
import { Order, OrderResponse, UsersResponse } from "abipulli-types";

export const ordersApi = {
  // Get all orders
  getAll: async () => {
    const response = await api.get<Order[]>("/order");
    return response.data;
  },

  // Get a single order
  getById: async (id: string) => {
    const response = await api.get<Order>(`/order/${id}`);
    return response.data;
  },

  // Create a new order
  create: async (orderData: Omit<UsersResponse, "id">) => {
    const response = await api.post<Order>("/order", orderData);
    return response.data;
  },

  // Update an order
  update: async (id: string, orderData: Partial<OrderResponse>) => {
    const response = await api.put<OrderResponse>(`/order/${id}`, orderData);
    return response.data;
  },

  // Delete an order
  delete: async (id: string) => {
    await api.delete(`/order/${id}`);
  },
};
