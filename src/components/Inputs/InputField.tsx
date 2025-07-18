import { HTMLInputTypeAttribute } from "react";
import { SmallLabel } from "../Texts/SmallLabel";

interface InputFieldProps<
  T extends string | number | readonly string[] | undefined,
> {
  value: T;
  onChange: (value: T) => void;
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

export const InputField = <
  T extends string | number | readonly string[] | undefined,
>({
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
}: InputFieldProps<T>) => {
  const inputId = id ?? `input-${label}`;
  return (
    <div className={"flex flex-col" + " " + className}>
      {label ? (
        <label htmlFor={inputId} className="flex gap-1 text-lg font-medium">
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
      ) : null}
      {multiline ? (
        <textarea
          id={inputId}
          className="border-1 border-abipulli-grey-border rounded-sm py-1 px-3"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          rows={minLines}
          required={!!required}
          disabled={!!disabled}
          defaultValue={defaultValue}
          aria-required={!!required}
          aria-label={label ?? placeholder}
        />
      ) : (
        <input
          type={type}
          maxLength={maxLength}
          id={inputId}
          className={`border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-full ${error !== null ? "animate-[var(--animation-shake)] border-red-400 border" : ""} ${disabled && "bg-gray-100 text-gray-400"}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          required={!!required}
          disabled={!!disabled}
          defaultValue={defaultValue}
          aria-required={!!required}
          aria-label={label ?? placeholder}
        />
      )}
      {error && (
        <p
          className="text-red-500 font-medium text-sm"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
