import { JSX } from "react";

interface ActionPanelProps {
  children: JSX.Element[] | JSX.Element;
  title: string;
  description: string;
}

export const ActionPanel = ({
  children,
  title,
  description,
}: ActionPanelProps) => (
  <div className="rounded-xl bg-abipulli-light-beige duration-100 shadow-ap-special-shadow p-6 min-w-sm max-w-md">
    <h3 className="font-semibold text-2xl text-abipulli-black">{title}</h3>
    <p className="text-md">{description}</p>
    <div className="w-full h-0.5 bg-gray-200 mt-2 flex flex-col" />
    {children}
  </div>
);
