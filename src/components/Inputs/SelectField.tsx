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
      {label}
      <span className="text-abipulli-green-strong" aria-label="Pflichtfeld">
        *
      </span>
    </label>
    <Select
      inputId="select-country-code"
      options={options}
      value={chosenOption}
      onChange={onChange}
      aria-label={label}
      aria-required={true}
      classNamePrefix="react-select"
    />
  </div>
);
