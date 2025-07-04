import { faker } from "@faker-js/faker";
import { Design } from "abipulli-types";

export const DesignFactory = {
  designs: ({
    orderId,
    customerId,
    amount,
  }: {
    orderId: number;
    customerId: number;
    amount: number;
  }): Design[] => {
    const designs: Design[] = [];
    for (let i: number = 0; i < amount; i++) {
      designs.push(DesignFactory.design({ orderId, customerId, id: i }));
    }
    return designs;
  },
  design: ({
    orderId,
    customerId,
    id,
  }: {
    orderId: number;
    customerId: number;
    id?: number;
  }): Design => ({
    id: id ?? faker.number.int(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    customerId: customerId,
    orderId: orderId,
    textElements: [],
    images: [],
    designCost: 0,
  }),
};
