import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useRouterState } from "@tanstack/react-router";

export const SidebarButton: React.FC<{
  route: string;
  text: string;
  icon: IconDefinition;
  selected?: boolean;
  activated?: boolean;
}> = ({ text, route, icon, activated }) => {
  const state = useRouterState();
  const buttonSelected = state.location.pathname == route;

  return buttonSelected ? (
    <Link
      to={route}
      className={`gap-2 flex flex-row items-center px-3 py-2 rounded-4xl  ${activated ? "hover:cursor-pointer" : "hover:cursor-not-allowed bg-gray-300 text-gray-200"}`}
    >
      <FontAwesomeIcon icon={icon} size={"lg"} width={25} />
      <p className="hidden md:flex text-md justify-start font-semibold">
        {text}
      </p>
    </Link>
  ) : (
    <Link
      to={route}
      className={`gap-2 flex flex-row items-center px-3 py-2 rounded-4xl  ${activated ? "hover:cursor-pointer" : "hover:cursor-not-allowed bg-gray-300 text-gray-200"}`}
    >
      <FontAwesomeIcon icon={icon} size={"lg"} width={25} />
      <p className="hidden md:flex text-md justify-start font-semibold">
        {text}
      </p>
    </Link>
  );
};
