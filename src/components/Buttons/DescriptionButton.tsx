import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { ButtonType } from "src/types/ButtonType";

interface DescriptionButtonProps {
  type?: ButtonType;
  to?: string;
  onClick?: () => void;
  className?: string;
  hoverEffect?: boolean;
  children: string;
  icon?: IconProp;
  shadow?: any;
  color?: string;
  description: string;
  ariaLabel?: string;
  describedById?: string;
  id?: string;
}

/**
 * Renders a styled button or link with optional icon.
 *
 * @param props - DescriptionButtonProps
 * @returns React element for a button or link with a description
 */
export const DescriptionButton = ({
  type = ButtonType.Button,
  to,
  onClick,
  className,
  hoverEffect = true,
  children,
  icon,
  shadow,
  color,
  description,
  ariaLabel,
  describedById,
  id,
}: DescriptionButtonProps) => {
  if (type == ButtonType.Link && !to)
    throw "Please pass 'to' prop when using type == ButtonType.Link";
  const computedAriaLabel = ariaLabel ?? children;
  const descriptionId = describedById ?? `${id ?? "desc-btn"}-desc`;
  return type == ButtonType.Button ? (
    <button
      type="button"
      aria-label={computedAriaLabel}
      aria-describedby={descriptionId}
      className={`flex flex-col cursor-pointer ${color ?? "bg-abipulli-green"} py-1.5 px-4 rounded-md border font-semibold text-md ${shadow ? "shadow-abipulli-sm hover:translate-y-2 hover:shadow-none" : "hover:scale-110"} ${className}`}
      onClick={onClick}
    >
      <span className="flex flex-row justify-start items-center text-lg">
        {children}
        {icon ? <FontAwesomeIcon className="ml-2" icon={icon} /> : null}
      </span>
      <span id={descriptionId} className="text-gray-500 font-semibold text-sm">
        {description}
      </span>
    </button>
  ) : (
    <Link
      aria-label={computedAriaLabel}
      aria-describedby={descriptionId}
      to={to}
      className={`flex flex-col cursor-pointer bg-abipulli-green py-1.5 px-4 rounded-md border font-semibold text-md ${shadow ? "shadow-abipulli-sm hover:translate-y-2 hover:shadow-none" : "hover:scale-110"} ${className}`}
    >
      <span className="flex flex-row justify-start items-center text-lg">
        {children}
        {icon ? <FontAwesomeIcon className="ml-2" icon={icon} /> : null}
      </span>
      <span id={descriptionId} className="text-gray-500 font-semibold text-sm">
        {description}
      </span>
    </Link>
  );
};
