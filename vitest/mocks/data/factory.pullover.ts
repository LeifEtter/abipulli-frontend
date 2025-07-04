import { faker } from "@faker-js/faker";
import { getRandomPulloverImageUrl, uniqueId } from "./utils";
import { Pullover } from "abipulli-types";

export const PulloverFactory = {
  pullover: ({ id }: { id?: number }): Pullover => {
    const imageId = uniqueId();
    return {
      id: id ?? uniqueId(),
      name: "Pullover" + faker.helpers.arrayElement(["Heavy", "Normal"]),
      color: faker.color.human(),
      description: faker.lorem.sentence(),
      basePrice: faker.number.int({ min: 20, max: 100 }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
      image: {
        id: imageId,
        createdAt: faker.date.past(),
        url: getRandomPulloverImageUrl(),
        uuid: crypto.randomUUID(),
        width: 500,
        height: 500,
      },
      imageId: imageId,
    };
  },
};
