import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

interface SidebarButtonProps {
  icon: IconProp;
  route: string;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  route,
}: SidebarButtonProps) => (
  <Link to={route}>
    <FontAwesomeIcon size={"2x"} icon={icon} />
  </Link>
);
