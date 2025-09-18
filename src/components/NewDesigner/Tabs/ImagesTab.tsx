import { Image } from "abipulli-types";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { ImageApi } from "src/api/endpoints/image";
import { LoadingSpinner } from "src/components/Misc/LoadingSpinner";
import DeleteIcon from "src/assets/icons/trash-icon.svg";
import EditIcon from "src/assets/icons/edit-icon.svg";
import { Center } from "src/components/Misc/Center";

const ACCEPTED_IMAGE_FORMATS = {
  "image/jpeg": [],
  "image/png": [],
  "image/webp": [],
  "image/heic": [],
  "image/jfif": [],
};

export enum ImageTabs {
  USER = "Deine Bilder",
  GENERAL = "Bibliothek",
}

interface ImagesTabProps {
  userImages: Image[];
  addImage: (image: Image) => void;
  isDraggingOver: boolean;
  setIsDraggingOver: (isDraggingOver: boolean) => void;
  onDropAccepted: (files: File[]) => void;
  imageIsUploading: boolean;
  imageTabChoice: ImageTabs;
  deleteImage: (imageId: number) => Promise<void>;
  selectImage: (image: Image) => void;
  className: string;
}

export const ImagesTab = ({
  userImages,
  addImage,
  isDraggingOver,
  setIsDraggingOver,
  onDropAccepted,
  imageIsUploading,
  imageTabChoice = ImageTabs.USER,
  deleteImage,
  selectImage,
  className,
}: ImagesTabProps) => (
  <Dropzone
    accept={ACCEPTED_IMAGE_FORMATS}
    maxFiles={5}
    maxSize={10000000}
    onDropAccepted={onDropAccepted}
    onDragOver={() => !isDraggingOver && setIsDraggingOver(true)}
    onDragLeave={() => isDraggingOver && setIsDraggingOver(false)}
  >
    {({ getRootProps, getInputProps }) => (
      <section
        {...getRootProps()}
        className={className}
        onClick={(e) => e.preventDefault()}
      >
        <input {...getInputProps()} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {imageTabChoice == ImageTabs.USER ? (
            userImages.map((image, idx) => (
              <div key={`image-tab-${idx}`}>
                <div
                  onClick={() => addImage(image)}
                  className="cursor-pointer border-12 border-white aspect-square rounded-md overflow-hidden"
                >
                  <img className="object-cover w-full h-full" src={image.url} />
                </div>
                <div className="mt-2 flex flex-row justify-center items-center gap-1.5">
                  <p>Bild</p>
                  <div className="grow" />
                  <div
                    className="h-6 w-6 bg-white rounded-md cursor-pointer"
                    onClick={() => selectImage(image)}
                  >
                    <Center>
                      <img src={EditIcon} className="w-4 h-4" />
                    </Center>
                  </div>

                  <div
                    className="h-6 w-6 bg-white rounded-md cursor-pointer"
                    onClick={() => deleteImage(image.id)}
                  >
                    <Center>
                      <img src={DeleteIcon} className="w-4 h-4" />
                    </Center>
                  </div>
                </div>
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
      </section>
    )}
  </Dropzone>
);
