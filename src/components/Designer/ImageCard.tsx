interface ImageCardParams {
  image: string;
}

export const ImageCard: React.FC<ImageCardParams> = () => (
  <div className="border-2 rounded-md border-ap-new-gray aspect-square w-full h-full"></div>
);
