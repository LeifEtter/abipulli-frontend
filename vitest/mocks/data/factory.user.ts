import {
  CountryCode,
  Gender,
  MobileCountryCode,
  User,
  UserRole,
} from "abipulli-types";
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
    gender: faker.helpers.arrayElement(["male", "female", "diverse"]) as Gender,
    mobileCountryCode: faker.helpers.arrayElement([
      "+49",
      "+41",
      "+43",
    ]) as MobileCountryCode,
    grade: faker.number.int({ min: 11, max: 13 }),
    graduationYear: faker.number.int({ min: 2025, max: 2026 }),
    mobileNumber: faker.phone
      .number({ style: "international" })
      .replace("+", ""),
    birthdate: faker.date.past({ years: 20 }),
    countryCode: faker.helpers.arrayElement(["DE", "CH", "AT"]) as CountryCode,
    city: faker.location.city(),
    deadline: faker.date.future({ years: 1 }),
  }),
};
