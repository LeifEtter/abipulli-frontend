import Select, { ActionMeta, SingleValue } from "react-select";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  chosenOption: SelectOption;
  onChange: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => void;
  className?: string;
}

export const SelectField = ({
  label,
  options,
  chosenOption,
  onChange,
  className,
}: SelectFieldProps) => (
  <div className={className}>
    <label htmlFor="select-country-code" className="text-lg font-medium">
      {label} *
    </label>
    <Select
      id="select-country-code"
      options={options}
      value={chosenOption}
      onChange={onChange}
    />
  </div>
);
