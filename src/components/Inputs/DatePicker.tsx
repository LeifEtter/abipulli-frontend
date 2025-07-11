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
  <div className={`flex flex-col ${className}`}>
    <div className="flex flex-row">
      <SmallLabel
        htmlFor={`pick-date-${idPrefix}`}
        text={label}
        className="text-lg font-medium"
      />
      {required && (
        <p className={`${starColor ?? "text-abipulli-green-strong"}`}>*</p>
      )}
    </div>
    <input
      value={value}
      onChange={onChange}
      type="date"
      id={`pick-date-${idPrefix}`}
      name="trip-start"
      lang="de"
      className="border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-38"
    />
  </div>
);
