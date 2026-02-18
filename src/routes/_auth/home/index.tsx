import { Icon } from "@fortawesome/fontawesome-svg-core";
import { fa0 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFileRoute } from "@tanstack/react-router";
import { JSX } from "react";
import ChatIcon from "src/assets/icons/chat-icon.svg";
import DesignIcon from "src/assets/icons/design-icon.svg";
import CheckmarkIcon from "src/assets/icons/checkmark-icon.svg";
import PollsIcon from "src/assets/icons/polls-icon.svg";
import { AbiPulliLogo } from "src/components/Misc/AbipulliLogo";

export const Route = createFileRoute("/_auth/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="font-[Onest] px-6">
      <div className="place-self-start mb-6">
        <AbiPulliLogo />
      </div>
      <div className="flex gap-6">
        <section className="w-5/7">
          <div className="grid grid-cols-2 gap-6">
            <MenuTile
              className="bg-abipulli-menu-red"
              title="Chats"
              description="asdasdasd"
              tiltDirection={TiltDirection.Left}
              icon={ChatIcon}
            />
            <MenuTile
              className="bg-abipulli-menu-gray"
              title="AbiPullis"
              description="asdasdasd"
              tiltDirection={TiltDirection.Right}
              icon={DesignIcon}
            />
            <MenuTile
              className="bg-abipulli-menu-green"
              title="Complete Order"
              description="asdasdasd"
              tiltDirection={TiltDirection.Left}
              icon={CheckmarkIcon}
            />
            <MenuTile
              className="bg-abipulli-menu-yellow"
              title="Polls"
              description="asdasdasd"
              tiltDirection={TiltDirection.Right}
              icon={PollsIcon}
            />
          </div>
        </section>
        <section className="w-2/7">
          <div className="bg-black text-white font-bold text-xl w-full rounded-xl h-34 flex items-center">
            <p>0% Completed</p>
          </div>
        </section>
      </div>
    </div>
  );
}

enum TiltDirection {
  Left,
  Right,
}

interface MenuTileParams {
  bgColor?: string;
  title: string;
  description: string;
  tiltDirection: TiltDirection;
  icon?: string;
  className?: string;
}

const MenuTile = ({
  bgColor,
  title,
  description,
  tiltDirection,
  icon,
  className,
}: MenuTileParams) => (
  <div
    className={`${tiltDirection == TiltDirection.Left ? "hover:rotate-1" : "hover:-rotate-1"} flex flex-col justify-end p-5 cursor-pointer aspect-7/5 hover:scale-105  ease-in-out duration-150 rounded-3xl ${className}`}
  >
    <div className="justify-bottom flex flex-col gap-2">
      <img src={icon} width={30} />
      <h1 className="font-semibold text-xl">{title}</h1>
      <p>{description}</p>
    </div>
  </div>
);
