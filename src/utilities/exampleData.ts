import { faker } from "@faker-js/faker";
import { PulloverOrder } from "../types/order";

const genOrder = (): PulloverOrder => ({
  userId: faker.number.int({ min: 1, max: 10000 }),
  deadline: faker.date.soon({ days: 300 }),
  destination_country: faker.location.country(),
  student_amount: faker.number.int({ min: 50, max: 120 }),
  school_name: faker.person.firstName() + " Schule",
  motto: faker.word.noun(),
});

export const genXOrders = (amount: number): PulloverOrder[] => {
  const orders: PulloverOrder[] = [];
  for (let i: number = 0; i < amount; i++) {
    orders.push(genOrder());
  }
  return orders;
};
