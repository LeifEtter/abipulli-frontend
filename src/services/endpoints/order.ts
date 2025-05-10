import { api } from "../api";

export interface Order {
  id: string;
  // Add other order properties
}

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
  create: async (orderData: Omit<Order, "id">) => {
    const response = await api.post<Order>("/order", orderData);
    return response.data;
  },

  // Update an order
  update: async (id: string, orderData: Partial<Order>) => {
    const response = await api.put<Order>(`/order/${id}`, orderData);
    return response.data;
  },

  // Delete an order
  delete: async (id: string) => {
    await api.delete(`/order/${id}`);
  },
};
