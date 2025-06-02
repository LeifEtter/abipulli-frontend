import { IconPathData, IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAdjust,
  faChartColumn,
  faChartDiagram,
  faChartLine,
  faCircleQuestion,
  faInfo,
  faMessage,
  faPenRuler,
  faPoll,
  faSliders,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

const Spacer: React.FC = () => <div className="flex flex-grow"></div>;

const Divider: React.FC = () => (
  <div className="w-10/12 border-2 border-ap-new-light-gray-greenish opacity-50 my-3" />
);

interface SidebarElementProps {
  icon: IconProp;
  route: string;
}

const SidebarElement = ({ icon, route }: SidebarElementProps) => (
  <Link to={route}>
    <FontAwesomeIcon size={"2x"} icon={icon} />
  </Link>
);

const LeftSideBar: React.FC = () => (
  <div className="bg-ap-new-green border-ap-new-gray border-2 flex flex-col min-w-16 w-2/12 max-w-26 items-center py-3">
    <Link to="/">
      <h2 className="font-semibold text-xl">
        Abi
        <br />
        pulli
      </h2>
    </Link>
    <Divider />
    <div className="flex flex-col items-center gap-5 mt-5">
      <SidebarElement icon={faInfo} route="/" />
      <SidebarElement icon={faSliders} route="/" />
      <SidebarElement icon={faPenRuler} route="/" />
      <SidebarElement icon={faPoll} route="/" />
    </div>
    <Spacer />
    <Divider />
    <div className="flex flex-col gap-6">
      <SidebarElement icon={faMessage} route="/" />
      <SidebarElement icon={faCircleQuestion} route="/" />
    </div>
    <Divider />
    <SidebarElement icon={faUser} route="/" />
  </div>
);

function RouteComponent() {
  return (
    <div className="flex h-full w-full">
      <LeftSideBar />
      <div className="flex-5/6">
        <Outlet />
      </div>
    </div>
  );
}
