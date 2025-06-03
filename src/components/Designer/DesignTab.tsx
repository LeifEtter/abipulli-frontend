interface DesignTabParams {
  image: string;
  selected?: boolean;
}

export const DesignTab: React.FC<DesignTabParams> = ({ image, selected }) => (
  <button
    className={`w-25 h-25 cursor-pointer border-2 border-ap-new-gray rounded-2xl flex items-center justify-center ${selected ? "bg-ap-new-green" : "bg-ap-new-dark-beige"}`}
  >
    <img src={image} className="h-11/12" alt="" />
  </button>
);
