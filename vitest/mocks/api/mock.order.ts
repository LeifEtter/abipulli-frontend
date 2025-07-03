import { Order } from "abipulli-types";
import { OrderFactory } from "../data/factory.order";
import { faker } from "@faker-js/faker";
import { getTestUserId } from "vitest/testState";

export const OrderApi = {
  getAll: async (): Promise<Order[]> => {
    const orderAmount: number = faker.number.int({ min: 1, max: 2 });
    const orders: Order[] = [];
    for (let i = 0; i < orderAmount; i++) {
      orders.push(OrderFactory.order({ customerId: getTestUserId() }));
    }
    return orders;
  },
};
