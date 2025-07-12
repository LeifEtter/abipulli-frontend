import api from "../api";
import { Order, OrdersResponse } from "abipulli-types";

export const OrderApi = {
  // Get all orders
  getAll: async (): Promise<Order[]> => {
    const res = await api.get("/order");
    if (!res.data) throw "Something went wrong fetching orders";
    const ordersResponse: OrdersResponse = res.data;
    if (!ordersResponse.success) throw ordersResponse.error;
    const orders: Order[] = ordersResponse.data!.items;
    return orders;
  },
};
