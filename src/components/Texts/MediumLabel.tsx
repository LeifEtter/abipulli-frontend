interface MediumLabelParams {
  text: string;
  htmlFor?: string;
  className?: string;
}

export const MediumLabel: React.FC<MediumLabelParams> = ({
  text,
  htmlFor,
  className,
}) => (
  <label
    className={`text-xl font-semibold text-ap-new-black ${className}`}
    htmlFor={htmlFor}
  >
    {text}
  </label>
);
