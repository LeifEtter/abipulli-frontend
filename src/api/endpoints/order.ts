import api from "../api";
import { Order, OrdersResponse } from "abipulli-types";

export const OrderApi = {
  getAll: async (): Promise<Order[]> => {
    const res = await api.get("/order");
    const ordersResponse: OrdersResponse = res.data;
    return ordersResponse.data!.items;
  },
};
