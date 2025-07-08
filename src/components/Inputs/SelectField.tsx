import Select from "react-select";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
}

export const SelectField = ({ label, options }: SelectFieldProps) => (
  <div className="flex-1/12 min-w-21">
    <label htmlFor="select-country-code" className="text-lg font-medium">
      {label} *
    </label>
    <Select
      id="select-country-code"
      options={options}
      defaultValue={options[0]}
    />
  </div>
);
