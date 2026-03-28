import { ToolButton } from "./ToolButton";
import BackArrow from "src/assets/icons/back-arrow-icon.svg";
import FrontArrow from "src/assets/icons/front-arrow-icon.svg";
import { ZoomSwitcher } from "./ZoomSwitcher";

interface ToolbarProps {
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const Toolbar = ({ zoom, setZoom }: ToolbarProps) => (
  <div className="w-full bg-white border-b-2 border-b-abipulli-gray flex items-center px-4 gap-4 py-4">
    <ToolButton iconSource={BackArrow} label="Rückgängig" onClick={() => {}} />
    <ToolButton
      iconSource={FrontArrow}
      label="Wiederholen"
      onClick={() => {}}
    />
    <div className="grow" />
    <div>Zoom</div>
    <ZoomSwitcher zoom={zoom} setZoom={setZoom} />
  </div>
);
