import Select, { ActionMeta, SingleValue } from "react-select";

export interface SelectOption<T> {
  label: string;
  value: T;
}

interface SelectFieldProps<T> {
  label: string;
  options: SelectOption<T>[];
  chosenOption: SelectOption<T>;
  onChange: (
    newValue: SingleValue<SelectOption<T>>,
    actionMeta: ActionMeta<SelectOption<T>>
  ) => void;
  className?: string;
  idPrefix: string;
}

export const SelectField = <T,>({
  label,
  options,
  chosenOption,
  onChange,
  className,
  idPrefix,
}: SelectFieldProps<T>) => (
  <div className={className}>
    <label htmlFor={`select-${idPrefix}`} className="text-lg font-medium">
      {label}
      <span className="text-abipulli-green-strong" aria-label="Pflichtfeld">
        *
      </span>
    </label>
    <Select
      inputId={`select-${idPrefix}`}
      options={options}
      value={chosenOption}
      onChange={onChange}
      aria-label={label}
      aria-required={true}
      classNamePrefix="react-select"
    />
  </div>
);
