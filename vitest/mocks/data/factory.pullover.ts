import { faker } from "@faker-js/faker";
import { getRandomPulloverImageUrl, uniqueId } from "./utils";
import { Pullover } from "abipulli-types";

export const PulloverFactory = {
  pullover: ({ id }: { id?: number }): Pullover => {
    const frontImageId = uniqueId();
    const backImageId = uniqueId();
    return {
      id: id ?? uniqueId(),
      name: "Pullover" + faker.helpers.arrayElement(["Heavy", "Normal"]),
      color: faker.color.human(),
      description: faker.lorem.sentence(),
      basePrice: faker.number.int({ min: 20, max: 100 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      frontImage: {
        id: frontImageId,
        createdAt: faker.date.past(),
        url: getRandomPulloverImageUrl(),
        uuid: crypto.randomUUID(),
        width: 500,
        height: 500,
      },
      frontImageId: frontImageId,
      backImage: {
        id: backImageId,
        createdAt: faker.date.past(),
        url: getRandomPulloverImageUrl(),
        uuid: crypto.randomUUID(),
        width: 500,
        height: 500,
      },
      backImageId: backImageId,
    };
  },
};
