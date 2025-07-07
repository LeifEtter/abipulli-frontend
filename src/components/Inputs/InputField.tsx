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
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
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
          id={id ?? `input-${label}`}
          className="border-1 border-abipulli-grey-border rounded-sm py-1.5 px-3 w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
};
