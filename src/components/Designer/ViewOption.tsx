interface ViewOptionParams {
  view: string;
  selected?: boolean;
}

export const ViewOption: React.FC<ViewOptionParams> = ({ view, selected }) => (
  <div className="flex flex-col items-center">
    <button
      id={`${view}-select`}
      className={`w-15 h-15 cursor-pointer border-2 border-ap-new-gray rounded-lg ${selected ? "bg-ap-new-green" : "bg-ap-new-dark-beige"}`}
    ></button>
    <label htmlFor={`${view}-select`} className="text-md font-semibold">
      {view}
    </label>
  </div>
);
