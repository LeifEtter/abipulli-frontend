import { Pullover } from "abipulli-types";
import { LoadingSpinner } from "../Misc/LoadingSpinner";
import { Center } from "../Misc/Center";

interface PreviewDesignProps {
  pullover?: Pullover;
  designImage?: string;
}

export const PreviewDesign = ({
  pullover,
  designImage,
}: PreviewDesignProps) => {
  return !pullover ? (
    <Center>
      <LoadingSpinner aria-label="Lade Pullover Vorschau" />
    </Center>
  ) : (
    <section
      className="relative justify-center mt-6"
      aria-label="Pullover Design Vorschau"
    >
      <Center>
        <img
          src={pullover.frontImage.url}
          className="w-10/12 max-w-sm"
          alt="Pullover Vorschau"
          aria-label="Pullover Vorschau"
        />
      </Center>
      <div className="absolute flex justify-center w-full top-3/12">
        <img
          src={designImage}
          alt="Design Vorschau"
          aria-label="Design Vorschau"
          className="w-4/12"
        />
      </div>
    </section>
  );
};
