import { Image } from "abipulli-types";
import { Center } from "../Misc/Center";
import { LoadingSpinner } from "../Misc/LoadingSpinner";

export const PreviewChooser = ({ images }: { images?: Image[] }) => {
  return !images ? (
    <Center>
      <LoadingSpinner />
    </Center>
  ) : (
    <div className="flex gap-5 mt-5">
      {images.map((image) => (
        <img
          key={`image-${image}`}
          src={image.url}
          width={100}
          height={100}
          className="border hover:scale-110 transition duration-100 cursor-pointer"
        />
      ))}
    </div>
  );
};
