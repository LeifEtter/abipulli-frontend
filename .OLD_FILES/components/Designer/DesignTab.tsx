interface DesignTabParams {
  image: string;
  selected?: boolean;
  onSelect: () => void;
}

export const DesignTab: React.FC<DesignTabParams> = ({
  image,
  selected,
  onSelect,
}) => (
  <button
    type="button"
    className={`cursor-pointer basis-30 aspect-square rounded-2xl flex items-center justify-center ${selected && "bg-abipulli-green border-2"}`}
    aria-label={selected ? "Design ausgewählt" : "Design auswählen"}
    aria-pressed={!!selected}
    onClick={onSelect}
  >
    <img
      src={image}
      className="h-11/12"
      alt={selected ? "Ausgewähltes Design" : "Design Vorschau"}
    />
  </button>
);
