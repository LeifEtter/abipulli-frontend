import { JSX } from "react";
import { Center } from "../Misc/Center";

interface ImproveButtonProps {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
  selected: boolean;
}
export const ImproveButton = ({
  label,
  onClick,
  icon,
  selected,
}: ImproveButtonProps) => (
  <button
    onClick={onClick}
    className={`${selected && "bg-abipulli-green border"} flex flex-row items-center mr-2 cursor-pointer pr-2 rounded-md shadow-md"`}
  >
    <div
      className={`${selected ? "bg-abipulli-green" : "bg-white"} rounded-md w-8 h-8`}
    >
      <Center>{icon}</Center>
    </div>
    <p className="font-semibold text-sm sm:text-md">{label}</p>
  </button>
);
