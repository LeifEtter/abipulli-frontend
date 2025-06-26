import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface DropdownOption {
  name?: string;
  id: number;
  icon?: IconDefinition;
}

interface DropdownButtonParams {
  callback: (id: number) => void;
  options: DropdownOption[];
}

export const DropdownButton: React.FC<DropdownButtonParams> = ({
  callback,
  options,
}) => (
  <div className="group border">
    <button>Hover Over Me</button>
    <div className="absolute hidden group-hover:block pt-2">
      <div className="bg-white shadow-md rounded-md p-2 cursor-pointer">
        {options.map((option) => (
          <div key={`option-${option.id}`} onClick={() => callback(option.id)}>
            {option.name}
          </div>
        ))}
      </div>
    </div>
  </div>
);
