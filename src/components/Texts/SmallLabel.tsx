interface MediumLabelParams {
  text: string;
  htmlFor?: string;
  className?: string;
}

export const SmallLabel: React.FC<MediumLabelParams> = ({
  text,
  htmlFor,
  className,
}) => (
  <label
    className={`text-md font-medium text-ap-new-black ${className}`}
    htmlFor={htmlFor}
  >
    {text}
  </label>
);
