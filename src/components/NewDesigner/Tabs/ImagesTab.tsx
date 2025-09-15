import { Image } from "abipulli-types";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { ImageApi } from "src/api/endpoints/image";
import { LoadingSpinner } from "src/components/Misc/LoadingSpinner";

export enum ImageTabs {
  USER,
  GENERAL,
}
interface ImagesTabProps {
  userImages: Image[];
  generateImage: () => void;
  addImage: (image: Image) => void;
  isDraggingOver: boolean;
  setIsDraggingOver: (isDraggingOver: boolean) => void;
  onDropAccepted: (files: File[]) => void;
  imageIsUploading: boolean;
  imageTabChoice: ImageTabs;
}

export const ImagesTab = ({
  userImages,
  generateImage,
  addImage,
  isDraggingOver,
  setIsDraggingOver,
  onDropAccepted,
  imageIsUploading,
  imageTabChoice = ImageTabs.USER,
}: ImagesTabProps) => (
  <Dropzone
    accept={{
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    }}
    maxFiles={5}
    maxSize={10000000}
    onDropAccepted={onDropAccepted}
    // onDropAccepted={async (files) => {
    //   setIsDraggingOver(false);
    //   setImageIsUploading(true);
    //   await ImageApi.upload(files[0]);
    //   setImageIsUploading(false);
    // }}
    onDragOver={() => !isDraggingOver && setIsDraggingOver(true)}
    onDragLeave={() => isDraggingOver && setIsDraggingOver(false)}
  >
    {({ getRootProps, getInputProps }) => (
      <section className="w-full h-full relative">
        <div
          {...getRootProps()}
          onClick={(e) => e.preventDefault()}
          className="h-full"
        >
          <input {...getInputProps()} />
          <div>
            <button
              onClick={() => generateImage()}
              className="cursor-pointer bg-white border border-black w-full rounded-xl text-center font-semibold p-3"
            >
              Bild Generieren
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {imageTabChoice == ImageTabs.USER ? (
                userImages.map((image, idx) => (
                  <div
                    key={`image-tab-${idx}`}
                    className="cursor-pointer border-8 border-abipulli-dark-beige aspect-square rounded-md overflow-hidden"
                    onClick={() => addImage(image)}
                  >
                    <img className="object-cover" src={image.url} />
                  </div>
                ))
              ) : (
                <></>
              )}
              {imageIsUploading && (
                <div className="bg-gray-200 rounded-md flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-300 aspect-square">
                  <LoadingSpinner className="fill-abipulli-green-strong dark:text-gray-300" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )}
  </Dropzone>
);
