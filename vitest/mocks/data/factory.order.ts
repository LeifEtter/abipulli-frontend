import { Order, OrderStatus } from "abipulli-types";
import { uniqueId } from "./utils";
import { faker } from "@faker-js/faker";

const orderStatusList: OrderStatus[] = [
  "BASIC_INFO",
  "CREATED",
  "DESIGNING",
  "FINISHING_INFO",
  "REVISING",
];

export const OrderFactory = {
  order: ({
    id,
    customerId,
    orderStatus,
  }: {
    id?: number;
    customerId?: number;
    orderStatus?: OrderStatus;
  }): Order => ({
    id: id ?? uniqueId(),
    customerId: customerId ?? uniqueId(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    status: orderStatus ?? faker.helpers.arrayElement(orderStatusList),
    deadline: faker.date.future(),
    studentAmount: faker.number.int({ min: 20, max: 150 }),
    school: faker.location.city(),
    schoolCity: faker.location.city(),
    schoolCountryCode: faker.helpers.arrayElement(["AT", "DE", "CH"]),
    graduationYear: faker.number.int({ min: 2025, max: 2027 }),
    currentGrade: faker.number.int({ min: 10, max: 13 }),
    motto: faker.word.noun(),
    deliveryAddress: faker.location.streetAddress(),
    billingAddress: faker.location.streetAddress(),
  }),
};
