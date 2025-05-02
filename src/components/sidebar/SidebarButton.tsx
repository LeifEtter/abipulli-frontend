import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SidebarButton: React.FC<{
  text: string;
  icon: IconDefinition;
  selected?: boolean;
}> = ({ text, icon, selected = false }) => {
  return (
    <button
      className={`w-10/12 min-w-40 gap-1 flex flex-row items-center px-2 py-2 rounded-4xl hover:cursor-pointer ${
        selected ? "bg-ap-dark-blue-v2 text-white" : ""
      }`}
    >
      <FontAwesomeIcon icon={icon} size={"lg"} className="w-1/4" />
      <a className="w-3/4 text-md flex justify-start font-semibold">{text}</a>
    </button>
  );
};
