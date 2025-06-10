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

);
