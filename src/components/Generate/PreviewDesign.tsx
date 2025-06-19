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
      <LoadingSpinner />
    </Center>
  ) : (
    <div className="relative justify-center mt-6">
      <Center>
        <img src={pullover.image.url} className="w-10/12 max-w-sm" />
      </Center>
      <div className="absolute flex justify-center w-full top-3/12">
        <img src={designImage} alt="" className="w-4/12" />
      </div>
    </div>
  );
};
