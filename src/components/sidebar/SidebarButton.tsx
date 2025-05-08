import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouterState } from "@tanstack/react-router";

export const SidebarButton: React.FC<{
  route: string;
  text: string;
  icon: IconDefinition;
  selected?: boolean;
}> = ({ text, route, icon }) => {
  const state = useRouterState();
  return (
    <Link
      to={route}
      className={`gap-2 flex flex-row items-center px-3 py-2 rounded-4xl hover:cursor-pointer ${
        state.location.pathname == route ? "bg-ap-dark-blue-v2 text-white" : ""
      }`}
    >
      <FontAwesomeIcon icon={icon} size={"lg"} width={25} />
      <p className="hidden md:flex text-md justify-start font-semibold">
        {text}
      </p>
    </Link>
  );
};
