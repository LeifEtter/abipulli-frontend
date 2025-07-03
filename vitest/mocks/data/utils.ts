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

export const getRandomUrl = (): string => {
  return (
    "nbg1.your-objectstorage.com/abipulli/" +
    faker.helpers.arrayElement(imageUrls)
  );
};
