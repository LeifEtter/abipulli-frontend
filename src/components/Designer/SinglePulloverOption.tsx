interface SinglePulloverOptionParams {
  image: string;
  name: string;
  selected?: boolean;
}

export const SinglePulloverOption: React.FC<
  SinglePulloverOptionParams
> = async ({ image, selected, name }) => (
  <button
    className={`flex flex-col cursor-pointer items-center justify-center ${selected ? "bg-ap-new-green border-2" : ""} rounded-xl border-ap-new-gray w-20 h-20`}
  >
    <img
      id={`${name}-pullover-option`}
      src={image}
      className="h-8/12 object-contain"
      alt={`${name}-pullover-option`}
    />
    <label
      className="text-sm font-semibold"
      htmlFor={`${name}-pullover-option`}
    >
      {name}
    </label>
  </button>
);
