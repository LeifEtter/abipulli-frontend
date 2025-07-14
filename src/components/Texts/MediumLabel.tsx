interface MediumLabelParams {
  text: string;
  htmlFor?: string;
  className?: string;
}

export const MediumLabel: React.FC<MediumLabelParams> = ({
  text,
  htmlFor,
  className,
}) =>
  htmlFor ? (
    <label
      className={`text-xl font-semibold text-ap-new-black inline-block ${
        className ?? ""
      }`}
      htmlFor={htmlFor}
      aria-label={text}
    >
      {text}
    </label>
  ) : (
    <span
      className={`text-xl font-semibold text-ap-new-black inline-block ${
        className ?? ""
      }`}
      aria-label={text}
      role="heading"
      aria-level={2}
    >
      {text}
    </span>
  );
