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
  <div className="w-full sm:flex-6/12 flex flex-col border rounded-xl p-4 aspect-square overflow-scroll sm:mt-8">
    <MediumLabel
      className="text-center"
      text="Wähle aus zuvor Generierten Bildern"
    />
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {images.map((image) => {
        const imageChosen: boolean =
          chosenImage != undefined && chosenImage.id == image.id;
        return (
          <div
            key={`pick-reference-${image.id}`}
            className="cursor-pointer relative"
            onClick={() => !deactivate && setChosenImage(image)}
          >
            <div
              className={`absolute -right-2 -top-2 w-6 h-6 border flex ${deactivate ? "bg-gray-300" : imageChosen ? "bg-abipulli-green" : "bg-white"}`}
            >
              {imageChosen && (
                <Center>
                  <FontAwesomeIcon icon={faCheck} />
                </Center>
              )}
            </div>
            <img src={image.url} className="w-26" />
          </div>
        );
      })}
    </div>
  </div>
);
