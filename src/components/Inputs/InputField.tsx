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
  required?: boolean;
  requiredStarColor?: string;
  className?: string;
  maxLength?: number;
  type?: HTMLInputTypeAttribute;
  error?: string | null;
}

export const InputField = ({
  value,
  onChange,
  placeholder,
  label,
  multiline,
  minLines,
  id,
  required = false,
  requiredStarColor,
  maxLength,
  className,
  type,
  error = null,
}: InputFieldProps) => {
  return (
    <div className={"flex flex-col" + " " + className}>
      {label ? (
        <span className="flex gap-1">
          <SmallLabel
            htmlFor={`input-${label}`}
            text={label}
            className="text-lg font-medium"
          />
          {required ? (
            <p
              className={`text-lg font-medium ${requiredStarColor ?? "text-black"}`}
            >
              *
            </p>
          ) : (
            <></>
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
          required
        />
      ) : (
        <input
          type={type}
          maxLength={maxLength}
          id={id ?? `input-${label}`}
          className={`border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-full ${error !== null ? "animate-[var(--animation-shake)] border-red-400 border" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      )}
      <p className="text-red-500 font-medium text-sm">{error}</p>
    </div>
  );
};
