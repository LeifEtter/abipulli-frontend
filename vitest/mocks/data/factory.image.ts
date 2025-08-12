import { faker } from "@faker-js/faker";
import { Image, ImageWithPositionAndScale } from "abipulli-types";
import { getRandomUrl, uniqueId } from "./utils";

export const ImageFactory = {
  image: ({
    id,
    generated,
    userId,
  }: {
    id?: number;
    generated?: boolean;
    userId?: number;
  }): Image => {
    return {
      id: id ?? uniqueId(),
      url: getRandomUrl(),
      createdAt: faker.date.past(),
      generated: generated ?? faker.helpers.arrayElement([true, false]),
      prompt: faker.word.words(10),
      uuid: crypto.randomUUID(),
      userId: userId ?? faker.number.int({ min: 100000, max: 1000000 }),
      width: faker.number.int({ min: 500, max: 1200 }),
      height: faker.number.int({ min: 500, max: 1200 }),
    };
  },
  positionedImage: ({
    imageToDesignId,
  }: {
    imageToDesignId?: number;
  }): ImageWithPositionAndScale => {
    return {
      ...ImageFactory.image({}),
      imageToDesignId: imageToDesignId ?? uniqueId(),
      isBackside: false,
      scaleX: faker.number.float({ min: 0.5, max: 1 }),
      scaleY: faker.number.float({ min: 0.5, max: 1 }),
      positionX: faker.number.int({ min: 0, max: 500 }),
      positionY: faker.number.int({ min: 0, max: 500 }),
    };
  },
};
