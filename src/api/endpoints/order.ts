import api from "../api";
import { Order, OrdersResponse } from "abipulli-types";

/**
 * API methods for managing orders.
 * Provides functions to retrieve all orders.
 */
export const OrderApi = {
  /**
   * Retrieves all orders.
   * @returns Promise resolving to an array of Orders
   */
  getAll: async (): Promise<Order[]> => {
    const res = await api.get("/order");
    const ordersResponse: OrdersResponse = res.data;
    return ordersResponse.data!.items;
  },
};
