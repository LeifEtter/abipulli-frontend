import { JSX } from "react";

interface ActionPanelProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
  hide: boolean;
}

export const ActionPanel = ({
  children,
  title,
  description,
  hide,
}: ActionPanelProps) => (
  <div
    className={`absolute duration-75 ${hide ? "opacity-0 -right-100" : "opacity-100 right-3"} rounded-xl bg-abipulli-light-beige shadow-ap-special-shadow p-6 min-w-sm max-w-md`}
  >
    <h3 className="font-semibold text-2xl text-abipulli-black">{title}</h3>
    <p className="text-md">{description}</p>
    <div className="w-full h-0.5 bg-gray-200 mt-2 flex flex-col" />
    {children}
  </div>
);
