import { ImageConfig } from "konva/lib/shapes/Image";
import { useEffect, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

interface DraggableImageParams {
  src: string;
  width: number;
}

export const DraggableImage: React.FC<DraggableImageParams> = ({
  src,
  width,
}) => {
  const [image] = useImage(src);
  const [imageRatio, setImageRatio] = useState(1);

  useEffect(() => {
    if (image) {
      const imageWidth: number = image.width;
      const imageHeight: number = image.height;
      const ratio: number = imageHeight / imageWidth;
      setImageRatio(ratio);
    }
  }, [image]);

  return (
    <Image image={image} draggable height={width * imageRatio} width={width} />
  );
};
