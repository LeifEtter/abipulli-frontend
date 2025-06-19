import { SelectedStylesMap } from "src/types/generator/SelectedStyles";

interface StyleSelectorProps {
  selectedStyles: SelectedStylesMap;
  onSelect: (k: string) => void;
}

export const StyleSelector = ({
  selectedStyles,
  onSelect,
}: StyleSelectorProps) => (
  <div className="flex gap-2">
    {Object.entries(selectedStyles).map(([k, v]) => (
      <button
        key={`style-button-${k}`}
        className={`hover:-mt-1 hover:mb-1 cursor-pointer transition duration-75 font-medium border-1 border-ap-new-gray p-1 px-2 rounded-md bg-ap-new-dark-beige ${v ? "bg-green-700 text-white border-none shadow-md" : "bg-ap-new-dark-beige"}`}
        onClick={() => onSelect(k)}
      >
        {k.capitalize()}
      </button>
    ))}
  </div>
);
