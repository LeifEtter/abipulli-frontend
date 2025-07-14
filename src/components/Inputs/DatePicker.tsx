import { SmallLabel } from "../Texts/SmallLabel";

interface DatePickerProps {
  label: string;
  value: string | undefined;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  idPrefix: string;
  required?: any;
  starColor?: string;
}

export const DatePicker = ({
  label,
  value,
  onChange,
  className,
  idPrefix,
  required,
  starColor,
}: DatePickerProps) => (
  <div className={`flex flex-col ${className}`} aria-label="Datumsauswahl">
    <label
      htmlFor={`pick-date-${idPrefix}`}
      className="flex flex-row items-center text-lg font-medium"
    >
      {label}
      {required && (
        <span
          className={`${starColor ?? "text-abipulli-green-strong"}`}
          aria-label="Pflichtfeld"
        >
          *
        </span>
      )}
    </label>
    <input
      value={value}
      onChange={onChange}
      type="date"
      id={`pick-date-${idPrefix}`}
      name="trip-start"
      lang="de"
      className="border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-38"
      aria-required={!!required}
      aria-label={label}
    />
  </div>
);
