import Dropzone, { DropEvent, FileRejection } from "react-dropzone";
import UploadIcon from "src/assets/icons/upload-icon.svg";

interface NewImageDropperProps {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void;
  onDropRejected: (fileRejections: FileRejection[], event: DropEvent) => void;
  maxImageSizeInMB: number;
  maxImageAmount: number;
}

export const NewImageDropper = ({
  onDrop,
  onDropRejected,
  maxImageSizeInMB = 10,
  maxImageAmount = 1,
}: NewImageDropperProps) => (
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
        className="bg-white border border-abipulli-gray rounded-xl cursor-pointer py-6"
        aria-label="Bild hochladen Bereich"
      >
        <div
          {...getRootProps({
            role: "button",
            tabIndex: 0,
            "aria-label": "Bild hochladen oder hier ablegen",
          })}
          className="flex flex-col gap-2 items-center justify-center"
        >
          <img src={UploadIcon} />
          <input
            {...getInputProps()}
            aria-label="Datei zum Hochladen auswählen"
          />
          <p
            className="hidden sm:block font-medium text-center text-wrap"
            id="drop-instruction"
          >
            Bild hier reinziehen oder
          </p>
          <button
            className="border border-gray-950 rounded-xl px-3 py-2 bg-abipulli-green text-md font-semibold cursor-pointer"
            aria-label="Datei manuell auswählen"
            aria-describedby="drop-instruction drop-accepted"
            type="button"
          >
            Datei Wählen
          </button>
          <p
            className="hidden sm:block text-gray-400 font-medium text-sm text-center text-wrap"
            id="drop-accepted"
          >
            .jp(e)g/.png/.webp bis 10MB
          </p>
        </div>
      </section>
    )}
  </Dropzone>
);
