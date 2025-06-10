import { faFileUpload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ImageCardParams {
  image: string;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardParams> = ({ image, onClick }) => (
  <div
    onClick={onClick}
    className="border-2 rounded-md border-ap-new-gray aspect-square w-full h-full"
  >
    <img src={image} className="rounded-sm object-cover h-full w-full" />
  </div>
);

interface UploadImageCardParams {
  onClick: () => void;
}

export const UploadImageCard: React.FC<UploadImageCardParams> = ({
  onClick,
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer border-2 rounded-md border-ap-new-gray aspect-square w-full h-full flex justify-center items-center flex-col gap-2"
  >
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faPlus} size={"1x"} />
      <FontAwesomeIcon icon={faFileUpload} size={"2x"} />
    </div>

    <p className="text-medium text-center font-bold">Klicken zum Hochladen</p>
  </div>
);
