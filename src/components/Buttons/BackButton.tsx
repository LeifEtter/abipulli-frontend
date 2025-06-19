import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

export const BackButton = ({ to }: { to: string }) => (
  <Link
    className="bg-ap-new-dark-beige rounded-md px-2 py-1 ml-4 shadow-sm border flex items-center border-ap-new-gray hover:scale-105"
    to={to}
  >
    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
    <p className="font-medium">Zurück</p>
  </Link>
);
