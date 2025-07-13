import Dropzone, { DropEvent, FileRejection } from "react-dropzone";

interface ImageDropperProps {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  onDropRejected: (fileRejections: FileRejection[], event: DropEvent) => void;
  maxImageSizeInMB: number;
  maxImageAmount: number;
}

export const ImageDropper = ({
  onDrop,
  onDropRejected,
  maxImageSizeInMB = 10,
  maxImageAmount = 1,
}: ImageDropperProps) => (
  <Dropzone
    accept={{
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    }}
    maxSize={maxImageSizeInMB * 1000000}
    maxFiles={maxImageAmount}
    onDrop={onDrop}
    onDropRejected={onDropRejected}
  >
    {({ getRootProps, getInputProps }) => (
      <section className="border-dashed border-2 border-ap-new-gray rounded-2xl h-full w-full cursor-pointer">
        <div
          {...getRootProps()}
          className="flex flex-col items-center justify-center h-full"
        >
          <input {...getInputProps()} />
          <p className="font-medium text-center text-wrap w-50">
            Ziehe hier ein Bild zum hochladen rein
          </p>
          <p className="text-gray-400 font-medium text-sm text-center text-wrap w-50">
            Akzeptiert: .jpg/.jpeg - .png - .webp, bis 10MB
          </p>
          <button className="mt-5 border-2 rounded-md px-3 py-2 text-gray-700 font-medium border-ap-new-gray cursor-pointer">
            Datei Manuell Wählen
          </button>
        </div>
      </section>
    )}
  </Dropzone>
);
