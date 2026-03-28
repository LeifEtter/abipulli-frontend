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
      <section
        className="sm:border-2 sm:border-dashed border-ap-new-gray rounded-2xl w-full sm:h-full cursor-pointer py-8 flex justify-center"
        aria-label="Bild hochladen Bereich"
      >
        <div
          {...getRootProps({
            role: "button",
            tabIndex: 0,
            "aria-label": "Bild hochladen oder hier ablegen",
          })}
          className="flex flex-col items-center justify-center h-full w-50"
        >
          <input
            {...getInputProps()}
            aria-label="Datei zum Hochladen auswählen"
          />
          <p
            className="hidden sm:block font-medium text-center text-wrap"
            id="drop-instruction"
          >
            Ziehe hier ein Bild zum Hochladen rein
          </p>
          <p
            className="hidden sm:block text-gray-400 font-medium text-sm text-center text-wrap"
            id="drop-accepted"
          >
            Akzeptiert: .jpg/.jpeg - .png - .webp, bis 10MB
          </p>
          <button
            className="mt-5 border-2 rounded-md px-3 py-2 text-gray-700 font-medium border-ap-new-gray cursor-pointer"
            aria-label="Datei manuell auswählen"
            aria-describedby="drop-instruction drop-accepted"
            type="button"
          >
            Datei Manuell Wählen
          </button>
        </div>
      </section>
    )}
  </Dropzone>
);
