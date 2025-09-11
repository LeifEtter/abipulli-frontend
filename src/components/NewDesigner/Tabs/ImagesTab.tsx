import { Image } from "abipulli-types";

interface ImagesTabProps {
  userImages: Image[];
  generateImage: () => void;
  addImage: (image: Image) => void;
}

export const ImagesTab = ({
  userImages,
  generateImage,
  addImage,
}: ImagesTabProps) => (
  <div>
    <button
      onClick={() => generateImage()}
      className="cursor-pointer bg-white border border-black w-full rounded-xl text-center font-semibold p-3"
    >
      Generate Image
    </button>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {userImages.map((image, idx) => (
        <div key={`image-tab-${idx}`} onClick={() => addImage(image)}>
          <img
            className="border-12 border-white rounded-md bg-white"
            src={image.url}
          />
          {/* <div className="flex flex-row mt-1">
            <p className="font-medium text-sm">{imag}</p>
          </div> */}
        </div>
      ))}
    </div>
  </div>
);
