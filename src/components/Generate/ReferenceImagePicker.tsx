import { Image } from "abipulli-types";
import { MediumLabel } from "../Texts/MediumLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Center } from "../Misc/Center";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface ReferenceImagePickerProps {
  images: Image[];
  chosenImage?: Image;
  setChosenImage: (image: Image) => void;
  deactivate: boolean;
}

export const ReferenceImagePicker = ({
  images,
  chosenImage,
  setChosenImage,
  deactivate,
}: ReferenceImagePickerProps) => (
  <section
    className="w-full sm:flex-6/12 flex flex-col border rounded-xl p-4 aspect-square overflow-scroll sm:mt-8"
    aria-label="Referenzbild Auswahl"
  >
    <MediumLabel
      className="text-center"
      text="Wähle aus zuvor Generierten Bildern"
    />
    <div
      className="flex flex-wrap gap-2 mt-4 justify-center"
      aria-label="Bilderliste"
    >
      {images.map((image) => {
        const imageChosen: boolean =
          chosenImage != undefined && chosenImage.id == image.id;
        return (
          <button
            key={`pick-reference-${image.id}`}
            className="cursor-pointer relative border-none bg-transparent p-0"
            onClick={() => !deactivate && setChosenImage(image)}
            aria-label={
              imageChosen
                ? `Bild ${image.id} ausgewählt`
                : `Bild ${image.id} auswählen`
            }
            aria-pressed={imageChosen}
            disabled={deactivate}
            type="button"
          >
            <span
              className={`absolute -right-2 -top-2 w-6 h-6 border flex ${deactivate ? "bg-gray-300" : imageChosen ? "bg-abipulli-green" : "bg-white"}`}
              aria-hidden="true"
            >
              {imageChosen && (
                <Center>
                  <FontAwesomeIcon icon={faCheck} />
                </Center>
              )}
            </span>
            <img
              src={image.url}
              className="w-26"
              alt={`Referenzbild ${image.id}`}
            />
          </button>
        );
      })}
    </div>
  </section>
);
