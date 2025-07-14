interface SmallLabelParams {
  text: string;
  htmlFor?: string;
  className?: string;
}

export const SmallLabel: React.FC<SmallLabelParams> = ({
  text,
  htmlFor,
  className,
}) =>
  htmlFor ? (
    <label
      className={`text-md font-medium text-ap-new-black ${className ?? ""}`}
      htmlFor={htmlFor}
      aria-label={text}
    >
      {text}
    </label>
  ) : (
    <span
      className={`text-md font-medium text-ap-new-black ${className ?? ""}`}
      aria-label={text}
      role="heading"
      aria-level={3}
    >
      {text}
    </span>
  );
