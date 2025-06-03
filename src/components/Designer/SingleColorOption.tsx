interface SingleColorOptionParams {
  color: string;
  selected?: boolean;
}

export const SingleColorOption: React.FC<SingleColorOptionParams> = ({
  color,
  selected,
}) => (
  <button
    className={`rounded-3xl w-10 h-10 cursor-pointer border-2 border-ap-grey shadow-ap-special-shadow ${selected ? "" : ""}`}
    style={{ backgroundColor: color }}
  />
);
