import {
  GenerateImageParams,
  Image,
  ImproveImageQueryParams,
} from "abipulli-types";
import { uniqueId } from "../data/utils";
import { faker } from "@faker-js/faker";
import { ImageFactory } from "../data/factory.image";
import { getTestUserId } from "vitest/testState";

export const MockImageApi = {
  upload: async (image: File): Promise<number> => uniqueId(),
  fetchUsersImages: async (): Promise<Image[]> => {
    const imageAmount = faker.number.int({ min: 1, max: 10 });
    const images: Image[] = [];
    for (let i = 0; i < imageAmount; i++) {
      images.push(ImageFactory.image({ userId: getTestUserId() }));
    }
    return images;
  },
  improveDescription: async (
    params: ImproveImageQueryParams
  ): Promise<{ description: string }> => ({
    description: faker.word.words(50),
  }),
  generateImages: async (params: GenerateImageParams): Promise<Image[]> => {
    const imageAmount = faker.number.int({ min: 1, max: 10 });
    const images: Image[] = [];
    for (let i = 0; i < imageAmount; i++) {
      images.push(ImageFactory.image({ userId: getTestUserId() }));
    }
    return images;
  },
};
