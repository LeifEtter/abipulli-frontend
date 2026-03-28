import PlusSmallIcon from "src/assets/icons/plus-small.svg";
import MinusIcon from "src/assets/icons/minus-icon.svg";
import { useState } from "react";

interface ZoomSwitcherProps {
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const ZoomSwitcher = ({ zoom, setZoom }: ZoomSwitcherProps) => {
  const [manualZoomValue, setManualZoomValue] = useState<number | null>(null);

  return (
    <div
      id="zoom-switcher"
      className="flex flex-row items-center border-2 rounded-xl border-gray-300 h-10"
    >
      <button
        className="h-full px-2"
        onClick={() => {
          if (zoom > 0) setZoom(zoom - 10);
          setManualZoomValue(null);
        }}
      >
        <img src={MinusIcon} className="w-4 h-4" />
      </button>
      <div className="h-full bg-gray-300 w-0.5" />
      <div className="flex flex-row gap-1 px-2">
        <input
          max={500}
          value={manualZoomValue ?? zoom}
          type="number"
          className="w-8 text-end flex justify-end [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          onChange={(e) => {
            if (parseInt(e.target.value) > 500) return setManualZoomValue(500);
            if (parseInt(e.target.value) < 0) return setManualZoomValue(0);
            setManualZoomValue(parseInt(e.target.value));
          }}
          onBlur={() => {
            if (manualZoomValue != null) {
              setZoom(manualZoomValue!);
            }
          }}
        />
        <p className="font-medium text-gray-500 m-0 p-0">%</p>
      </div>

      <div className="h-full bg-gray-300 w-0.5" />
      <button
        className="h-full px-2"
        onClick={() => {
          if (zoom < 500) setZoom(zoom + 10);
          setManualZoomValue(null);
        }}
      >
        <img src={PlusSmallIcon} className="w-4 h-4" />
      </button>
    </div>
  );
};
