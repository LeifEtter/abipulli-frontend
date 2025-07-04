import { User, UserRole } from "abipulli-types";
import { uniqueId } from "./utils";
import { faker } from "@faker-js/faker";

export const DummyRoles = {
  anonymous: (): UserRole => ({
    id: 1,
    roleName: "anonymous",
    rolePower: 0,
  }),
  registered: (): UserRole => ({
    id: 2,
    roleName: "registered",
    rolePower: 1,
  }),
  admin: (): UserRole => ({
    id: 3,
    roleName: "admin",
    rolePower: 10,
  }),
};

export const UserFactory = {
  singleUser: ({
    id,
    verified,
  }: {
    id?: number;
    verified?: boolean;
  }): User => ({
    id: id ?? uniqueId(),
    role: DummyRoles.registered(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    verified: verified ?? true,
    school: faker.location.city(),
  }),
};
