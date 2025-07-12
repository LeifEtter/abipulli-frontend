import { Image } from "abipulli-types";
import { useState } from "react";
import { BasicButton } from "../Buttons/BasicButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ImageCard } from "./ImageCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ImageSelectionProps {
  images: Image[];
  onClick: (image: Image) => void;
}

export const ImageSelection = ({ images, onClick }: ImageSelectionProps) => {
  enum SelectedTab {
    Images,
    Texts,
  }

  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    SelectedTab.Images
  );

  return (
    <div className="card relative p-0 w-40 lg:w-80 h-120 flex flex-col">
      <h3 className="text-center text-xl font-semibold pb-4 pt-4">Elemente</h3>
      <div className="relative flex flex-row flex-wrap [&>*]:transition-all duration-75">
        <button
          onClick={() => setSelectedTab(SelectedTab.Images)}
          className={`font-semibold cursor-pointer p-1 flex-1/1 md:flex-1/2  border-black border-y z-10 ${selectedTab == SelectedTab.Images ? " text-white" : " text-black"}`}
        >
          Bilder
        </button>
        <button
          onClick={() => setSelectedTab(SelectedTab.Texts)}
          className={`font-semibold cursor-pointer p-1 flex-1/1 md:flex-1/2 border-black z-10 border-y ${selectedTab == SelectedTab.Texts ? "text-white" : " text-black"}`}
        >
          Texte
        </button>
        <div
          className={`hidden md:block absolute w-1/2 bg-black h-full ${selectedTab == SelectedTab.Images ? "left-0" : "left-1/2"}`}
        />
        <div
          className={`block md:hidden absolute w-full h-1/2 bg-black ${selectedTab == SelectedTab.Images ? "top-0" : "top-1/2"}`}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-4 overflow-scroll py-4 px-3">
        {images.map((image) => (
          <ImageCard
            key={`image-card-${image.id}`}
            image={image.url}
            onClick={() => onClick(image)}
          />
        ))}
      </div>
      <div className="hidden md:flex bottom-4 justify-center w-full px-4">
        <BasicButton icon={faPlus}>Bild Element Erstellen</BasicButton>
      </div>
      <div className="absolute flex md:hidden bottom-4  flex-row w-full justify-center">
        <FontAwesomeIcon
          icon={faPlus}
          className="border-2 bg-abipulli-green rounded-xl py-3 px-4 shadow-md text-2xl"
        />
      </div>
    </div>
  );
};
