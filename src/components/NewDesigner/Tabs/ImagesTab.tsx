export const ImagesTab = ({
  images,
}: {
  images: { src: string; label: string }[];
}) => (
  <div>
    <button className="bg-white border border-black w-full rounded-xl text-center font-semibold p-3">
      Generate Image
    </button>
    <div className="grid grid-cols-2 gap-4 mt-4">
      {images.map((image, idx) => (
        <div key={`image-tab-${idx}`}>
          <img
            className="border-12 border-white rounded-md bg-white"
            src={image.src}
          />
          <div className="flex flex-row mt-1">
            <p className="font-medium text-sm">{image.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
