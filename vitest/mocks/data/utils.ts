import { faker } from "@faker-js/faker";

export const uniqueId = (): number =>
  Date.now() + faker.number.int({ min: 10000, max: 100000 });

const imageUrls = [
  "PERMANENT/Abicetamol-1.jpeg",
  "PERMANENT/Abikorpolis-2.jpeg",
  "PERMANENT/Abikropolis-1.png",
  "PERMANENT/Abinsbett-1.png",
  "PERMANENT/Abinsbett-2.png",
  "PERMANENT/Abinsbett-3.png",
  "PERMANENT/Abinsbett-4.png",
  "PERMANENT/Abirol-1.jpeg",
  "PERMANENT/Abirol-2.jpeg",
  "PERMANENT/Abirol-3-Back.png",
  "PERMANENT/Abivegas-1.png",
];

const pulloverImageUrls = [
  "PERMANENT/black-front.png",
  "PERMANENT/black-back.png",
  "PERMANENT/cyan-front.png",
  "PERMANENT/cyan-back.png",
  "PERMANENT/grey-front.png",
  "PERMANENT/grey-back.png",
  "PERMANENT/white-front.png",
  "PERMANENT/white-back.png",
  "PERMANENT/sand-front.png",
  "PERMANENT/sand-back.png",
  "PERMANENT/pink-front.png",
  "PERMANENT/pink-back.png",
  "PERMANENT/purple-front.png",
  "PERMANENT/purple-back.png",
];

export const getRandomPulloverImageUrl = (): string => {
  return (
    "nbg1.your-objectstorage.com/abipulli/" +
    faker.helpers.arrayElement(pulloverImageUrls)
  );
};

export const getRandomUrl = (): string => {
  return (
    "nbg1.your-objectstorage.com/abipulli/" +
    faker.helpers.arrayElement(imageUrls)
  );
};
