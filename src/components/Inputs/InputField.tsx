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
}

export const InputField = ({
  value,
  onChange,
  placeholder,
  label,
  multiline,
  minLines,
  id,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      {label ? <SmallLabel htmlFor={`input-${label}`} text={label} /> : <></>}
      {multiline ? (
        <textarea
          id={id ?? `input-${label}`}
          className="bg-ap-new-dark-beige border-1 border-ap-new-gray rounded-sm py-1 px-3"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={minLines}
        />
      ) : (
        <input
          id={id ?? `input-${label}`}
          className="bg-ap-new-dark-beige border-1 border-ap-new-gray rounded-sm py-1 px-3 w-full"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};
