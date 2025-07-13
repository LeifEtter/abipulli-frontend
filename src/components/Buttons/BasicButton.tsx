import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { ButtonType } from "src/types/ButtonType";

interface BasicButtonProps {
  type?: ButtonType;
  to?: string;
  onClick?: () => void;
  className?: string;
  hoverEffect?: boolean;
  children: string;
  icon?: IconProp;
  shadow?: any;
  color?: string;
}

export const BasicButton = ({
  type = ButtonType.Button,
  to,
  onClick,
  className,
  hoverEffect = true,
  children,
  icon,
  shadow,
  color,
}: BasicButtonProps) => {
  if (type == ButtonType.Link && !to)
    throw "Please pass 'to' prop when using type == ButtonType.Link";
  return type == ButtonType.Button ? (
    <button
      className={`cursor-pointer ${color ?? "bg-abipulli-green"} py-1.5 px-4 rounded-md border font-semibold text-md ${shadow ? "shadow-abipulli-sm hover:translate-y-2 hover:shadow-none" : "hover:scale-110"} ${className}`}
      onClick={onClick}
    >
      {children}
      {icon ? <FontAwesomeIcon className="ml-2" icon={icon} /> : <></>}
    </button>
  ) : (
    <Link
      to={to}
      className={`cursor-pointer bg-abipulli-green py-1.5 px-4 rounded-md border font-semibold text-md ${shadow ? "shadow-abipulli-sm hover:translate-y-2 hover:shadow-none" : "hover:scale-110"} ${className}`}
    >
      {children}
      {icon ? <FontAwesomeIcon className="ml-2" icon={icon} /> : <></>}
    </Link>
  );
};
