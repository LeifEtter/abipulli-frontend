import { Link } from "@tanstack/react-router";
import { SidebarButton } from "./SidebarButton";
import {
  faCircleQuestion,
  faInfo,
  faMessage,
  faPenRuler,
  faPoll,
  faSliders,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Spacer } from "../Misc/Spacer";

const SidebarDivider: React.FC = () => (
  <div className="w-10/12 border-2 border-ap-new-light-gray-greenish opacity-50 my-3" />
);

export const LeftSideBar: React.FC = () => (
  <div className="bg-ap-new-green border-ap-new-gray border-2 flex flex-col min-w-16 w-2/12 max-w-26 items-center py-3">
    <Link to="/">
      <h2 className="font-semibold text-xl">
        Abi
        <br />
        pulli
      </h2>
    </Link>
    <SidebarDivider />
    <div className="flex flex-col items-center gap-5 mt-5">
      <SidebarButton icon={faInfo} route="/" />
      <SidebarButton icon={faSliders} route="/" />
      <SidebarButton icon={faPenRuler} route="/" />
      <SidebarButton icon={faPoll} route="/" />
    </div>
    <Spacer />
    <SidebarDivider />
    <div className="flex flex-col gap-6">
      <SidebarButton icon={faMessage} route="/" />
      <SidebarButton icon={faCircleQuestion} route="/" />
    </div>
    <SidebarDivider />
    <SidebarButton icon={faUser} route="/" />
  </div>
);
