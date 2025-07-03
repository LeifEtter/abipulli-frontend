import { UserCheckAuthResult, UserLoginResult } from "abipulli-types";
import { faker } from "@faker-js/faker";
import { getTestUserId } from "vitest/testState";

export const UserApi = {
  retrieveUserId: async (): Promise<UserCheckAuthResult> => ({
    id: getTestUserId()!,
  }),
  login: async (): Promise<UserLoginResult> => {
    return {
      id: getTestUserId()!,
      token: faker.internet.jwt(),
    };
  },
};
