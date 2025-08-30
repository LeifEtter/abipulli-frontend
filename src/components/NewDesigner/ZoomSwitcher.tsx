import PlusSmallIcon from "src/assets/icons/plus-small.svg";
import MinusIcon from "src/assets/icons/minus-icon.svg";

export const ZoomSwitcher = ({ zoom }: { zoom: number }) => (
  <div
    id="zoom-switcher"
    className="flex flex-row items-center gap-2 border-2 rounded-xl border-gray-300 h-10 px-2"
  >
    <img src={MinusIcon} className="w-4 h-4" />
    <div className="h-full bg-gray-300 w-0.5" />
    <p className="font-medium text-gray-500">{zoom}%</p>
    <div className="h-full bg-gray-300 w-0.5" />
    <img src={PlusSmallIcon} className="w-4 h-4" />
  </div>
);
