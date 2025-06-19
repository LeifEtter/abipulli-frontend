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
    <div className="relative justify-center mt-5">
      <div className="flex justify-center">
        <img src={pullover.image.url} className="w-10/12 max-w-sm" />
      </div>
      <div className="absolute flex justify-center items-center w-full h-full top-0 left-0">
        <img src={designImage} alt="" className="-mt-30" width={150} />
      </div>
    </div>
  );
};
