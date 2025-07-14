import { Image } from "abipulli-types";
import { Center } from "../Misc/Center";
import { LoadingSpinner } from "../Misc/LoadingSpinner";

export const PreviewChooser = ({ images }: { images?: Image[] }) => {
  return !images ? (
    <Center>
      <LoadingSpinner aria-label="Lade Vorschaubilder" />
    </Center>
  ) : (
    <section className="flex gap-5 mt-5" aria-label="Vorschaubilder Auswahl">
      {images.map((image) => (
        <img
          key={`image-${image.id!}`}
          src={image.url}
          width={100}
          height={100}
          className="border hover:scale-110 transition duration-100 cursor-pointer"
          alt={`Vorschaubild ${image.id!}`}
          aria-label={`Vorschaubild ${image.id!}`}
        />
      ))}
    </section>
  );
};
