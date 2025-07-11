import { HTMLInputTypeAttribute } from "react";
import { SmallLabel } from "../Texts/SmallLabel";

interface InputFieldProps {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
  minLines?: number;
  id?: string;
  required?: any;
  starColor?: string;
  className?: string;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  error?: string | null;
  disabled?: any;
  defaultValue?: string;
}

export const InputField = ({
  value,
  onChange,
  placeholder,
  label,
  multiline,
  minLines,
  id,
  required,
  starColor,
  maxLength,
  className,
  type,
  error = null,
  disabled,
  defaultValue,
}: InputFieldProps) => {
  return (
    <div className={"flex flex-col" + " " + className}>
      {label ? (
        <span className="flex gap-1 text-lg font-medium">
          <SmallLabel
            htmlFor={`input-${label}`}
            text={label}
            className="text-lg font-medium"
          />
          {required && (
            <p className={`${starColor ?? "text-abipulli-green-strong"}`}>*</p>
          )}
        </span>
      ) : (
        <></>
      )}
      {multiline ? (
        <textarea
          id={id ?? `input-${label}`}
          className="border-1 border-abipulli-grey-border rounded-sm py-1 px-3"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={minLines}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          type={type}
          maxLength={maxLength}
          id={id ?? `input-${label}`}
          className={`border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-full ${error !== null ? "animate-[var(--animation-shake)] border-red-400 border" : ""} ${disabled && "bg-gray-100 text-gray-400"}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      )}
      <p className="text-red-500 font-medium text-sm">{error}</p>
    </div>
  );
};
